# Smart Bookmark App

A simple, secure, and real-time bookmark management application built using **Next.js** and **Supabase**.  
Users can sign in with Google, save bookmarks, view them instantly across sessions, and manage their own data securely.

---

## 🧠 Challenges Faced & Solutions

### 1. Realtime Not Updating Initially
**Problem**: Realtime events were not triggering UI updates.  
**Solution**: Enabled the `bookmarks` table in Supabase `supabase_realtime` publication and filtered events by authenticated user.

### 2. Data Privacy Enforcement
**Problem**: Ensuring users cannot access others’ data.  
**Solution**: Implemented Row Level Security (RLS) using `auth.uid()` at the database level.


## 🚀 Features

- Google OAuth authentication (Signup & Login)
- Protected dashboard (authenticated users only)
- Add, view, and delete bookmarks
- Real-time updates (no page refresh required)
- User-specific data privacy using Row Level Security (RLS)
- Clean, minimal  UI
- Deployed on Vercel

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS  
- **Backend / Auth / DB**: Supabase  
- **Authentication**: Google OAuth (Supabase Auth)  
- **Realtime**: Supabase Realtime (Postgres changes)  
- **Deployment**: Vercel  

---

## 🔐 Authentication & Signup Flow

Authentication is handled using **Google OAuth via Supabase**.

- First-time users are automatically **signed up**
- Returning users are **logged in**




## 🔒 User Privacy & Security

User privacy is enforced at the **database level**, not just in the frontend.

Each bookmark record includes a `user_id` linked to the authenticated user.

### Row Level Security (RLS)
RLS policies ensure that:
- Users can only **read their own bookmarks**
- Users can only **insert bookmarks for themselves**
- Users can only **delete their own bookmarks**

Even if someone manipulates frontend code, the database will block unauthorized access.

---

## ⚡ Realtime Updates

Realtime functionality is implemented using **Supabase Postgres Realtime subscriptions**.

- The `bookmarks` table is added to the `supabase_realtime` publication
- The frontend subscribes to `INSERT` and `DELETE` events
- UI updates instantly without page reload

This ensures seamless synchronization across tabs and sessions.

---

## 🧩 Application Flow

1. User logs in using Google
2. User is redirected to a protected dashboard
3. User adds a bookmark
4. Bookmark appears instantly due to realtime updates
5. User can delete bookmarks with confirmation
6. Logout clears the session and redirects to login

---




## 🧪 How to Run Locally

```bash
git clone <repository-url>
cd smart-bookmark-app
npm install
npm run dev
