package com.SquadStation.Group_service.exception;

import org.springframework.http.HttpStatus;

public class UserServiceUnavailableException extends BaseApiException{
    public UserServiceUnavailableException(String message) {
        super(message, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
