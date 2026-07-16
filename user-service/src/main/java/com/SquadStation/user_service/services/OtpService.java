package com.SquadStation.user_service.services;

import com.SquadStation.user_service.dto.Request.SignupRequest;
import com.SquadStation.user_service.repository.UserRepository;

public interface OtpService {
    void signup(SignupRequest request);
    void login(String collegeEmail);
    boolean verifyOtp(String collegeEmail,String otp);


}
