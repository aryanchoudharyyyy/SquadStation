package com.SquadStation.Group_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@FeignClient(name = "trip-service")
public interface TripServiceClient {
    @GetMapping("/api/internal/trips/user-has-matching-trip")
    boolean userHasMatchingTrip(@RequestParam("userId") Long userId,
                                @RequestParam("sourcePoint") String sourcePoint,
                                @RequestParam("boardingStation") String boardingStation,
                                @RequestParam("travelDate") LocalDate travelDate);
}
