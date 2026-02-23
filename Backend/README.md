# Uber Clone Backend API Documentation

## User Endpoints

### Register User
**Endpoint:** `POST /user/register`

**Description:** 
Register a new user account with email, password, and full name information.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, required)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Response Status Codes:**

| Status Code | Description |
|---|---|
| 201 | User successfully registered. Returns user object and authentication token. |
| 400 | Validation error. Invalid input data provided. |

**Success Response (201):**
```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  },
  "token": "string (JWT token)"
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "string",
      "msg": "Error message",
      "path": "field_name",
      "location": "body"
    }
  ]
}
```

**Validation Rules:**
- `fullname.firstname`: Minimum 3 characters
- `fullname.lastname`: Minimum 3 characters
- `email`: Must be a valid email format
- `password`: Minimum 6 characters

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Example Responses:**

**Successful Registration (201):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE2MzUyNzc4MDB9.signature"
}
```

**Validation Error - Invalid Email (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalidemail",
      "msg": "Please enter a valid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Validation Error - Short Password (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Validation Error - Short First Name (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Login User
**Endpoint:** `POST /user/login`

**Description:** 
Authenticate a user with email and password, returning a JWT token for subsequent authenticated requests.

**Request Body:**
```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Response Status Codes:**

| Status Code | Description |
|---|---|
| 200 | User successfully authenticated. Returns user object and authentication token. |
| 400 | Validation error. Invalid input data provided. |
| 401 | Unauthorized. Invalid email or password. |

**Success Response (200):**
```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  },
  "token": "string (JWT token)"
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "string",
      "msg": "Error message",
      "path": "field_name",
      "location": "body"
    }
  ]
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

**Validation Rules:**
- `email`: Must be a valid email format
- `password`: Minimum 6 characters

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Example Responses:**

**Successful Login (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE2MzUyNzc4MDB9.signature"
}
```

**Validation Error - Invalid Email (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalidemail",
      "msg": "Please enter a valid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Validation Error - Short Password (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Invalid Credentials (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

### Get User Profile
**Endpoint:** `GET /user/profile`

**Description:** 
Retrieve the authenticated user's profile information. Requires a valid JWT token.

**Authentication:**
Required. Token must be provided in either:
- Cookie: `token`
- Authorization header: `Bearer <token>`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Status Codes:**

| Status Code | Description |
|---|---|
| 200 | Successfully retrieved user profile. |
| 401 | Unauthorized. Invalid or expired token. |

**Success Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Logout User
**Endpoint:** `GET /user/logout`

**Description:** 
Log out the authenticated user by blacklisting their token and clearing the session cookie.

**Authentication:**
Required. Token must be provided in either:
- Cookie: `token`
- Authorization header: `Bearer <token>`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Status Codes:**

| Status Code | Description |
|---|---|
| 200 | User successfully logged out. Token blacklisted. |
| 400 | Validation error. No token provided. |
| 401 | Unauthorized. Invalid or expired token. |

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Error Response (400):**
```json
{
  "error": "No token found"
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/user/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "message": "Logged out successfully"
}
```
