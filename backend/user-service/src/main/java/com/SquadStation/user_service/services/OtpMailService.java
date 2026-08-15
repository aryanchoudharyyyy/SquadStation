package com.SquadStation.user_service.services;

public interface OtpMailService {
    void sendOtp(String recipientEmail,String otp);
}
