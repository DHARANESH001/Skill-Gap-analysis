-- Insert default users for testing
INSERT INTO users (name, email, username, password, role, department, year, roll_number, join_date, created_at, updated_at) VALUES
('John Doe', 'student@example.com', 'student', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Computer Science', '3rd Year', 'CS2021001', NOW(), NOW(), NOW()),
('Jane Smith', 'coordinator@example.com', 'coordinator', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'COORDINATOR', 'Computer Science', NULL, NULL, NOW(), NOW(), NOW()),
('Admin User', 'admin@example.com', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'Administration', NULL, NULL, NOW(), NOW(), NOW());

-- Note: The password hash is for "password" using BCrypt
