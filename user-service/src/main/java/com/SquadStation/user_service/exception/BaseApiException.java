package com.SquadStation.user_service.exception;

import lombok.Getter;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;

@Getter
public abstract class BaseApiException extends RuntimeException{
    private final HttpStatus status;
    protected BaseApiException(String message, HttpStatus status){
        super(message);
        this.status=status;
    }
}
