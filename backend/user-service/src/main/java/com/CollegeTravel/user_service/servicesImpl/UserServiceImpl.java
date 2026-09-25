package com.CollegeTravel.user_service.servicesImpl;

import com.CollegeTravel.user_service.dto.Response.UserSummaryDTO;
import com.CollegeTravel.user_service.entity.User;
import com.CollegeTravel.user_service.exception.UserNotFoundException;
import com.CollegeTravel.user_service.repository.UserRepository;
import com.CollegeTravel.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(
                ()-> new UserNotFoundException("User Not Found")
        );
    }
    @Override
    public User getByCollegeEmail(String collegeEmail){
        return userRepository.findByCollegeEmail(collegeEmail).orElseThrow(
                ()-> new UserNotFoundException("User not fount "+collegeEmail)
        );
    }

    @Override
    public List<UserSummaryDTO> getUsersByIds(List<Long> ids) {
        return userRepository.findByIdIn(ids).stream()
                .map(u-> new UserSummaryDTO(u.getId(), u.getName()))
                .toList();
    }

    @Override
    public Map<Long, String> getEmailsByUserIds(List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()){
            return Collections.emptyMap();
        }
        return userRepository.findByIdIn(userIds).stream()
                .filter(u->u.getCollegeEmail() !=null)
                .collect(Collectors.toMap(User::getId, User::getCollegeEmail, (existing, replacement) -> existing));
    }

}
