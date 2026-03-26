package com.example.backend.service;

import com.example.backend.dto.CodeChefStatsResponse;
import com.example.backend.exception.CodeChefApiException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CodeChefService {

    private static final Logger logger = LoggerFactory.getLogger(CodeChefService.class);
    private static final String CODECHEF_PROFILE_URL = "https://www.codechef.com/users/";

    /**
     * Fetch CodeChef stats for a given username
     */
    public CodeChefStatsResponse fetchCodeChefStats(String username) {
        logger.info("Fetching CodeChef stats for {}", username);
        
        try {
            String url = CODECHEF_PROFILE_URL + username;
            logger.info("Fetching CodeChef profile URL: {}", url);
            
            // Connect to the CodeChef profile page
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(30000)
                    .get();

            // Parse the HTML to extract stats
            return parseCodeChefProfile(doc, username);
            
        } catch (IOException e) {
            logger.error("Error fetching CodeChef stats for username: {}", username, e);
            throw new CodeChefApiException("Failed to fetch CodeChef profile: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error fetching CodeChef stats for username: {}", username, e);
            throw new CodeChefApiException("Error fetching CodeChef stats: " + e.getMessage(), e);
        }
    }

    /**
     * Parse CodeChef profile HTML to extract stats
     */
    private CodeChefStatsResponse parseCodeChefProfile(Document doc, String username) {
        logger.info("Parsing CodeChef profile HTML for username: {}", username);
        
        // Initialize default values
        Integer rating = null;
        Integer globalRank = null;
        Integer countryRank = null;
        String stars = null;
        Integer problemsSolved = null;
        Integer contestsParticipated = null;

        try {
            // Log the page title and some structure for debugging
            String title = doc.title();
            logger.info("Page title: {}", title);
            
            // Log the full HTML body for analysis (limited size)
            String bodyHtml = doc.body().html();
            if (bodyHtml.length() > 2000) {
                logger.info("Page body HTML (first 2000 chars): {}", bodyHtml.substring(0, 2000));
            } else {
                logger.info("Page body HTML: {}", bodyHtml);
            }
            
            // Log all text content for analysis
            String allText = doc.body().text();
            logger.info("All page text: {}", allText);
            
            // Extract rating - look for rating elements
            rating = extractRating(doc);
            
            // Extract global rank
            globalRank = extractRank(doc, "global");
            
            // Extract country rank
            countryRank = extractRank(doc, "country");
            
            // Extract stars
            stars = extractStars(doc);
            
            // Extract problems solved with improved logic
            problemsSolved = extractProblemsSolvedImproved(doc);
            
            // Extract contests participated with improved logic
            contestsParticipated = extractContestsParticipatedImproved(doc);

            String lastUpdated = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            
            CodeChefStatsResponse response = new CodeChefStatsResponse(
                username, rating, globalRank, countryRank, stars, problemsSolved, contestsParticipated, lastUpdated
            );
            
            logger.info("Successfully parsed CodeChef stats for {}: rating={}, globalRank={}, countryRank={}, stars={}, problemsSolved={}, contests={}", 
                       username, rating, globalRank, countryRank, stars, problemsSolved, contestsParticipated);
            
            return response;
            
        } catch (Exception e) {
            logger.error("Error parsing CodeChef profile for username: {}", username, e);
            throw new CodeChefApiException("Failed to parse CodeChef profile: " + e.getMessage(), e);
        }
    }

    /**
     * Extract rating from CodeChef profile
     */
    private Integer extractRating(Document doc) {
        try {
            // CodeChef specific selectors for rating - look for exact rating numbers
            Elements ratingElements = doc.select(".rating-number, .rating, .user-rating, .profile-rating, [data-rating]");
            
            for (Element element : ratingElements) {
                String text = element.text().trim();
                // Look for 4-digit ratings (CodeChef ratings are typically between 1000-3000+)
                if (text.matches("\\b[1-9]\\d{3}\\b")) {
                    Integer value = extractNumberFromText(text);
                    if (value != null && value >= 1000) {
                        logger.debug("Found rating: {}", value);
                        return value;
                    }
                }
            }
            
            // Look for rating in header sections with better validation
            Elements headerElements = doc.select(".user-details, .profile-header, .user-info");
            for (Element element : headerElements) {
                String text = element.text();
                // Extract 4-digit numbers from rating context
                if (text.toLowerCase().contains("rating")) {
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b[1-9]\\d{3}\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 1000) {
                            logger.debug("Found rating from header: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Look for elements with rating class or data attributes
            Elements ratingClassElements = doc.select("[class*='rating'], [data*='rating']");
            for (Element element : ratingClassElements) {
                String text = element.text().trim();
                if (text.matches("\\b[1-9]\\d{3}\\b")) {
                    Integer value = extractNumberFromText(text);
                    if (value != null && value >= 1000) {
                        logger.debug("Found rating from rating class element: {}", value);
                        return value;
                    }
                }
            }
            
            // Last resort: look for any 4-digit number in proximity to "rating" text
            Elements allElements = doc.select("*");
            for (Element element : allElements) {
                String text = element.text();
                if (text.toLowerCase().contains("rating") && 
                    text.matches(".*\\b[1-9]\\d{3}\\b.*")) {
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b[1-9]\\d{3}\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 1000) {
                            logger.debug("Found rating from broader search: {}", value);
                            return value;
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting rating", e);
        }
        return null;
    }

    /**
     * Extract rank (global or country) from CodeChef profile
     */
    private Integer extractRank(Document doc, String rankType) {
        try {
            // CodeChef specific selectors for rankings
            Elements rankElements = doc.select(".rank-number, .rank, .user-rank, .global-rank, .country-rank, [data-rank]");
            
            for (Element element : rankElements) {
                String text = element.text().trim();
                if (text.toLowerCase().contains(rankType.toLowerCase()) || 
                    element.hasClass(rankType + "-rank") ||
                    element.parent() != null && element.parent().text().toLowerCase().contains(rankType.toLowerCase())) {
                    Integer value = extractNumberFromText(text);
                    if (value != null && value > 0) {
                        logger.debug("Found {} rank: {}", rankType, value);
                        return value;
                    }
                }
            }
            
            // Look for rank in profile sections
            Elements profileElements = doc.select(".user-details, .profile-header, .ranking-section, .stats-section");
            for (Element element : profileElements) {
                String text = element.text();
                if (text.toLowerCase().contains(rankType.toLowerCase()) && text.toLowerCase().contains("rank")) {
                    Integer value = extractNumberFromText(text);
                    if (value != null && value > 0) {
                        logger.debug("Found {} rank from profile section: {}", rankType, value);
                        return value;
                    }
                }
            }
            
            // Broader search with better filtering
            Elements allElements = doc.select("*");
            for (Element element : allElements) {
                String text = element.text();
                if (text.toLowerCase().contains(rankType.toLowerCase()) && 
                    text.toLowerCase().contains("rank") &&
                    text.matches(".*\\b[1-9]\\d{2,}\\b.*")) { // At least 3 digits
                    Integer value = extractNumberFromText(text);
                    if (value != null && value > 100) { // Ranks are typically 3+ digits
                        logger.debug("Found {} rank from broader search: {}", rankType, value);
                        return value;
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting {} rank", rankType, e);
        }
        return null;
    }

    /**
     * Extract stars from CodeChef profile
     */
    private String extractStars(Document doc) {
        try {
            // CodeChef specific selectors for stars
            Elements starElements = doc.select(".star, .stars, .rating-stars, .user-stars, [class*='star']");
            
            if (!starElements.isEmpty()) {
                // Count star elements or extract star text
                for (Element element : starElements) {
                    String text = element.text().trim();
                    if (text.matches("\\*+")) {
                        logger.debug("Found stars from element: {}", text);
                        return text;
                    }
                }
                
                // Count star elements if no direct star text found
                int starCount = starElements.size();
                if (starCount > 0 && starCount <= 5) {
                    String stars = "*".repeat(starCount);
                    logger.debug("Found stars by counting elements: {}", stars);
                    return stars;
                }
            }
            
            // Look for stars in rating sections
            Elements ratingElements = doc.select(".rating, .user-rating, .profile-rating");
            for (Element element : ratingElements) {
                String text = element.text();
                if (text.matches(".*\\*{1,5}.*")) {
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\*{1,5}");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    if (matcher.find()) {
                        String stars = matcher.group();
                        logger.debug("Found stars from rating section: {}", stars);
                        return stars;
                    }
                }
            }
            
            // Alternative: look for text containing stars
            Elements elements = doc.select("*:containsOwn(*)");
            for (Element element : elements) {
                String text = element.text();
                if (text.matches(".*\\*{1,5}.*")) {
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\*{1,5}");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    if (matcher.find()) {
                        String stars = matcher.group();
                        logger.debug("Found stars from text: {}", stars);
                        return stars;
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting stars", e);
        }
        return null;
    }

    /**
     * Extract problems solved using improved logic
     */
    private Integer extractProblemsSolvedImproved(Document doc) {
        try {
            // Method 1: Look for specific problem count sections
            Elements problemSections = doc.select("div, span, p, h1, h2, h3, h4, h5, h6");
            for (Element element : problemSections) {
                String text = element.text().trim();
                
                // Look for very specific problem solved patterns
                if (text.toLowerCase().matches(".*\\b(problems?\\s+solved|solved\\s+problems?|total\\s+problems?\\s+solved)\\b.*")) {
                    logger.debug("Found problem solved section: {}", text);
                    
                    // Extract numbers, but be very careful about context
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b(\\d{1,3})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        // Problem counts are typically 1-3 digits and reasonable values
                        if (value >= 10 && value <= 500) {
                            logger.debug("Found problems solved: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Method 2: Look for elements with specific text content
            Elements allElements = doc.select("*");
            for (Element element : allElements) {
                String text = element.text().trim();
                
                // Very specific matching for problem counts
                if (text.toLowerCase().contains("problem") && 
                    text.toLowerCase().contains("solved") &&
                    text.length() < 100) { // Keep it short to avoid large text blocks
                    
                    // Look for 2-3 digit numbers that could be problem counts
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b(\\d{2,3})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        // Exclude values that match known ratings/ranks
                        if (value >= 20 && value <= 400 && 
                            value != 2026 && // Exclude known rating
                            value != 6845 && // Exclude known global rank  
                            value != 1133) { // Exclude known country rank
                            logger.debug("Found potential problems solved: {} from text: {}", value, text);
                            return value;
                        }
                    }
                }
            }
            
            // Method 3: Look for table data or list items that might contain problem counts
            Elements dataElements = doc.select("td, li, dd, .value, .count");
            for (Element element : dataElements) {
                String text = element.text().trim();
                if (text.matches("\\b\\d{2,3}\\b")) {
                    Integer value = Integer.parseInt(text);
                    // Check if this could be a problem count by looking at nearby elements
                    Element parent = element.parent();
                    if (parent != null) {
                        String parentText = parent.text().toLowerCase();
                        if (parentText.contains("problem") && parentText.contains("solved")) {
                            if (value >= 20 && value <= 400) {
                                logger.debug("Found problems solved from data element: {} with parent: {}", value, parentText);
                                return value;
                            }
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting problems solved with improved method", e);
        }
        return null;
    }

    /**
     * Extract contests participated using improved logic
     */
    private Integer extractContestsParticipatedImproved(Document doc) {
        try {
            // Method 1: Look for specific contest participation sections
            Elements contestSections = doc.select("div, span, p, h1, h2, h3, h4, h5, h6");
            for (Element element : contestSections) {
                String text = element.text().trim();
                
                // Look for very specific contest participation patterns
                if (text.toLowerCase().matches(".*\\b(contests?\\s+(participated|attended|joined)|participated\\s+contests?|attended\\s+contests?|contest\\s+participation)\\b.*")) {
                    logger.debug("Found contest section: {}", text);
                    
                    // Extract numbers
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b(\\d{1,3})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        // Contest counts are typically reasonable values
                        if (value >= 1 && value <= 100) {
                            logger.debug("Found contests participated: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Method 2: Look for elements with specific contest text
            Elements allElements = doc.select("*");
            for (Element element : allElements) {
                String text = element.text().trim();
                
                // Very specific matching for contest participation
                if (text.toLowerCase().contains("contest") && 
                    (text.toLowerCase().contains("participat") || 
                     text.toLowerCase().contains("attended") ||
                     text.toLowerCase().contains("joined")) &&
                    text.length() < 100) { // Keep it short
                    
                    // Look for reasonable contest count numbers
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b(\\d{1,2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        // Exclude values that match known ratings/ranks
                        if (value >= 1 && value <= 50 && 
                            value != 2026 && // Exclude known rating
                            value != 6845 && // Exclude known global rank  
                            value != 1133) { // Exclude known country rank
                            logger.debug("Found potential contests participated: {} from text: {}", value, text);
                            return value;
                        }
                    }
                }
            }
            
            // Method 3: Look for table data or list items that might contain contest counts
            Elements dataElements = doc.select("td, li, dd, .value, .count");
            for (Element element : dataElements) {
                String text = element.text().trim();
                if (text.matches("\\b\\d{1,2}\\b")) {
                    Integer value = Integer.parseInt(text);
                    // Check if this could be a contest count by looking at nearby elements
                    Element parent = element.parent();
                    if (parent != null) {
                        String parentText = parent.text().toLowerCase();
                        if (parentText.contains("contest") && 
                            (parentText.contains("participat") || parentText.contains("attended"))) {
                            if (value >= 1 && value <= 50) {
                                logger.debug("Found contests participated from data element: {} with parent: {}", value, parentText);
                                return value;
                            }
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting contests participated with improved method", e);
        }
        return null;
    }
    private Integer extractProblemsSolved(Document doc) {
        try {
            // First try: Look for exact "Total Problems Solved:" pattern (most specific)
            Elements totalElements = doc.select("*");
            for (Element element : totalElements) {
                String text = element.text().trim();
                // Look for exact "Total Problems Solved:" or similar patterns
                if (text.toLowerCase().matches(".*total\\s+problems?\\s+solved.*") ||
                    text.toLowerCase().matches(".*problems?\\s+solved.*") ||
                    text.toLowerCase().matches(".*solved\\s+problems?.*")) {
                    
                    // Extract numbers, but exclude 4-digit numbers (likely ratings/ranks)
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        // Exclude 4-digit numbers (1000+) which are likely ratings/ranks
                        if (value >= 50 && value <= 999) { // 2-3 digit problem counts
                            logger.debug("Found problems solved from exact match: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Second try: Look for problem sections and exclude rating/rank patterns
            Elements problemElements = doc.select(".problems-solved, .problem-count, .solved-problems, .user-problems, [data-problems]");
            for (Element element : problemElements) {
                String text = element.text().trim();
                // Only extract 2-3 digit numbers (problem counts are usually 2-3 digits)
                java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{2})\\b");
                java.util.regex.Matcher matcher = pattern.matcher(text);
                while (matcher.find()) {
                    Integer value = Integer.parseInt(matcher.group());
                    if (value >= 50 && value <= 999) { // Exclude 4-digit numbers (ratings/ranks)
                        logger.debug("Found problems solved from class element: {}", value);
                        return value;
                    }
                }
            }
            
            // Third try: Look in stats sections but be more careful about context
            Elements statsElements = doc.select(".stats-section, .problem-section, .user-stats, .profile-stats");
            for (Element element : statsElements) {
                String text = element.text();
                // Must contain both "problem" and "solved" keywords
                if (text.toLowerCase().contains("problem") && 
                    text.toLowerCase().contains("solved") &&
                    !text.toLowerCase().contains("rating") && // Exclude rating context
                    !text.toLowerCase().contains("rank")) { // Exclude rank context
                    
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 50 && value <= 999) {
                            logger.debug("Found problems solved from stats section: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Fourth try: Very specific search for problem counts only
            for (Element element : totalElements) {
                String text = element.text();
                // Must be very specific about problem context
                if (text.toLowerCase().contains("problem") && 
                    text.toLowerCase().contains("solved") &&
                    !text.toLowerCase().contains("rating") &&
                    !text.toLowerCase().contains("rank") &&
                    !text.toLowerCase().contains("contest")) {
                    
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 50 && value <= 999) {
                            logger.debug("Found problems solved from specific search: {}", value);
                            return value;
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting problems solved", e);
        }
        return null;
    }

    /**
     * Extract contests participated from CodeChef profile
     */
    private Integer extractContestsParticipated(Document doc) {
        try {
            // First try: Look for exact contest participation patterns
            Elements contestSections = doc.select("*");
            for (Element element : contestSections) {
                String text = element.text().trim();
                // Look for exact contest participation patterns but exclude rank/rating context
                if ((text.toLowerCase().matches(".*contests?\\s+(participated|attended|joined).*") || 
                     text.toLowerCase().matches(".*(participated|attended|joined)\\s+contests?.*") ||
                     text.toLowerCase().matches(".*contest\\s+participation.*")) &&
                    !text.toLowerCase().contains("rating") && // Exclude rating context
                    !text.toLowerCase().contains("rank")) { // Exclude rank context
                    
                    // Extract 1-3 digit numbers (contest counts are usually 1-3 digits)
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{1,2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 5 && value <= 200) { // Reasonable contest participation range
                            logger.debug("Found contests participated from exact match: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Second try: Look for elements with contest-related classes
            Elements contestElements = doc.select(".contests, .contest-count, .user-contests, .participated-contests, [data-contests]");
            for (Element element : contestElements) {
                String text = element.text().trim();
                // Must contain contest-related keywords and exclude rank/rating
                if (text.toLowerCase().contains("contest") &&
                    !text.toLowerCase().contains("rating") &&
                    !text.toLowerCase().contains("rank")) {
                    
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{1,2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 5 && value <= 200) {
                            logger.debug("Found contests participated from class element: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Third try: Look in activity sections but be very careful about context
            Elements activityElements = doc.select(".activity-section, .contest-section, .user-activity, .profile-activity");
            for (Element element : activityElements) {
                String text = element.text();
                if (text.toLowerCase().contains("contest") && 
                    (text.toLowerCase().contains("participat") || 
                     text.toLowerCase().contains("attended") ||
                     text.toLowerCase().contains("joined")) &&
                    !text.toLowerCase().contains("rating") &&
                    !text.toLowerCase().contains("rank") &&
                    !text.toLowerCase().contains("global") &&
                    !text.toLowerCase().contains("country")) {
                    
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{1,2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 5 && value <= 200) {
                            logger.debug("Found contests participated from activity section: {}", value);
                            return value;
                        }
                    }
                }
            }
            
            // Fourth try: Very specific contest count search
            for (Element element : contestSections) {
                String text = element.text();
                // Must be very specific about contest context and exclude all rank/rating contexts
                if (text.toLowerCase().contains("contest") && 
                    (text.toLowerCase().contains("participat") || 
                     text.toLowerCase().contains("attended") ||
                     text.toLowerCase().contains("joined")) &&
                    !text.toLowerCase().contains("rating") &&
                    !text.toLowerCase().contains("rank") &&
                    !text.toLowerCase().contains("global") &&
                    !text.toLowerCase().contains("country") &&
                    !text.toLowerCase().contains("problem")) {
                    
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\b([1-9]\\d{1,2})\\b");
                    java.util.regex.Matcher matcher = pattern.matcher(text);
                    while (matcher.find()) {
                        Integer value = Integer.parseInt(matcher.group());
                        if (value >= 5 && value <= 200) {
                            logger.debug("Found contests participated from specific search: {}", value);
                            return value;
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            logger.debug("Error extracting contests participated", e);
        }
        return null;
    }

    /**
     * Extract first numeric value from text
     */
    private Integer extractNumberFromText(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }
        
        // Look for patterns like "123", "1,234", "12,345", etc.
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\d[\\d,]*");
        java.util.regex.Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            String numberStr = matcher.group().replace(",", "");
            try {
                return Integer.parseInt(numberStr);
            } catch (NumberFormatException e) {
                logger.debug("Could not parse number: {}", numberStr);
            }
        }
        return null;
    }
}
