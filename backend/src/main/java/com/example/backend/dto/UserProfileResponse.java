package com.example.backend.dto;

import java.time.LocalDateTime;

public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String username;
    private String department;
    private String year;
    private String rollNumber;
    private String leetcodeUsername;
    private String codechefUsername;
    private LocalDateTime joinDate;
    private LeetCodeStatsResponse leetcodeStats;
    private CodeChefStatsResponse codechefStats;

    // Constructors
    public UserProfileResponse() {}

    public UserProfileResponse(Long id, String name, String email, String username,
                           String department, String year, String rollNumber,
                           String leetcodeUsername, String codechefUsername,
                           LocalDateTime joinDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.department = department;
        this.year = year;
        this.rollNumber = rollNumber;
        this.leetcodeUsername = leetcodeUsername;
        this.codechefUsername = codechefUsername;
        this.joinDate = joinDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getLeetcodeUsername() {
        return leetcodeUsername;
    }

    public void setLeetcodeUsername(String leetcodeUsername) {
        this.leetcodeUsername = leetcodeUsername;
    }

    public String getCodechefUsername() {
        return codechefUsername;
    }

    public void setCodechefUsername(String codechefUsername) {
        this.codechefUsername = codechefUsername;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public LeetCodeStatsResponse getLeetcodeStats() {
        return leetcodeStats;
    }

    public void setLeetcodeStats(LeetCodeStatsResponse leetcodeStats) {
        this.leetcodeStats = leetcodeStats;
    }

    public CodeChefStatsResponse getCodechefStats() {
        return codechefStats;
    }

    public void setCodechefStats(CodeChefStatsResponse codechefStats) {
        this.codechefStats = codechefStats;
    }
}
