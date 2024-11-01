package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends MongoRepository<ApiRole, String> {
    ApiRole findByName(String name); // Custom method to find a role by name
}
