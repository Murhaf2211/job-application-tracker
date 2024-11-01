package org.example.backend;

import java.util.List;

public interface UserService {
    ApiUser saveUser(ApiUser user); // Method to save a user
    ApiRole saveRole(ApiRole role); // Method to save a role
    void addRoleToUser(String username, String roleName); // Method to add a role to a user
    ApiUser getUser(String username); // Method to retrieve a user by username
    List<ApiUser> getUsers(); // Method to retrieve all users
}