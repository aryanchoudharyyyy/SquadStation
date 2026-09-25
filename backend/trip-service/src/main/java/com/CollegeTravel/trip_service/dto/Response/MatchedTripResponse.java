package com.CollegeTravel.trip_service.dto.Response;

import com.CollegeTravel.trip_service.entity.Trip;

public record MatchedTripResponse(Trip trip, Long existingGroupId, boolean groupCheckAvailable) {
}
