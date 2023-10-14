package com.DushyantGarg.RecipeManagementSystem.controller;

import com.DushyantGarg.RecipeManagementSystem.model.Recipe;
import com.DushyantGarg.RecipeManagementSystem.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
@CrossOrigin
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @PostMapping("/add")
    public String add(@RequestBody Recipe recipe){
        recipeService.saveRecipe(recipe);
        return "New Recipe has been added";
    }

    @GetMapping("/getAll")
    public List<Recipe> getAllRecipies(){
        return recipeService.getAllRecipes();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRecipe(@PathVariable int id) {
        // Your existing code for deleting the recipe

        Recipe deletedRecipe = recipeService.deleteRecipe(id);

        if (deletedRecipe != null) {
            return "Recipe with ID " + id + " has been deleted.";
        } else {
            return "Recipe with ID " + id + " not found.";
        }
    }




}
