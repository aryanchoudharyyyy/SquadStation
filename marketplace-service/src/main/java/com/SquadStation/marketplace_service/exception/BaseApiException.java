package com.SquadStation.marketplace_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseApiException extends RuntimeException {
  private final HttpStatus httpStatus;
    public BaseApiException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus=httpStatus;
    }
}
