package com.SquadStation.Group_sevice.exception;

import org.springframework.http.HttpStatus;

public class AlreadyGroupMemberException extends BaseApiException{
    public AlreadyGroupMemberException(String message){
        super(message, HttpStatus.CONFLICT);
    }
}
