-- MySQL Database Setup Script for Skill Analysis Application

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS skill_analysis 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE skill_analysis;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'COORDINATOR', 'ADMIN') NOT NULL,
    department VARCHAR(100),
    year VARCHAR(20),
    roll_number VARCHAR(50),
    join_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Insert default users (password: "password")
INSERT IGNORE INTO users (name, email, username, password, role, department, year, roll_number, join_date) VALUES
('John Doe', 'student@example.com', 'student', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Computer Science', '3rd Year', 'CS2021001', NOW()),
('Jane Smith', 'coordinator@example.com', 'coordinator', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'COORDINATOR', 'Computer Science', NULL, NULL, NOW()),
('Admin User', 'admin@example.com', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'Administration', NULL, NULL, NOW());

-- Show the created users
SELECT * FROM users;
