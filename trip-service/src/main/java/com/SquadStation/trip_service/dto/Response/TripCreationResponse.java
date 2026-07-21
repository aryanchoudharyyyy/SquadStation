package com.SquadStation.trip_service.dto.Response;

import com.SquadStation.trip_service.entity.Trip;

import java.util.List;

public record TripCreationResponse(Trip myTrip, List<MatchedTripResponse> immediateMatches) {
}
