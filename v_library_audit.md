# V-Library Technical Audit

## 1. Project overview
V-Library is a comprehensive full-stack library management system designed to streamline both patron and librarian experiences. It offers features such as searching for books, reserving materials, viewing borrowing history, and managing fines. The system relies on an Express and PostgreSQL backend that natively handles relational data like books, authors, copies, and member records. The frontend is built using React, Vite, and TailwindCSS, and incorporates Firebase for modern, secure user authentication. It features distinct interfaces for general users and librarians, consolidating extensive library catalogs spanning books, journals, magazines, and dictionaries into a single platform.

## 2. Tech stack table

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | `^19.1.0` | Core frontend framework for building UI components and managing client-side state. |
| **Vite** | `^7.0.0` | Fast build tool and development server for the frontend application. |
| **TailwindCSS** | `^4.1.11` | Utility-first CSS framework for rapid and responsive UI styling. |
| **Firebase** | `^11.10.0` | External service used primarily for Google-based user authentication and potentially hosting. |
| **React Router** | `^7.6.3` | Client-side routing to handle navigation between various library pages. |
| **Express** | `^5.2.1` | Lightweight Node.js web application framework handling backend API routing and logic. |
| **PostgreSQL / pg** | `^8.20.0` | Primary relational database engine and Node.js driver used to store all library records. |
| **NeonDB** | N/A (SaaS) | Managed Serverless Postgres database host (referenced in `.env` `DATABASE_URL`). |

## 3. Architecture diagram

```text
+---------------------------------------------------------+
|                      Frontend (React)                   |
|  +--------------+  +--------------+  +---------------+  |
|  | User/Patron  |  | Auth Service |  | Librarian Dash|  |
|  |  Interface   |  |  (Firebase)  |  |   Interface   |  |
|  +------|-------+  +--------------+  +-------|-------+  |
|         |                  |                 |          |
+---------|------------------|-----------------|----------+
          | (REST API Calls) |                 |
          v                  v                 v
+---------------------------------------------------------+
|                     Backend (Express)                   |
|  +-------------+   +--------------+   +--------------+  |
|  | Books Route |   | Members Route|   | Borrow Route |  |
|  +-------------+   +--------------+   +--------------+  |
|  +-------------+   +--------------+   +--------------+  |
|  | Stats Route |   | Fines Route  |   | Reserve Route|  |
|  +------|------+   +-------|------+   +-------|------+  |
+---------|------------------|------------------|---------+
          |                  |                  |
          v                  v                  v
+---------------------------------------------------------+
|                  Database (NeonDB / PG)                 |
|    [ Books ] [ Authors ] [ Copies ] [ Members ]         |
|         [ Borrow Records ] [ Reservations ]             |
+---------------------------------------------------------+
```

## 4. Feature status table

| Feature Name | Status | Notes |
|--------------|--------|-------|
| Google Authentication | Partial | Firebase initialized and login component logs successful sign-ins, but auth state is not deeply protected or propagated across all routes. |
| Search Books | Partial | Extensive UI built for searching and displaying books, but heavily relies on placeholder logic or unlinked handlers. |
| Book Borrow/Return | Done | Backend endpoints exist (`/api/borrow`) and are tracked using `borrow_records` and `book_copies` status. |
| Librarian Dashboard | Done | Provides UI and API hooks to add books, authors, and members, tracking total copies. |
| Reservations | Stub / Partial | Table exists, UI `Reserves.jsx` has placeholder text and images, backend endpoints initialized but not fully hooked to UI. |
| Site Navigation (Pages) | Done | Many pages (Journals, Magazines, Dictionaries, Guides) are configured with routing, but currently act as static presentation layers. |
| Dashboard Stats | Done | `server.js` includes a `/api/stats` endpoint returning accurate counts for the admin dashboard. |

## 5. API endpoints table

| Method | Path | Auth Required | Status |
|--------|------|---------------|--------|
| GET | `/api/books` | No | Done (Lists books with available copy counts) |
| POST | `/api/books` | No (Missing Guard) | Done (Adds book and creates X available copies) |
| GET | `/api/stats` | No (Missing Guard) | Done (Aggregates system-wide statistics) |
| GET | `/api/authors` | No | Implemented |
| GET | `/api/members` | No (Missing Guard) | Implemented |
| POST | `/api/borrow` | No (Missing Guard) | Implemented |
| POST | `/api/reservations` | No (Missing Guard) | Implemented |
| GET/POST | `/api/fines` | No (Missing Guard) | Implemented |

*Note: The backend currently lacks middleware to verify Firebase auth tokens (e.g., Bearer tokens) before processing sensitive API requests.*

## 6. Issues & TODOs list

| Severity | File : Line | Description |
|----------|-------------|-------------|
| High | `backend/server.js:12` | **Security Issue**: None of the backend API routes have authentication middleware. Any user can post to `/api/books` or view members. |
| High | `src/App.jsx:37` | **Duplicate Route**: `SelectPage` is defined twice (`/select`). Can cause unexpected routing behavior. |
| Med | `pages/Reserves.jsx:45` | **Placeholder Assets**: Hardcoded placeholder image URLs (placehold.co) and unlinked mock data are being used in production code. |
| Med | `pages/SearchBooks.jsx:514` | **Missing Integration**: Search functionality logs to console (`Searching for:`) but doesn't actually trigger backend queries. |
| Low | `pages/*.jsx` | **Repeated UI Elements**: Dozens of files (`Login.jsx`, `Home.jsx`, `Dictionaries.jsx`) have repeated hardcoded `placeholder="Enter email..."` footers/inputs that should be a reusable component. |
| Low | `package.json:1` | **Stale Dependencies**: Mixing `vite` with `gh-pages` and manual deploy scripts. Might encounter issues with GitHub pages base paths. |
| Low | `backend/init_db.js:10` | **Hardcoded console logs**: Multiple leftover `console.log` statements in init scripts and server startup files. |

## 7. What to build next

1. **Implement Backend Authentication Middleware**: Create an Express middleware that verifies Firebase ID tokens. Apply this to all sensitive routes (`/api/books` POST, `/api/borrow`, `/api/members`, `/api/stats`) to prevent unauthorized access.
2. **Connect Frontend Search to Backend Database**: Wire up the `SearchBooks.jsx` component to dynamically fetch and filter records from the `GET /api/books` endpoint instead of relying on frontend mock data.
3. **Refactor Repeated UI Elements**: Extract the common footer, navigation bar, and "Enter email" subscription blocks across `pages/*.jsx` into reusable React components located in `src/components/`.
4. **Implement Global Auth State Context**: Set up a React Context or state management slice to track the Firebase user session globally. Use this to create "Protected Routes" that hide the Librarian Dashboard and user profile features from guests.
5. **Finalize Reservations Feature**: Remove the `PlaceholderReserves` mock data from `Reserves.jsx`, fetch real reservation data from `/api/reservations`, and handle the "cancel reservation" UI state seamlessly.

## 8. Suggested first prompt

```text
Please implement backend authentication for our library application. 

1. Create a new file `backend/middleware/auth.js` that uses `firebase-admin` to verify a Bearer token from the `Authorization` header.
2. Apply this middleware in `backend/server.js` to protect the `/api/stats`, POST `/api/books`, `/api/members`, and `/api/borrow` routes.
3. Update the frontend `src/firebaseConfig.js` or `Login.jsx` to correctly capture the Firebase ID Token and pass it into a globally accessible API utility function (e.g., using `axios` or `fetch` interceptors) so all future backend requests are authenticated.
```
