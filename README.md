# BYC Store — Full-Stack MERN E-Commerce Platform

A modern, full-stack e-commerce platform built as a capstone project using the MERN stack. The application provides a complete online shopping experience with product browsing, authentication, cart management, checkout, online payments, order management, user dashboards, administrative management, image uploads, content management, and responsive interfaces.

The project is designed with a separated frontend and backend architecture and deployed using Vercel and Render.

---

## 🌐 Live Application

### Frontend
https://byc-store-capstone-rosy.vercel.app

### Backend API
https://byc-store-capstone.onrender.com

### Repository
https://github.com/skinokovic/byc_store_capstone

---

# 📌 Project Overview

BYC Store is a full-stack fashion e-commerce application designed to simulate a production-ready online shopping platform.

The application supports two major user experiences:

### Customer Experience

Customers can:

- Browse products
- Browse products by category and subcategory
- Search and filter products
- View detailed product information
- Add products to cart
- Update cart quantities
- Manage wishlist items
- View recently viewed products
- Create and manage delivery addresses
- Calculate delivery fees based on location
- Register and authenticate securely
- Manage their profile
- Place orders
- Make online payments through Paystack
- View order history
- Track order status
- Read blogs
- Leave comments and reviews
- Subscribe to newsletters
- Contact the store
- Access FAQs and store information

### Administrator Experience

Administrators can:

- View dashboard analytics
- Manage users
- Manage products
- Manage categories
- Manage collections
- Manage homepage sliders
- Manage new arrivals
- Manage blogs
- Manage comments
- Manage contact messages
- Manage newsletter subscribers
- Manage orders
- Manage delivery zones
- Manage FAQs
- View customer information
- Update order statuses
- View order details
- Print order receipts

---

# 🚀 Features

## Customer Features

### Authentication

- User registration
- User login
- JWT authentication
- Protected routes
- Guest routes
- Persistent authentication
- User profile management
- Password hashing with bcrypt
- Role-based access control

### Product Management

- Product listing
- Product details
- Product images
- Product categories
- Product subcategories
- Product brands
- Product ratings
- Stock management
- Product discounts
- Related products
- Recently viewed products

### Shopping Cart

- Add to cart
- Remove from cart
- Update quantity
- Persistent cart
- Guest cart support
- Authenticated user cart
- Cart synchronization

### Wishlist

- Add products to wishlist
- Remove products from wishlist
- Wishlist management

### Checkout

- Delivery address management
- Delivery zone selection
- Automatic delivery fee calculation
- Order summary
- Payment method selection
- Order creation

### Payments

Paystack TEST integration provides: NOT FULLY INTEGRATED YET

- Payment initialization
- Paystack checkout
- Payment callback handling
- Server-side payment verification
- Payment reference tracking
- Webhook support
- Payment status updates
- Automatic order status updates

### Content

- Homepage sliders
- New arrivals
- Product collections
- Blog
- Blog details
- Comments
- FAQs
- Newsletter subscription
- Contact form
- Static information pages

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- JavaScript / JSX
- Redux Toolkit
- React Redux
- React Router DOM
- Axios
- Bootstrap
- Lucide React
- Swiper
- React Toastify
- React Slick / carousel-related UI where applicable

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Axios
- dotenv
- CORS
- Cloudinary
- Multer
- Express middleware

## Payment

- Paystack API

## Image Management

- Cloudinary

## Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB / MongoDB Atlas

### Source Control

- Git
- GitHub

---

# 📦 Frontend Packages

The frontend is located inside the `client` directory.

Major packages used include:

```text
react
react-dom
react-router-dom
@reduxjs/toolkit
react-redux
axios
bootstrap
lucide-react
swiper
react-toastify

##LOCALHOST
#client#
npm run dev

##LOCALHOST
#server#
npm start
