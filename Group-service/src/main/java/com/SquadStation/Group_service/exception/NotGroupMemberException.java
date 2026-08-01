package com.SquadStation.Group_service.exception;

import org.springframework.http.HttpStatus;

public class NotGroupMemberException extends BaseApiException {
    public NotGroupMemberException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
