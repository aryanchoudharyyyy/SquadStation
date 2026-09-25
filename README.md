<div align="center">
  <h1>🚀 CollegeTravel</h1>
  <p><strong>A Next-Generation Microservices Platform for Travel & Community</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Java-21-orange.svg" alt="Java 21" />
    <img src="https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/Spring%20Cloud-Microservices-blue.svg" alt="Spring Cloud" />
    <img src="https://img.shields.io/badge/React-19-blue.svg" alt="React" />
    <img src="https://img.shields.io/badge/Vite-8.x-purple.svg" alt="Vite" />
    <img src="https://img.shields.io/badge/Database-PostgreSQL%20%7C%20H2-blue.svg" alt="Database" />
  </p>
</div>

---

## 📖 What is CollegeTravel?

**CollegeTravel** is a robust, scalable platform designed to bring students and travelers together. With a fully decoupled backend microservices architecture and a modern React frontend, it solves the problem of finding travel companions using intelligent trip-matching algorithms. 

Whether users are commuting to campus, going on long trips, or attending events, CollegeTravel allows them to:
- **Match** with users who have overlapping travel schedules and routes.
- **Form Squads** to travel together safely.
- **Chat in Real-Time** with squad members to coordinate plans via WebSockets.
- **Trade & Connect** via an integrated marketplace.

---

## ✨ Key Features

- **Intelligent Trip Matching**: Advanced algorithms to connect users with overlapping schedules.
- **Concurrency-Safe Group Management**: Atomic and race-condition-free squad creation ensuring strict data integrity.
- **Real-Time Communication**: WebSocket-powered group chats for instant messaging using STOMP/SockJS.
- **Stateless Authentication**: Secure user onboarding and login using JSON Web Tokens (JWT) and OTP email verification.
- **Modern User Interface**: Responsive, interactive UI built with React 19 and Vite.
- **Centralized Configuration**: Environment properties are fully externalized and managed centrally.
- **Resilient**: Implements Circuit Breakers (Resilience4j) to prevent cascading failures across microservices.

---

## 🏛️ System Architecture

### Frontend Layer
- **Client Application (`frontend/`)**: A fast, responsive React Single Page Application (SPA) built with Vite, Axios for API communication, and Lucide React for UI iconography. It uses `@stomp/stompjs` for real-time WebSocket chat connections.

### Backend Microservices
CollegeTravel is composed of multiple specialized Java Spring Boot microservices that communicate seamlessly:
- **API Gateway (`api-gateway`)**: The single entry point for all frontend requests. Handles load balancing and routes traffic to internal microservices (`/api/users/**`, `/api/trips/**`, etc.).
- **Service Discovery (`EurekaService`)**: Powered by Netflix Eureka. Allows all microservices to dynamically register and discover each other without hardcoded IP addresses.
- **Centralized Configuration (`ConfigServer`)**: Manages externalized configuration properties across all environments from a centralized local repository (`config-repo`).
- **User Service (`user-service`)**: Manages user identity, onboarding, email OTP verification, and stateless JWT authentication.
- **Trip Service (`trip-service`)**: Handles trip creation and executes the core intelligent matching logic to connect users.
- **Group Service (`Group-service`)**: Manages user travel squads, featuring atomic and concurrency-safe group creation and member additions.
- **Chat Service (`chat-service`)**: Powers real-time WebSocket communications, allowing squad members to chat instantly.
- **Marketplace Service (`marketplace-service`)**: Handles user-to-user commerce, item trading, and community marketplace features.

---

## 🛠️ Tech Stack

### Frontend
* **Core Library:** React 19
* **Build Tool:** Vite 8
* **Routing:** React Router DOM
* **Networking:** Axios, STOMP.js / SockJS (WebSockets)
* **Icons:** Lucide React

### Backend
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
- **Node.js** (v18+) and **npm** installed.
- **PostgreSQL** running locally on port `5432`.

### 2. Database Setup
Log in to your PostgreSQL instance and run:
```sql
CREATE DATABASE collegetravel_db;
```

### 3. Clone the Repository
```bash
git clone https://github.com/aryanchoudharyyyy/CollegeTravel.git
cd CollegeTravel
```

### 4. Running the Backend Microservices
*Due to the microservices architecture, services must be started in a specific order to ensure they register and fetch configurations correctly.*

Start the services in this exact order:
1. **ConfigServer**: `cd backend/ConfigServer && ./mvnw spring-boot:run`
2. **EurekaService**: `cd backend/EurekaService && ./mvnw spring-boot:run`
3. **api-gateway**: `cd backend/api-gateway && ./mvnw spring-boot:run`
4. **All other services** (`user-service`, `trip-service`, `Group-service`, `chat-service`, `marketplace-service`) can now be started in any order.

### 5. Running the Frontend App
Open a new terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
The React frontend will be accessible at `http://localhost:5173`.

---

## 🔒 Security & Data Protection Note

To enforce industry-standard security practices, all sensitive credentials—such as database passwords, SMTP credentials, and 256-bit JWT secret keys—have been isolated into external configuration files (`config-repo/`) and `.env` files for the frontend, and are strictly excluded from version control via `.gitignore`.
