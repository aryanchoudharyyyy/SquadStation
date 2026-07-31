package com.SquadStation.chat_service.controller;
import com.SquadStation.chat_service.client.MembershipVerifier;
import com.SquadStation.chat_service.enitiy.ChatMessage;
import com.SquadStation.chat_service.exception.NotGroupMemberException;
import com.SquadStation.chat_service.repository.ChatMessageRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatHistoryController {
    private final MembershipVerifier membershipVerifier;
    private final ChatMessageRepository chatMessageRepository;
    @GetMapping("/group/{groupId}/history")
    public List<ChatMessage> getHistory(@PathVariable Long groupId, HttpServletRequest request){
        Long userId =(Long) request.getAttribute("userId");
        String token = request.getHeader("Authorization");
        if(!membershipVerifier.isMember(groupId,userId,token)){
            throw  new NotGroupMemberException("You are not a member of this group ");
        }
        return chatMessageRepository.findByGroupIdOrderBySendAtAsc(groupId);
    }
}
