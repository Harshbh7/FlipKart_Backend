# FlipKart Clone - Backend Server

This repository contains the backend server for the FlipKart clone web application, built using Node.js, Express, MongoDB (Mongoose), and Socket.io.

---

## 🚀 Features & Architecture

* **Hybrid Search Engine**: Supports hybrid search combining semantic vector search (ChromaDB + Google Gemini text embeddings) and MongoDB regex queries. Includes fallback to database regex if the vector store is offline.
* **AI Visual Search Assistant**: Integration with Gemini Vision (`gemini-flash-latest`) to identify products from uploaded images and find relevant matches.
* **User & Role Authentication**: JWT-based authentication stored in secure cookies, with automated token refreshing middleware. Roles include Customer, Seller, and Admin.
* **Seller Applications**: Full seller review pipeline. Admin verification updates user roles between `customer` and `seller` in real-time.
* **Bulk Uploads**: Allows sellers to import products in bulk via CSV parsing (`csv-parse` + `multer`).
* **Payments**: Integrated with Razorpay SDK, supporting both test/live keys and a fully featured sandbox Mock Mode.
* **Real-time WebSockets**: Core updates (e.g. payment confirmations, returns status changes, buyer-seller chat) emit live Socket.io events.
* **Security & TLS**: Configured for local SSL-decrypting developer proxies and environments.

---

## 🛠️ Technology Stack

* **Server Framework**: Node.js & Express
* **Database**: MongoDB (Mongoose)
* **Vector Store**: ChromaDB (Chroma Cloud or local instance)
* **Generative AI**: Google Generative AI (Gemini SDK)
* **File Uploads**: Multer & Cloudinary SDK
* **Payments**: Razorpay Node SDK
* **Real-time Notifications**: Socket.io
* **Email Services**: Nodemailer (SMTP transport)

---

## 💻 Setup & Installation

### 1. Prerequisites
Make sure you have Node.js (v18+) and MongoDB installed and running.

### 2. Install Dependencies
Navigate to the `server/` directory and install the packages:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the `server/` folder and populate it with your credentials:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/flipkart
JWT_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Config (Set mock values to run in Mock Payment Mode)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# SMTP Email Config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
EMAIL_FROM=Flipkart Clone <your_gmail_address>

# Gemini API Config
GEMINI_API_KEY=your_gemini_api_key

# ChromaDB Config
CHROMADB_TENANT=your_chromadb_tenant_id
CHROMADB_DATABASE=FlipKart
CHROMADB_API_KEY=your_chromadb_api_key
```

### 4. Running the Server
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start
```
The server will start listening at `http://localhost:5000`.
