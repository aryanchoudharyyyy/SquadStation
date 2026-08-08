package com.SquadStation.chat_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "group-service")
public interface GroupServiceClient {
    @GetMapping("/api/internal/groups/{groupId}/is-member")
    boolean isMember(@PathVariable("groupId") Long groupId, @RequestParam("userId") Long userId, @RequestHeader("Authorization") String token);
}
