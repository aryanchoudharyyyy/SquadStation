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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final UserRepository userRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private static final int OTP_VALID_MINUTES=10;
    private final PasswordEncoder passwordEncoder;
    private static final int RESEND_COOLDOWN_SECONDS=30;
    private static final int MAX_OTP_REQUESTS_PER_HOUR=20;
    private static final int MAX_FAILED_ATTEMPTS=5;
    private static final SecureRandom SECURE_RANDOM= new SecureRandom();
    private final OtpMailServiceImpl otpMailService;
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
        LocalDateTime now = LocalDateTime.now();
        OtpVerification otpEntry = otpVerificationRepository.findByCollegeEmail(collegeEmail)
                .orElseGet(OtpVerification::new);
        if (otpEntry.getLastSentAt()!= null && otpEntry.getLastSentAt().plusSeconds(RESEND_COOLDOWN_SECONDS).isAfter(now)){
            throw new IllegalStateException(
                    "Please wait before requesting another OTP"
            );
        }
        if (otpEntry.getRequestWindowStartedAt() == null || otpEntry.getRequestWindowStartedAt().plusHours(1).isBefore(now)){
            otpEntry.setRequestWindowStartedAt(now);
            otpEntry.setRequestsInWindow(0);

        }
        if (otpEntry.getRequestsInWindow() >= MAX_OTP_REQUESTS_PER_HOUR){
            throw  new IllegalStateException(
                    "Maximum OTP Requests reached. Try again later."
            );
        }
        String otp = String.valueOf(100000 + SECURE_RANDOM.nextInt(900000));
        otpEntry.setCollegeEmail(collegeEmail);

        otpEntry.setOtpHash(passwordEncoder.encode(otp));
        otpEntry.setFailedAttempts(0);
        otpEntry.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_VALID_MINUTES));
        otpEntry.setLastSentAt(now);
        otpEntry.setRequestsInWindow(otpEntry.getRequestsInWindow()+1);
        otpVerificationRepository.save(otpEntry);

        otpMailService.sendOtp(collegeEmail,otp);

    }
    @Override
    @Transactional
    public boolean verifyOtp(String collegeEmail, String otp){
        OtpVerification otpEntry = otpVerificationRepository.findByCollegeEmail(collegeEmail).orElseThrow(
                ()-> new OtpNotFoundException("No Otp request found for this email")
        );

        if(otpEntry.getExpiresAt().isBefore(LocalDateTime.now())){
            otpVerificationRepository.delete(otpEntry);
            return false;
        }
        if (otpEntry.getFailedAttempts()>= MAX_FAILED_ATTEMPTS){
            otpVerificationRepository.delete(otpEntry);
            return false;
        }
        if (!passwordEncoder.matches(otp,otpEntry.getOtpHash())){
            otpEntry.setFailedAttempts(otpEntry.getFailedAttempts()+1);
            otpVerificationRepository.save(otpEntry);
            return false;
        }
        User user=userRepository.findByCollegeEmail(collegeEmail).
                orElseThrow(()->new UserNotFoundException("User not found"));
        user.setVerified(true);

        userRepository.save(user);
        otpVerificationRepository.delete(otpEntry);
        return true;

    }
    @Transactional
    @Scheduled(fixedRate = 600000)
    public void cleanupExpiredOtps(){
        System.out.println("Scheduler Running...");

        otpVerificationRepository.deleteByExpiresAtBefore(LocalDateTime.now());
        System.out.println("Deleted");
    }
}
