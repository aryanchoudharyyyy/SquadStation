package com.SquadStation.chat_service.controller;

import com.SquadStation.chat_service.enitiy.ListingConversation;
import com.SquadStation.chat_service.enitiy.ListingMessage;
import com.SquadStation.chat_service.service.ListingConversationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat/listing-conversations")
@RequiredArgsConstructor
public class ListingConversationController {
    private  final ListingConversationService conversationService;

    @PostMapping("/start")
    public ListingConversation startConversation(@RequestParam Long listingId, HttpServletRequest request){
        return conversationService.getOrCreateConversation(listingId,(Long) request.getAttribute("userId"));

    }
    @GetMapping("/{conversationId}/history")
    public List<ListingMessage> getHistory(@PathVariable Long conversationId, HttpServletRequest request){
        return conversationService.getMessages(conversationId, (Long) request.getAttribute("userId"));
    }
}
