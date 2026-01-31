# 🎓 Learning Management System (LMS)

A **production-ready Learning Management System** built with a real-world mindset — covering authentication, course management, secure payments, and student access control. This project focuses on **correctness, reliability, and edge-case handling**, not just "happy path" demos.

---

## 🚀 Features

### 👨‍🎓 Student

- User authentication (JWT based)
- Browse available courses
- Purchase courses using **Razorpay**
- Access purchased courses only after successful payment
- Retry payment safely if previous attempt failed

### 🧑‍🏫 Admin / Instructor

- Create & manage courses
- Add course content and FAQs
- View enrolled students
- Secure APIs with role-based access

### 💳 Payments (Razorpay)

- Order creation before payment
- Secure payment verification using signature validation
- Handles edge cases:
  - App crash during payment
  - Network failure
  - Duplicate payment attempts
- Prevents duplicate course purchase after successful payment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- React Query
- Razorpay Checkout SDK

### Backend

- Node.js
- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## 🧠 Key Design Decisions

### ✅ Partial Unique Index (Critical)

Only **PAID** orders are restricted per user & course:

```ts
orderSchema.index(
  { user: 1, course: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "PAID" },
  },
);
```

This allows:

- Multiple failed / pending attempts
- Only one successful purchase

---

### 🔐 Payment Verification Flow

1. Frontend creates Razorpay order
2. User completes payment
3. Razorpay returns payment details
4. Backend verifies signature using secret key
5. Order marked as `PAID`
6. Student enrolled in course

> Payment success is **never trusted from frontend alone**

---

## ⚙️ Environment Variables

### Backend

```
MONGO_URI=

JWT_SECRET=
PASSWORD_RESET_SECRET=

FRONTEND_USER_URL=
FRONTEND_ADMIN_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend

```
VITE_BACKEND_URL=
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Edge Cases Handled

- Duplicate order creation
- Payment retries
- Network failures
- App crash during payment
- Idempotent payment verification

---

## 🏆 What This Project Demonstrates

- Real-world payment system design
- Secure backend architecture
- Strong TypeScript usage (no blind `any`)
- Production-level MongoDB indexing strategy

---

Happy Learning 🚀
