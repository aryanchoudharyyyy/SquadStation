package com.CollegeTravel.user_service.services;

import com.CollegeTravel.user_service.dto.Request.SignupRequest;
import com.CollegeTravel.user_service.repository.UserRepository;

public interface OtpService {
    void signup(SignupRequest request);
    void login(String collegeEmail);
    boolean verifyOtp(String collegeEmail,String otp);


}
