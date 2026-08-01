package com.SquadStation.Group_service.dto.Response;

import java.util.List;

public record GroupMembersResponse(int memberCount, List<String> memberNames) {
}
