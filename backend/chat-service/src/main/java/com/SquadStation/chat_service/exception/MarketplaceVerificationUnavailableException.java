package com.SquadStation.chat_service.exception;

import org.springframework.http.HttpStatus;

public class MarketplaceVerificationUnavailableException extends BaseApiException {
    public MarketplaceVerificationUnavailableException(String message) {
        super(message, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
