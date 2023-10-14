package com.DushyantGarg.RecipeManagementSystem.service;

import com.DushyantGarg.RecipeManagementSystem.model.Recipe;

import java.util.List;

public interface RecipeService {
    public Recipe saveRecipe(Recipe recipe);
    public List<Recipe> getAllRecipes();

    public Recipe deleteRecipe(int id);
}
