# 🌿 Path to Peace — Full-Stack Meditative Editorial

**Path to Peace** is a digital sanctuary designed as a "Meditative Editorial." It offers a serene, premium experience for spiritual seekers, blending modern design aesthetics (glassmorphism, subtle micro-animations, and balanced typography) with classical wisdom.

The project is structured as a robust **pnpm-workspace monorepo** consisting of a fast, modern **Next.js frontend** and a high-performance **Express.js API server** backed by **Cloud Firestore**, secured with **Better Auth (Firestore Adapter)**, and integrated with the **SSLCommerz** payment gateway.

---

## 🎨 The Design Philosophy: "The Meditative Editorial"

The system adheres to a premium design system tailored for tranquility:
*   **Intentional Asymmetry:** Layouts that breathe through expansive negative space, preventing clutter.
*   **Tonal Layering:** Visual depth achieved through subtle, light-themed color shifts and glassmorphic elevations rather than harsh shadows.
*   **The Emerald & Cream Palette:** A curated, harmonious color scheme:
    *   **Deep Emerald** (`#003527`) – Representing growth, life, and spiritual guidance.
    *   **Luminous Cream** (`#fbf9f5`) – Emitting a soft, welcoming light that reduces eye strain.
*   **Elegant Typography:** A contrast between the soul-stirring *Noto Serif* (for classical verses, duas, and quotes) and the architectural *Plus Jakarta Sans* (for navigation, structures, and modern data).

---

## ✨ Key Features

### 👤 User Dashboard
*   **Personalized Profile Sanctuary:** A custom interface showing enrolled courses, progress, and saved spiritual guidance.
*   **Saved Collections:** Separate tabs to browse and manage saved **Duas**, **Quranic Verses (Ayahs)**, and emotional states configured in the **Feeling Tool**.

### 🌿 The Feeling Tool (Spiritual Therapy)
*   An interactive, meditative feature designed to cultivate inner emotional balance.
*   Users choose their current state of mind or heart (e.g., *Sad*, *Anxious*, *Grateful*, *Stressed*).
*   The system dynamically maps their selected feeling to authentic Quranic verses, prophetic Duas, and targeted spiritual exercises.

### 📖 Quran & Dua Explorer
*   **Tranquil Reading Experience:** Distraction-free Quran surah reader with clean translation, transliteration, and a quick-save utility.
*   **Structured Duas:** Authentically sourced Duas organized by category (e.g., Morning & Evening, Protection, Guidance), accompanied by Arabic scripts and phonetic guides.

### 🎓 Courses & E-Learning Portal
*   **Interactive Courses:** Designed to cultivate peace, mindfulness, and theological wisdom.
*   **SSLCommerz Gateway Integration:** Direct integration with Bangladesh's premier payment gateway supporting automatic checkouts and robust transactions.

### 🛡️ Secure Full-Stack Authentication
*   Fully powered by **Better Auth** using the official Firestore adapter (`better-auth-firestore`).
*   Secure role-based access control (**Admin** vs **User** roles) enforced both client-side via React hooks and server-side via custom Express middleware.

### 📊 Administrative Management Suite (CRUD)
*   **Dashboard Stats:** Comprehensive real-time metrics showing registration rates, enrollment counts, course revenue, and popular duas/feelings.
*   **User Management:** View registered users, assign roles, and delete accounts securely.
*   **Course Management:** Full CRUD operations for creating, updating, pricing, and organizing digital courses.
*   **Dua & Feeling Mappings:** Tools to upload new Duas or configure complex emotional pairings in the Feeling Tool.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Monorepo Orchestrator** | `pnpm` workspaces |
| **Frontend Application** | Next.js 16 (App Router), Tailwind CSS v4, React 19, shadcn/ui, Radix UI, Base UI, Lucide Icons |
| **Backend API Server** | Node.js, Express.js (v5), TypeScript, `tsup` (bundler), `tsx` (TS dev runtime) |
| **Database** | Cloud Firestore (via `firebase-admin`) |
| **Authentication** | Better Auth (Client & Express Node Handlers with `better-auth-firestore` adapter) |
| **Payments** | SSLCommerz API Gateway Integration |

---

## 📂 Project Structure

```
path-to-peace/
├── apps/
│   ├── server/                     # Express.js REST API Server
│   │   ├── src/
│   │   │   ├── controllers/        # Business logic controllers (admin, course, payment, saved-items, user)
│   │   │   ├── db/                 # Firestore connection and database seeding scripts
│   │   │   ├── middleware/         # Session validation & admin authentication middleware
│   │   │   ├── routes/             # Grouped API route mounts (user, admin, course, payments, saved items)
│   │   │   ├── utils/              # SSLCommerz client utility & third-party connectors
│   │   │   ├── auth.ts             # Better Auth server configuration with Firestore adapter
│   │   │   ├── check-db.ts         # Diagnostic script for checking Firestore collections
│   │   │   └── index.ts            # Main API entry point (Express initialization & Firestore ping)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                        # Next.js 16 React Frontend Application
│       ├── app/                    # Next.js App Router routes (Dashboard, Admin, Feeling-Tool, Quran, Payments, etc.)
│       ├── components/             # Premium UI & layout components (shadcn/ui, layouts, pages, features)
│       ├── hooks/                  # Custom React hooks (auth, dashboard states)
│       ├── lib/                    # Core utilities, API clients, and static JSON datasets
│       ├── public/                 # High-resolution assets, icons, and meditative illustrations
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                    # Workspace task orchestration
└── pnpm-workspace.yaml             # pnpm workspace definition
```

