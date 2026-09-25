package com.CollegeTravel.trip_service.event;

import com.CollegeTravel.trip_service.dto.Response.MatchedTripResponse;
import com.CollegeTravel.trip_service.entity.Trip;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
@Getter
public class TripMatchedEvent {
    private final Trip newTrip;
    private final List<MatchedTripResponse> matchedExistingTrips;

}
