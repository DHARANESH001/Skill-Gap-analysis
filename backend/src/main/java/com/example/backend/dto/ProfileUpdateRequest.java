package com.example.backend.dto;

import jakarta.validation.constraints.Size;

public class ProfileUpdateRequest {
    
    @Size(min = 2, max = 100, message = "Department must be between 2 and 100 characters")
    private String department;
    
    @Size(min = 1, max = 20, message = "Year must be between 1 and 20 characters")
    private String year;
    
    @Size(min = 1, max = 50, message = "Roll number must be between 1 and 50 characters")
    private String rollNumber;
    
    @Size(min = 3, max = 50, message = "LeetCode username must be between 3 and 50 characters")
    private String leetcodeUsername;
    
    @Size(min = 3, max = 50, message = "CodeChef username must be between 3 and 50 characters")
    private String codechefUsername;

    // Constructors
    public ProfileUpdateRequest() {}

    public ProfileUpdateRequest(String department, String year, String rollNumber, 
                             String leetcodeUsername, String codechefUsername) {
        this.department = department;
        this.year = year;
        this.rollNumber = rollNumber;
        this.leetcodeUsername = leetcodeUsername;
        this.codechefUsername = codechefUsername;
    }

    // Getters and Setters
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
}
