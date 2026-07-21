package com.SquadStation.trip_service.exception;

import org.springframework.http.HttpStatus;

public class TripAccessDeniedException extends BaseApiException{
    public TripAccessDeniedException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
