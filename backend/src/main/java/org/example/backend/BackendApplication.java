package org.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
	}
 @Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new ApiRole("1","ROLE_ADMIN"));
			userService.saveRole(new ApiRole("2","ROLE_USER"));

			userService.saveUser(new ApiUser("11","admin", "admin", "admin", new ArrayList<>()));
			userService.saveUser(new ApiUser("22","user", "user1", "123456", new ArrayList<>()));

			userService.addRoleToUser("admin", "ROLE_ADMIN");
			userService.addRoleToUser("admin", "ROLE_USER");
			userService.addRoleToUser("user1", "ROLE_USER");
		};
	}

}
