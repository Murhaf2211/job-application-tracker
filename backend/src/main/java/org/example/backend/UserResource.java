package org.example.backend;

import lombok.RequiredArgsConstructor;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserResource {
    private final UserService userService;

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<ApiUser>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<ApiUser> registerUser(@RequestBody ApiUser user) {
        return ResponseEntity.ok(userService.saveUser(user)); // Save the user and return the created user
    }

    // Create a new role
    @PostMapping("/roles")
    public ResponseEntity<ApiRole> createRole(@RequestBody ApiRole role) {
        return ResponseEntity.ok(userService.saveRole(role)); // Save the role and return the created role
    }

    // Assign a role to a user
    @PostMapping("/users/{username}/roles/{roleName}")
    public ResponseEntity<Void> assignRoleToUser(@PathVariable String username, @PathVariable String roleName) {
        userService.addRoleToUser(username, roleName); // Assign the specified role to the user
        return ResponseEntity.ok().build();
    }

    // Get a user by username
    @GetMapping("/users/{username}")
    public ResponseEntity<ApiUser> getUser(@PathVariable String username) {
        ApiUser user = userService.getUser(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build(); // Return user or 404 if not found
    }
}