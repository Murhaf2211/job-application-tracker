package org.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "roles") // Specify the collection name in MongoDB
public class ApiRole {
    @Id
    private String id; // Use String for MongoDB ID
    private String name;
}