# ✨ Random Quotes App – Next.js + Firebase

A full-featured **Next.js (App Router)** + **Firebase** application built with **TypeScript** and **TailwindCSS**.  
Users can **sign up, log in, manage their profile, and create, edit, and delete their own quotes** — all securely stored in **Firebase Firestore**.  
Each user’s **theme preference** is also saved to Firestore automatically. 🌙☀️  

---

## 🚀 Features

### 🔐 Authentication & User Management
- Email/Password **Sign Up**, **Login**, and **Logout**
- **Update Email** and **Delete Account** (with confirmation)
- Auth state handled globally via `AuthProvider`
- Protected routes (non-logged users redirected to login)

### 💬 Quotes Management
- Add new quotes (stored in Firestore)
- Edit or delete **only your own quotes**
- “Manage Quotes” page to view, edit, and delete your quotes
- Simple and clear inline alerts for actions (success or error)

### 🎨 Theme & UI
- Light / Dark / System theme toggle using `next-themes`
- Saved user theme preference to Firestore
- Styled with **TailwindCSS** and **shadcn/ui** components
- Fully responsive and minimalistic design

---

## 🛠️ Tech Stack

- **Next.js 14 (App Router + TypeScript)**
- **Firebase (Auth + Firestore)**
- **TailwindCSS**
- **shadcn/ui**
- **Context API (React Hooks)**
- **Type-safe code structure**

---

## ⚙️ Setup Instructions

1️⃣ **Clone the repository**
```bash
git clone https://github.com/AysT13/random-quotes.git
cd random-quotes

2️⃣ Install dependencies
npm install

3️⃣ Create .env.local file
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

4️⃣ Enable Email/Password in Firebase Console
  • Firebase Console → Authentication → Sign-in method → Email/Password → Enable
 	•	Firestore Database → ✅ Create database
	•	Set the following Firestore Rules:

  rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quotes/{quoteId} {
      allow read: if true;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}

5️⃣ Run the app
npm run dev

Visit http://localhost:3000 🎉

Author
Aysen T.
🇨🇾  Cyprus  • Frontend & Fullstack Developer in Training
Working with React, Next.js, Firebase, and TypeScript