package com.SquadStation.trip_service.service;

import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.dto.Response.TripCreationResponse;
import com.SquadStation.trip_service.entity.Trip;

import java.time.LocalDate;
import java.util.List;

public interface TripService {
    TripCreationResponse postTrip(Trip trip);
    List<MatchedTripResponse> findMatches(Long tripId, Long requestingUserId);
    boolean userHasMatchingTrip(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate);
}
