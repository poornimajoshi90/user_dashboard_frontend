# 🚀 React CRUD Dashboard

A modern and responsive CRUD (Create, Read, Update, Delete) user dashboard using **React, Vite, and React-Bootstrap**.  
The backend API is powered by **JSON Server**, deployed on **Render**, and the frontend is deployed on **Netlify**.

---

## 🌐 Live Links

🔗 **Frontend (Netlify):**  
https://jazzy-alpaca-15a5a0.netlify.app

🔗 **Backend API (Render):**  
https://user-management-backend-1-mh01.onrender.com

---

## ✨ Features

- ✅ Add new users
- 📋 View user list
- ✏️ Edit existing users
- 🗑️ Delete users
- ⚡ Fast build using Vite
- 🎨 Responsive UI with React-Bootstrap
- 🔄 API integration using Axios
- 🌍 Separate frontend & backend deployment

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React-Bootstrap
- Axios
- Bootstrap CSS

### Backend
- JSON Server
- Node.js
- Hosted on Render

### Deployment
- Frontend: Netlify
- Backend: Render

---

## 📂 Project Structure

```
vite-project/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AddUser.jsx
│   │   ├── EditUser.jsx
│   │   └── UserList.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/poornimajoshi90/user_dashboard_frontend
```

### 2️⃣ Navigate to Project Folder

```
cd user_dashboard_frontend
```

### 3️⃣ Install Dependencies

```
npm install
```

---

## ▶️ Run Locally

### Start Backend (JSON Server)

```
npm run server
```

Backend runs at:
```
http://localhost:3001
```

### Start Frontend

```
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🏗️ Build for Production

```
npm run build
```

This creates a `dist` folder which is deployed to Netlify.

---

## 📡 API Endpoints

```
GET     /users
POST    /users
PUT     /users/:id
DELETE  /users/:id
```

---

## 🚀 Deployment Process

### 🔹 Frontend (Netlify)
1. Run `npm run build`
2. Upload the `dist` folder manually to Netlify
3. Live site generated

### 🔹 Backend (Render)
1. Push repository to GitHub
2. Connect repository to Render
3. Set build command:
   ```
   npm install
   ```
4. Set start command:
   ```
   npm run server
   ```
5. Backend API deployed successfully

---


