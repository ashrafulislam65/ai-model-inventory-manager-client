## 🖼️ Project Screenshots

<p align="center">
  <img src="https://i.ibb.co.com/rKnK7pVS/Ai10.png" width="80%" alt="Home Page Screenshot" />
</p>



# 🌟 AI Model Inventory Manager


**Project Type:** Full Stack Web Application
**Tech Stack:** React | Tailwind CSS | DaisyUI | Express.js | MongoDB | Firebase

---

## 🚀 Live Demo

🔗 [Visit Live Website](#) *(https://ai-model-inventory-manag-c1caf.web.app/)*

---

## 🧠 Project Overview

**AI Model Inventory Manager** is a full-stack web application designed to help users **store, manage, and explore AI models**. It’s an educational project that connects **web development** with **AI model cataloging**, allowing users to perform CRUD operations, authenticate with Firebase, and experience a professional-grade UI inspired by platforms like **Hugging Face** and **Model Zoo**.

This project is ideal for learners who want to explore the intersection of AI and modern web technologies.

---

## ✨ Key Features

* 🔐 **Firebase Authentication** (Email/Password + Google Sign-In)
* 🧩 **CRUD Operations** – Add, View, Edit, and Delete AI models
* 📸 **ImgBB Integration** for image uploads
* ⚙️ **Dynamic Featured Models** section on the Home page
* 💾 **MongoDB Integration** for secure model storage
* 🛒 **Model Purchase System** (increments purchase count in real time)
* 🔍 **Search & Filter** models by name or framework
* 🌙 **Light/Dark Theme Toggle** across the entire site
* 📱 **Fully Responsive UI** using Tailwind + DaisyUI
* 💬 **Custom Toast Notifications** (no default alerts)
* 🌀 **Loading Spinners** and graceful error handling

---

## 🎯 Project Motivation

AI is transforming the tech landscape, and model management is crucial for research and development. This project lets students **simulate an AI model management tool** while learning full-stack development — making the learning both **practical and industry-relevant**.

Inspired by:

* **Hugging Face** → Model hub and dataset library
* **Kaggle** → Dataset management and competitions
* **Model Zoo** → Community-driven AI model repository

---

## 🧩 Core Functionalities

### 🔹 Home Page (`/`)

* Dynamic **Featured AI Models** section showing the 6 latest models.
* Static sections: *About AI Models* and *Get Started*.
* Image slider (minimum 3 slides).

### 🔹 Authentication

* Login and Register with Firebase.
* Google Sign-In available on both pages.
* Password validation (1 uppercase, 1 lowercase, min 6 chars).

### 🔹 Model Management

* **Add Model** → Private route for adding models.
* **All Models** → Displays all models with search & filter.
* **Model Details** → Show full info; only creator can Edit/Delete.
* **My Models** → User’s own added models.
* **My Purchases** → List of purchased models.

### 🔹 Purchase System

* “Purchase Model” button increases purchase count in real-time.
* Purchase info stored in a separate collection.

### 🔹 UI Components

* **Navbar** → Links to Home, Add Model, View Models, User Profile.
* **Dropdown Profile Menu** → Shows name, email, My Models & Purchases.
* **Footer** → Project name, copyright, GitHub links.

---

## 🧱 Data Structure (MongoDB Collection: `models`)

```json
{
  "_id": "ObjectId",
  "name": "BERT",
  "framework": "TensorFlow",
  "useCase": "NLP",
  "dataset": "Wikipedia",
  "description": "Transformer-based model for NLP tasks.",
  "image": "https://ibb.co/sample-image-bert-diagram",
  "createdBy": "user@example.com",
  "createdAt": "2025-10-28T11:54:00.000Z",
  "purchased": 10
}
```

---

## ⚙️ API Endpoints (Express.js)

| Method     | Endpoint                   | Description                                  |
| ---------- | -------------------------- | -------------------------------------------- |
| **GET**    | `/api/models`              | Get all models (with optional search/filter) |
| **GET**    | `/api/models/:id`          | Get model by ID                              |
| **POST**   | `/api/models`              | Add new model (private)                      |
| **PUT**    | `/api/models/:id`          | Update model (creator only)                  |
| **DELETE** | `/api/models/:id`          | Delete model (creator only)                  |
| **POST**   | `/api/models/:id/purchase` | Increment purchase count                     |

---

## 🔒 Authentication Flow (Firebase)

* Firebase Authentication used for user login & registration.
* JWT tokens can be verified on the server using **Firebase Admin SDK**.
* Persistent login ensures users remain logged in after refresh.

---

## 🎨 UI Design Guidelines

* Consistent **fonts**, **colors**, and **spacing**.
* Equal-sized **cards** and **grid layouts**.
* Replace old Twitter bird with new **X logo**.
* Use **Tailwind** utility classes and **DaisyUI** components.
* Keep all pages fully responsive (desktop → mobile).

**Design Inspiration Resources:**

* [Uiverse.io](https://uiverse.io)
* [ThemeForest](https://themeforest.net)
* [DevMeetsDevs](https://devmeetsdevs.com)
* [UXDesign Bootcamp Resources](https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5)

---

## 🧠 Bonus Challenges

1. **Filter by Framework** – Multi-select filter using MongoDB queries.
2. **Search by Name** – Case-insensitive `$regex` search.
3. **Real-Time Purchase Count** – `$inc` operator updates count live.
4. **Theme Toggle** – Global dark/light mode.

**Optional:**

* Firebase Admin SDK for secure route protection.
* Model Rating System (1–5 stars with average stored in DB).

---

## ⚡ Loading & Error Handling

* Custom **404 Page** with friendly message & “Back to Home” button.
* **Spinners** for data fetches and form submissions.
* Toasts for success/failure messages (no `alert()`).

---

## 🧾 Environment Variables Example (`.env`)

```
MONGODB_URI=your_mongo_connection
PORT=5000
IMG_BB_KEY=your_imgbb_api_key
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_APP_ID=...
CLIENT_URL=https://your-client-domain.netlify.app
```

---

## 🧑‍💻 Local Setup Guide

**Client Setup**

```bash
cd client
npm install
npm run dev
```

**Server Setup**

```bash
cd server
npm install
npm run dev
```

---

---
# 🚀 How to Run This Project on Your Local Machine
## 🚀 How to Run This Project Locally

This project has two parts:
- **Client (React)**
- **Server (Express + MongoDB)**

Below is the step-by-step setup guide for both.

---

## 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-model-inventory-client.git
git clone https://github.com/your-username/ai-model-inventory-server.git

Replace your-username with your GitHub username.
---

## 📦 2. Client Setup (React App)
cd ai-model-inventory-client
npm install
npm run dev
After starting, Vite will usually run on:
http://localhost:5173/

---

---

## 🛠️ 3. Server Setup (Express + MongoDB)
cd ../ai-model-inventory-server
npm install

---
---
## 🔐 Create .env File
Inside the project root, create a .env file and add:
PORT=5000
MONGO_URI=your_mongo_db_connection_string

---
## ▶️ Start the Server
npm start
By default, the server will run at:
http://localhost:5000/

---
🌐 4. Connect Client With Server

Inside the client project, create/update your .env file:

VITE_API_URL=http://localhost:5000

🔍 If everything is set correctly:

Client runs at: http://localhost:5173/

Server runs at: http://localhost:5000/

MongoDB: Connected

All Auth + CRUD features work ✔

🎉 You have successfully set up the project locally!

---


---

## 🧩 Core Functionalities

### 🔹 Home Page (`/`)

* Dynamic **Featured AI Models** section showing the 6 latest models.
* Static sections: *About AI Models* and *Get Started*.
* Image slider (minimum 3 slides).

### 🔹 Authentication

* Login and Register with Firebase.
* Google Sign-In available on both pages.
* Password validation (1 uppercase, 1 lowercase, min 6 chars).

### 🔹 Model Management

* **Add Model** → Private route for adding models.
* **All Models** → Displays all models with search & filter.
* **Model Details** → Show full info; only creator can Edit/Delete.
* **My Models** → User’s own added models.
* **My Purchases** → List of purchased models.

### 🔹 Purchase System

* “Purchase Model” button increases purchase count in real-time.
* Purchase info stored in a separate collection.

### 🔹 UI Components

* **Navbar** → Links to Home, Add Model, View Models, User Profile.
* **Dropdown Profile Menu** → Shows name, email, My Models & Purchases.
* **Footer** → Project name, copyright, GitHub links.

---

## 🧱 Data Structure (MongoDB Collection: `models`)

```json
{
  "_id": "ObjectId",
  "name": "BERT",
  "framework": "TensorFlow",
  "useCase": "NLP",
  "dataset": "Wikipedia",
  "description": "Transformer-based model for NLP tasks.",
  "image": "https://ibb.co/sample-image-bert-diagram",
  "createdBy": "user@example.com",
  "createdAt": "2025-10-28T11:54:00.000Z",
  "purchased": 10
}
```

---

## ⚙️ API Endpoints (Express.js)

| Method     | Endpoint                   | Description                                  |
| ---------- | -------------------------- | -------------------------------------------- |
| **GET**    | `/api/models`              | Get all models (with optional search/filter) |
| **GET**    | `/api/models/:id`          | Get model by ID                              |
| **POST**   | `/api/models`              | Add new model (private)                      |
| **PUT**    | `/api/models/:id`          | Update model (creator only)                  |
| **DELETE** | `/api/models/:id`          | Delete model (creator only)                  |
| **POST**   | `/api/models/:id/purchase` | Increment purchase count                     |

---

## 🔒 Authentication Flow (Firebase)

* Firebase Authentication used for user login & registration.
* JWT tokens can be verified on the server using **Firebase Admin SDK**.
* Persistent login ensures users remain logged in after refresh.

---

## 🎨 UI Design Guidelines

* Consistent **fonts**, **colors**, and **spacing**.
* Equal-sized **cards** and **grid layouts**.
* Replace old Twitter bird with new **X logo**.
* Use **Tailwind** utility classes and **DaisyUI** components.
* Keep all pages fully responsive (desktop → mobile).

**Design Inspiration Resources:**

* [Uiverse.io](https://uiverse.io)
* [ThemeForest](https://themeforest.net)
* [DevMeetsDevs](https://devmeetsdevs.com)
* [UXDesign Bootcamp Resources](https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5)

---

## 🧠 Bonus Challenges

1. **Filter by Framework** – Multi-select filter using MongoDB queries.
2. **Search by Name** – Case-insensitive `$regex` search.
3. **Real-Time Purchase Count** – `$inc` operator updates count live.
4. **Theme Toggle** – Global dark/light mode.

**Optional:**

* Firebase Admin SDK for secure route protection.
* Model Rating System (1–5 stars with average stored in DB).

---

## ⚡ Loading & Error Handling

* Custom **404 Page** with friendly message & “Back to Home” button.
* **Spinners** for data fetches and form submissions.
* Toasts for success/failure messages (no `alert()`).

---

## 🧾 Environment Variables Example (`.env`)

```
MONGODB_URI=your_mongo_connection
PORT=5000
IMG_BB_KEY=your_imgbb_api_key
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_APP_ID=...
CLIENT_URL=https://your-client-domain.netlify.app
```

---

## 🧑‍💻 Local Setup Guide

**Client Setup**

```bash
cd client
npm install
npm run dev
```

**Server Setup**

```bash
cd server
npm install
npm run dev
```

---



---
## 📁 GitHub Repositories

| Type            | Repository Link                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Client Repo** | https://github.com/ashrafulislam65/ai-model-inventory-manager-client |
| **Server Repo** | https://github.com/ashrafulislam65/ai-model-inventory-manager-server |

---

## 💡 Tips

* Always hide secrets using `.env`.
* Use **React Toastify** or **DaisyUI Toasts** for notifications.
* Test routes and persistence carefully.
* Keep UI clean, minimal, and modern.

---

**📚 Developed for Educational Purposes — Built with ❤️ using React, Express, MongoDB & Firebase.**


---

## 💡 Tips

* Always hide secrets using `.env`.
* Use **React Toastify** or **DaisyUI Toasts** for notifications.
* Test routes and persistence carefully.
* Keep UI clean, minimal, and modern.

---

**📚 Developed for Educational Purposes — Built with ❤️ using React, Express, MongoDB & Firebase.**


---

## 💡 Tips

* Always hide secrets using `.env`.
* Use **React Toastify** or **DaisyUI Toasts** for notifications.
* Test routes and persistence carefully.
* Keep UI clean, minimal, and modern.

---

**📚 Developed for Educational Purposes — Built with ❤️ using React, Express, MongoDB & Firebase.**
