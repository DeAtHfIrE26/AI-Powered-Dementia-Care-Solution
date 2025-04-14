# API Documentation

This document describes the API endpoints provided by the MemoTag application.

## Base URL

The API base URL is:

```
http://localhost:5000/api
```

## Authentication

The API currently doesn't implement authentication for the available endpoints.

## Endpoints

### Contact Submission

**Endpoint:** `/api/contact`
**Method:** `POST`
**Description:** Submit a contact form with optional waitlist joining

**Request Body:**

```typescript
{
  name: string; // Required, at least 2 characters
  email: string; // Required, valid email address
  role: string; // Required, one of the available roles
  message?: string; // Optional message
  joinWaitlist: boolean; // Whether to join the waitlist, defaults to false
}
```

**Response:**

```typescript
{
  success: boolean; // Whether the request was successful
  message: string; // Response message
  data?: {
    id: number;
    name: string;
    email: string;
    role: string;
    message: string | null;
    joinWaitlist: boolean;
    createdAt: string;
  }; // Contact submission data, only included on success
}
```

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "healthcare_professional",
    "message": "I would like to learn more about MemoTag",
    "joinWaitlist": true
  }'
```

**Example Success Response:**

```json
{
  "success": true,
  "message": "Contact submission received",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "healthcare_professional",
    "message": "I would like to learn more about MemoTag",
    "joinWaitlist": true,
    "createdAt": "2023-10-15T14:30:00.000Z"
  }
}
```

**Example Error Response:**

```json
{
  "success": false,
  "message": "Invalid input: email must be a valid email address"
}
```

**Notes:**

1. If `joinWaitlist` is set to `true`, a confirmation email will be sent to the provided email address.
2. The `role` field should be one of the predefined values in the UI select component:
   - `healthcare_professional`
   - `care_facility_admin`
   - `family_caregiver`
   - `researcher`
   - `other`

## Error Handling

The API uses the following error status codes:

- `400 Bad Request` - Invalid input data
- `500 Internal Server Error` - Server-side error

All error responses have the following format:

```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

## Rate Limiting

Currently, there is no rate limiting implemented on the API endpoints.

## Further Development

For future API development, consider:

1. Adding authentication
2. Implementing rate limiting
3. Adding more endpoints for user management and other features 