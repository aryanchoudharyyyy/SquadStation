package com.SquadStation.trip_service.client;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class GroupServiceClientFallback implements GroupServiceClient{


    @Override
    public Group findExistingGroup(String sourcePoint, String boardingStation, LocalDate travelDate) {
        return null;
    }
}
