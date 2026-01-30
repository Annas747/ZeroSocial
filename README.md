# ZeroSocial 🚀

A Facebook-like social media demo with an **anti-gravity / zero-gravity visual theme**.

Built for a school demo project featuring floating cards, drifting reactions, and neon space aesthetics!

## Features

- ✅ User signup/login (simple auth)
- ✅ Create text/image posts
- ✅ Feed showing posts in chronological order
- ✅ Like and comment on posts
- ✅ User profile page
- ✅ **Anti-gravity UI theme:**
  - Floating cards with CSS animations
  - Drifting reaction icons
  - Dark space background with neon highlights
  - "Gravity ON/OFF" toggle button

## Folder Structure

```
📁 ZeroSocial/
├── 📁 backend/
│   ├── package.json
│   ├── server.js          # Express server (port 3001)
│   ├── database.js        # SQLite database setup
│   └── 📁 routes/
│       ├── auth.js        # Login/signup
│       ├── posts.js       # Posts, likes, comments
│       └── users.js       # User profiles
│
└── 📁 frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── 📁 src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css      # Anti-gravity theme!
        ├── 📁 components/
        │   ├── Navbar.jsx
        │   ├── PostCard.jsx
        │   ├── PostForm.jsx
        │   ├── Comment.jsx
        │   └── GravityToggle.jsx
        └── 📁 pages/
            ├── Login.jsx
            ├── Signup.jsx
            ├── Feed.jsx
            └── Profile.jsx
```

## How to Run Locally

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Step 1: Start the Backend

```bash
cd backend
npm install
npm start
```

You should see: `🚀 ZeroSocial backend running on http://localhost:3001`

### Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

You should see: Vite dev server running at `http://localhost:5173`

### Step 3: Open in Browser

Go to: **http://localhost:5173**

1. Click "Join the mission" to create an account
2. Create some posts
3. Like and comment on posts
4. Check out your profile
5. **Toggle the "GRAVITY ON/OFF" button** in the bottom right to enable/disable floating animations!

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React + Vite |
| Styling  | Vanilla CSS with custom animations |
| Backend  | Express.js |
| Database | SQLite (better-sqlite3) |

## Credits

Made with ❤️ for a school demo project.

---

*"In space, no one can hear you post... but they can definitely like it!"* 🌌
