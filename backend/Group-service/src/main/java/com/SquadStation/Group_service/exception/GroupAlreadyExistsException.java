package com.SquadStation.Group_service.exception;
import org.springframework.http.HttpStatus;

public class GroupAlreadyExistsException extends BaseApiException {
  public GroupAlreadyExistsException(String message) { super(message, HttpStatus.CONFLICT); }
}