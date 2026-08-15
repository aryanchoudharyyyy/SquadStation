package com.SquadStation.chat_service.service;

import com.SquadStation.chat_service.enitiy.ListingConversation;
import com.SquadStation.chat_service.enitiy.ListingMessage;

import java.util.List;

public interface ListingConversationService {
    ListingConversation getOrCreateConversation(Long listingId, Long requestingUserId);
    void verifyAccess(Long conversationId, Long userId);
    List<ListingMessage> getMessages(Long conversationId,Long userId);


}
