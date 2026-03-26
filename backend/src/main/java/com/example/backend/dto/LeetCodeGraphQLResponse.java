package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LeetCodeGraphQLResponse {
    private Data data;

    public LeetCodeGraphQLResponse() {}

    public LeetCodeGraphQLResponse(Data data) {
        this.data = data;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public static class Data {
        private MatchedUser matchedUser;
        private UserContestRanking userContestRanking;

        public Data() {}

        public Data(MatchedUser matchedUser, UserContestRanking userContestRanking) {
            this.matchedUser = matchedUser;
            this.userContestRanking = userContestRanking;
        }

        public MatchedUser getMatchedUser() {
            return matchedUser;
        }

        public void setMatchedUser(MatchedUser matchedUser) {
            this.matchedUser = matchedUser;
        }

        public UserContestRanking getUserContestRanking() {
            return userContestRanking;
        }

        public void setUserContestRanking(UserContestRanking userContestRanking) {
            this.userContestRanking = userContestRanking;
        }
    }

    public static class MatchedUser {
        private String username;
        private SubmitStatsGlobal submitStatsGlobal;

        public MatchedUser() {}

        public MatchedUser(String username, SubmitStatsGlobal submitStatsGlobal) {
            this.username = username;
            this.submitStatsGlobal = submitStatsGlobal;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public SubmitStatsGlobal getSubmitStatsGlobal() {
            return submitStatsGlobal;
        }

        public void setSubmitStatsGlobal(SubmitStatsGlobal submitStatsGlobal) {
            this.submitStatsGlobal = submitStatsGlobal;
        }
    }

    public static class SubmitStatsGlobal {
        private AcSubmissionNum[] acSubmissionNum;

        public SubmitStatsGlobal() {}

        public SubmitStatsGlobal(AcSubmissionNum[] acSubmissionNum) {
            this.acSubmissionNum = acSubmissionNum;
        }

        public AcSubmissionNum[] getAcSubmissionNum() {
            return acSubmissionNum;
        }

        public void setAcSubmissionNum(AcSubmissionNum[] acSubmissionNum) {
            this.acSubmissionNum = acSubmissionNum;
        }
    }

    public static class AcSubmissionNum {
        private String difficulty;
        private Integer count;

        public AcSubmissionNum() {}

        public AcSubmissionNum(String difficulty, Integer count) {
            this.difficulty = difficulty;
            this.count = count;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public void setDifficulty(String difficulty) {
            this.difficulty = difficulty;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }
    }

    public static class UserContestRanking {
        private Integer attendedContestsCount;
        private Integer rating;
        private Long globalRanking;

        public UserContestRanking() {}

        public UserContestRanking(Integer attendedContestsCount, Integer rating, Long globalRanking) {
            this.attendedContestsCount = attendedContestsCount;
            this.rating = rating;
            this.globalRanking = globalRanking;
        }

        public Integer getAttendedContestsCount() {
            return attendedContestsCount;
        }

        public void setAttendedContestsCount(Integer attendedContestsCount) {
            this.attendedContestsCount = attendedContestsCount;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public Long getGlobalRanking() {
            return globalRanking;
        }

        public void setGlobalRanking(Long globalRanking) {
            this.globalRanking = globalRanking;
        }
    }
}
