package com.SquadStation.user_service.controller;

import com.SquadStation.user_service.dto.Response.UserSummaryDTO;
import com.SquadStation.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internal/users")
@RequiredArgsConstructor
public class InternalUserController {
    private final UserService userService;
    @GetMapping("/{userId}/email")
    public String getEmailByUserId(@PathVariable Long userId){
        return userService.getById(userId).getCollegeEmail();
    }

    @GetMapping("/batch")
    public List<UserSummaryDTO> getUsersByIds(@RequestParam List<Long> ids){
        return userService.getUsersByIds(ids);
    }

}
