package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coding-platform")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CodingPlatformController {

    private static final Logger logger = LoggerFactory.getLogger(CodingPlatformController.class);

    @Autowired
    private CodeChefService codeChefService;

    @Autowired
    private LeetCodeService leetCodeService;

    /**
     * Test CodeChef API directly without database operations
     * GET /api/coding-platform/codechef/test/{username}
     */
    @GetMapping("/codechef/test/{username}")
    public ResponseEntity<?> testCodeChefStats(@PathVariable String username) {
        logger.info("Fetching CodeChef stats for {}", username);
        
        try {
            CodeChefStatsResponse stats = codeChefService.fetchCodeChefStats(username);
            logger.info("Successfully fetched CodeChef stats for username: {}", username);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            logger.error("Error fetching CodeChef stats for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error fetching CodeChef stats for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while fetching CodeChef stats"));
        }
    }

    /**
     * Test LeetCode API directly without database operations (redirect to LeetCodeController)
     * GET /api/coding-platform/leetcode/test/{username}
     */
    @GetMapping("/leetcode/test/{username}")
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
     * Get aggregated coding profile from all platforms
     * GET /api/coding-platform/profile/{username}
     */
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getAggregatedProfile(@PathVariable String username) {
        logger.info("Fetching aggregated coding profile for username: {}", username);
        
        try {
            AggregatedCodingProfileResponse profile = new AggregatedCodingProfileResponse();
            
            // Fetch from all platforms
            try {
                LeetCodeStatsResponse leetcodeStats = leetCodeService.fetchLeetCodeStats(username);
                profile.setLeetcode(leetcodeStats);
                logger.debug("Successfully fetched LeetCode stats for {}", username);
            } catch (Exception e) {
                logger.warn("Failed to fetch LeetCode stats for {}: {}", username, e.getMessage());
                profile.setLeetcode(null);
            }

            try {
                CodeChefStatsResponse codechefStats = codeChefService.fetchCodeChefStats(username);
                profile.setCodechef(codechefStats);
                logger.debug("Successfully fetched CodeChef stats for {}", username);
            } catch (Exception e) {
                logger.warn("Failed to fetch CodeChef stats for {}: {}", username, e.getMessage());
                profile.setCodechef(null);
            }

            logger.info("Successfully fetched aggregated coding profile for username: {}", username);
            return ResponseEntity.ok(profile);
            
        } catch (Exception e) {
            logger.error("Unexpected error fetching aggregated profile for username: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Internal server error while fetching aggregated profile"));
        }
    }
}
