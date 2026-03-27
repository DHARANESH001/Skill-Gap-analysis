package com.example.backend.dto;

import java.util.List;

public class UserStatisticsResponse {
    private Long totalStudents;
    private Long totalUsers;
    private Long activeUsers;
    private Double averageSkillScore;
    private String strongestSkill;
    private String weakestSkill;
    private List<DepartmentStats> departmentStats;
    private List<RoleStats> roleStats;

    // Inner class for department statistics
    public static class DepartmentStats {
        private String department;
        private Long studentCount;
        private Double averageScore;
        private Long activeCount;

        public DepartmentStats(String department, Long studentCount, Double averageScore, Long activeCount) {
            this.department = department;
            this.studentCount = studentCount;
            this.averageScore = averageScore;
            this.activeCount = activeCount;
        }

        // Getters and Setters
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public Long getStudentCount() { return studentCount; }
        public void setStudentCount(Long studentCount) { this.studentCount = studentCount; }
        public Double getAverageScore() { return averageScore; }
        public void setAverageScore(Double averageScore) { this.averageScore = averageScore; }
        public Long getActiveCount() { return activeCount; }
        public void setActiveCount(Long activeCount) { this.activeCount = activeCount; }
    }

    // Inner class for role statistics
    public static class RoleStats {
        private String role;
        private Long count;

        public RoleStats(String role, Long count) {
            this.role = role;
            this.count = count;
        }

        // Getters and Setters
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public Long getCount() { return count; }
        public void setCount(Long count) { this.count = count; }
    }

    // Constructors
    public UserStatisticsResponse() {}

    public UserStatisticsResponse(Long totalStudents, Long totalUsers, Long activeUsers, Double averageSkillScore, 
                               String strongestSkill, String weakestSkill, List<DepartmentStats> departmentStats, 
                               List<RoleStats> roleStats) {
        this.totalStudents = totalStudents;
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.averageSkillScore = averageSkillScore;
        this.strongestSkill = strongestSkill;
        this.weakestSkill = weakestSkill;
        this.departmentStats = departmentStats;
        this.roleStats = roleStats;
    }

    // Getters and Setters
    public Long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Long totalStudents) { this.totalStudents = totalStudents; }

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(Long activeUsers) { this.activeUsers = activeUsers; }

    public Double getAverageSkillScore() { return averageSkillScore; }
    public void setAverageSkillScore(Double averageSkillScore) { this.averageSkillScore = averageSkillScore; }

    public String getStrongestSkill() { return strongestSkill; }
    public void setStrongestSkill(String strongestSkill) { this.strongestSkill = strongestSkill; }

    public String getWeakestSkill() { return weakestSkill; }
    public void setWeakestSkill(String weakestSkill) { this.weakestSkill = weakestSkill; }

    public List<DepartmentStats> getDepartmentStats() { return departmentStats; }
    public void setDepartmentStats(List<DepartmentStats> departmentStats) { this.departmentStats = departmentStats; }

    public List<RoleStats> getRoleStats() { return roleStats; }
    public void setRoleStats(List<RoleStats> roleStats) { this.roleStats = roleStats; }
}
