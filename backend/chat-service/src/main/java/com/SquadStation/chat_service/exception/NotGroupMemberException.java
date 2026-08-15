package com.SquadStation.chat_service.exception;

import org.springframework.http.HttpStatus;

public class NotGroupMemberException extends BaseApiException{
    public NotGroupMemberException(String message) {

        super(message, HttpStatus.FORBIDDEN);
    }
}
