package com.SquadStation.user_service.exception;

import org.springframework.http.HttpStatus;

public class InvalidCollegeEmailException extends BaseApiException{
    public InvalidCollegeEmailException(String message){
        super(message, HttpStatus.BAD_REQUEST);
    }
}
