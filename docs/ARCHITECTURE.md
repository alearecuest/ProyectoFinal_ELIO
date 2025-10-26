# ELIO Architecture Guide

This document describes the technical architecture, design principles, and technology stack of ELIO.

## Table of Contents

- System Overview
- Backend Architecture
- Frontend Architecture
- Data Flow
- Design Decisions
- Security
- Performance and Scalability

---

## System Overview

ELIO follows a client-server architecture:

- **Frontend:** Located in `client/`  
  Built with Angular 20, provides the user interface, multi-step forms, and communicates with the backend via REST API.

- **Backend:** Located in `server/`  
  Built with Fastify and TypeScript, exposes REST endpoints, integrates with AI (Google Gemini), handles business logic and patient intake flow.

---

## Backend Architecture

**Main folder:** `server/`

- **Entry point:** `server/src/app.ts`
- **Routes:** `server/src/routes/`
  - Each medical step (e.g. allergies, antecedents, drugs, etc.) has its own route folder and logic.
  - The `root.ts` and `start/` handle the initial consultation intake.
- **Plugins:** `server/src/plugins/`
  - CORS, Swagger API docs, AI integration, security headers.
- **Stores:** `server/src/stores/`
  - In-memory patient session and state management.
- **Utils:** `server/src/utils/`
  - Utility functions (e.g., parse-string-array).

Backend is modular:
- Each intake step is managed by a route and state store.
- Plugins configure middleware (security, AI, API docs).
- Tests are located in `server/test/`.

---

## Frontend Architecture

**Main folder:** `client/`

- **Entry point:** `client/src/main.ts`, `client/src/main.server.ts`
- **App folder:** `client/src/app/`
  - `components/` — UI components (forms, selectors, etc.)
  - `application/`, `domain/`, `infrastructure/`, `models/`, `presentation/`, `utils/` — organized by responsibility.
  - Routing is managed by `app.routes.ts` and `app.routes.server.ts`
- **Public assets:** `client/public/`
- **Global styles:** `client/src/styles.css`
- **Config and environment:** `client/src/app/config.ts`, `client/src/environments/`

Frontend is modular:
- Angular SSR for SEO and fast loads.
- UI is responsive and multi-step (see User Guide).
- Models and business logic are separated by folder.

---

## Data Flow

1. **User starts a consultation in the frontend (client).**
2. **Form data is POSTed to backend `/start` endpoint.**
3. **Backend processes and responds with options for next step (antecedents, allergies, etc.).**
4. **Frontend displays checkboxes for options and collects user selections.**
5. **Selections are POSTed back to backend for each step.**
6. **Process repeats until all steps are complete and a clinical summary is generated.**

---

## Design Decisions

- **Separation of concerns:** Clearly separate frontend, backend, and documentation.
- **Modular routes:** Each medical intake step is a route in backend.
- **State management:** Patient/session state maintained in backend store.
- **Plugin architecture:** Backend uses Fastify plugins for AI, Swagger, CORS, security.
- **Multi-step UX:** Frontend guides user through each step with dynamic forms.

---

## Security

- Backend: CORS, secure headers (Helmet), API key management for AI, in-memory state.
- Frontend: Angular XSS protection, route guards, environment-based config.

---

## Performance and Scalability

- Fastify backend for high performance.
- Angular SSR for frontend speed.
- Stateless REST endpoints.
- Easy to extend with new medical intake steps.

---
