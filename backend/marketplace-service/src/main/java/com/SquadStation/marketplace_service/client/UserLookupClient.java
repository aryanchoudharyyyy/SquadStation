package com.SquadStation.marketplace_service.client;

import com.SquadStation.marketplace_service.exception.UserServiceUnavailableException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserLookupClient {
    private final UserServiceClient userServiceClient;

    @Retry(name = "user-service")
    @CircuitBreaker(name = "user-service", fallbackMethod = "fallback")
    public List<UserSummaryDTO> getUserByIds(List<Long> ids){
        return userServiceClient.getUserByIds(ids);
    }

    private List<UserSummaryDTO> fallback(List<Long> ids, Throwable t){
        throw new UserServiceUnavailableException("Could not fetch user details right now");
    }
}
