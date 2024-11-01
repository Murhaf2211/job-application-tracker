package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<ApiUser, String> {
    // You can add custom query methods here if needed
    ApiUser findByUsername(String username); // Example method to find user by username
}