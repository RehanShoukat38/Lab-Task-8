# Actual HTTP validation results

Captured directly from the running API with Python HTTP requests, not copied from Postman. All response bodies below are real.

## Valid cleaned course

`POST /api/courses`

```json
{
  "code": " cs-420 ",
  "title": " Compilers ",
  "creditHours": 3,
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "Theory",
    "CORE"
  ]
}
```

HTTP 201

```json
{
  "code": "CS-420",
  "title": "Compilers",
  "creditHours": 3,
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "theory",
    "core"
  ]
}
```

Transform trims and uppercases code, trims title, and lowercases every tag.

## Numeric text

`POST /api/courses`

```json
{
  "code": " cs-420 ",
  "title": " Compilers ",
  "creditHours": "3",
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "Theory",
    "CORE"
  ]
}
```

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "creditHours must be at most 4",
    "creditHours must be at least 1",
    "creditHours must be a whole number"
  ]
}
```

IsInt rejects the string; Min and Max also reject a nonnumber.

## Invalid code, title and credits

`POST /api/courses`

```json
{
  "code": "CS3",
  "title": "AI",
  "creditHours": 9,
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "Theory",
    "CORE"
  ]
}
```

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "code must look like CS-301 or CS-301L",
    "title must be at least 3 characters",
    "creditHours must be at most 4"
  ]
}
```

Matches, MinLength and Max produce the three field errors.

## Six tags

`POST /api/courses`

```json
{
  "code": " cs-420 ",
  "title": " Compilers ",
  "creditHours": 3,
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "a",
    "a",
    "a",
    "a",
    "a",
    "a"
  ]
}
```

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "tags must contain at most 5 strings"
  ]
}
```

ArrayMaxSize rejects more than five tags.

## Extra property

`POST /api/courses`

```json
{
  "code": " cs-420 ",
  "title": " Compilers ",
  "creditHours": 3,
  "instructor": "Dr. Hamza Rauf",
  "department": "Computer Science",
  "tags": [
    "Theory",
    "CORE"
  ],
  "isAdmin": true
}
```

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "property isAdmin should not exist"
  ]
}
```

forbidNonWhitelisted rejects isAdmin.

## Invalid minimum credits

`GET /api/courses?minCredits=abc`

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "minCredits must be at most 4",
    "minCredits must be at least 1",
    "minCredits must be a whole number"
  ]
}
```

Type converts abc to NaN; IsInt, Min and Max reject it.

## Invalid sort

`GET /api/courses?sort=title`

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "sort must be creditHours"
  ]
}
```

IsIn restricts sort to creditHours.

## Invalid code parameter

`GET /api/courses/abc`

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "code must look like CS-301 or CS-301L"
  ]
}
```

Matches rejects the parameter before lookup.

## Missing fee credit hours

`GET /api/fees/BSCS-023`

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "creditHours is required",
    "creditHours must be at most 24",
    "creditHours must be at least 1",
    "creditHours must be a whole number"
  ]
}
```

IsDefined reports the missing query; IsInt, Min and Max also reject undefined.

## Code patch forbidden

`PATCH /api/courses/CS-301L`

```json
{
  "code": "CS-999"
}
```

HTTP 400

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "details": [
    "property code should not exist"
  ]
}
```

OmitType removes code; forbidNonWhitelisted rejects it.

## Automated validation summary

- Build passed.
- Unit tests: 31 passed across 3 suites.
- HTTP end-to-end tests: 7 passed.
- Newman: two consecutive runs, each with 21 requests and 35 passing assertions, zero failures.
- Same fee request: standard 60000, merit 30000.
- Screenshots render captured command/API output; runner evidence is Newman, not the Postman desktop application.
