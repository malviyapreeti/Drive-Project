# Drive Project – Cloud-Based File Storage Application

A web-based file storage application that allows users to securely register, log in, upload files, and manage their personal files using cloud storage.

## 🚀 Project Overview

Drive Project is a cloud-based file management application built using Node.js, Express.js, MongoDB, and Cloudinary.

The application provides user authentication and file upload functionality, allowing users to store and access their files through a web interface.

## ✨ Features

- User Registration and Login
- Password Hashing using Bcrypt
- JWT-Based Authentication
- Protected Routes and User Sessions
- File Upload using Multer
- Cloud-Based File Storage using Cloudinary
- MongoDB Database Integration
- Dynamic Views using EJS
- User-Specific File Management
- Logout Functionality

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | Database Management |
| Cloudinary | Cloud File Storage |
| EJS | Templating Engine |
| JavaScript | Application Logic |
| Multer | File Upload Handling |
| Bcrypt | Password Hashing |
| JWT | Authentication |
| Git & GitHub | Version Control |

## 📂 Project Structure

```text
Drive-Project/
│
├── config/
│   └── db.js
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
│   └── home.ejs
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

Create a `.env` file in the root directory and configure the following variables according to your setup:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Note:** Never share or upload your `.env` file or secret credentials to GitHub.

### 5. Start the Application

```bash
npm start
```

The application will run on:

```text
http://localhost:4000
```

## 🔐 Security

- Passwords are hashed before storing them in the database.
- JWT is used for user authentication.
- Protected routes restrict access to authenticated users.
- Environment variables are used to manage sensitive credentials.

## 👩‍💻 Developer

**Preeti Malviya**

- GitHub: [malviyapreeti](https://github.com/malviyapreeti)
- Project Repository: [Drive Project](https://github.com/malviyapreeti/Drive-Project)

---

*Built as a practical project to explore backend development, authentication, database integration, and cloud-based file storage.*
