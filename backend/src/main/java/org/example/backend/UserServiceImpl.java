package org.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

   @Autowired
   private UserRepo userRepository; // Repository for User operations

   @Autowired
   private RoleRepo roleRepository; // Repository for Role operations

   @Override
   public ApiUser saveUser(ApiUser user) {
      return userRepository.save(user); // Save user in MongoDB
   }

   @Override
   public ApiRole saveRole(ApiRole role) {
      return roleRepository.save(role); // Save role in MongoDB
   }

   @Override
   public void addRoleToUser(String username, String roleName) {
      ApiUser user = userRepository.findByUsername(username); // Find user by username
      ApiRole role = roleRepository.findByName(roleName); // Find role by name

      if (user != null && role != null) {
         user.getRoles().add(role); // Add role to user's roles
         userRepository.save(user); // Save the updated user
      }
   }

   @Override
   public ApiUser getUser(String username) {
      return userRepository.findByUsername(username); // Get user by username
   }

   @Override
   public List<ApiUser> getUsers() {
      return userRepository.findAll(); // Get all users
   }
}