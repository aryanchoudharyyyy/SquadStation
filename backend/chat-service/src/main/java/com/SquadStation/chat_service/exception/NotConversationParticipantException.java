package com.SquadStation.chat_service.exception;

import org.springframework.http.HttpStatus;

public class NotConversationParticipantException extends BaseApiException{
    public NotConversationParticipantException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
