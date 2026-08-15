package com.SquadStation.Group_service.controller;

import com.SquadStation.Group_service.entity.Group;
import com.SquadStation.Group_service.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/internal/groups")
@RequiredArgsConstructor
public class InternalGroupController {
    private final GroupService groupService;
    @GetMapping("/existing")
    public ResponseEntity<Group> findExisting(@RequestParam String sourcePoint, @RequestParam String boardingStation, @RequestParam LocalDate travelDate) {

        return groupService.findGroupForTripContext(sourcePoint,boardingStation,travelDate)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());

    }
    @GetMapping("/{groupId}/is-member")
    public  boolean isMember(@PathVariable Long groupId, @RequestParam Long userId){
        return groupService.isMember(groupId, userId);

    }
}
