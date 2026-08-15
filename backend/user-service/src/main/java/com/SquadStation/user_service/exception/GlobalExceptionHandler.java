package com.SquadStation.user_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.SquadStation.user_service.dto.Response.ErrorResponse;
import java.time.LocalDateTime;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(BaseApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(BaseApiException ex, HttpServletRequest request){
        ErrorResponse error =ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(ex.getStatus().value())
                .error(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(ex.getStatus()).body(error);
    }
    @ExceptionHandler(Exception.class)

    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, HttpServletRequest request){
        log.error("Unexpected error",ex);
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error("InternalServerError")
                .message("Something went wrong")
                .path(request.getRequestURI())
                .build();
        return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
