# 📝 To-Do List Full-Stack App

In this project, I have built a complete, full-stack To-Do list application. 
It serves as a foundational learning project meant to demonstrate how to connect a frontend client to a server that communicates with a database.

## 🚀 Features

- **Authentication System:** Secure user registration and login. Passwords are securely hashed using `bcrypt`, and user sessions are managed via JSON Web Tokens (`jwt`).
- **Role-Based Access Control (RBAC):** Demonstrates administrative (Admin) and standard (User) functionality, enforcing rules and permissions on different operations.
- **Database Integration:** Securely read and write to a database to manage user accounts, tasks, and categories.
- **Session Management:** Utilizes cookies for seamless auth state across the client.

## 💻 Tech Stack

### Backend
* **Node.js** with **Express.js**
* **MySQL2** - For database interactions.
* **jsonwebtoken** & **cookie-parser** - For stateless authentication.
* **bcrypt** - For secure password hashing.

### Frontend
* **HTML5**, **CSS3**, & **Vanilla JavaScript** - For a lightweight, fast, and responsive client side.

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running MySQL server

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/elyashiv67/toDoList-2.git
   cd toDoList-2
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Ensure you have a `.env` file in the root of your project to connect to your database and provide a JWT secret.
   *(Example variables typically include `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, and `JWT_SECRET`)*

4. **Run the server:**
   ```bash
   npm start
   ```
   *This uses `nodemon` to automatically restart the server upon any file changes.*

## 📂 Project Overview
- `/controller` - Houses the business logic and route handlers (e.g., `users_C.js`, `categories_C.js`).
- `/public` - Contains the frontend client files (`Home.html`, `register.html`, `script.js`).
- `server.js` - The main entry point for the backend server.
