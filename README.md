# V-Library — Full-Stack Library Management System

> A comprehensive digital library platform built as a full-stack **DBMS project** for VIT. Manages book inventory, member registrations, borrowing transactions, reservations, and automated fine calculations — all backed by a cloud PostgreSQL database.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | Neon PostgreSQL (Cloud) |
| **DB Driver** | `pg` (node-postgres) |
| **Routing** | React Router DOM v7 |
| **Icons** | React Icons, Font Awesome |

---

## 📂 Project Structure

```
v-library-new/
├── pages/                    # React page components
│   ├── Home.jsx              # Landing page with hero carousel
│   ├── Login.jsx             # Login / authentication page
│   ├── SelectPage.jsx        # Category selection page
│   ├── Dashboard.jsx         # Live stats dashboard (from DB)
│   ├── SearchBooks.jsx       # Search, browse & borrow books
│   ├── LibrarianPage.jsx     # Admin panel (add books, manage members, fines)
│   ├── Reserves.jsx          # Course reserve materials
│   ├── Books.jsx             # Books catalogue
│   ├── Journals.jsx          # Journals catalogue
│   ├── Guides.jsx            # Study guides catalogue
│   ├── Magazines.jsx         # Magazines catalogue
│   ├── Dictionaries.jsx      # Dictionaries catalogue
│   ├── ConfirmPage.jsx       # Borrow confirmation page
│   └── Calender.jsx          # Library calendar
│
├── src/
│   ├── App.jsx               # Root app with React Router routes
│   ├── main.jsx              # React entry point
│   ├── components/
│   │   ├── Navbar.jsx        # Shared navigation bar
│   │   ├── Footer.jsx        # Shared footer
│   │   └── AIAssistant.jsx   # Floating AI assistant widget
│   ├── App.css
│   └── index.css
│
├── backend/
│   ├── server.js             # Express server + /api/stats endpoint
│   ├── init_db.js            # DB initialization script (schema + seed)
│   ├── .env                  # Environment variables (DATABASE_URL) — not committed
│   ├── db/
│   │   └── connection.js     # PostgreSQL pool (Neon)
│   └── routes/
│       ├── books.js          # GET /api/books, POST /api/books
│       ├── authors.js        # GET /api/authors, POST /api/authors
│       ├── members.js        # GET /api/members, POST /api/members
│       ├── borrow.js         # GET /api/borrow, POST /api/borrow, POST /api/borrow/return/:id
│       ├── reservations.js   # GET /api/reservations, POST /api/reservations
│       └── fines.js          # GET /api/fines, POST /api/fines/:id/pay
│
├── database_schema.sql       # Full relational schema (PostgreSQL DDL)
├── seed_data.sql             # Sample data for development
├── database.md               # Complete database documentation
├── vercel.json               # Vercel SPA rewrite config (frontend)
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/shreeman10/V-Library.git
cd V-Library
```

### 2. Configure the Backend

Create `backend/.env` with your Neon database connection string:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
```

### 3. Initialize the Database

This creates all tables and inserts sample data in one step:

```bash
cd backend
npm install
npm run init-db
```

### 4. Start the Backend Server

```bash
# In the backend/ directory
npm run dev
```

> Server runs on **http://localhost:3000**

### 5. Start the Frontend

```bash
# In the root project directory
npm install
npm run dev
```

> Frontend runs on **http://localhost:5173**

---

## 📖 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero section and info cards |
| `/login` | Login | Login form (mock auth via localStorage) |
| `/select` | SelectPage | Library category selection |
| `/dashboard` | Dashboard | **Live DB stats** — total books, members, active borrows, overdue |
| `/search-books` | SearchBooks | Browse catalogue, borrow books, view borrow records |
| `/librarian` | LibrarianPage | **[Admin]** Add books/authors, register members, mark returns, pay fines |
| `/reserves` | Reserves | Course reserve materials (DB-backed) |
| `/books` | Books | Static books catalogue page |
| `/journals` | Journals | Static journals catalogue page |
| `/guides` | Guides | Static guides catalogue page |
| `/magazines` | Magazines | Static magazines catalogue page |
| `/dictionaries` | Dictionaries | Static dictionaries catalogue page |
| `/confirm` | ConfirmPage | Borrow confirmation screen |

---

## 🔌 API Endpoints

All endpoints are served by the Express backend at `http://localhost:3000`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Dashboard stats (counts from DB) |
| `GET` | `/api/books` | All books with available copy counts |
| `POST` | `/api/books` | Add a new book + its copies |
| `GET` | `/api/authors` | All authors |
| `POST` | `/api/authors` | Add a new author |
| `GET` | `/api/members` | All members |
| `POST` | `/api/members` | Register a new member |
| `GET` | `/api/borrow` | All borrow records (with joins) |
| `POST` | `/api/borrow` | Borrow a book (ACID transaction) |
| `POST` | `/api/borrow/return/:id` | Return a book + auto-generate fine if overdue |
| `GET` | `/api/reservations` | All reservations |
| `POST` | `/api/reservations` | Create a reservation |
| `GET` | `/api/fines` | All fines (with member & book info) |
| `POST` | `/api/fines/:id/pay` | Mark a fine as paid |

---

## 🏗️ Database Design

The project uses a normalized relational schema (up to **3NF**) with 7 tables:

```
authors ──< books ──< book_copies ──< borrow_records ──< fines
                                          │
members ──────────────────────────────────┘
    │
    └──< reservations >── books
```

See [`database.md`](./database.md) for the complete schema documentation, ER diagram, constraints, and sample data.

---

## ✨ Key Features

- **ACID Transactions** — Borrowing and returning use `BEGIN/COMMIT/ROLLBACK` to guarantee data consistency
- **Automated Fine Generation** — When a book is returned overdue, a fine is automatically computed (₹1.50/day) and inserted into the `fines` table
- **Referential Integrity** — Foreign keys link all entities; no orphan records possible
- **Normalized Schema** — Designed to 3rd Normal Form to minimize redundancy
- **Live Dashboard** — Stats (total books, members, active borrows, overdue) are fetched in real time from the database
- **AI Assistant** — Floating assistant widget available on all pages

---

## 🚢 Deployment

- **Frontend** → Deploy to [Vercel](https://vercel.com) (SPA rewrites configured in `vercel.json`)
- **Backend** → Deploy to any Node.js host (Railway, Render, etc.) with the `DATABASE_URL` environment variable set
- **Database** → Hosted on [Neon](https://neon.tech) (serverless PostgreSQL)