---

## ⚙️ Environment Configuration

To run the application locally, you must configure environment variables for both the backend server and the frontend application.

### 1. Backend Server Setup (`apps/server/.env`)
Create a `.env` file inside `apps/server/` matching the template below:
```env
PORT=3001
# Firebase Firestore configuration
FIREBASE_PROJECT_ID=path-to-peace-4cacd
FIREBASE_SERVICE_ACCOUNT=service-account.json

BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3001

# SSLCommerz Sandboxed Credentials
SSL_STORE_ID=your_sslcommerz_store_id
SSL_STORE_PASSWORD=your_sslcommerz_store_password
SSL_SANDBOX=true
SSL_SESSION_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

# Frontend Web Origin
NEXT_PUBLIC_WEB_URL=http://localhost:3000
```

Make sure to place your service account credentials file (e.g., `service-account.json`) in the `apps/server/` directory and configure the path in the `.env` file.

### 2. Frontend Application Setup (`apps/web/.env.local`)
Create a `.env.local` file inside `apps/web/` matching the template below:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/Sumyta-Bentey-Habib/path-to-peace.git
   cd path-to-peace
   ```

2. Install the workspace dependencies:
   ```bash
   pnpm install
   ```

### Database & Firestore Connectivity Setup
Before running the application:
1. Ensure your Firebase project is created.
2. In the Firebase console, go to **Project settings > Service accounts**, select **Generate new private key**, and download it.
3. Save the downloaded JSON file as `service-account.json` inside `apps/server/`.
4. Run a connection test to verify access to Firestore:
   ```bash
   cd apps/server
   npx tsx src/check-db.ts
   ```

### Database Seeding
The backend contains an automated database seeder (`apps/server/src/db/seed.ts`). Upon first startup:
* It connects to Firestore and checks if collections are empty.
* If empty, it seeds initial Duas from the frontend's static data sets (`apps/web/lib/data/duas.json`).
* It inserts default feelings, a default active course, and default accounts:
  * **Admin Account:** `admin@pathtopeace.com` (Password: `AdminPassword123`)
  * **Regular User Account:** `user@pathtopeace.com` (Password: `UserPassword123`)

### Running in Development
The monorepo contains dedicated scripts in the root `package.json` to orchestrate tasks. We recommend running the server and web application in two separate terminals:

*   **Terminal 1 (Backend Server):**
    ```bash
    pnpm dev:server
    ```
    *The API will start at [http://localhost:3001](http://localhost:3001)*

*   **Terminal 2 (Frontend App):**
    ```bash
    pnpm dev
    ```
    *The web interface will start at [http://localhost:3000](http://localhost:3000)*

---

## 🔐 Administrative & Demo User Accounts

The database seeder automatically creates pre-configured demo users on startup. You can log in using:

1. **Administrator Portal:**
   * **URL:** `http://localhost:3000/admin`
   * **Email:** `admin@pathtopeace.com`
   * **Password:** `AdminPassword123`

2. **Standard User Sanctuary:**
   * **URL:** `http://localhost:3000/dashboard`
   * **Email:** `user@pathtopeace.com`
   * **Password:** `UserPassword123`

*Note: If you sign up a new account manually via `/sign-up`, you can upgrade it to admin by visiting `http://localhost:3001/api/admin/set-me-as-admin` while authenticated.*

---

## 💳 SSLCommerz Payment Integration Flow

The application implements a robust transaction cycle for digital courses:

```mermaid
sequenceDiagram
    autonumber
    actor Seeker as Spiritual Seeker
    participant Web as Web App (Next.js)
    participant Server as Server API (Express)
    participant SSL as SSLCommerz Gateway

    Seeker->>Web: Selects a Course & Clicks Enroll
    Web->>Server: POST /api/payment/initiate (Headers: Auth Token, Body: courseId)
    Note over Server: Server creates a unique transaction ID (tran_id),<br/>saves pending payment status in Firestore.
    Server->>SSL: Initiates SSLCommerz session
    SSL-->>Server: Returns gateway Payment Gateway URL
    Server-->>Web: Responds with Payment Redirect URL
    Web->>Seeker: Redirects to secure SSLCommerz interface
    Seeker->>SSL: Completes Payment (Card, MFS, Netbanking)
    SSL->>Server: HTTP POST /api/payment/success or /fail or /cancel (Callback)
    Note over Server: Server validates payment hash & status with SSLCommerz server.<br/>If successful: Updates payment record to 'valid',<br/>enrolls user in Course, and redirects.
    Server-->>Web: Redirects client to /payment/success?tran_id=XYZ
    Web->>Seeker: Shows success state and unlocks Course Dashboard!
```

---

## 🌿 Core Architecture Practices & Guidelines

If you're pair-programming or extending the code:
*   **Documentation:** Maintain full docstrings and keep comments clear, particularly around spiritual themes.
*   **State Management:** Always use secure validation schemas (`zod`) in API controller endpoints to validate incoming payload states.
*   **Styling:** Follow the *Meditative Editorial* system. Avoid ad-hoc coloring. Use the tailored CSS tokens inside `globals.css` and Tailwind variables.
*   **Clean Auth Context:** Rely on the `authMiddleware` helper inside `apps/server/src/middleware/auth.middleware.ts` to retrieve valid session details.

---
*“Seek tranquility through knowledge, and let the heart rest in divine wisdom.”*
