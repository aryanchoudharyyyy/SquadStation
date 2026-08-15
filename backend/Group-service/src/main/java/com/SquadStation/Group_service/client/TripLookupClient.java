package com.SquadStation.Group_service.client;

import com.SquadStation.Group_service.exception.TripVerificationUnavailableException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class TripLookupClient {
    private final TripServiceClient tripServiceClient;
    @Retry(name = "trip-service")
    @CircuitBreaker(name = "trip-service", fallbackMethod = "fallback")
    public boolean userHasMatchTrip(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate){
        return tripServiceClient.userHasMatchingTrip(userId, sourcePoint, boardingStation, travelDate);
    }
    private boolean fallback(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate){
        throw  new TripVerificationUnavailableException("Could not verify your trip right now - please try again shortly");
    }
}
