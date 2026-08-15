package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenExpiredException extends BaseApiException{
    public RefreshTokenExpiredException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
