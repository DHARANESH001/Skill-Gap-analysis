package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leetcode_stats")
public class LeetCodeStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "easy_solved")
    private Integer easySolved;

    @Column(name = "medium_solved")
    private Integer mediumSolved;

    @Column(name = "hard_solved")
    private Integer hardSolved;

    @Column(name = "total_solved")
    private Integer totalSolved;

    @Column(name = "contest_rating")
    private Integer contestRating;

    @Column(name = "contests_attended")
    private Integer contestsAttended;

    @Column(name = "global_ranking")
    private Long globalRanking;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    // Constructors
    public LeetCodeStats() {}

    public LeetCodeStats(User user, Integer easySolved, Integer mediumSolved, Integer hardSolved, 
                         Integer totalSolved, Integer contestRating, Integer contestsAttended, 
                         Long globalRanking) {
        this.user = user;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.totalSolved = totalSolved;
        this.contestRating = contestRating;
        this.contestsAttended = contestsAttended;
        this.globalRanking = globalRanking;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getEasySolved() {
        return easySolved;
    }

    public void setEasySolved(Integer easySolved) {
        this.easySolved = easySolved;
    }

    public Integer getMediumSolved() {
        return mediumSolved;
    }

    public void setMediumSolved(Integer mediumSolved) {
        this.mediumSolved = mediumSolved;
    }

    public Integer getHardSolved() {
        return hardSolved;
    }

    public void setHardSolved(Integer hardSolved) {
        this.hardSolved = hardSolved;
    }

    public Integer getTotalSolved() {
        return totalSolved;
    }

    public void setTotalSolved(Integer totalSolved) {
        this.totalSolved = totalSolved;
    }

    public Integer getContestRating() {
        return contestRating;
    }

    public void setContestRating(Integer contestRating) {
        this.contestRating = contestRating;
    }

    public Integer getContestsAttended() {
        return contestsAttended;
    }

    public void setContestsAttended(Integer contestsAttended) {
        this.contestsAttended = contestsAttended;
    }

    public Long getGlobalRanking() {
        return globalRanking;
    }

    public void setGlobalRanking(Long globalRanking) {
        this.globalRanking = globalRanking;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
