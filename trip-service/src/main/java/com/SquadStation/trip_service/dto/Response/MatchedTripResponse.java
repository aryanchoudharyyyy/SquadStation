package com.SquadStation.trip_service.dto.Response;

import com.SquadStation.trip_service.entity.Trip;

public record MatchedTripResponse(Trip trip, Long existingGroupId) {
}
