package com.SquadStation.marketplace_service.exception;

import org.springframework.http.HttpStatus;

public class CannotExpressInterestInOwnListingException extends BaseApiException{
    public CannotExpressInterestInOwnListingException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
