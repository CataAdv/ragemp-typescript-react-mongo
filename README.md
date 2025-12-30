# ragemp-typescript-react-mongo

A full-stack starter template for **RAGE:MP** using **TypeScript**, **React**, and **MongoDB**.

---

## Badges

![pnpm](https://img.shields.io/badge/package-pnpm-blue)
![React](https://img.shields.io/badge/frontend-React-61DAFB)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248)
![RAGE:MP](https://img.shields.io/badge/server-RAGE:MP-FF4444)

---

## Prerequisites

Before running the project, make sure you have installed:

- **Node.js** (v18+ recommended)
- **pnpm**
- **MongoDB** (local or remote)
- **RAGE:MP server** (Windows or Linux version)

---

## 1. Install Dependencies

Install all required packages for the project:

```bash
pnpm install
```

This will install both **frontend** and **backend** dependencies.

---

## 2. Start the Development Server

Run the frontend dev server:

```bash
pnpm run dev
```

The frontend should now be running, usually at `http://localhost:5173` (check terminal output).

---

## 3. Set Up RAGE:MP Server

1. Download the RAGE:MP server files (Windows or Linux).  
2. Extract the server files into the project folder:

```
apps/rage/
```

---

## 4. Launch the RAGE:MP Server

- **Windows:**

```bash
apps/rage/ragemp-server.exe
```

- **Linux:**

```bash
cd apps/rage
chmod +x ragemp-server
./ragemp-server
```

> Make sure you have proper permissions on Linux.

---

## 5. Configure MongoDB

1. Make sure MongoDB is running.  
2. Update the backend configuration (`.env` or config file) with your MongoDB connection string.  

Example connection string:

```
MONGO_URI=mongodb://localhost:27017/ragemp
```

---

## 6. Project Structure Overview

```
/apps
  /rage       # RAGE:MP server files
  /ui         # React frontend (TypeScript)
/packages
  /shared     # Shared TypeScript code
```

---

## 7. Ready to Play

- Frontend running → interact with your UI.  
- RAGE:MP server running → connect with your client.  
- MongoDB connected → all data stored correctly.

> You are now ready to start developing your **ragemp-typescript-react-mongo** project!
