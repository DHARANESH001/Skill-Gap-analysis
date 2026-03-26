package com.example.backend.exception;

public class CodeChefApiException extends RuntimeException {
    
    public CodeChefApiException(String message) {
        super(message);
    }
    
    public CodeChefApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
