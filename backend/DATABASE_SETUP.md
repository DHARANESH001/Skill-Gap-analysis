# Database Setup Instructions

## MySQL Database Setup for Skill Analysis Application

### Prerequisites
- MySQL Server installed and running
- MySQL command line client or MySQL Workbench

### Step 1: Create Database
Run the following command in MySQL:
```bash
mysql -u root -p < database-setup.sql
```

Or manually execute these commands:
```sql
CREATE DATABASE IF NOT EXISTS skill_analysis 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE skill_analysis;
```

### Step 2: Update Application Configuration
Update the `src/main/resources/application.properties` file with your MySQL credentials:

```properties
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/skill_analysis?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.

### Step 3: Default Users
The application comes with three default users (all with password "password"):

1. **Student**
   - Email: student@example.com
   - Username: student
   - Password: password

2. **Coordinator**
   - Email: coordinator@example.com
   - Username: coordinator
   - Password: password

3. **Admin**
   - Email: admin@example.com
   - Username: admin
   - Password: password

### Step 4: Start the Application
```bash
./mvnw spring-boot:run
```

The application will automatically create/update the database schema on startup.

### Troubleshooting

#### Connection Issues
- Ensure MySQL server is running
- Check if the database `skill_analysis` exists
- Verify username and password in application.properties
- Make sure MySQL is listening on port 3306

#### Schema Issues
- The application uses `spring.jpa.hibernate.ddl-auto=update` which automatically updates the schema
- If you encounter issues, you can set it to `create-drop` to recreate tables (this will delete existing data)

#### Password Hash
The default users use BCrypt hash for the password "password":
```
$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
```

### Additional Notes
- The database uses UTF-8 character set for proper internationalization
- Tables are created with appropriate indexes for performance
- The `updated_at` field automatically updates when records are modified
