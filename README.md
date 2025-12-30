# ragemp-typescript-react-mongo

A full-stack starter template for **RAGE:MP** using **TypeScript**, **React**, and **MongoDB**.

---

## Badges

![pnpm](https://img.shields.io/badge/package-pnpm-blue)
![React](https://img.shields.io/badge/frontend-React-61DAFB)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248)
![RAGE](https://img.shields.io/badge/server-RAGE\:MP-FF4444)

---

## Prerequisites

* **Node.js** (v18+ recommended)
* **pnpm**
* **MongoDB** (local or remote)
* **RAGE:MP server** (Windows or Linux version)

---

## 1. Install Dependencies

```bash
pnpm install
```

Installs both frontend and backend dependencies.

---

## 2. Start Frontend Dev Server

```bash
pnpm run dev
```

Usually available at `http://localhost:5173`.

---

## 3. Setup RAGE:MP Server

1. Download RAGE:MP server (Windows or Linux).
2. Extract server files into `apps/rage/`.
3. Ensure `.env` and `.env.example` are in `apps/rage/`:

```
apps/rage/.env
apps/rage/.env.example
```

4. Edit `.env` and set your environment variables (e.g., MongoDB URI):

```
MONGO_URI=mongodb://localhost:27017/ragemp
```

---

## 4. Launch RAGE:MP Server

* **Windows:**

```bash
apps/rage/ragemp-server.exe
```

* **Linux:**

```bash
cd apps/rage
chmod +x ragemp-server
./ragemp-server
```

---

## 5. Project Structure

```
/apps
  /rage       # RAGE:MP server + .env files
  /ui         # React frontend (TypeScript)
/packages
  /shared     # Shared TypeScript code
```

---

## 6. Ready to Play

* Frontend running → interact with UI.
* RAGE:MP server running → connect with client.
* MongoDB connected → all data stored correctly.

> You are now ready to start developi
