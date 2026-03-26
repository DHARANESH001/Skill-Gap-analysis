package com.example.backend.exception;

import com.example.backend.dto.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.HttpServerErrorException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handle LeetCode API exceptions
     */
    @ExceptionHandler(LeetCodeApiException.class)
    public ResponseEntity<MessageResponse> handleLeetCodeApiException(LeetCodeApiException e) {
        logger.error("LeetCode API error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(new MessageResponse("LeetCode API error: " + e.getMessage()));
    }

    
    /**
     * Handle CodeChef API exceptions
     */
    @ExceptionHandler(CodeChefApiException.class)
    public ResponseEntity<MessageResponse> handleCodeChefApiException(CodeChefApiException e) {
        logger.error("CodeChef API error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(new MessageResponse("CodeChef API error: " + e.getMessage()));
    }

    /**
     * Handle user not found exceptions
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<MessageResponse> handleUserNotFoundException(UserNotFoundException e) {
        logger.error("User not found: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("User not found: " + e.getMessage()));
    }

    /**
     * Handle LeetCode stats not found exceptions
     */
    @ExceptionHandler(LeetCodeStatsNotFoundException.class)
    public ResponseEntity<MessageResponse> handleLeetCodeStatsNotFoundException(LeetCodeStatsNotFoundException e) {
        logger.error("LeetCode stats not found: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("LeetCode stats not found: " + e.getMessage()));
    }

    /**
     * Handle HTTP client errors (4xx from external APIs)
     */
    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<MessageResponse> handleHttpClientErrorException(HttpClientErrorException e) {
        logger.error("HTTP client error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
        return ResponseEntity.status(e.getStatusCode())
                .body(new MessageResponse("External API error: " + e.getResponseBodyAsString()));
    }

    /**
     * Handle HTTP server errors (5xx from external APIs)
     */
    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<MessageResponse> handleHttpServerErrorException(HttpServerErrorException e) {
        logger.error("HTTP server error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(new MessageResponse("External service unavailable: " + e.getResponseBodyAsString()));
    }

    /**
     * Handle resource access exceptions (network issues)
     */
    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<MessageResponse> handleResourceAccessException(ResourceAccessException e) {
        logger.error("Resource access error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new MessageResponse("Service temporarily unavailable. Please try again later."));
    }

    /**
     * Handle access denied exceptions
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<MessageResponse> handleAccessDeniedException(AccessDeniedException e) {
        logger.error("Access denied: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new MessageResponse("Access denied: You don't have permission to perform this action"));
    }

    /**
     * Handle illegal argument exceptions
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<MessageResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        logger.error("Illegal argument: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Invalid input: " + e.getMessage()));
    }

    /**
     * Handle general runtime exceptions
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<MessageResponse> handleRuntimeException(RuntimeException e) {
        logger.error("Runtime error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("An error occurred: " + e.getMessage()));
    }

    /**
     * Handle all other exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleGenericException(Exception e) {
        logger.error("Unexpected error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("An unexpected error occurred. Please try again later."));
    }
}
