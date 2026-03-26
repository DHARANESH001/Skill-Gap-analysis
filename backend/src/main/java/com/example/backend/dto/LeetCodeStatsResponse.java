package com.example.backend.dto;

import java.time.LocalDateTime;

public class LeetCodeStatsResponse {
    private Long id;
    private Long userId;
    private String username;
    private String leetcodeUsername;
    private Integer easySolved;
    private Integer mediumSolved;
    private Integer hardSolved;
    private Integer totalSolved;
    private Integer contestRating;
    private Integer contestsAttended;
    private Long globalRanking;
    private LocalDateTime lastUpdated;

    public LeetCodeStatsResponse() {}

    public LeetCodeStatsResponse(Long id, Long userId, String username, String leetcodeUsername,
                                Integer easySolved, Integer mediumSolved, Integer hardSolved,
                                Integer totalSolved, Integer contestRating, Integer contestsAttended,
                                Long globalRanking, LocalDateTime lastUpdated) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.leetcodeUsername = leetcodeUsername;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.totalSolved = totalSolved;
        this.contestRating = contestRating;
        this.contestsAttended = contestsAttended;
        this.globalRanking = globalRanking;
        this.lastUpdated = lastUpdated;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLeetcodeUsername() {
        return leetcodeUsername;
    }

    public void setLeetcodeUsername(String leetcodeUsername) {
        this.leetcodeUsername = leetcodeUsername;
    }

    public Integer getEasySolved() {
        return easySolved;
    }

    public void setEasySolved(Integer easySolved) {
        this.easySolved = easySolved;
    }

    public Integer getMediumSolved() {
        return mediumSolved;
    }

    public void setMediumSolved(Integer mediumSolved) {
        this.mediumSolved = mediumSolved;
    }

    public Integer getHardSolved() {
        return hardSolved;
    }

    public void setHardSolved(Integer hardSolved) {
        this.hardSolved = hardSolved;
    }

    public Integer getTotalSolved() {
        return totalSolved;
    }

    public void setTotalSolved(Integer totalSolved) {
        this.totalSolved = totalSolved;
    }

    public Integer getContestRating() {
        return contestRating;
    }

    public void setContestRating(Integer contestRating) {
        this.contestRating = contestRating;
    }

    public Integer getContestsAttended() {
        return contestsAttended;
    }

    public void setContestsAttended(Integer contestsAttended) {
        this.contestsAttended = contestsAttended;
    }

    public Long getGlobalRanking() {
        return globalRanking;
    }

    public void setGlobalRanking(Long globalRanking) {
        this.globalRanking = globalRanking;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
