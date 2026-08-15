package com.SquadStation.trip_service.client;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Group {
    private Long id;
    private String sourcePoint;
    private String boardingStation;
    private LocalDate travelDate;
    private Long createdBy;
    private LocalDateTime createdAt;
}
