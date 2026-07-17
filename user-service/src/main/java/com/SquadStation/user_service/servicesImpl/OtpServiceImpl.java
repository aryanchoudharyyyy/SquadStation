package com.SquadStation.user_service.servicesImpl;

import com.SquadStation.user_service.dto.Request.SignupRequest;
import com.SquadStation.user_service.entity.OtpVerification;
import com.SquadStation.user_service.entity.User;
import com.SquadStation.user_service.exception.EmailAlreadyExistsException;
import com.SquadStation.user_service.exception.InvalidCollegeEmailException;
import com.SquadStation.user_service.exception.OtpNotFoundException;
import com.SquadStation.user_service.exception.UserNotFoundException;
import com.SquadStation.user_service.repository.OtpVerificationRepository;
import com.SquadStation.user_service.repository.UserRepository;
import com.SquadStation.user_service.services.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final UserRepository userRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private static final int OTP_VALID_MINUTES=10;
    @Value("${college.email-domain}")
    private String allowedDomain;
    @Override
    public void signup(SignupRequest request){
        if (!request.collegeEmail().toLowerCase().endsWith(allowedDomain.toLowerCase())){
            throw new InvalidCollegeEmailException("Please use your college email , not a personal email");
        }
        Optional<User> existing = userRepository.findByCollegeEmail(request.collegeEmail());
        if(existing.isPresent() && existing.get().isVerified()) {
            throw new EmailAlreadyExistsException("Account already exists - please login instead");
        }
        User user = existing.orElseGet(User::new);
        user.setName(request.name());
        user.setCollegeEmail(request.collegeEmail());
        user.setBranch(request.branch());
        user.setYear(request.year());
        user.setVerified(false);
        userRepository.save(user);
        sendOtp(request.collegeEmail());
    }

    @Override
    public void login(String collegeEmail){
        userRepository.findByCollegeEmail(collegeEmail)
                .orElseThrow(()->new UserNotFoundException("No account found"));
        sendOtp(collegeEmail);
    }
    private void sendOtp(String collegeEmail){
        OtpVerification otpEntry = otpVerificationRepository.findByCollegeEmail(collegeEmail)
                .orElseGet(OtpVerification::new);
        otpEntry.setCollegeEmail(collegeEmail);
        String otp = String.valueOf(100000 + new SecureRandom().nextInt(900000));
        otpEntry.setOtpCode(otp);
        otpEntry.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_VALID_MINUTES));
        otpVerificationRepository.save(otpEntry);
        System.out.println("OTP for "+collegeEmail+ "is :"+otp);
    }
    @Override
    public boolean verifyOtp(String collegeEmail, String otp){
        OtpVerification otpEntry = otpVerificationRepository.findByCollegeEmail(collegeEmail).orElseThrow(
                ()-> new OtpNotFoundException("No Otp request found for this email")
        );
        if(otpEntry.getOtpCode()==null || !otpEntry.getOtpCode().equals(otp)) return false;
        if(otpEntry.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        User user=userRepository.findByCollegeEmail(collegeEmail).
                orElseThrow(()->new UserNotFoundException("User not found"));
        user.setVerified(true);

        userRepository.save(user);
        otpVerificationRepository.delete(otpEntry);
        return true;

    }
    @Scheduled(fixedRate = 600000)
    public void cleanupExpiredOtps(){
        otpVerificationRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
