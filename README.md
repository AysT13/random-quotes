# 🔐 Firebase Authentication – Random Quotes App

A simple **Next.js (App Router)** + **Firebase Authentication** project built with **TypeScript** and **TailwindCSS**.  
Users can **Sign Up, Log In, and Log Out** securely using Firebase.  

---

## 🚀 Features

- ✅ Email & Password authentication (Firebase)
- ✅ Context-based auth state management (`AuthProvider`)
- ✅ Protected routes and persistent sessions
- ✅ Error handling with user-friendly messages
- ✅ Light / Dark theme switch (`ModeToggle`)
- ✅ Organized file structure with shadcn/ui components

---

## 🛠️ Tech Stack

- **Next.js 14 (App Router + TypeScript)**
- **Firebase Authentication**
- **TailwindCSS**
- **shadcn/ui**
- **Context API (React Hooks)**

---

## ⚙️ Installation & Setup

1️⃣ **Clone this repository**
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
 Firebase Console → Authentication → Sign-in method → Email/Password → Enable

5️⃣ Run the app
npm run dev

Visit http://localhost:3000 🎉

Author
Aysen T.
🇨🇾 • Frontend & Fullstack Developer in training
Working with React, Next.js, Firebase, and TypeScript
