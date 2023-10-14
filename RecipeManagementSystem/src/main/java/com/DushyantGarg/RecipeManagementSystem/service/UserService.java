package com.DushyantGarg.RecipeManagementSystem.service;

import com.DushyantGarg.RecipeManagementSystem.exceptions.UserNotFoundException;
import com.DushyantGarg.RecipeManagementSystem.model.User;
import com.DushyantGarg.RecipeManagementSystem.repo.UserRepoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepoInterface userRepoInterface;

    public User saveUser(User user) {
        return userRepoInterface.save(user);
    }

    public User findByUsername(String username){
        return userRepoInterface.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User Not Found with username: " + username));
    }
}
