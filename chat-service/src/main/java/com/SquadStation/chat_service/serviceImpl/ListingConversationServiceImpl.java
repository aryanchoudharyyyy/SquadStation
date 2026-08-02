package com.SquadStation.chat_service.serviceImpl;

import com.SquadStation.chat_service.client.MarketplaceLookupClient;
import com.SquadStation.chat_service.enitiy.ListingConversation;
import com.SquadStation.chat_service.enitiy.ListingMessage;
import com.SquadStation.chat_service.exception.CannotMessageOwnListingException;
import com.SquadStation.chat_service.exception.ConversationNotFoundException;
import com.SquadStation.chat_service.exception.NotConversationParticipantException;
import com.SquadStation.chat_service.repository.ListingConversationRepository;
import com.SquadStation.chat_service.repository.ListingMessageRepository;
import com.SquadStation.chat_service.service.ListingConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingConversationServiceImpl implements ListingConversationService {
    private final ListingConversationRepository conversationRepository;
    private final ListingMessageRepository messageRepository;
    private final MarketplaceLookupClient marketplaceLookupClient;
    @Override
    public ListingConversation getOrCreateConversation(Long listingId, Long requestingUserId) {
        Long ownerId = marketplaceLookupClient.getListingOwner(listingId);
        if (ownerId.equals(requestingUserId)){
            throw  new CannotMessageOwnListingException("You cannot start a conversation about your own listing");
        }
        return conversationRepository.findByListingIdAndBuyerId(listingId, requestingUserId)
                .orElseGet(()->{
                    ListingConversation c = new ListingConversation();
                    c.setListingId(listingId);
                    c.setBuyerId(requestingUserId);
                    return conversationRepository.save(c);
                });
    }

    @Override
    public void verifyAccess(Long conversationId, Long userId) {
    ListingConversation conversation =conversationRepository.findById(conversationId)
            .orElseThrow(()->new ConversationNotFoundException("Conversation not found: "+conversationId));
    if (conversation.getBuyerId().equals(userId)) return;
    Long ownerId = marketplaceLookupClient.getListingOwner(conversation.getListingId());
    if (ownerId.equals(userId)) return;
    throw new NotConversationParticipantException("You are not part of this conversation");
    }

    @Override
    public List<ListingMessage> getMessages(Long conversationId, Long userId) {
        verifyAccess(conversationId,userId);
        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
    }
}




