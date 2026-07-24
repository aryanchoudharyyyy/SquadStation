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
    @Retry(name="Group-service")
    @CircuitBreaker(name = "Group-service", fallbackMethod = "fallback")
    public GroupLookupResult findExistingGroup(String sourcePoint, String boardingStation, LocalDate travelDate){
        Group group = groupServiceClient.findExistingGroup(sourcePoint,boardingStation,travelDate);
        Long groupId = group != null ? group.getId():null;
        return new GroupLookupResult(groupId,true);
    }
    private GroupLookupResult fallback(String sourcePoint, String boardingStation, LocalDate travelDate,  Throwable t){
        return new GroupLookupResult(null, false);
    }

}
