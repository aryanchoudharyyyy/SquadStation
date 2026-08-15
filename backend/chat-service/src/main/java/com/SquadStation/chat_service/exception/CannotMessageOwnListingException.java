package com.SquadStation.chat_service.exception;

import org.springframework.http.HttpStatus;

public class CannotMessageOwnListingException extends BaseApiException{
    public CannotMessageOwnListingException(String message){
        super(message, HttpStatus.BAD_REQUEST);
    }
}
