package com.SquadStation.trip_service.serviceImpl;

import com.SquadStation.trip_service.client.Group;
import com.SquadStation.trip_service.client.GroupLookupClient;
import com.SquadStation.trip_service.client.GroupLookupResult;
import com.SquadStation.trip_service.client.GroupServiceClient;
import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import com.SquadStation.trip_service.dto.Response.TripCreationResponse;
import com.SquadStation.trip_service.entity.OutboxEvent;
import com.SquadStation.trip_service.entity.Trip;
import com.SquadStation.trip_service.event.TripCreatedEvent;
import com.SquadStation.trip_service.event.TripEventPublisher;
import com.SquadStation.trip_service.event.TripMatchedEvent;
import com.SquadStation.trip_service.exception.TripAccessDeniedException;
import com.SquadStation.trip_service.exception.TripNotFoundException;
import com.SquadStation.trip_service.repository.OutboxEventRepository;
import com.SquadStation.trip_service.repository.TripRepository;
import com.SquadStation.trip_service.service.TripService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.*;
import java.time.LocalDate;
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
    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public TripCreationResponse postTrip(Trip trip){
        Trip saved = tripRepository.save(trip);
        List<MatchedTripResponse> immediateMatches = computeMatches(saved);
        if(!immediateMatches.isEmpty()){
            eventPublisher.publishEvent(new TripMatchedEvent(saved, immediateMatches));
        }
        try {
            TripCreatedEvent tripCreatedEvent = new TripCreatedEvent(
                    saved.getId(), saved.getUserId(), saved.getSourcePoint(), saved.getBoardingStation(),
                    saved.getTravelDateTime().toLocalDate()
            );
            OutboxEvent outboxEvent = OutboxEvent.builder()
                    .eventType("TripCreatedEvent")
                    .payload(objectMapper.writeValueAsString(tripCreatedEvent))
                    .createdAt(LocalDateTime.now()).build();
            outboxEventRepository.save(outboxEvent);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save event to outbox",e);
        }
        return new TripCreationResponse(saved, immediateMatches);
    }
    @Override
    public List<MatchedTripResponse> findMatches(Long tripId,Long requestingUserId){


        Trip trip = tripRepository.findById(tripId).orElseThrow(()->new TripNotFoundException("Trip Not found" + tripId));

        if(!trip.getUserId().equals(requestingUserId)){
            throw  new TripAccessDeniedException("You can only view matches for your own trips");

        }
        return computeMatches(trip);


    }
    @Override
    public boolean userHasMatchingTrip(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate){
        LocalDateTime dayStart =travelDate.atStartOfDay();
        LocalDateTime dayEnd = travelDate.atTime(23,59,59);
        return tripRepository.existsMatchingTrip(userId, sourcePoint, boardingStation,dayStart, dayEnd);
    }
    private List<MatchedTripResponse> computeMatches(Trip trip){
        LocalDateTime windowStart = trip.getTravelDateTime().minusHours(WINDOW_HOURS);
        LocalDateTime windowEnd = trip.getTravelDateTime().plusHours(WINDOW_HOURS);

        List<Trip> matched = tripRepository.findCandidates(
                trip.getId(), trip.getUserId(), trip.getSourcePoint(), trip.getBoardingStation(), windowStart, windowEnd
        );
        GroupLookupResult lookupResult = groupLookupClient.findExistingGroup(
                trip.getSourcePoint(), trip.getBoardingStation(), trip.getTravelDateTime().toLocalDate()
        );
        return matched.stream()
                .map(m-> new MatchedTripResponse(m,lookupResult.groupId(), lookupResult.available()))
                .toList();
    }
}
