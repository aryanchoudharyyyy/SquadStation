package com.SquadStation.trip_service.event;

import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.entity.Trip;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
@Getter
public class TripMatchedEvent {
    private final Trip newTrip;
    private final List<MatchedTripResponse> matchedExistingTrips;

}
