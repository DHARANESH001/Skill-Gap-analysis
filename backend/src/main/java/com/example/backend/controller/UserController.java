package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.service.CodeChefService;
import com.example.backend.service.LeetCodeService;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeetCodeService leetCodeService;

    @Autowired
    private CodeChefService codeChefService;

    /**
     * Get current user's profile with coding platform stats
     * GET /api/users/profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        logger.info("Fetching user profile");
        
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserProfileResponse response = new UserProfileResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getUsername(),
                    user.getDepartment(),
                    user.getYear(),
                    user.getRollNumber(),
                    user.getLeetcodeUsername(),
                    user.getCodechefUsername(),
                    user.getJoinDate()
            );

            // Fetch coding platform stats if usernames are available
            if (user.getLeetcodeUsername() != null && !user.getLeetcodeUsername().trim().isEmpty()) {
                try {
                    LeetCodeStatsResponse leetcodeStats = leetCodeService.fetchLeetCodeStats(user.getLeetcodeUsername());
                    response.setLeetcodeStats(leetcodeStats);
                    logger.debug("Successfully fetched LeetCode stats for {}", user.getLeetcodeUsername());
                } catch (Exception e) {
                    logger.warn("Failed to fetch LeetCode stats for {}: {}", user.getLeetcodeUsername(), e.getMessage());
                    response.setLeetcodeStats(null);
                }
            }

            if (user.getCodechefUsername() != null && !user.getCodechefUsername().trim().isEmpty()) {
                try {
                    CodeChefStatsResponse codechefStats = codeChefService.fetchCodeChefStats(user.getCodechefUsername());
                    response.setCodechefStats(codechefStats);
                    logger.debug("Successfully fetched CodeChef stats for {}", user.getCodechefUsername());
                } catch (Exception e) {
                    logger.warn("Failed to fetch CodeChef stats for {}: {}", user.getCodechefUsername(), e.getMessage());
                    response.setCodechefStats(null);
                }
            }

            logger.info("Successfully fetched user profile for {}", username);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching user profile", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error fetching user profile: " + e.getMessage()));
        }
    }

    /**
     * Update current user's profile
     * PUT /api/users/profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody ProfileUpdateRequest profileUpdateRequest) {
        logger.info("Updating user profile");
        
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update user fields
            if (profileUpdateRequest.getDepartment() != null) {
                user.setDepartment(profileUpdateRequest.getDepartment());
            }
            if (profileUpdateRequest.getYear() != null) {
                user.setYear(profileUpdateRequest.getYear());
            }
            if (profileUpdateRequest.getRollNumber() != null) {
                user.setRollNumber(profileUpdateRequest.getRollNumber());
            }
            if (profileUpdateRequest.getLeetcodeUsername() != null) {
                user.setLeetcodeUsername(profileUpdateRequest.getLeetcodeUsername());
            }
            if (profileUpdateRequest.getCodechefUsername() != null) {
                user.setCodechefUsername(profileUpdateRequest.getCodechefUsername());
            }

            userRepository.save(user);
            logger.info("Successfully updated profile for user {}", username);

            return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
            
        } catch (Exception e) {
            logger.error("Error updating user profile", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update profile: " + e.getMessage()));
        }
    }

    /**
     * Get user statistics for coordinator dashboard
     * Only includes users with STUDENT role
     * GET /api/users/statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getUserStatistics() {
        logger.info("Fetching user statistics for students only");
        
        try {
            // Get all users with STUDENT role
            List<User> studentUsers = userRepository.findAll().stream()
                    .filter(user -> "STUDENT".equalsIgnoreCase(user.getRole().toString()))
                    .collect(Collectors.toList());

            // Get all users for role statistics
            List<User> allUsers = userRepository.findAll();

            // Calculate basic statistics
            long totalStudents = studentUsers.size();
            long totalUsers = allUsers.size();
            long activeUsers = studentUsers.stream()
                    .filter(user -> user.getLastLoginDate() != null)
                    .count();

            // Calculate department statistics
            Map<String, List<User>> departmentGroups = studentUsers.stream()
                    .filter(user -> user.getDepartment() != null)
                    .collect(Collectors.groupingBy(User::getDepartment));

            List<UserStatisticsResponse.DepartmentStats> departmentStats = new ArrayList<>();
            for (Map.Entry<String, List<User>> entry : departmentGroups.entrySet()) {
                String department = entry.getKey();
                List<User> deptStudents = entry.getValue();
                long deptCount = deptStudents.size();
                long deptActive = deptStudents.stream()
                        .filter(user -> user.getLastLoginDate() != null)
                        .count();
                
                // For now, use a placeholder average score - in real implementation, 
                // this would come from actual performance data
                double avgScore = 70.0 + (Math.random() * 20); // Random between 70-90
                
                departmentStats.add(new UserStatisticsResponse.DepartmentStats(
                    department, deptCount, avgScore, deptActive
                ));
            }

            // Calculate role statistics
            Map<String, Long> roleCounts = allUsers.stream()
                    .filter(user -> user.getRole() != null)
                    .collect(Collectors.groupingBy(
                        user -> user.getRole().toString(), 
                        Collectors.counting()
                    ));

            List<UserStatisticsResponse.RoleStats> roleStats = new ArrayList<>();
            for (Map.Entry<String, Long> entry : roleCounts.entrySet()) {
                roleStats.add(new UserStatisticsResponse.RoleStats(entry.getKey(), entry.getValue()));
            }

            // Calculate skill statistics (placeholder for now)
            double averageSkillScore = 75.0; // Placeholder
            String strongestSkill = "Web Development";
            String weakestSkill = "System Design";

            UserStatisticsResponse response = new UserStatisticsResponse(
                totalStudents, totalUsers, activeUsers, averageSkillScore,
                strongestSkill, weakestSkill, departmentStats, roleStats
            );

            logger.info("Successfully fetched user statistics: {} students, {} total users", totalStudents, totalUsers);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching user statistics", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch user statistics: " + e.getMessage()));
        }
    }

    /**
     * Get user by ID (admin only)
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        logger.info("Fetching user by ID: {}", id);
        
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserProfileResponse response = new UserProfileResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getUsername(),
                    user.getDepartment(),
                    user.getYear(),
                    user.getRollNumber(),
                    user.getLeetcodeUsername(),
                    user.getCodechefUsername(),
                    user.getJoinDate()
            );

            // Fetch coding platform stats if usernames are available
            if (user.getLeetcodeUsername() != null && !user.getLeetcodeUsername().trim().isEmpty()) {
                try {
                    LeetCodeStatsResponse leetcodeStats = leetCodeService.fetchLeetCodeStats(user.getLeetcodeUsername());
                    response.setLeetcodeStats(leetcodeStats);
                } catch (Exception e) {
                    logger.warn("Failed to fetch LeetCode stats for {}: {}", user.getLeetcodeUsername(), e.getMessage());
                    response.setLeetcodeStats(null);
                }
            }

            if (user.getCodechefUsername() != null && !user.getCodechefUsername().trim().isEmpty()) {
                try {
                    CodeChefStatsResponse codechefStats = codeChefService.fetchCodeChefStats(user.getCodechefUsername());
                    response.setCodechefStats(codechefStats);
                } catch (Exception e) {
                    logger.warn("Failed to fetch CodeChef stats for {}: {}", user.getCodechefUsername(), e.getMessage());
                    response.setCodechefStats(null);
                }
            }

            logger.info("Successfully fetched user profile for ID: {}", id);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching user by ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("User not found: " + e.getMessage()));
        }
    }
}
