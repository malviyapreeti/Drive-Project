# Drive Project – Cloud-Based File Storage Application

A web-based file management application where users can register, log in, upload files to cloud storage, and manage their own files.

## 🚀 Project Overview

Drive Project is a backend-focused file storage application built with **Node.js, Express.js, MongoDB, and Cloudinary**.

Users can create an account, authenticate, upload files, view their uploaded files, rename them, and delete them through the web interface. File information is stored in MongoDB, while uploaded files are stored in Cloudinary.

## ✨ Features

- User Registration and Login
- Password Hashing using Bcrypt
- JWT-Based Authentication
- HTTP-Only Cookie Authentication
- Protected Routes
- File Upload using Multer
- Cloud-Based File Storage using Cloudinary
- User-Specific File Management
- Rename Uploaded Files
- Delete Uploaded Files
- MongoDB Database Integration
- Dynamic Views using EJS
- Logout Functionality
- Root Route Redirect to Login Page

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | Database Management |
| Cloudinary | Cloud File Storage |
| Multer | File Upload Handling |
| EJS | Templating Engine |
| JavaScript | Application Logic |
| Bcrypt | Password Hashing |
| JWT | Authentication |
| Cookie Parser | Cookie Handling |
| Git & GitHub | Version Control |

## 📂 Project Structure

```text
Drive-Project/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   └── file.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── index.routes.js
│   └── upload.routes.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── home.ejs
│   └── my-files.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/malviyapreeti/Drive-Project.git
```

### 2. Navigate to the Project Directory

```bash
cd Drive-Project
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

You need a MongoDB connection string and Cloudinary account credentials.

**Important:** Never share or upload your `.env` file or secret credentials to GitHub.

### 5. Start the Application

```bash
npm start
```

The application will run on:

```text
http://localhost:4000
```

## 🔐 Authentication & File Management

- Passwords are hashed using Bcrypt before being stored.
- JWT is used for user authentication.
- Authentication tokens are stored in HTTP-only cookies.
- Protected routes require valid authentication.
- Files are associated with the user who uploaded them.
- Users can view, rename, and delete their own files.

## 👩‍💻 Developer

**Preeti Malviya**

- GitHub: [malviyapreeti](https://github.com/malviyapreeti)
- Project Repository: [Drive Project](https://github.com/malviyapreeti/Drive-Project)

---

*Built as a practical project to learn backend development, authentication, database integration, and cloud-based file storage.*
