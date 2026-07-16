# 🚀 SquadStation — Microservices Backend Platform

SquadStation is a robust, scalable backend platform built using **Java**, **Spring Boot**, and **Spring Cloud**. It features a decoupled microservices architecture designed to handle secure user authentication, real-time trip scheduling, and intelligent trip-matching algorithms.

## 🏛️ System Architecture
* **API Gateway (`api-gateway`):** Acts as the single entry point for all client requests. Handles load balancing and routes traffic to internal microservices (`/api/users/**`, `/api/trips/**`).
* **Service Discovery (`EurekaService`):** Powered by Netflix Eureka. Allows microservices to dynamically register and discover each other without hardcoded IP addresses.
* **Centralized Configuration (`ConfigServer`):** Manages externalized configuration properties across all environments from a centralized local repository (`config-repo`).
* **User Service (`user-service`):** Manages user onboarding, email verification via OTP, and stateless authentication using JSON Web Tokens (JWT).
* **Trip Service (`trip-service`):** Handles trip creation and executes intelligent matching logic (featuring midnight wrap-around handling using full date-time windows) to connect users with overlapping travel schedules.

## 🛠️ Tech Stack
* **Core Language:** Java 21
* **Framework:** Spring Boot 3.x, Spring Cloud
* **Service Discovery:** Netflix Eureka
* **API Gateway:** Spring Cloud Gateway (Load Balanced)
* **Security:** Spring Security, Stateless JWT Authentication
* **Database & ORM:** PostgreSQL, Spring Data JPA / Hibernate
* **Build Tool:** Maven

## 🔒 Security & Data Protection Note
To enforce industry-standard security practices, all sensitive credentials—such as database passwords, usernames, and 256-bit JWT secret keys—have been isolated into external configuration files (`config-repo/`) and excluded from version control via `.gitignore`. 

## ⚙️ Local Setup & Installation
1. **Prerequisites:** Java 21, Maven, PostgreSQL running locally on port `5432`.
2. **Database Setup:** Run `CREATE DATABASE squadstation_db;` in PostgreSQL.
3. **Clone the Repository:**
   ```bash
  ### 3. Clone the Repository
```bash
git clone https://github.com/aryanchoudharyyyy/SquadStation.git
cd SquadStation
