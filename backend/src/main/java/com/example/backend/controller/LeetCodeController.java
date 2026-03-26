package com.example.backend.controller;

import com.example.backend.dto.LeetCodeStatsResponse;
import com.example.backend.dto.MessageResponse;
import com.example.backend.service.LeetCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leetcode")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LeetCodeController {

    private static final Logger logger = LoggerFactory.getLogger(LeetCodeController.class);

    @Autowired
    private LeetCodeService leetCodeService;

    /**
     * Test LeetCode API directly without database operations
     * GET /api/leetcode/test/{username}
     */
    @GetMapping("/test/{username}")
    public ResponseEntity<?> testLeetCodeStats(@PathVariable String username) {
        logger.info("Testing LeetCode API for username: {}", username);
        
        try {
            LeetCodeStatsResponse stats = leetCodeService.fetchLeetCodeStats(username);
            logger.info("Successfully tested LeetCode API for username: {}", username);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            logger.error("Error testing LeetCode API for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error testing LeetCode API for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while testing LeetCode API"));
        }
    }

    /**
     * Fetch LeetCode stats for a username and store in database
     * GET /api/leetcode/fetch/{username}
     */
    @GetMapping("/fetch/{username}")
    public ResponseEntity<?> fetchLeetCodeStats(@PathVariable String username) {
        logger.info("Request to fetch LeetCode stats for username: {}", username);
        
        try {
            LeetCodeStatsResponse stats = leetCodeService.fetchAndSaveStats(username);
            logger.info("Successfully fetched and saved LeetCode stats for username: {}", username);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            logger.error("Error fetching LeetCode stats for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error fetching LeetCode stats for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while fetching LeetCode stats"));
        }
    }

    /**
     * Get stored LeetCode stats for a user
     * GET /api/leetcode/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserLeetCodeStats(@PathVariable Long userId) {
        logger.info("Request to get LeetCode stats for userId: {}", userId);
        
        try {
            LeetCodeStatsResponse stats = leetCodeService.getUserStats(userId);
            logger.info("Successfully retrieved LeetCode stats for userId: {}", userId);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            logger.error("Error getting LeetCode stats for userId: {}", userId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error getting LeetCode stats for userId: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while retrieving LeetCode stats"));
        }
    }

    /**
     * Get current user's LeetCode stats
     * GET /api/leetcode/my-stats
     */
    @GetMapping("/my-stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'COORDINATOR', 'STUDENT')")
    public ResponseEntity<?> getMyLeetCodeStats() {
        try {
            // Get the current authenticated user from the security context
            org.springframework.security.core.Authentication authentication = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication != null && authentication.getPrincipal() instanceof com.example.backend.entity.User) {
                com.example.backend.entity.User user = (com.example.backend.entity.User) authentication.getPrincipal();
                logger.info("Request to get LeetCode stats for current user: {}", user.getUsername());
                
                LeetCodeStatsResponse stats = leetCodeService.getUserStats(user.getId());
                logger.info("Successfully retrieved LeetCode stats for current user: {}", user.getUsername());
                return ResponseEntity.ok(stats);
            } else {
                String username = authentication.getName();
                logger.warn("Unable to get user details from authentication context for username: {}", username);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new MessageResponse("Unable to retrieve user information"));
            }
        } catch (RuntimeException e) {
            logger.error("Error getting current user's LeetCode stats", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error getting current user's LeetCode stats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while retrieving LeetCode stats"));
        }
    }

    /**
     * Trigger manual update of all user stats (Admin only)
     * POST /api/leetcode/update-all
     */
    @PostMapping("/update-all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAllUserStats() {
        logger.info("Admin requested manual update of all LeetCode user stats");
        
        try {
            leetCodeService.updateAllUserStats();
            logger.info("Successfully triggered manual update of all LeetCode user stats");
            return ResponseEntity.ok(new MessageResponse("LeetCode stats update initiated successfully"));
        } catch (Exception e) {
            logger.error("Error during manual update of all LeetCode user stats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error during stats update: " + e.getMessage()));
        }
    }

    /**
     * Get all users who have LeetCode usernames (Admin/Coordinator only)
     * GET /api/leetcode/users
     */
    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN', 'COORDINATOR')")
    public ResponseEntity<?> getUsersWithLeetCodeUsername() {
        logger.info("Request to get all users with LeetCode usernames");
        
        try {
            List<com.example.backend.entity.User> users = leetCodeService.getUsersWithLeetCodeUsername();
            
            List<SimpleUserResponse> userResponses = users.stream()
                .map(user -> new SimpleUserResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getName(),
                    user.getLeetcodeUsername()
                ))
                .toList();
            
            logger.info("Successfully retrieved {} users with LeetCode usernames", userResponses.size());
            return ResponseEntity.ok(userResponses);
        } catch (Exception e) {
            logger.error("Error getting users with LeetCode usernames", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while retrieving users"));
        }
    }

    /**
     * Simple user response DTO
     */
    public static class SimpleUserResponse {
        private Long id;
        private String username;
        private String name;
        private String leetcodeUsername;

        public SimpleUserResponse(Long id, String username, String name, String leetcodeUsername) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.leetcodeUsername = leetcodeUsername;
        }

        // Getters
        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getName() { return name; }
        public String getLeetcodeUsername() { return leetcodeUsername; }
    }
}
