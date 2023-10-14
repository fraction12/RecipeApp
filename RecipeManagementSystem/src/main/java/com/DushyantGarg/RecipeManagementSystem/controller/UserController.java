package com.DushyantGarg.RecipeManagementSystem.controller;
import com.DushyantGarg.RecipeManagementSystem.model.User;
import com.DushyantGarg.RecipeManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }

   @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername());

        if(user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("{\"message\": \"Logged In\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid Creds\"}");
        }
   }
}
