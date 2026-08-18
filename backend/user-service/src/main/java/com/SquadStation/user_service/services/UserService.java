package com.SquadStation.user_service.services;

import com.SquadStation.user_service.dto.Response.UserSummaryDTO;
import com.SquadStation.user_service.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {


    User getById(Long id);
    User getByCollegeEmail(String collegeEmail);
    List<UserSummaryDTO> getUsersByIds(List<Long> ids);
    Map<Long,String> getEmailsByUserIds(List<Long> userIds);
}
