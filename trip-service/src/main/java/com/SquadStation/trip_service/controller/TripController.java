package com.SquadStation.trip_service.controller;

import com.SquadStation.trip_service.entity.Trip;
import com.SquadStation.trip_service.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    @PostMapping
    public Trip postTrip(@RequestBody Trip trip, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        trip.setUserId(userId);
        return  tripService.postTrip(trip);
    }
    @GetMapping("/{tripId}/matches")
    public List<Trip> getMatches(@PathVariable Long tripId){
        return tripService.findMatches(tripId);
    }

}
