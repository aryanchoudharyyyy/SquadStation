package com.SquadStation.chat_service.repository;

import com.SquadStation.chat_service.enitiy.ListingConversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListingConversationRepository extends JpaRepository<ListingConversation, Long> {
    Optional<ListingConversation> findByListingIdAndBuyerId(Long listingId, Long buyerId);
}
