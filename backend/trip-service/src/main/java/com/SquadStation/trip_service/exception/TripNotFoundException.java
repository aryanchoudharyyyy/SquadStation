package com.SquadStation.trip_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


public class TripNotFoundException extends BaseApiException {
    public TripNotFoundException(String message) {

      super(message, HttpStatus.NOT_FOUND);
    }
}
