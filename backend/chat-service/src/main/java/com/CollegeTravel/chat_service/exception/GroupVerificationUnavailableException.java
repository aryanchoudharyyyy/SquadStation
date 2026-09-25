package com.CollegeTravel.chat_service.exception;

import org.springframework.http.HttpStatus;

public class GroupVerificationUnavailableException extends BaseApiException{
  public GroupVerificationUnavailableException(String message) {

    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
