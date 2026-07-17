package com.SquadStation.Group_service.service;

import com.SquadStation.Group_service.entity.Group;

import java.time.LocalDate;
import java.util.Optional;

public interface GroupService {
    Group createGroup(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate);
    void JoinGroup(Long groupId, Long userId);
    Optional<Group> findExistingGroupForUser(Long userId, String sourcePoint,String boardingStation,LocalDate travelDate);
    Optional<Group> findGroupForTripContext(String sourcePoint,String boardStation,LocalDate travelDate);
}
