package com.example.backend.dto;

public class CodeChefStatsResponse {
    private String username;
    private Integer rating;
    private Integer globalRank;
    private Integer countryRank;
    private String stars;
    private Integer problemsSolved;
    private Integer contestsParticipated;
    private String lastUpdated;

    public CodeChefStatsResponse() {}

    public CodeChefStatsResponse(String username, Integer rating, Integer globalRank, Integer countryRank, 
                                String stars, Integer problemsSolved, Integer contestsParticipated, String lastUpdated) {
        this.username = username;
        this.rating = rating;
        this.globalRank = globalRank;
        this.countryRank = countryRank;
        this.stars = stars;
        this.problemsSolved = problemsSolved;
        this.contestsParticipated = contestsParticipated;
        this.lastUpdated = lastUpdated;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getGlobalRank() {
        return globalRank;
    }

    public void setGlobalRank(Integer globalRank) {
        this.globalRank = globalRank;
    }

    public Integer getCountryRank() {
        return countryRank;
    }

    public void setCountryRank(Integer countryRank) {
        this.countryRank = countryRank;
    }

    public String getStars() {
        return stars;
    }

    public void setStars(String stars) {
        this.stars = stars;
    }

    public Integer getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(Integer problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public Integer getContestsParticipated() {
        return contestsParticipated;
    }

    public void setContestsParticipated(Integer contestsParticipated) {
        this.contestsParticipated = contestsParticipated;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
