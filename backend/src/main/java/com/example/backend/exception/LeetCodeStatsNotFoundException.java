package com.example.backend.exception;

public class LeetCodeStatsNotFoundException extends RuntimeException {
    
    public LeetCodeStatsNotFoundException(String message) {
        super(message);
    }
    
    public LeetCodeStatsNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
