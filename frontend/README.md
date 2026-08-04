# 🛍️ AI E-Commerce Recommendation System

An AI-powered E-Commerce Recommendation System built using React, FastAPI, MySQL, and Machine Learning.

This application provides personalized product recommendations based on user behavior such as product views, wishlist, cart activity, and purchases.

---

# 🚀 Features

## 👤 User Module

- User Registration
- User Login (JWT Authentication)
- Product Listing
- Product Details
- Search Products
- Category Filter
- Product Sorting
- Wishlist
- Shopping Cart
- Checkout
- Order History

---

## 🤖 AI Recommendation Module

- Personalized Recommendations
- Similar Product Recommendations
- Trending Products
- Top Rated Products
- User Activity Tracking

Activities tracked:

- VIEW
- CART
- WISHLIST
- PURCHASE

---

## 📊 Admin Dashboard

- Dashboard Analytics
- Total Products
- Total Users
- Total Orders
- Revenue
- User Activity Analytics
- Top Selling Products

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Recharts
- Lucide React

---

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib
- Python

---

## Database

- MySQL

---

# 🤖 AI Recommendation Logic

Recommendations are generated using:

- Product Similarity
- User Browsing History
- Wishlist Activity
- Cart Activity
- Purchase History

---

# 📁 Project Structure

```
AI-ECommerce-Recommendation-System

├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   └── routes
│
├── backend
│   ├── app.py
│   ├── models.py
│   ├── database.py
│   ├── recommendation.py
│   ├── auth.py
│   └── requirements.txt
│
└── README.md
```

---

# ⚙️ Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/ai_recommendation

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 📊 API Endpoints

## Authentication

- POST /register
- POST /login

## Products

- GET /products
- GET /products/{id}

## Recommendations

- GET /recommendations/top-rated
- GET /recommendations/trending
- GET /ml-recommendations/{id}
- GET /personalized/{user_id}

## Activity

- POST /activity
- GET /activity/{user_id}

## Admin

- GET /admin/dashboard
- GET /admin/products
- GET /admin/orders
- GET /admin/users

---

# 📷 Screenshots

Add screenshots here after deployment.

- Home
- Products
- Product Details
- AI Recommendations
- Cart
- Wishlist
- Checkout
- Orders
- Admin Dashboard

---

# 🎯 Future Improvements

- Admin Product Management
- Product Reviews
- Payment Gateway
- Search Suggestions
- Email Notifications

---

# 👨‍💻 Author

**Amit Maurya**

B.Tech CSE (AI)

AI E-Commerce Recommendation System