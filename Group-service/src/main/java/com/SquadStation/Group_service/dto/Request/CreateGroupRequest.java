package com.SquadStation.Group_service.dto.Request;

import java.time.LocalDate;

public record CreateGroupRequest(String sourcePoint, String boardingStation, LocalDate travelDate) {
}
