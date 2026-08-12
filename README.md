<div align="center">
  <h1>🚀 SquadStation</h1>
  <p><strong>A Next-Generation Microservices Backend Platform for Travel & Community</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Java-21-orange.svg" alt="Java 21" />
    <img src="https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/Spring%20Cloud-Microservices-blue.svg" alt="Spring Cloud" />
    <img src="https://img.shields.io/badge/Database-PostgreSQL%20%7C%20H2-blue.svg" alt="Database" />
  </p>
</div>

---

## 📖 What is SquadStation?

**SquadStation** is a robust, scalable backend platform designed to bring travelers together. Built on a fully decoupled microservices architecture, it solves the problem of finding travel companions by using intelligent trip-matching algorithms. 

Whether users are commuting, going on long trips, or attending events, SquadStation allows them to:
- **Match** with users who have overlapping travel schedules and routes.
- **Form Groups** to travel together safely.
- **Chat in Real-Time** with group members to coordinate plans.
- **Trade & Connect** via an integrated marketplace.

---

## ✨ Key Features

- **Intelligent Trip Matching**: Advanced algorithms (featuring midnight wrap-around handling using full date-time windows) to connect users with overlapping schedules.
- **Concurrency-Safe Group Management**: Atomic and race-condition-free group creation ensuring strict data integrity.
- **Real-Time Communication**: WebSocket-powered group chats for instant messaging.
- **Stateless Authentication**: Secure user onboarding and login using JSON Web Tokens (JWT) and OTP email verification.
- **Centralized Configuration**: Environment properties are fully externalized and managed centrally.
- **Resilient**: Implements Circuit Breakers (Resilience4j) to prevent cascading failures across microservices.

---

## 🏛️ System Architecture

SquadStation is composed of multiple specialized microservices that communicate seamlessly:

* **API Gateway (`api-gateway`)**: The single entry point for all client requests. Handles load balancing and routes traffic to internal microservices (`/api/users/**`, `/api/trips/**`, etc.).
* **Service Discovery (`EurekaService`)**: Powered by Netflix Eureka. Allows all microservices to dynamically register and discover each other without hardcoded IP addresses.
* **Centralized Configuration (`ConfigServer`)**: Manages externalized configuration properties across all environments from a centralized local repository (`config-repo`).
* **User Service (`user-service`)**: Manages user identity, onboarding, email OTP verification, and stateless JWT authentication.
* **Trip Service (`trip-service`)**: Handles trip creation and executes the core intelligent matching logic to connect users.
* **Group Service (`Group-service`)**: Manages user travel groups, featuring atomic and concurrency-safe group creation and member additions.
* **Chat Service (`chat-service`)**: Powers real-time WebSocket communications, allowing group members to chat instantly.
* **Marketplace Service (`marketplace-service`)**: Handles user-to-user commerce, item trading, and community marketplace features.

---

## 🛠️ Tech Stack

* **Core Language:** Java 21
* **Framework:** Spring Boot 3.x, Spring Cloud
* **Service Discovery:** Netflix Eureka
* **API Gateway:** Spring Cloud Gateway
* **Security:** Spring Security, Stateless JWT Authentication
* **Communication:** REST APIs (OpenFeign), WebSockets
* **Resilience:** Resilience4j (Circuit Breaker)
* **Database & ORM:** PostgreSQL (Production), H2 (In-Memory/Dev), Spring Data JPA / Hibernate
* **Build Tool:** Maven

---

## ⚙️ Local Setup & Installation

### 1. Prerequisites
- **Java 21** installed.
- **Maven** installed.
- **PostgreSQL** running locally on port `5432`.

### 2. Database Setup
Log in to your PostgreSQL instance and run:
```sql
CREATE DATABASE squadstation_db;
```

### 3. Clone the Repository
```bash
git clone https://github.com/aryanchoudharyyyy/SquadStation.git
cd SquadStation
```

### 4. Running the Microservices
*Due to the microservices architecture, services must be started in a specific order to ensure they register and fetch configurations correctly.*

Start the services in this exact order:
1. **ConfigServer**: `cd ConfigServer && ./mvnw spring-boot:run`
2. **EurekaService**: `cd EurekaService && ./mvnw spring-boot:run`
3. **api-gateway**: `cd api-gateway && ./mvnw spring-boot:run`
4. **All other services** (`user-service`, `trip-service`, `Group-service`, `chat-service`, `marketplace-service`) can now be started in any order.

---

## 🔒 Security & Data Protection Note

To enforce industry-standard security practices, all sensitive credentials—such as database passwords, SMTP credentials, and 256-bit JWT secret keys—have been isolated into external configuration files (`config-repo/`) and are strictly excluded from version control via `.gitignore`.
