package com.CollegeTravel.user_service.services;

public interface OtpMailService {
    void sendOtp(String recipientEmail,String otp);
}
