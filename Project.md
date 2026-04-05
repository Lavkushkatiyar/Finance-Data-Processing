# Finance Data Processing - Backend Architecture

A robust, logically structured RESTful API configured to operate as a finance dashboard system backend. This application is capable of user role management, category administration, financial record tracking, and dashboard analytics computing.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Database Schema & ERD Mapping](#database-schema--erd-mapping)
3. [System Architecture](#system-architecture)
4. [API Endpoints Overview](#api-endpoints-overview)
5. [Security & Authentication](#security--authentication)
6. [Local Environment Setup](#local-environment-setup)
7. [Design Decisions & Trade-offs](#design-decisions--trade-offs)

---

## Project Overview

The objective of this application is to serve a high-performance backend processing unit. Users interact with different financial objects and view analytics depending on their explicitly defined hierarchical `Role`.

It utilizes standard data modeling to represent `Users`, map them cleanly against independent `Roles`, and cascade ownership over categorized `Financial Records`.

---

## Database Schema & ERD Mapping

The underlying Database layer is mapped securely to **PostgreSQL** driven entirely by the **Prisma ORM**. The structure employs scalable one-to-many and many-to-one foreign key constraints smoothly.

### 1. `User` Model

Represents instances of authenticated engineers or consumers inside the app.

- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `passwordHash`: String (Secure BCrypt Hash)
- `status`: Enum (`ACTIVE` | `INACTIVE`) - Defaults to `ACTIVE`
- `roleId`: Foreign Key linking to `Role`
- _Timestamps_: `createdAt`, `updatedAt`

### 2. `Role` Model

Governs standard Role-Based Access Control logic (RBAC).

- `id`: UUID (Primary Key)
- `name`: String (Unique) - (`ADMIN`, `ANALYST`, `VIEWER`)
- `description`: String?

### 3. `Category` Model

Standardizes transactional tagging enforcing types logic.

- `id`: UUID (Primary Key)
- `name`: String (e.g., "Food", "Salary")
- `type`: Enum (`INCOME` | `EXPENSE`)

### 4. `FinancialRecord` Model

The core ledger entity mapping the financial logs.

- `id`: UUID (Primary Key)
- `amount`: Float
- `type`: Enum (`INCOME` | `EXPENSE`)
- `date`: DateTime
- `notes`: String?
- `userId`: Foreign Key linking to `User` (The initiator)
- `categoryId`: Foreign Key linking to `Category`
- _Timestamps_: `createdAt`, `updatedAt`

---

## System Architecture

The codebase cleanly decouples concerns using a modern layered configuration.

- **`/routes`**: Intercepts HTTP Requests, runs the designated pre-flight middleware matrices, and bridges incoming streams into controllers.
- **`/controllers`**: HTTP logic layer. Translates REST payload bodies natively and formats standard HTTP Status Codes (e.g., 201 Created vs 403 Forbidden).
- **`/services`**: Houses pure business logic and acts as the bridging link to the database. It is framework agnostic.
- **`/middleware`**: Extracts and validates JWT claims via `authenticate.js` and securely blocks endpoints natively through an `authorize.js` explicit array filter loop.
- **`/validators`**: Applies `Zod` schemas pre-flight to capture malformed JSON definitions safely before server execution.
- **`/db`**: Stores the absolute singleton `prisma.js` connector ensuring the server relies on a single persistent memory pool mapping to the database to mitigate leaks.

---

## API Endpoints Overview

The endpoints are separated across unique modular routers.

### Auth Operations

- `POST /auth/register` - Instantiate a new account natively (defaults to `VIEWER`).
- `POST /auth/login` - Request a signed JWT.

### Admin Operations

_(Restricted to `ADMIN`)_

- `POST /admin/user` - Create elevated users directly.
- `GET /admin/user` - Retrieve total user logs.
- `DELETE /admin/user/:id` - Delete existing users safely.
- `PATCH /admin/user/:id/status` - Suspend or activate a specific user dynamically.

### Record Operations

_(Restricted to `ADMIN`, `ANALYST` with localized access drops)_

- `POST /record/create` - Append a ledger entity.
- `GET /record/get` - Fetch ledger records including relation objects (`Category`).
- `PATCH /record/:id` - Perform a partial schema update.
- `DELETE /record/:id` - Perform strict deletions.

### Category Operations

_(Restricted appropriately to prevent data poisoning)_

- `POST /category` - Deploy a schema classification.
- `GET /category` - Find existing schema classifications.
- `DELETE /category/:id` - Erase classifications explicitly.

### Dashboard Core

- `GET /dashboard/summary` - Aggregate total expenses, income, net balances, category aggregates (`categoryId`), and limit logs natively on the DB level implicitly resolving logic depending on whether an `ADMIN` or regular User queried it.

---

## Security & Authentication

1. **JSON Web Tokens (JWT)**: Upon login, an expiry-bound signature is embedded wrapping the specific user constraints map (ID, and Role string). This token maps against `authorization: Bearer <token>` Headers globally.
2. **Password Encryption**: Utilizing salted constraints over 10 rounds using standard `bcryptjs`.
3. **Route Guards**: Critical routes wrap arrays like `authorizeRoles([ROLES.ADMIN, ROLES.ANALYST])` rendering illegal requests utterly dead natively upon hitting routing configuration layers avoiding potential DB hits dynamically.
4. **Validation Isolation**: Schemas wrap strict structures via `Zod` ensuring random parameters drop gracefully.

---

## Local Environment Setup

1. **Install Node Utilities**:

   ```bash
   npm install
   ```

2. **Configure Variables**: Create `.env` inside the root matching your credentials hook.

   ```
   DATABASE_URL="postgresql://user:pass@localhost:5432/finance_db"
   JWT_SECRET="YOUR_RANDOM_SECRET"
   PORT=3000
   ```

3. **Deploy the Database**: Using standard Prisma deployment mechanics.

   ```bash
   npx prisma migrate dev
   ```

4. **Initiate Core Execution**:
   ```bash
   npm start
   # or node index.js
   ```
   _(Note: Attempting to boot `index.js` naturally executes `seedAdmin()` asynchronously in the background. It will automatically populate your Database with the 3 Role schemas and an initial `admin@admin.com` `123456` user log guaranteeing instantaneous access)._

---

## Design Decisions & Trade-offs

- **Zod for Validation**: Picked inherently for high developer speed and clean syntactic strict mapping.
- **Unified Prisma Singleton**: The DB hook isn't randomly opened per service script avoiding "too many connections" timeouts. It runs via `/db/prisma.js`.
- **Soft Deletes vs Status Patches**: Users themselves aren't soft deleted but heavily gated by their `ACTIVE / INACTIVE` enums allowing them to stay suspended explicitly gracefully inside relational maps across `FinancialRecord` logs without exploding the constraints.
