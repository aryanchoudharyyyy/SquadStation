package com.SquadStation.marketplace_service.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    private LocalDateTime timestamp;
    private String error;
    private String path;
    private String message;
    private int status;
}
