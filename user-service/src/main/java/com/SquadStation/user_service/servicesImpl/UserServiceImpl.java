package com.SquadStation.user_service.servicesImpl;

import com.SquadStation.user_service.entity.User;
import com.SquadStation.user_service.exception.UserNotFoundException;
import com.SquadStation.user_service.repository.UserRepository;
import com.SquadStation.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
