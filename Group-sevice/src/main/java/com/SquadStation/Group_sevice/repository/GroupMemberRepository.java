package com.SquadStation.Group_sevice.repository;

import com.SquadStation.Group_sevice.entity.Group;
import com.SquadStation.Group_sevice.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember,Long> {
    @Query("""
        SELECT gm.group
        FROM GroupMember gm
        WHERE gm.userId = :userId
        AND gm.group.sourcePoint = :sourcePoint
        AND gm.group.boardingStation =:boardingStation
        AND gm.group.travelDate =: travelDate
""")
    List<Group> findExistingGroup( @Param("userId") Long userId,
                                   @Param("sourcePoint") String sourcePoint,
                                   @Param("boardingStation") String boardingStation,
                                   @Param("travelDate") LocalDate travelDate);
}
