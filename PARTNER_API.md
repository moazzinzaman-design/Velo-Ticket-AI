# Velo Partnership API

The Velo Partnership API allows approved venues and brands to integrate directly with Velo's ticketing platform. Partners can list upcoming events, check real-time availability, and process bookings programmatically.

## Authentication

All API requests must include the `x-api-key` header with your unique Partner API Key.

| Header | Value |
| :--- | :--- |
| `x-api-key` | `velo_partner_test_key` (for prototype) |

## Endpoints

### 1. List Events

Retrieve a list of all active events available for partnership booking.

- **Endpoint:** `GET /api/partner/events`
- **Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Neon Nights: Cyberpunk Rave",
      "venue": "The Undercity, Shoreditch",
      "date": "Fri, 15 Mar",
      "price": 45.00,
      "tag": "SELLING FAST",
      "soldPercentage": 78
    },
    ...
  ],
  "meta": {
    "count": 5,
    "timestamp": "2024-03-10T14:30:00.000Z"
  }
}
```

### 2. Get Event Details

Retrieve detailed information for a specific event.

- **Endpoint:** `GET /api/partner/events/:id`
- **Example:** `/api/partner/events/1`
- **Response:**

```json
{
  "data": {
    "id": 1,
    "title": "Neon Nights: Cyberpunk Rave",
    "venue": "The Undercity, Shoreditch",
    "date": "Fri, 15 Mar",
    "time": "22:00",
    "price": 45.00,
    "category": "Nightlife",
    "image": "...",
    "tag": "SELLING FAST",
    "soldPercentage": 78,
    "description": "Experience the ultimate cyberpunk rave...",
    "capacity": 500
  }
}
```

### 3. Create Booking

Book tickets for an event.

- **Endpoint:** `POST /api/partner/bookings`
- **Payload:**

```json
{
  "eventId": 1,
  "quantity": 2
}
```

- **Response:**

```json
{
  "message": "Booking successful",
  "data": {
    "id": "bk_6a8s9d7f",
    "eventId": 1,
    "partnerId": "partner_01",
    "quantity": 2,
    "totalPrice": 90.00,
    "status": "confirmed",
    "timestamp": "2024-03-10T14:35:00.000Z"
  }
}
```

## Error Handling

| Status Code | Description |
| :--- | :--- |
| 400 | Bad Request (Missing parameters) |
| 401 | Unauthorized (Invalid API Key) |
| 404 | Event Not Found |
| 409 | Conflict (Event Sold Out) |
| 500 | Internal Server Error |
