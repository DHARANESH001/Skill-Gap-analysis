package com.example.backend.dto;

public class LeetCodeGraphQLRequest {
    private String query;
    private Variables variables;

    public LeetCodeGraphQLRequest() {}

    public LeetCodeGraphQLRequest(String query, Variables variables) {
        this.query = query;
        this.variables = variables;
    }

    // Getters and Setters
    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Variables getVariables() {
        return variables;
    }

    public void setVariables(Variables variables) {
        this.variables = variables;
    }

    public static class Variables {
        private String username;

        public Variables() {}

        public Variables(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
}
