package com.SquadStation.Group_service.serviceImpl;

import com.SquadStation.Group_service.client.TripLookupClient;
import com.SquadStation.Group_service.entity.Group;
import com.SquadStation.Group_service.entity.GroupMember;
import com.SquadStation.Group_service.exception.AlreadyGroupMemberException;
import com.SquadStation.Group_service.exception.GroupAlreadyExistsException;
import com.SquadStation.Group_service.exception.GroupNotFoundException;
import com.SquadStation.Group_service.exception.TripMismatchException;
import com.SquadStation.Group_service.repository.GroupMemberRepository;
import com.SquadStation.Group_service.repository.GroupRepository;
import com.SquadStation.Group_service.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final TripLookupClient tripLookupClient;
    @Override
    public Group createGroup(Long userId, String sourcePoint, String boardingStation, LocalDate travelDate){
        if (groupRepository.findBySourcePointAndBoardingStationAndTravelDate(sourcePoint, boardingStation, travelDate).isPresent()) {
            throw new GroupAlreadyExistsException("A group for this trip already exists — join it instead of creating a new one");
        }
        Group group = new Group();
        group.setSourcePoint(sourcePoint);
        group.setBoardingStation(boardingStation);
        group.setTravelDate(travelDate);
        group.setCreatedBy(userId);
        Group saved = groupRepository.save(group);
        addMember(saved, userId);
        return saved;

    }

    @Override
    public void JoinGroup(Long groupId, Long userId){
        Group group = groupRepository.findById(groupId)
                .orElseThrow(()-> new GroupNotFoundException("Group not found"));
        if (groupMemberRepository.existsByGroup_IdAndUserId(groupId,userId)){
            throw  new AlreadyGroupMemberException("You are already a member of this group");

        }
        boolean hasMatchingTrip = tripLookupClient.userHasMatchTrip(
                userId, group.getSourcePoint(), group.getBoardingStation(), group.getTravelDate()
        );
        if(!hasMatchingTrip){
            throw new TripMismatchException("You don't have a trip matching this group's route and date");
        }
        addMember(group,userId);
    }
    protected void addMember(Group group,Long userId){
        GroupMember member = new GroupMember();
        member.setGroup(group);
        member.setUserId(userId);
        groupMemberRepository.save(member);
    }


    @Override
    public Optional<Group> findGroupForTripContext(String sourcePoint, String boardingStation, LocalDate travelDate) {
        return groupRepository.findBySourcePointAndBoardingStationAndTravelDate(sourcePoint, boardingStation, travelDate);
    }
    @Override
    public  boolean isMember(Long groupId, Long userId){
        return  groupMemberRepository.existsByGroup_IdAndUserId(groupId,userId);
    }

}




