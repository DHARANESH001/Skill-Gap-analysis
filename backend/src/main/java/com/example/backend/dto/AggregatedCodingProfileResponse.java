package com.example.backend.dto;

public class AggregatedCodingProfileResponse {
    private LeetCodeStatsResponse leetcode;
    private CodeChefStatsResponse codechef;

    public AggregatedCodingProfileResponse() {}

    public AggregatedCodingProfileResponse(LeetCodeStatsResponse leetcode, CodeChefStatsResponse codechef) {
        this.leetcode = leetcode;
        this.codechef = codechef;
    }

    // Getters and Setters
    public LeetCodeStatsResponse getLeetcode() {
        return leetcode;
    }

    public void setLeetcode(LeetCodeStatsResponse leetcode) {
        this.leetcode = leetcode;
    }

    public CodeChefStatsResponse getCodechef() {
        return codechef;
    }

    public void setCodechef(CodeChefStatsResponse codechef) {
        this.codechef = codechef;
    }

}
