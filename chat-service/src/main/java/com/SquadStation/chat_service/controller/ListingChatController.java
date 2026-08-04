package com.SquadStation.chat_service.controller;

import com.SquadStation.chat_service.dto.Request.ListingMessageRequest;
import com.SquadStation.chat_service.dto.Response.ListingMessageResponse;
import com.SquadStation.chat_service.enitiy.ListingMessage;
import com.SquadStation.chat_service.exception.BaseApiException;
import com.SquadStation.chat_service.repository.ListingMessageRepository;
import com.SquadStation.chat_service.service.ListingConversationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ListingChatController {
    private final ListingMessageRepository messageRepository;
    private final ListingConversationService conversationService;
    private final SimpMessagingTemplate messagingTemplate;
    private static final Logger log = LoggerFactory.getLogger(ListingChatController.class);

    @MessageMapping("/listing.sendMessage")
    public  void sendMessage(@Payload ListingMessageRequest request, SimpMessageHeaderAccessor headerAccessor) {
        Long senderId = (Long) headerAccessor.getSessionAttributes().get("userId");
        conversationService.verifyAccess(request.conversationId(), senderId);

        ListingMessage message = new ListingMessage();
        message.setConversationId(request.conversationId());
        message.setSenderId(senderId);
        message.setContent(request.content());
        ListingMessage saved = messageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/listing-conversation." + request.conversationId(),
                new ListingMessageResponse(saved.getId(), saved.getConversationId(), saved.getSenderId(), saved.getContent(), saved.getSentAt()
                ));

    }
        @MessageExceptionHandler
        @SendToUser("/queue/errors")
        public String handleException(BaseApiException ex){
        log.warn("Listing chat error: {}", ex.getMessage());
        return ex.getMessage();
    }
    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public  String handleUnexpectedException(Exception ex){
        log.error("unexpected listing chat error", ex);
        return "Something went wrong. Please try again";
    }
}
