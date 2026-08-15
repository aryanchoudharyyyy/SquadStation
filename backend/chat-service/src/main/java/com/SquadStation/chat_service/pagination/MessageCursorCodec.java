package com.SquadStation.chat_service.pagination;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Base64;

@Component
public class MessageCursorCodec {
    public String encode(LocalDateTime timestamp, Long id){
        String rawCursor = timestamp + "|" + id;     ///?beforeTimestamp=10:02:00&beforeId=103 ->2026-08-09T10:02:00|103 --->MjAyNi0wOC0wOVQxMDowMjowMHwxMDM
        return Base64.getUrlEncoder()
                .withoutPadding() // for removing ==
                .encodeToString(rawCursor.getBytes(StandardCharsets.UTF_8));
    }
    public MessageCursor decode(String encodedCursor){
        try{
            String decoded = new String(Base64.getUrlDecoder().decode(encodedCursor),
                    StandardCharsets.UTF_8);
            String[] parts = decoded.split("\\|");
            if (parts.length!=2){
                throw  new IllegalArgumentException("Invalid cursor structure");
            }
            LocalDateTime timestamp = LocalDateTime.parse(parts[0]);
            Long id = Long.parseLong(parts[1]);
            return new MessageCursor(timestamp, id);
        }
        catch (IllegalArgumentException | DateTimeParseException exception){
            throw  new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid pagination cursor"
            );
        }
    }

}//Use: Frontend ko cursor ki internal value nahi samajhni padegi. Woh server se nextCursor lega aur agle request mein waapas bhejega.
