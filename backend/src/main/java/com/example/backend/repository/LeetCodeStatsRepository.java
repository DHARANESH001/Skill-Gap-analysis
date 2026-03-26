package com.example.backend.repository;

import com.example.backend.entity.LeetCodeStats;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeetCodeStatsRepository extends JpaRepository<LeetCodeStats, Long> {
    
    Optional<LeetCodeStats> findByUser(User user);
    
    Optional<LeetCodeStats> findByUserId(Long userId);
    
    void deleteByUser(User user);
    
    void deleteByUserId(Long userId);
}
