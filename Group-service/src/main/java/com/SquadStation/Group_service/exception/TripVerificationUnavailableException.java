package com.SquadStation.Group_service.exception;

import org.springframework.http.HttpStatus;

public class TripVerificationUnavailableException extends BaseApiException{
    public TripVerificationUnavailableException(String message) {
        super(message, HttpStatus.SERVICE_UNAVAILABLE
        );
    }
}
