package com.DushyantGarg.RecipeManagementSystem.repo;

import com.DushyantGarg.RecipeManagementSystem.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepoInterface extends JpaRepository<Recipe,Integer> {
}
