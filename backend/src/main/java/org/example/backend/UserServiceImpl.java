package org.example.backend;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public  class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final RoleRepo rolRepo;


   @Override
   public User saveUser(User user) {
      log.info("save user {}", user.getName());
      return userRepo.save(user);
   }

   @Override
   public Role saveRole(Role role) {
      log.info("save role {}", role.getName());
      return rolRepo.save(role);
   }

   @Override
   public void addRoleToUser(String username, String roleName) {
      log.info("add role {} to user {}", roleName, username);
      User user = userRepo.findByUsername(username);
      Role role = rolRepo.findByName(roleName);
      user.getRoles().add(role);
   }

   @Override
   public User getUser(String username) {
      log.info("get user {}", username);
      return userRepo.findByUsername(username);
   }

   @Override
   public List<User> getUsers() {
      log.info("get all users");
      return userRepo.findAll();
   }
}
