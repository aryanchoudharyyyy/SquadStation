package com.CollegeTravel.Group_service.exception;

import org.springframework.http.HttpStatus;

public class TripMismatchException extends BaseApiException{
    public TripMismatchException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
