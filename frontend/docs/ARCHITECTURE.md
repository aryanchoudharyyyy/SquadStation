# SquadStation Frontend Architecture

## 1. Tech Stack
* **Framework:** React 19 (via Vite)
* **Routing:** React Router DOM (to be installed)
* **API Client:** Axios (to be installed)
* **WebSockets:** `@stomp/stompjs` + `sockjs-client` (to be installed)
* **State Management:** React Context (for Auth/Tokens) + Local Component State
* **Styling:** Vanilla CSS (for maximum flexibility and rich aesthetics)

## 2. Folder Structure (Proposed)
```text
/src
  /assets        # Images, icons, static assets
  /components    # Reusable UI components (Buttons, Inputs, Cards, etc.)
  /contexts      # React Contexts (e.g., AuthContext)
  /hooks         # Custom hooks (e.g., useAuth, useWebSocket)
  /pages         # Screen components (Login, Home, GroupChat, etc.)
  /services      # API clients (axios setup, endpoint modules)
  /utils         # Helpers (formatting, validators)
  App.jsx        # Main application layout and router setup
  index.css      # Global design tokens and styles
  main.jsx       # Application entry point
```

## 3. Core Mechanisms

### Authentication & Token Management
* Handled globally via an `AuthContext`.
* Tokens (`accessToken` and `refreshToken`) are stored securely.
* An **Axios Interceptor** automatically attaches the `Authorization: Bearer <token>` header to all outgoing requests (except signup/login/otp/refresh).
* On receiving a `401 Unauthorized` response, the interceptor pauses requests, calls the `/api/users/refresh-token` endpoint exactly once, updates the stored tokens, and retries the original request.
* If the refresh call fails, all tokens are cleared and the user is redirected to the Login screen.

### Error Handling Convention
* A global error handler or toast notification system will be used for the standard API error shape:
  `{"timestamp", "status", "error", "message", "path"}`
* The `message` field is user-friendly and will be displayed directly.
* Different HTTP status codes will trigger different UI responses (e.g., `403` -> access denied message, `404` -> remove stale item).

### WebSockets (Chat)
* Connections are initiated *only* when the user mounts a chat screen (Screen 8 or 12).
* The STOMP client handles authorization on the `CONNECT` frame.
* Subscriptions happen *after* successful connection.
* The connection is closed gracefully when the user leaves the chat screen.
* Network disconnections will trigger a visible "Disconnected" state with capped exponential backoff for retrying.
