# V-Library — Database Documentation

> Complete schema reference for the **V-Library** Neon PostgreSQL database.  
> Provider: [Neon](https://neon.tech) | Driver: `pg` (node-postgres) | ORM: None (raw SQL)

---

## Overview

The database is a **normalized relational schema (3NF)** with **7 tables**. It manages the full lifecycle of a library: authors and books, physical copies, member registrations, borrowing transactions, reservations, and automated fine tracking.

### Entity Relationship Summary

```
authors ──< books ──< book_copies ──< borrow_records ──< fines
                  │                         │
                  └──< reservations >── members ──────────────┘
```

---

## Tables

### 1. `authors`

Stores the master list of book authors.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `author_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `name` | `VARCHAR(255)` | `NOT NULL` | Full name of the author |
| `nationality` | `VARCHAR(100)` | — | Author's country of origin |
| `birth_date` | `DATE` | — | Author's date of birth |

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS authors (
    author_id   SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    nationality VARCHAR(100),
    birth_date  DATE
);
```

---

### 2. `books`

Catalogue of book titles. Each row represents a unique title, not a physical copy.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `book_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `title` | `VARCHAR(255)` | `NOT NULL` | Title of the book |
| `isbn` | `VARCHAR(20)` | `UNIQUE` | International Standard Book Number |
| `genre` | `VARCHAR(100)` | — | Genre/category (e.g., Fantasy, Sci-Fi) |
| `author_id` | `INT` | `FK → authors(author_id)` | Links to the author |
| `total_copies` | `INT` | `NOT NULL` | Total physical copies owned by the library |

**Relationships:**
- `author_id` → `authors.author_id` (many books can have one author)

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS books (
    book_id      SERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    isbn         VARCHAR(20) UNIQUE,
    genre        VARCHAR(100),
    author_id    INT REFERENCES authors(author_id),
    total_copies INT NOT NULL
);
```

---

### 3. `book_copies`

Individual physical copies of each book title. Each copy has its own status and can be borrowed independently.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `copy_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `book_id` | `INT` | `FK → books(book_id)` | The title this copy belongs to |
| `status` | `VARCHAR(20)` | `CHECK (IN (...))` | Current status of this copy |

**`status` allowed values:**

| Value | Meaning |
|---|---|
| `available` | Copy is on the shelf and can be borrowed |
| `borrowed` | Currently checked out by a member |
| `reserved` | Held for a pending reservation |
| `damaged` | Copy is damaged and not available |

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS book_copies (
    copy_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    status  VARCHAR(20) CHECK (status IN ('available', 'borrowed', 'reserved', 'damaged'))
);
```

---

### 4. `members`

Registered library members (students, faculty, or public).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `member_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `full_name` | `VARCHAR(255)` | `NOT NULL` | Member's full name |
| `email` | `VARCHAR(255)` | `UNIQUE` | Member's email address |
| `membership_type` | `VARCHAR(20)` | `CHECK (IN (...))` | Category of membership |
| `membership_end` | `DATE` | — | Date the membership expires |

**`membership_type` allowed values:**

| Value | Description |
|---|---|
| `student` | Enrolled student |
| `faculty` | Faculty/staff member |
| `public` | General public member |

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS members (
    member_id       SERIAL PRIMARY KEY,
    full_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE,
    membership_type VARCHAR(20) CHECK (membership_type IN ('student', 'faculty', 'public')),
    membership_end  DATE
);
```

---

### 5. `borrow_records`

The central transaction log. Each row records one borrow event — which copy was borrowed by which member, when, and when it is due.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `borrow_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `copy_id` | `INT` | `FK → book_copies(copy_id)` | The specific physical copy borrowed |
| `member_id` | `INT` | `FK → members(member_id)` | The member who borrowed it |
| `borrow_date` | `DATE` | `DEFAULT CURRENT_DATE` | Date the book was borrowed |
| `due_date` | `DATE` | `NOT NULL` | Date the book must be returned by |
| `return_date` | `DATE` | — | Actual date returned (`NULL` if still active) |
| `status` | `VARCHAR(20)` | `CHECK (IN (...))` | Current state of the borrow |

**`status` allowed values:**

| Value | Meaning |
|---|---|
| `active` | Book is currently borrowed and not overdue |
| `returned` | Book has been returned on time |
| `overdue` | Book was returned late (fine generated) |

> **Transaction Safety:** Borrow and return operations use `BEGIN / COMMIT / ROLLBACK` to ensure atomicity.

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS borrow_records (
    borrow_id   SERIAL PRIMARY KEY,
    copy_id     INT REFERENCES book_copies(copy_id),
    member_id   INT REFERENCES members(member_id),
    borrow_date DATE DEFAULT CURRENT_DATE,
    due_date    DATE NOT NULL,
    return_date DATE,
    status      VARCHAR(20) CHECK (status IN ('active', 'returned', 'overdue'))
);
```

---

### 6. `reservations`

Waitlist / hold system for books that are currently unavailable.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `reservation_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `book_id` | `INT` | `FK → books(book_id)` | The book title being reserved |
| `member_id` | `INT` | `FK → members(member_id)` | The member placing the reservation |
| `reserved_on` | `DATE` | `DEFAULT CURRENT_DATE` | Date the reservation was placed |
| `expires_on` | `DATE` | — | Date the reservation hold expires |
| `status` | `VARCHAR(20)` | `CHECK (IN (...))` | Current state of the reservation |

**`status` allowed values:**

| Value | Meaning |
|---|---|
| `pending` | Waiting for a copy to become available |
| `fulfilled` | A copy was issued to the member |
| `cancelled` | Member cancelled the reservation |
| `expired` | Hold expired before being fulfilled |

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    book_id        INT REFERENCES books(book_id),
    member_id      INT REFERENCES members(member_id),
    reserved_on    DATE DEFAULT CURRENT_DATE,
    expires_on     DATE,
    status         VARCHAR(20) CHECK (status IN ('pending', 'fulfilled', 'cancelled', 'expired'))
);
```

---

### 7. `fines`

Automatically generated penalty records for late returns. Created by the backend when a book is returned past its `due_date`.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `fine_id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing unique identifier |
| `borrow_id` | `INT` | `FK → borrow_records(borrow_id)` | The borrow record that triggered this fine |
| `amount` | `DECIMAL(10,2)` | — | Fine amount in rupees |
| `is_paid` | `BOOLEAN` | `DEFAULT FALSE` | Whether the fine has been cleared |
| `paid_on` | `DATE` | — | Date the fine was paid (`NULL` if unpaid) |

> **Fine Calculation:** `days_overdue × ₹1.50` — computed in the backend (`/api/borrow/return/:id`) at return time.

**DDL:**
```sql
CREATE TABLE IF NOT EXISTS fines (
    fine_id   SERIAL PRIMARY KEY,
    borrow_id INT REFERENCES borrow_records(borrow_id),
    amount    DECIMAL(10,2),
    is_paid   BOOLEAN DEFAULT FALSE,
    paid_on   DATE
);
```

---

## Foreign Key Relationships

```
authors.author_id       ←── books.author_id
books.book_id           ←── book_copies.book_id
books.book_id           ←── reservations.book_id
book_copies.copy_id     ←── borrow_records.copy_id
members.member_id       ←── borrow_records.member_id
members.member_id       ←── reservations.member_id
borrow_records.borrow_id ←── fines.borrow_id
```

---

## Key SQL Queries Used by the API

### Dashboard Stats (`GET /api/stats`)

```sql
SELECT COUNT(*) FROM books;
SELECT COUNT(*) FROM members;
SELECT COUNT(*) FROM book_copies WHERE status = 'borrowed';
SELECT COUNT(*) FROM borrow_records WHERE status = 'overdue';
```

### Books with Available Copies (`GET /api/books`)

```sql
SELECT b.book_id, b.title, b.isbn, b.genre, b.total_copies,
       a.name AS author_name,
       (SELECT COUNT(*) FROM book_copies bc
        WHERE bc.book_id = b.book_id AND bc.status = 'available') AS available_copies
FROM books b
LEFT JOIN authors a ON b.author_id = a.author_id
ORDER BY b.title;
```

### Borrow a Book (`POST /api/borrow`) — ACID Transaction

```sql
BEGIN;
  -- Lock an available copy
  SELECT copy_id FROM book_copies WHERE book_id = $1 AND status = 'available' LIMIT 1 FOR UPDATE;
  -- Mark it borrowed
  UPDATE book_copies SET status = 'borrowed' WHERE copy_id = $copy_id;
  -- Create the borrow record
  INSERT INTO borrow_records (copy_id, member_id, due_date, status)
  VALUES ($copy_id, $member_id, $due_date, 'active');
COMMIT;
```

### Return a Book + Auto-Fine (`POST /api/borrow/return/:id`) — ACID Transaction

```sql
BEGIN;
  -- Get the borrow record
  SELECT * FROM borrow_records WHERE borrow_id = $1 AND status = 'active' FOR UPDATE;
  -- Mark returned
  UPDATE borrow_records SET return_date = CURRENT_DATE, status = 'returned' WHERE borrow_id = $1;
  -- Free the copy
  UPDATE book_copies SET status = 'available' WHERE copy_id = $copy_id;
  -- If overdue: insert fine (computed in application layer)
  INSERT INTO fines (borrow_id, amount) VALUES ($1, $days_overdue * 1.50);
  UPDATE borrow_records SET status = 'overdue' WHERE borrow_id = $1;
COMMIT;
```

### Fines with Full Context (`GET /api/fines`)

```sql
SELECT f.*, br.member_id, m.full_name, b.title
FROM fines f
JOIN borrow_records br ON f.borrow_id = br.borrow_id
JOIN members m ON br.member_id = m.member_id
JOIN book_copies bc ON br.copy_id = bc.copy_id
JOIN books b ON bc.book_id = b.book_id
ORDER BY f.is_paid ASC, f.fine_id DESC;
```

---

## Normalization

| Normal Form | Status | Notes |
|---|---|---|
| **1NF** | ✅ | All columns are atomic; no repeating groups |
| **2NF** | ✅ | No partial dependencies; all non-key columns depend on the full PK |
| **3NF** | ✅ | No transitive dependencies; e.g., author details live in `authors`, not in `books` |

---

## Seed Data Summary

The `seed_data.sql` file populates the database with:

| Table | Rows |
|---|---|
| `authors` | 5 (Rowling, Martin, Tolkien, Asimov, Christie) |
| `books` | 10 (Fantasy, Sci-Fi, Mystery) |
| `book_copies` | 20 (mix of available / borrowed / reserved / damaged) |
| `members` | 5 (student × 2, faculty × 1, public × 2) |
| `borrow_records` | 4 (3 active, 1 overdue) |
| `fines` | 1 (unpaid, on the overdue record) |

---

## Setup

### Initialize from scratch

```bash
cd backend
npm run init-db
```

This runs `init_db.js` which executes `database_schema.sql` then `seed_data.sql` against your Neon database.

### Connection (`backend/db/connection.js`)

```js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

The `DATABASE_URL` must be set in `backend/.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
```
