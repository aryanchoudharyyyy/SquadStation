package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class InvalidOtpException extends BaseApiException{
    public InvalidOtpException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
