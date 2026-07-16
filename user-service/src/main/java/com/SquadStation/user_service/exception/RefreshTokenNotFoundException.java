package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenNotFoundException extends BaseApiException{
    public RefreshTokenNotFoundException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
