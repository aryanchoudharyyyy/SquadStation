package com.SquadStation.marketplace_service.exception;

import org.springframework.http.HttpStatus;

public class ListingNotFoundException extends BaseApiException{
    public ListingNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
