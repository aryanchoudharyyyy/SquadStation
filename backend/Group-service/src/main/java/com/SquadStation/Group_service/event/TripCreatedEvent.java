package com.SquadStation.Group_service.event;

import java.time.LocalDate;

public record TripCreatedEvent(Long tripId, Long userId, String sourcePoint, String boardingStation, LocalDate travelDate) {
}
