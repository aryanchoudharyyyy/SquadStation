package com.SquadStation.trip_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@FeignClient(name = "group-service")
public interface GroupServiceClient {
    @GetMapping("/api/groups/existing")
    Group findExistingGroup(
            @RequestParam("sourcePoint") String sourcePoint,
            @RequestParam("boardingStation") String boardingStation,
            @RequestParam("travelDate") LocalDate travelDate
            );
}
