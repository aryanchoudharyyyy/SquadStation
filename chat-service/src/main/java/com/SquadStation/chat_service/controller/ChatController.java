package com.SquadStation.chat_service.controller;

import com.SquadStation.chat_service.client.MembershipVerifier;
import com.SquadStation.chat_service.dto.Request.ChatMessageRequest;
import com.SquadStation.chat_service.dto.Response.ChatMessageResponse;
import com.SquadStation.chat_service.enitiy.ChatMessage;
import com.SquadStation.chat_service.exception.BaseApiException;
import com.SquadStation.chat_service.exception.NotGroupMemberException;
import com.SquadStation.chat_service.repository.ChatMessageRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.prefs.BackingStoreException;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private  final ChatMessageRepository chatMessageRepository;
    private  final SimpMessagingTemplate messagingTemplate;
    private final MembershipVerifier membershipVerifier;

    @MessageMapping("/chat.sendMessage")
    public  void sendMessage(@Payload ChatMessageRequest request, SimpMessageHeaderAccessor headerAccessor){


        Long senderId =(Long) headerAccessor.getSessionAttributes().get("userId");
        if (!membershipVerifier.isMember(request.groupId(),senderId)){
            throw new NotGroupMemberException("You are not a member of this group");
        }
        ChatMessage message = new ChatMessage();
        message.setGroupId(request.groupId());
        message.setSenderId(senderId);
        message.setContent(request.content());
        ChatMessage saved = chatMessageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/group." + request.groupId(),
                new ChatMessageResponse(saved.getId(), saved.getGroupId(), saved.getSenderId(), saved.getContent(), saved.getSendAt()));
    }
    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public  String handleException(BaseApiException ex){
        return ex.getMessage();
    }


}
