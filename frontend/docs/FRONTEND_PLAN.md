# SquadStation Frontend Plan

This plan is synthesized from the **Original Frontend Build Guide** and the **Updated Frontend Build Guide (Revision 2)**. The Updated Guide serves as the primary source of truth for production-grade flows (auth, pagination, websockets) overriding the optimistic paths in the original.

## 1. Resolved Conflicts & Overrides (Updated > Original)
* **Authentication**: Token refresh on 401 is strict. Exactly one attempt. If failed, logout immediately. We store both tokens securely.
* **OTP Flow**: OTP is verified ONLY when tokens are returned. No optimistic redirect.
* **WebSockets**: We connect to WS *only* on chat screens and subscribe *after* connection/auth success. We use STOMP over SockJS and handle disconnects with capped exponential backoff.
* **Marketplace API**: Always use `/api/marketplace/**` via API Gateway, rather than direct service paths.
* **Pagination**: Lists must use explicit page boundaries or infinite scroll. No fetching entire datasets.

## 2. Pages & Screens Roadmap
1. **Screen 1: Splash / Auto-login** (Token check)
2. **Screen 4 & 2: Login & Signup** (Email collection, initial auth steps)
3. **Screen 3: OTP Verification** (Finalizing auth, saving tokens)
4. **Screen 5: Home / Dashboard** (Central navigation hub)
5. **Screen 6 & 7: Trip Management** (Post a Trip, Trip Matches)
6. **Screen 8: Group Chat** (WebSocket-based group communication)
7. **Screen 9, 10, 11: Marketplace** (Browse, Post Listing, Listing Detail)
8. **Screen 12: Listing Chat** (1-on-1 WebSocket chat)
9. **Screen 13: My Trips / Listings / Profile** (User management and record keeping)

## 3. Implementation Order
We will implement features progressively to support your React learning journey.
* **Phase 1: Foundation & Routing** (Setup Router, basic screen scaffolding)
* **Phase 2: Authentication Flow** (Splash, Login, Signup, OTP, Token Management)
* **Phase 3: Core Navigation & Home** (Layouts, protected routes)
* **Phase 4: API Integration Foundation** (Axios interceptors for token refresh, error handling)
* **Phase 5: Trips & Marketplace (CRUD)** (Forms, Validation, Listing views)
* **Phase 6: WebSockets & Chat** (STOMP integration, real-time messaging)
