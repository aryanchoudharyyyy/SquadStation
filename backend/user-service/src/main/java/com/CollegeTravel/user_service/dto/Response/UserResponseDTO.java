package com.CollegeTravel.user_service.dto.Response;

import com.CollegeTravel.user_service.entity.User;

public record UserResponseDTO(Long id, String name, String collegeEmail, String branch, String year, boolean verified) {
    public static UserResponseDTO fromEntity(User user){
        return new UserResponseDTO(
                user.getId(),user.getName(), user.getCollegeEmail(),
                user.getBranch(), user.getYear(), user.isVerified()
        );
    }
}
