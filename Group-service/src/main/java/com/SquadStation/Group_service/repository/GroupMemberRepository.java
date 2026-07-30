package com.SquadStation.Group_service.repository;

import com.SquadStation.Group_service.entity.Group;
import com.SquadStation.Group_service.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember,Long> {

    boolean existsByGroup_IdAndUserId(Long groupId, Long userId);
}
