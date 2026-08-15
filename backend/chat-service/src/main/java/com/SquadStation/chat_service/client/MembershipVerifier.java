package com.SquadStation.chat_service.client;

import com.SquadStation.chat_service.exception.GroupVerificationUnavailableException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MembershipVerifier {
    private  final GroupServiceClient groupServiceClient;
    @Retry(name = "Group-service")
    @CircuitBreaker(name = "Group-service", fallbackMethod = "fallback")
    public  boolean isMember(Long groupId, Long userId,String token){
        return groupServiceClient.isMember(groupId,userId,token);
    }

    private boolean fallback(Long groupId, Long userId,String token, Throwable t){
        throw  new GroupVerificationUnavailableException("Could not verify group membership right now");
    }
}
