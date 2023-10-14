package com.DushyantGarg.RecipeManagementSystem.repo;

import com.DushyantGarg.RecipeManagementSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepoInterface extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);
}
