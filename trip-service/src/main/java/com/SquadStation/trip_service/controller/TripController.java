package com.SquadStation.trip_service.controller;

import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.dto.Response.TripCreationResponse;
import com.SquadStation.trip_service.entity.Trip;
import com.SquadStation.trip_service.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController()
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    @PostMapping
    public TripCreationResponse postTrip(@RequestBody Trip trip, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        trip.setUserId(userId);
        return  tripService.postTrip(trip);
    }
    @GetMapping("/{tripId}/matches")
    public List<MatchedTripResponse> getMatches(@PathVariable Long tripId, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        return tripService.findMatches(tripId, userId);
    }
    @GetMapping("/user-has-matching-trip")
    public boolean userHasMatchingTrip(@RequestParam Long userId, @RequestParam String sourcePoint,
                                       @RequestParam String boardingStation, @RequestParam LocalDate travelDate){
        return  tripService.userHasMatchingTrip(userId,sourcePoint,boardingStation,travelDate);

    }

}
