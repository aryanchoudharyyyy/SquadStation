package com.SquadStation.trip_service.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class GroupLookupClient {
    private final GroupServiceClient groupServiceClient;
//    public GroupLookupClient(GroupServiceClient groupServiceClient){
//        this.groupServiceClient=groupServiceClient;
//    }
    @Retry(name="group-service")
    @CircuitBreaker(name = "group-service", fallbackMethod = "fallback")
    public Group findExistingGroup(String sourcePoint, String boardingStation, LocalDate travelDate){
        return groupServiceClient.findExistingGroup(sourcePoint, boardingStation, travelDate);
    }
    private Group fallback(String sourcePoint, String boardingStation, LocalDate travelDate,  Throwable t){
        return null;
    }

}
