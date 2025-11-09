# ✨ Random Quotes App – Next.js + Firebase

A full-featured **Next.js (App Router)** + **Firebase** application built with **TypeScript** and **TailwindCSS**.  
A modern quote application where users can **sign up, log in, create their own quotes, edit/delete their own quotes, update their email with verification, delete their account**, and enjoy a clean UI with **theme preference saved to Firestore**.

Admins can **see all quotes** and **validate** them.  
Normal users see **only validated quotes**. 

---

## 🚀 Features

### 🔐 Authentication 
- Sign Up / Login / Logout  
- Update email (with verification link sent to new email)  
- Update password  
- Delete account (reauth + confirmation dialog)  
- Redirects unauthenticated users  
- Email verification flow handled automatically  

### 💬 Quotes System
 Add quote  
 Edit quote  
 Delete quote  
 Only the owner can edit/delete  
 Admins see **all quotes**  
 Admins can **validate/unvalidate**  
 Normal users see **only validated** quotes  
 All quotes stored inside **Firestore**  
 Timestamp fields (createdAt, updatedAt)

### 👮‍♂️ Admin Features
Admins can:
- View all quotes (validated or not)  
- Mark a quote as **validated**  
- Remove validation  

### 🎨 UI / Theme
- TailwindCSS  
- shadcn/ui buttons, alerts, cards  
- Light/Dark/System theme  
- User’s theme preference **stored in Firestore**  

---

## 🛠️ Tech Stack

- **Next.js (App Router + TypeScript)**
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

// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    /* ---------- Helpers ---------- */
    function signedIn() {
      return request.auth != null;
    }

    // Read current user's user doc and check the admin flag
    function isAdmin() {
      return signedIn() &&
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }

    /* =========================================================
     * USERS
     * - A user can read their own user doc (admins can read all).
     * - A user can create/update their own doc but CANNOT set "admin".
     * - An admin can update any user (to grant/revoke admin).
     * - Theme is just a normal field here (no special rule needed).
     * ========================================================= */
    match /users/{uid} {

      // Read: self or admin
      allow read: if (signedIn() && request.auth.uid == uid) || isAdmin();

      // Create: only self; cannot include "admin"
      allow create: if signedIn() &&
                     request.auth.uid == uid &&
                     !('admin' in request.resource.data);

      // Update:
      // - Owner may update their own doc, but cannot set or change "admin"
      // - Admin may update anything
      allow update: if (
        signedIn() && request.auth.uid == uid &&
        !('admin' in request.resource.data)   // owner can't write admin
      ) || isAdmin();
    }

   
    match /quotes/{id} {

      // READ
      allow read: if resource.data.validated == true
               || (signedIn() && resource.data.ownerUid == request.auth.uid)
               || isAdmin();

      // CREATE
      allow create: if signedIn()
                 && request.resource.data.ownerUid == request.auth.uid
                 && request.resource.data.validated == false;

      // UPDATE (OWNER)
      // Owner can edit, but:
      //  - ownerUid must not change
      //  - validated must not change (only admins validate)
      allow update: if signedIn()
                 && resource.data.ownerUid == request.auth.uid
                 && request.resource.data.ownerUid == resource.data.ownerUid
                 && request.resource.data.validated == resource.data.validated;

      // UPDATE (ADMIN)
      // Admin can update any fields (including validated)
      allow update: if isAdmin();

      // DELETE
      allow delete: if (signedIn() && resource.data.ownerUid == request.auth.uid) || isAdmin();
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
