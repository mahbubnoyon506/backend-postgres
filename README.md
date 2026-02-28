# 🎓Student Management System (Backend)

A high-performance, authenticated RESTful API built with **Node.js**, **Express**, and **PostgreSQL**. This system is designed to handle large-scale data (0.4 million+ records) with optimized query performance using indexing.

## Key Features

- **Authentication**: Secure JWT-based Sign-up and Sign-in with bcrypt password hashing.
- **Database Schema**: Relational mapping between Institutes, Students, Courses, and Results.
- **Scalability**: Bulk-seeded with **100,000 records** per table.
- **Performance Optimization**: Strategic indexing on search-heavy columns.
- **Complex Queries**: Aggregations (Averages) and multi-table Joins.
- **Standardized API**: Pagination, error handling, and CORS enabled.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Security**: JSON Web Tokens (JWT), Bcrypt

---

## Performance & Indexing Report

To satisfy the requirement of handling 0.1 million rows per table, indexing was implemented on high-traffic columns.

### Query Analysis (`EXPLAIN ANALYZE`)

I compared search performance on the `Students` table (100,000 rows) searching by `name`.

| Search Strategy     | Execution Time (Before Index) | Execution Time (After Index) | Improvement      |
| ------------------- | ----------------------------- | ---------------------------- | ---------------- |
| **Sequential Scan** | ~19.40 ms                     | --                           | Baseline         |
| **Index Scan**      | --                            | **0.08 ms**                  | **~250x Faster** |

---

## Authentication Strategy (JWT)

1. **Password Hashing**: Using `bcrypt` with a salt factor of 10.
2. **Stateless Auth**: JWTs are issued upon successful login and must be sent in the `Authorization: Bearer <token>` header.
3. **Role-Based Logic**: The system supports `admin` and `staff` roles for future-proofing permissions.

---

## Project Structure

```text
src/
├── config/         # Database & environment configuration
├── controllers/    # Business logic (CRUD, Aggregations)
├── middleware/     # JWT Auth & Error handling
├── models/         # Sequelize Models & Associations
├── routes/         # API Endpoints
├── utils/          # Data Seeder script
└── app.js          # Express app setup

```

---

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register a new user. body: email, password, role
- `POST /api/auth/signin` - Obtain a JWT token. body: email, password,

### Institutes

- `GET /api/institutes?page=1&limit=10` - List institutes (Paginated).
- `POST /api/institutes` - Create institute (**Auth Required**). body: name, location
- `GET /api/institutes/:id/results` - List results of an institute.
- `PUT /api/institutes/:id` - Update an institute (**Auth Required**). body: name, location
- `DELETE /api/institutes/:id` - Delete an institute (**Auth Required**).

### Students

- `POST /api/students` - Create a student (**Auth Required**). body: name, email, instituteId
- `GET /api/students?page=1&limit=10` - List students (Paginated).
- `PUT /api/students/:id` - Update students (**Auth Required**). body: name, email, instituteId
- `DELETE /api/students/:id` - Delete students (**Auth Required**).

### Results

- `POST /api/results` - Create a result (**Auth Required**). body: studentId, courseId, grade, semester
- `GET /api/results?page=1&limit=10` - List courses (Paginated).
- `PUT /api/results/:id` - Update courses (**Auth Required**). body: grade, semester
- `DELETE /api/results/:id` - Delete courses (**Auth Required**).
- `GET /api/results/top-ranking` - Complex query joining 3 tables to find top students by GPA.

### Courses

- `POST /api/courses` - Create a course (**Auth Required**). body: title, code
- `GET /api/courses?page=1&limit=10` - List courses (Paginated).
- `PUT /api/courses/:id` - Update courses (**Auth Required**). body: title, code
- `DELETE /api/courses/:id` - Delete courses (**Auth Required**).

---

## Setup & Installation

1. **Clone the repo**:

```bash
git clone <repository-url>

```

2. **Install dependencies**:

```bash
npm install

```

3. **Configure Environment**: Create a `.env` file.

```env

PORT=5000
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost (if run locally)
DATABASE_URL=your_db_URL (if hosted db to remote like Neon)
JWT_SECRET=supersecretkey
SEED_COUNT=count_to_seed_per_table

```

4. **Seed the Database** (0.4M Records):

```bash
npm run seed

```

5. **Start the Server**:

```bash
npm run dev

```

---
