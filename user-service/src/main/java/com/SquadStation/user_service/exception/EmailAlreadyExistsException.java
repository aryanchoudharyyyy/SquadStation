package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends BaseApiException{
    public EmailAlreadyExistsException(String message){
        super(message, HttpStatus.CONFLICT);
    }
}
