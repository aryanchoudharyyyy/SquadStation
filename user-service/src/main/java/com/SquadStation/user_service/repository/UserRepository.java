package com.SquadStation.user_service.repository;

import com.SquadStation.user_service.dto.Response.UserSummaryDTO;
import com.SquadStation.user_service.entity.User;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCollegeEmail(String collegeEmail);

    List<User> findByIdIn(List<Long> ids);

}
