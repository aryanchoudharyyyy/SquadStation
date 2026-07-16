package com.SquadStation.user_service.services;

import com.SquadStation.user_service.entity.User;

public interface UserService {


    User getById(Long id);
    User getByCollegeEmail(String collegeEmail);
}
