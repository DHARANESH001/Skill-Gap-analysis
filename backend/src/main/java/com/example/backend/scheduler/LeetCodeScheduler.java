package com.example.backend.scheduler;

import com.example.backend.service.LeetCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LeetCodeScheduler {

    private static final Logger logger = LoggerFactory.getLogger(LeetCodeScheduler.class);

    @Autowired
    private LeetCodeService leetCodeService;

    /**
     * Scheduled job to update LeetCode stats for all users
     * Runs every 24 hours at 2:00 AM
     */
    @Scheduled(cron = "0 0 2 * * ?")
    public void updateAllLeetCodeStats() {
        logger.info("Starting scheduled LeetCode stats update job");
        
        try {
            leetCodeService.updateAllUserStats();
            logger.info("Successfully completed scheduled LeetCode stats update job");
        } catch (Exception e) {
            logger.error("Error during scheduled LeetCode stats update job", e);
        }
    }

    /**
     * Scheduled job to update LeetCode stats every 6 hours (for more frequent updates)
     * You can uncomment this if you want more frequent updates
     */
    // @Scheduled(cron = "0 0 */6 * * ?")
    // public void updateAllLeetCodeStatsEvery6Hours() {
    //     logger.info("Starting 6-hour scheduled LeetCode stats update job");
    //     
    //     try {
    //         leetCodeService.updateAllUserStats();
    //         logger.info("Successfully completed 6-hour scheduled LeetCode stats update job");
    //     } catch (Exception e) {
    //         logger.error("Error during 6-hour scheduled LeetCode stats update job", e);
    //     }
    // }

    /**
     * Test method to trigger the scheduler manually (for testing purposes)
     * This can be called via a controller endpoint for testing
     */
    public void triggerUpdateJob() {
        logger.info("Manually triggering LeetCode stats update job");
        
        try {
            leetCodeService.updateAllUserStats();
            logger.info("Successfully completed manual LeetCode stats update job");
        } catch (Exception e) {
            logger.error("Error during manual LeetCode stats update job", e);
            throw e;
        }
    }
}
