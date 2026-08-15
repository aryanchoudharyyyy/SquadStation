package com.SquadStation.marketplace_service.exception;

import org.springframework.http.HttpStatus;

public class NotListingOwnerException extends BaseApiException{
    public NotListingOwnerException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
