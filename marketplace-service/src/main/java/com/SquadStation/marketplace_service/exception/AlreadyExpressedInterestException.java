package com.SquadStation.marketplace_service.exception;

import org.springframework.http.HttpStatus;

public class AlreadyExpressedInterestException extends BaseApiException{
    public AlreadyExpressedInterestException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
