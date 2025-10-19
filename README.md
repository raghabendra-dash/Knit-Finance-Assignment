# Assignment

This is a modern, full-stack web application built with the **MERN** stack (MongoDB, Express, React, Node.js). It allows users to register and manage tasks efficiently through an interactive dashboard.  The project demonstrates secure authentication, CRUD functionality, responsive design and a scalable architecture — exactly as required in the Frontend Developer Task assignment.

---
 > **Live At**:- [Click Here](https://task-manager-mocked.netlify.app/)

## Key Features

### Authentication
- User registration and login using **JWT (JSON Web Tokens)**  
- Secure password hashing with **bcrypt**  
- Protected routes — users must log in to access the dashboard

### Task Management (CRUD)
- Create, view, update, and delete tasks  
- Filter tasks by status — *To Do*, *In Progress*, *Completed*  
- Responsive and intuitive UI with TailwindCSS  
- State management via **Redux Toolkit**

### Dashboard
- Displays all tasks dynamically from the backend  
- Includes filtering and search-friendly UI  
- Task creation/edit modals  
- Logout and theme toggle options (Light/Dark mode)

### Security
- JWT authentication middleware  
- Passwords never stored in plain text  
- Error handling for invalid or expired tokens  
- Input validation on both client and server sides

---

## Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Lucide React Icons

**Backend**
- Node.js / Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## Getting Started

**Prerequisites**

Node.js and npm installed

MongoDB installed and running locally or via MongoDB Atlas

**Installation Steps**

**Clone the repository**
```bash
git clone...
```

**Install dependencies**

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd ../server
npm install
```

**Run the application**
```bash
Start backend:
cd server
npm run dev

Start frontend:
cd client 
npm run dev
```

---

**Task Manager Fullstack** — developed for **Knit-Finance** with authentication and a dashboard (including a basic backend for API requests)

