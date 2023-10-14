package com.DushyantGarg.RecipeManagementSystem.service;

import com.DushyantGarg.RecipeManagementSystem.model.Recipe;
import com.DushyantGarg.RecipeManagementSystem.repo.RecipeRepoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceimpl implements RecipeService {

    @Autowired
    private RecipeRepoInterface recipeRepoInterface;
    @Override
    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepoInterface.save(recipe);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepoInterface.findAll();
    }

    @Override
    public Recipe deleteRecipe(int id) {
        Optional<Recipe> recipeOptional = recipeRepoInterface.findById(id);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();
            recipeRepoInterface.deleteById(id);
            return recipe;
        } else {
            return null;
        }
    }
}
