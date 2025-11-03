package com.enterprise.app;
import com.enterprise.app.config.SecurityConfig;
import com.enterprise.app.model.Employee;
import com.enterprise.app.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@SpringBootApplication
public class EnterpriseAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnterpriseAppApplication.class, args);
    }

    // ✅ Inject repository and password encoder
    @Bean
    CommandLineRunner initDatabase(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (employeeRepository.findByEmail("admin").isEmpty()) {
                Employee admin = new Employee();
                admin.setName("Administrator");
                admin.setEmail("admin");
                // ✅ Properly encode password before saving
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setRoles(Collections.singletonList("ROLE_ADMIN"));

                employeeRepository.save(admin);
                System.out.println("✅ Default admin user created (admin / admin)");
            } else {
                System.out.println("ℹ️ Admin user already exists, skipping creation.");
            }
        };
    }
}

