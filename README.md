# Lab Task 8 — NestJS Validation & Dependency Injection

> **Course:** Web Technologies & Services  
> **Student:** Rehan Shoukat  
> **Topic:** Pipes, Validation, DTOs, and Dependency Injection in NestJS

---

## 📋 Overview

This project demonstrates advanced **NestJS** concepts including:

- ✅ **Validation Pipes** with `class-validator` decorators
- ✅ **Data Transformation** with `class-transformer`
- ✅ **DTO pattern** (Data Transfer Objects) with `CreateCourseDto` and `UpdateCourseDto`
- ✅ **Dependency Injection** — cross-module service sharing
- ✅ **Custom Exception Filters** for structured error responses
- ✅ **Fee calculation** with merit/standard policy via injected services
- ✅ **Unit tests** and **end-to-end (e2e) tests**
- ✅ **Postman/Newman** automated API test collection

---

## 🏗️ Project Structure

```
src/
├── app.module.ts              # Root application module
├── main.ts                    # Bootstrap & global pipe setup
├── common/                    # Shared filters / interceptors
├── courses/
│   ├── course.entity.ts       # Course data model
│   ├── courses.controller.ts  # REST endpoints for /api/courses
│   ├── courses.module.ts      # Module wiring & exports
│   ├── courses.service.ts     # Business logic (CRUD)
│   ├── courses.service.spec.ts# Unit tests (31 assertions)
│   ├── credit.service.ts      # Credit-hour helper service
│   ├── dto/                   # CreateCourseDto, UpdateCourseDto
│   └── store/                 # In-memory data store
├── fees/
│   ├── fee-policies.ts        # Standard & merit fee policies
│   ├── fee-policies.spec.ts   # Unit tests for fee policies
│   ├── fee-query.dto.ts       # Query validation DTO
│   ├── fees.module.ts         # Module with injected CoursesService
│   └── fees.service.ts        # Fee calculation logic
└── students/
    ├── student.entity.ts      # Student data model
    └── students.module.ts     # Students module
```

```
postman/
└── Lab08_Tasks.postman_collection.json   # 21-request Postman collection

screenshots/
├── app-log.png          # Running application log
├── e2e.png              # End-to-end test results
├── merit-fees.png       # Merit fee API response
├── npm-test.png         # Unit test results (31 passed)
├── runner.png           # Newman run #1 (21 req, 35 assertions)
├── runner-second.png    # Newman run #2 (21 req, 35 assertions)
├── standard-fees.png    # Standard fee API response
└── validation.png       # Validation error responses
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
npm install
```

### Run in Development Mode

```bash
npm run start:dev
```

The API will be available at **`http://localhost:3000`**

### Build for Production

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### Courses — `/api/courses`

| Method   | Endpoint               | Description                        |
|----------|------------------------|------------------------------------|
| `POST`   | `/api/courses`         | Create a new course (validated)    |
| `GET`    | `/api/courses`         | List all courses (filterable/sortable) |
| `GET`    | `/api/courses/:code`   | Get a course by code               |
| `PATCH`  | `/api/courses/:code`   | Partially update a course          |
| `DELETE` | `/api/courses/:code`   | Delete a course                    |

#### Query Parameters for `GET /api/courses`

| Parameter    | Type   | Description                          |
|--------------|--------|--------------------------------------|
| `minCredits` | number | Filter courses by minimum credit hours (1–4) |
| `sort`       | string | Sort by field — only `creditHours` allowed |

### Fees — `/api/fees`

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| `GET`  | `/api/fees/:studentId`      | Get fee for a student (requires `?creditHours=N`) |

---

## 🔍 Validation Rules

### Course DTO

| Field         | Rules                                                              |
|---------------|--------------------------------------------------------------------|
| `code`        | Required · matches pattern `CS-301` or `CS-301L` · auto-uppercased & trimmed |
| `title`       | Required · min 3 characters · auto-trimmed                         |
| `creditHours` | Required · integer · min 1 · max 4                                 |
| `instructor`  | Required · non-empty string                                        |
| `department`  | Required · non-empty string                                        |
| `tags`        | Optional · array of strings · max 5 items · auto-lowercased        |

> Extra / unknown properties are **rejected** (`forbidNonWhitelisted: true`).  
> `code` cannot be patched via `PATCH` (removed via `OmitType`).

### Fee Query DTO

| Field         | Rules                                           |
|---------------|-------------------------------------------------|
| `creditHours` | Required · integer · min 1 · max 24             |

---

## 🧪 Testing

### Unit Tests

```bash
npm test
```

Runs 31 assertions across 3 test suites (Courses, Fees, Students).

### End-to-End Tests

```bash
npm run test:e2e
```

Runs 7 HTTP end-to-end scenarios against the live server.

### Newman (Postman Collection)

```bash
npm run test:postman
```

Executes all 21 requests in the Postman collection with 35 passing assertions.

---

## 📊 Test Results Summary

| Test Suite        | Tests | Status  |
|-------------------|-------|---------|
| Unit tests        | 31    | ✅ Pass |
| E2E tests         | 7     | ✅ Pass |
| Newman assertions | 35    | ✅ Pass |

---

## 💉 Dependency Injection Design

- **`CoursesModule`** exports `CoursesService` and `CreditService`.
- **`FeesModule`** imports `CoursesModule` and injects `CoursesService` directly — demonstrating cross-module DI.
- **`StudentsModule`** imports `CoursesModule` to access student-course relationships.
- All providers are **singleton-scoped** (NestJS default).

---

## ❓ Conceptual Questions

### (a) Why can an interface not be an injection token?
TypeScript interfaces are **erased at compile time** and have no runtime identity. NestJS needs a runtime value — a string, `Symbol`, or class — to look up a provider in its DI container.

### (b) What does singleton scope mean?
A default-scope provider is instantiated **once** per application context. All consumers that inject the same provider receive the **same shared instance**, rather than a new object per request.

### (c) How can `OtherModule` use `CoursesService`?
Add `CoursesService` to the **`exports`** array of `CoursesModule`, then **import `CoursesModule`** in `OtherModule`. The service can then be injected via the consumer's constructor normally.

---

## 🛠️ Tech Stack

| Technology        | Version  | Purpose                      |
|-------------------|----------|------------------------------|
| NestJS            | ^11.0.0  | Server framework             |
| TypeScript        | ^5.8.0   | Language                     |
| class-validator   | ^0.14.2  | Declarative validation       |
| class-transformer | ^0.5.1   | Data transformation/whitelist|
| Jest              | ^29.7.0  | Unit & e2e testing           |
| Supertest         | ^7.1.0   | HTTP integration testing     |
| Newman            | ^6.2.1   | Postman CLI runner           |

---



## 📄 License

This project is submitted as academic coursework. All rights reserved © Rehan Shoukat.
