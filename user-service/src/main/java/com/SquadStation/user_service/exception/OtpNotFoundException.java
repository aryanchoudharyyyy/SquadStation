package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class OtpNotFoundException extends BaseApiException{
    public OtpNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
