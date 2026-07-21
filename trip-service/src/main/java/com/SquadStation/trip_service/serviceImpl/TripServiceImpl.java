package com.SquadStation.trip_service.serviceImpl;

import com.SquadStation.trip_service.client.Group;
import com.SquadStation.trip_service.client.GroupLookupClient;
import com.SquadStation.trip_service.client.GroupServiceClient;
import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.entity.Trip;
import com.SquadStation.trip_service.event.TripCreatedEvent;
import com.SquadStation.trip_service.event.TripEventPublisher;
import com.SquadStation.trip_service.exception.TripNotFoundException;
import com.SquadStation.trip_service.repository.TripRepository;
import com.SquadStation.trip_service.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final TripEventPublisher tripEventPublisher;
    private final ApplicationEventPublisher eventPublisher;
    private static final long WINDOW_HOURS =1;
    private final GroupLookupClient groupLookupClient;

    @Override
    public Trip postTrip(Trip trip){
        Trip saved = tripRepository.save(trip);
        tripEventPublisher.publishTripCreated(new TripCreatedEvent(
                saved.getId(), saved.getUserId(), saved.getSourcePoint(), saved.getBoardingStation(), saved.getTravelDateTime().toLocalDate()
        ));   // This method saves the trip to the database, publishes a "Trip Created" event to RabbitMQ, and returns the saved trip.
                return saved;
    }
    @Override
    public List<MatchedTripResponse> findMatches(Long tripId,Long requestingUserId){
        Trip trip = tripRepository.findById(tripId).orElseThrow(()->new TripNotFoundException("Trip Not found" + tripId));
       LocalDateTime windowStart = trip.getTravelDateTime().minusHours(WINDOW_HOURS);
       LocalDateTime windowEnd = trip.getTravelDateTime().plusHours(WINDOW_HOURS);
       List<Trip> matched = tripRepository.findCandidates(
               trip.getId(), trip.getUserId(), trip.getSourcePoint(), trip.getBoardingStation(), windowStart, windowEnd
       );
       // groupLookupresult remaining
       return matched.stream()
               .map(m-> new MatchedTripResponse(m,lookupResult.groupId(), lookupResult.available()))
               .toList();
    }

}
