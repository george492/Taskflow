#  API Documentation – TaskFlow

This API allows clients to manage users and tasks in a collaborative task management system.  
Base URL: `http://localhost:5000`

---

##  Authentication

### `POST /api/auth/register`
Register a new user.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Response:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

---

### `POST /api/auth/login`
Authenticate user and receive a JWT token.

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Response:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

---

### `GET /api/auth/users`
Get all users (passwords excluded).  

#### Response:
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

### `PUT /api/auth/profile`
Update in user profile
#### Request Body:
```json
{
  "name": "string",
  "email": "user@example.com",
  "profileImage": "string"
}

#### Response:
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "profileImage": "string",
    "rating": 0,
    "numOfRatings": 0
  }
}
---

##  Tasks

### `GET /api/tasks`
Retrieve all tasks created by or assigned to the current user.  
🛡 **Protected Route**

#### Optional Query:
- `status=Done` – Filter tasks by status

---

### `POST /api/tasks`
Create a new task.  
🛡 **Protected Route**

#### Request Body:
```json
{
  "title": "New Task",
  "description": "Task details",
  "assignee": "<user_id>",
  "totalTasks": 3
}
```

---

### `PUT /api/tasks/:id`
Update an existing task.  
🛡 **Protected Route**

#### Request Body Example:
```json
{
  "title": "Updated Task",
  "description": "Updated details",
  "deadline": "2025-05-16T14:36:58.926Z",
  "assignee": "<user_id>",
  "status": "pending",
  "priority": "Low",
  "startDate": "2025-05-16T14:36:58.926Z",
  "totalTasks": 0
}
```

---

### `DELETE /api/tasks/:id`
Delete a task by ID.  
🛡 **Protected Route**

---

### `POST /api/tasks/:id/rate`
Rate a completed task.  
🛡 **Protected Route**

#### Request Body:
```json
{
  "rating": 4
}
```

---

##  Authentication Header Format
For all protected routes, include this header:
```http
Authorization: Bearer <your_jwt_token>
```

---

##  Notes
- Swagger UI is available at `/api-docs`
- All timestamps are in ISO 8601 format
- Use user `_id` values when assigning tasks