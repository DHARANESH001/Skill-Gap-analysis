package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByLeetcodeUsername(String leetcodeUsername);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(Role role);
    
    @Query("SELECT u FROM User u WHERE u.leetcodeUsername IS NOT NULL AND u.leetcodeUsername != ''")
    List<User> findUsersWithLeetcodeUsername();
}
