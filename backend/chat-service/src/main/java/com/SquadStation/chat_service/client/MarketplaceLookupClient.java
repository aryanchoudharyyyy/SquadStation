package com.SquadStation.chat_service.client;

import com.SquadStation.chat_service.exception.MarketplaceVerificationUnavailableException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MarketplaceLookupClient {
    private final MarketplaceServiceClient marketplaceServiceClient;

    @Retry(name = "marketplace-service")
    @CircuitBreaker(name = "marketplace-service", fallbackMethod = "fallback")
    public Long getListingOwner(Long listingId) {
        return marketplaceServiceClient.getListingOwner(listingId);
    }

    private Long fallback(Long listingId, Throwable t) {
        throw new MarketplaceVerificationUnavailableException("Could not verify listing ownership right now");
    }
}