# API Integration Documentation

## Project

**Project Name:** RentNest Frontend

**Frontend Live URL:** https://rent-nest-theta-five.vercel.app

**Backend Base URL:**

```
https://rent-nest-backend-bl08.onrender.com/api
```

---

# Authentication

| Frontend Feature     | Backend Endpoint      | Method |
| -------------------- | --------------------- | ------ |
| User Registration    | `/users/register`     | POST   |
| User Login           | `/auth/login`         | POST   |
| Refresh Access Token | `/auth/refresh-token` | POST   |
| Get Logged-in User   | `/auth/me`            | GET    |
| Logout               | `/auth/logout`        | POST   |

---

# Categories

| Frontend Feature        | Backend Endpoint  | Method |
| ----------------------- | ----------------- | ------ |
| Get Categories          | `/categories`     | GET    |
| Create Category (Admin) | `/categories`     | POST   |
| Update Category         | `/categories/:id` | PATCH  |
| Delete Category         | `/categories/:id` | DELETE |

---

# Public Properties

| Frontend Feature  | Backend Endpoint  | Method |
| ----------------- | ----------------- | ------ |
| Browse Properties | `/properties`     | GET    |
| Property Details  | `/properties/:id` | GET    |

---

# Landlord Property Management

| Frontend Feature  | Backend Endpoint           | Method |
| ----------------- | -------------------------- | ------ |
| Create Property   | `/landlord/properties`     | POST   |
| Get My Properties | `/landlord/properties`     | GET    |
| Update Property   | `/landlord/properties/:id` | PUT    |
| Delete Property   | `/landlord/properties/:id` | DELETE |

---

# Rental Requests

## Tenant

| Frontend Feature      | Backend Endpoint | Method |
| --------------------- | ---------------- | ------ |
| Submit Rental Request | `/rentals`       | POST   |
| My Rental Requests    | `/rentals`       | GET    |
| Rental Details        | `/rentals/:id`   | GET    |

## Landlord

| Frontend Feature         | Backend Endpoint                  | Method |
| ------------------------ | --------------------------------- | ------ |
| Incoming Requests        | `/landlord/requests`              | GET    |
| Approve / Reject Request | `/landlord/requests/:id`          | PATCH  |
| Complete Rental          | `/landlord/requests/:id/complete` | PATCH  |

---

# Payments

| Frontend Feature               | Backend Endpoint    | Method |
| ------------------------------ | ------------------- | ------ |
| Create Stripe Checkout Session | `/payments/create`  | POST   |
| Payment History                | `/payments`         | GET    |
| Payment Details                | `/payments/:id`     | GET    |
| Stripe Webhook                 | `/payments/webhook` | POST   |

---

# Reviews

| Frontend Feature | Backend Endpoint | Method |
| ---------------- | ---------------- | ------ |
| Submit Review    | `/reviews`       | POST   |

---

# Admin

| Frontend Feature         | Backend Endpoint    | Method |
| ------------------------ | ------------------- | ------ |
| Get All Users            | `/admin/users`      | GET    |
| Ban / Unban User         | `/admin/users/:id`  | PATCH  |
| View All Properties      | `/admin/properties` | GET    |
| View All Rental Requests | `/admin/rentals`    | GET    |

---

# Route Mapping

| Frontend Route                      | Backend Endpoint           |
| ----------------------------------- | -------------------------- |
| `/`                                 | GET `/properties`          |
| `/properties`                       | GET `/properties`          |
| `/properties/[id]`                  | GET `/properties/:id`      |
| `/register`                         | POST `/users/register`     |
| `/login`                            | POST `/auth/login`         |
| `/tenant-dashboard/rentals`         | GET `/rentals`             |
| `/tenant-dashboard/payment-history` | GET `/payments`            |
| `/landlord-dashboard/properties`    | GET `/landlord/properties` |
| `/landlord-dashboard/requests`      | GET `/landlord/requests`   |
| `/admin-dashboard/users`            | GET `/admin/users`         |
| `/admin-dashboard/categories`       | GET `/categories`          |
| `/admin-dashboard/properties`       | GET `/admin/properties`    |
| `/admin-dashboard/rentals`          | GET `/admin/rentals`       |

---

# Authentication

- JWT Authentication
- HttpOnly Cookie based Access Token
- Role-based Authorization (Admin, Landlord, Tenant)
- Protected Routes using Next.js Middleware

---

# Payment Flow

Tenant selects an approved rental request.

↓

Frontend sends

```
POST /payments/create
```

↓

Backend creates Stripe Checkout Session.

↓

Stripe Checkout Page.

↓

Payment Success

```
/payment/success
```

↓

Automatically redirects to

```
/tenant-dashboard/payment-history
```

↓

Payment status becomes **COMPLETED** through Stripe Webhook.

---

# Notes

- All protected API requests use JWT Authentication.
- The frontend communicates with the backend using native Fetch API.
- Stripe Checkout is used for secure payment processing.
- Success and Cancel payment pages provide user-friendly feedback.
- API responses are displayed with structured toast notifications and form validation messages.
