package com.SquadStation.marketplace_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/api/internal/users/batch")
    List<UserSummaryDTO> getUserByIds(@RequestParam("ids") List<Long> ids);

}
