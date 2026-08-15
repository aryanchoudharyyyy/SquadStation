package com.SquadStation.Group_service.service;

import com.SquadStation.Group_service.dto.Response.GroupMembersResponse;
import com.SquadStation.Group_service.entity.Group;

import java.time.LocalDate;
import java.util.Optional;

public interface GroupService {
    Group createGroup(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate);
    void JoinGroup(Long groupId, Long userId);

    Optional<Group> findGroupForTripContext(String sourcePoint,String boardStation,LocalDate travelDate);
    boolean isMember(Long groupId, Long userId);
    GroupMembersResponse getGroupMembers(Long groupId, Long requestingUserId);
    void leaveGroup(Long groupId, Long userId);
}
