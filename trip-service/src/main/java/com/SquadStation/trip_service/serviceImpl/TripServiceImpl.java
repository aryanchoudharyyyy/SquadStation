package com.SquadStation.trip_service.serviceImpl;

import com.SquadStation.trip_service.client.Group;
import com.SquadStation.trip_service.client.GroupServiceClient;
import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.entity.Trip;
import com.SquadStation.trip_service.exception.TripNotFoundException;
import com.SquadStation.trip_service.repository.TripRepository;
import com.SquadStation.trip_service.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private static final long WINDOW_HOURS =1;
    private final GroupServiceClient groupServiceClient;

    @Override
    public Trip postTrip(Trip trip){
        return tripRepository.save(trip);
    }
    @Override
    public List<MatchedTripResponse> findMatches(Long tripId){
        Trip trip = tripRepository.findById(tripId).orElseThrow(()->new TripNotFoundException("Trip Not found" + tripId));
        LocalDateTime tripDateTime = LocalDateTime.of(trip.getTravelDate(), trip.getTravelTime());
        LocalDateTime windowStart = tripDateTime.minusHours(WINDOW_HOURS);
        LocalDateTime windowEnd = tripDateTime.plusHours(WINDOW_HOURS);
        List<Trip> candidates = tripRepository.findCandidates(
                trip.getId(),trip.getUserId(),trip.getSourcePoint(), trip.getBoardingStation(),
                trip.getTravelDate().minusDays(1),trip.getTravelDate().plusDays(1)
        );
        List<Trip> matched= candidates.stream()
                .filter(c->{
                    LocalDateTime cdt = LocalDateTime.of(c.getTravelDate(), c.getTravelTime());
                    return !cdt.isBefore(windowStart) && !cdt.isAfter(windowEnd);
                })
                .toList();
        Group existingGroup = groupServiceClient.findExistingGroup(trip.getSourcePoint(),trip.getBoardingStation(),trip.getTravelDate());
        Long existingGroupId =existingGroup!=null ? existingGroup.getId() : null;
        return  matched.stream()
                .map(m-> new MatchedTripResponse(m, existingGroupId))
                .toList();
    }

}
