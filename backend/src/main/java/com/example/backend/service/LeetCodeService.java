package com.example.backend.service;

import com.example.backend.dto.LeetCodeGraphQLRequest;
import com.example.backend.dto.LeetCodeGraphQLResponse;
import com.example.backend.dto.LeetCodeStatsResponse;
import com.example.backend.entity.LeetCodeStats;
import com.example.backend.entity.User;
import com.example.backend.exception.LeetCodeApiException;
import com.example.backend.exception.LeetCodeStatsNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.LeetCodeStatsRepository;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LeetCodeService {

    private static final Logger logger = LoggerFactory.getLogger(LeetCodeService.class);
    private static final String LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
    private static final String GRAPHQL_QUERY = """
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                }
                userContestRanking(username: $username) {
                    attendedContestsCount
                    rating
                    globalRanking
                }
            }
            """;

    @Autowired
    private LeetCodeStatsRepository leetCodeStatsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Fetch LeetCode stats for a given username
     */
    public LeetCodeStatsResponse fetchLeetCodeStats(String username) {
        logger.info("Fetching LeetCode stats for username: {}", username);
        
        try {
            // Create GraphQL request
            LeetCodeGraphQLRequest request = new LeetCodeGraphQLRequest();
            request.setQuery(GRAPHQL_QUERY);
            LeetCodeGraphQLRequest.Variables variables = new LeetCodeGraphQLRequest.Variables(username);
            request.setVariables(variables);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
            
            HttpEntity<LeetCodeGraphQLRequest> entity = new HttpEntity<>(request, headers);

            // Debug logging
            logger.info("GraphQL request: {}", request);

            // Make API call
            ResponseEntity<LeetCodeGraphQLResponse> response = restTemplate.postForEntity(
                LEETCODE_GRAPHQL_URL, entity, LeetCodeGraphQLResponse.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                LeetCodeGraphQLResponse graphQLResponse = response.getBody();
                
                if (graphQLResponse.getData() != null && graphQLResponse.getData().getMatchedUser() != null) {
                    return parseGraphQLResponse(
                        graphQLResponse.getData().getMatchedUser(),
                        graphQLResponse.getData().getUserContestRanking()
                    );
                } else {
                    logger.warn("No data found for username: {}", username);
                    throw new LeetCodeApiException("User not found on LeetCode: " + username);
                }
            } else {
                logger.error("Failed to fetch data from LeetCode API. Status: {}", response.getStatusCode());
                throw new LeetCodeApiException("Failed to fetch data from LeetCode API");
            }
        } catch (HttpClientErrorException e) {
            logger.error("HTTP client error while fetching LeetCode stats for username: {}", username, e);
            throw new LeetCodeApiException("LeetCode API request failed: " + e.getMessage());
        } catch (ResourceAccessException e) {
            logger.error("Network error while fetching LeetCode stats for username: {}", username, e);
            throw new LeetCodeApiException("Unable to connect to LeetCode API: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching LeetCode stats for username: {}", username, e);
            throw new LeetCodeApiException("Error fetching LeetCode stats: " + e.getMessage(), e);
        }
    }

    /**
     * Fetch and save LeetCode stats for a user
     */
    public LeetCodeStatsResponse fetchAndSaveStats(String username) {
        logger.info("Fetching and saving LeetCode stats for username: {}", username);
        
        // Find user by LeetCode username
        User user = userRepository.findByLeetcodeUsername(username)
            .orElseThrow(() -> {
                logger.warn("No user found with LeetCode username: {}", username);
                return new UserNotFoundException("No user found with LeetCode username: " + username);
            });

        // Fetch stats from LeetCode API
        LeetCodeStatsResponse statsResponse = fetchLeetCodeStats(username);

        // Convert to entity and save
        LeetCodeStats leetCodeStats = convertToEntity(statsResponse, user);
        
        // Check if stats already exist for this user
        Optional<LeetCodeStats> existingStats = leetCodeStatsRepository.findByUser(user);
        
        if (existingStats.isPresent()) {
            // Update existing stats
            LeetCodeStats existing = existingStats.get();
            updateExistingStats(existing, leetCodeStats);
            leetCodeStats = leetCodeStatsRepository.save(existing);
            logger.info("Updated existing LeetCode stats for user: {}", username);
        } else {
            // Save new stats
            leetCodeStats = leetCodeStatsRepository.save(leetCodeStats);
            logger.info("Saved new LeetCode stats for user: {}", username);
        }

        // Convert back to response DTO
        return convertToResponseDTO(leetCodeStats);
    }

    /**
     * Get stored LeetCode stats for a user
     */
    public LeetCodeStatsResponse getUserStats(Long userId) {
        logger.info("Getting stored LeetCode stats for userId: {}", userId);
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> {
                logger.warn("User not found with id: {}", userId);
                return new UserNotFoundException("User not found with id: " + userId);
            });

        Optional<LeetCodeStats> stats = leetCodeStatsRepository.findByUser(user);
        
        if (stats.isPresent()) {
            return convertToResponseDTO(stats.get());
        } else {
            logger.warn("No LeetCode stats found for userId: {}", userId);
            throw new LeetCodeStatsNotFoundException("No LeetCode stats found for user: " + userId);
        }
    }

    /**
     * Get all users with LeetCode usernames for scheduled updates
     */
    public List<User> getUsersWithLeetCodeUsername() {
        return userRepository.findAll().stream()
            .filter(user -> user.getLeetcodeUsername() != null && !user.getLeetcodeUsername().trim().isEmpty())
            .collect(Collectors.toList());
    }

    /**
     * Update stats for all users with LeetCode usernames (for scheduled job)
     */
    public void updateAllUserStats() {
        logger.info("Starting scheduled update of all LeetCode user stats");
        
        List<User> users = getUsersWithLeetCodeUsername();
        logger.info("Found {} users with LeetCode usernames", users.size());
        
        int successCount = 0;
        int failureCount = 0;
        
        for (User user : users) {
            try {
                fetchAndSaveStats(user.getLeetcodeUsername());
                successCount++;
                logger.info("Successfully updated stats for user: {}", user.getLeetcodeUsername());
            } catch (Exception e) {
                failureCount++;
                logger.error("Failed to update stats for user: {}", user.getLeetcodeUsername(), e);
            }
        }
        
        logger.info("Scheduled update completed. Success: {}, Failures: {}", successCount, failureCount);
    }

    private LeetCodeStatsResponse parseGraphQLResponse(LeetCodeGraphQLResponse.MatchedUser matchedUser, 
                                                       LeetCodeGraphQLResponse.UserContestRanking userContestRanking) {
        // Initialize default values
        int easySolved = 0, mediumSolved = 0, hardSolved = 0, totalSolved = 0;
        Integer contestRating = null;
        Integer contestsAttended = null;
        Long globalRanking = null;

        // Parse submission stats
        if (matchedUser.getSubmitStatsGlobal() != null && 
            matchedUser.getSubmitStatsGlobal().getAcSubmissionNum() != null) {
            
            for (LeetCodeGraphQLResponse.AcSubmissionNum submission : 
                 matchedUser.getSubmitStatsGlobal().getAcSubmissionNum()) {
                
                if ("Easy".equals(submission.getDifficulty())) {
                    easySolved = submission.getCount() != null ? submission.getCount() : 0;
                } else if ("Medium".equals(submission.getDifficulty())) {
                    mediumSolved = submission.getCount() != null ? submission.getCount() : 0;
                } else if ("Hard".equals(submission.getDifficulty())) {
                    hardSolved = submission.getCount() != null ? submission.getCount() : 0;
                } else if ("All".equals(submission.getDifficulty())) {
                    totalSolved = submission.getCount() != null ? submission.getCount() : 0;
                }
            }
        }

        // Parse contest ranking
        if (userContestRanking != null) {
            contestRating = userContestRanking.getRating();
            contestsAttended = userContestRanking.getAttendedContestsCount();
            globalRanking = userContestRanking.getGlobalRanking();
        }

        return new LeetCodeStatsResponse(
            null, null, null, matchedUser.getUsername(),
            easySolved, mediumSolved, hardSolved, totalSolved,
            contestRating, contestsAttended, globalRanking, null
        );
    }

    private LeetCodeStats convertToEntity(LeetCodeStatsResponse response, User user) {
        return new LeetCodeStats(
            user,
            response.getEasySolved(),
            response.getMediumSolved(),
            response.getHardSolved(),
            response.getTotalSolved(),
            response.getContestRating(),
            response.getContestsAttended(),
            response.getGlobalRanking()
        );
    }

    private void updateExistingStats(LeetCodeStats existing, LeetCodeStats updated) {
        existing.setEasySolved(updated.getEasySolved());
        existing.setMediumSolved(updated.getMediumSolved());
        existing.setHardSolved(updated.getHardSolved());
        existing.setTotalSolved(updated.getTotalSolved());
        existing.setContestRating(updated.getContestRating());
        existing.setContestsAttended(updated.getContestsAttended());
        existing.setGlobalRanking(updated.getGlobalRanking());
    }

    private LeetCodeStatsResponse convertToResponseDTO(LeetCodeStats stats) {
        return new LeetCodeStatsResponse(
            stats.getId(),
            stats.getUser().getId(),
            stats.getUser().getUsername(),
            stats.getUser().getLeetcodeUsername(),
            stats.getEasySolved(),
            stats.getMediumSolved(),
            stats.getHardSolved(),
            stats.getTotalSolved(),
            stats.getContestRating(),
            stats.getContestsAttended(),
            stats.getGlobalRanking(),
            stats.getLastUpdated()
        );
    }
}
