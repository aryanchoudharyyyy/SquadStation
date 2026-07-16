package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class OtpExpiredException extends BaseApiException{
    public OtpExpiredException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
