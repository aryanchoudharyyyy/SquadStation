package com.SquadStation.chat_service.exception;

import org.springframework.http.HttpStatus;

public class ConversationNotFoundException extends BaseApiException{
    public ConversationNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
