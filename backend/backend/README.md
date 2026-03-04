# Skill Gap Analysis Backend

This is the backend for the Skill Gap Analysis application, built with Spring Boot and JWT authentication.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (USER, ADMIN)
- RESTful API endpoints
- MySQL database integration

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Test Endpoints
- `GET /api/test/all` - Public access
- `GET /api/test/user` - User role required
- `GET /api/test/admin` - Admin role required

## Setup Instructions

### Prerequisites
- Java 17
- Maven 3.6+
- MySQL 8.0+

### Database Setup
1. Install MySQL Server
2. Create a database named `skillgap_db`
3. Update database credentials in `application.properties` if needed

```sql
CREATE DATABASE skillgap_db;
```

### Running the Application
1. Navigate to the backend directory
2. Run: `mvn spring-boot:run`
3. The application will start on `http://localhost:8080`

## Configuration

### MySQL Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillgap_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

### JWT Configuration
```properties
skillgap.app.jwtSecret=skillGapSecretKeyForJWTTokenGeneration
skillgap.app.jwtExpirationMs=86400000
```

## H2 Console Access

1. Go to `http://localhost:8080/h2-console`
2. Use these credentials:
   - **JDBC URL**: `jdbc:h2:mem:skillgapdb`
   - **User Name**: `sa`
   - **Password**: `password`

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Access protected endpoint
```bash
curl -X GET http://localhost:8080/api/test/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Default Users

The application comes with two pre-configured users:

- **Admin**: username=`admin`, password=`password`
- **Test User**: username=`testuser`, password=`password`

## Project Structure

```
src/main/java/com/example/backend/
├── config/          # Security and web configuration
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── entity/         # JPA entities
├── repository/     # Data access layer
├── security/       # JWT and security components
└── service/        # Business logic layer

src/main/resources/
├── application.properties  # Application configuration
└── data.sql               # Sample data initialization
```
