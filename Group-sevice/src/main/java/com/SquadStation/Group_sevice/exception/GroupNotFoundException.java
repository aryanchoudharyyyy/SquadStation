package com.SquadStation.Group_sevice.exception;

import org.springframework.http.HttpStatus;

public class GroupNotFoundException extends BaseApiException{
    public GroupNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);

    }
}
