<h1 align="center">📚 Book Shop App — Client</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-EF0081?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<p align="center">
  একটি সম্পূর্ণ Book Shop Web Application — React 19 ও Vite দিয়ে তৈরি।
  <br />
  Firebase Authentication, Stripe Payment, Smooth Animations সহ।
</p>

---

## 🌐 Live Site

> 🔗 **Live URL:** *(আপনার deployed URL এখানে দিন)*
> 🔗 **API Server:** `https://book-shope-app-server.onrender.com`

---

## ✨ Features

- 🔐 **Firebase Authentication** — Google Login ও Email/Password Login
- 📖 **Book Browsing** — Category filter, search, এবং details page
- 🛒 **Shopping Cart** — Quantity update, real-time price calculation
- ❤️ **Wishlist** — Favourite books save করার সুবিধা
- 💳 **Stripe Payment** — Secure online payment integration
- 📦 **Order Management** — Order history ও status tracking
- 👤 **User Dashboard** — Profile update ও personal data
- 🛡️ **Admin Panel** — Books, Users, Orders manage করার সুবিধা
- 🎨 **Smooth Animations** — Framer Motion ও AOS animations
- 📱 **Fully Responsive** — Mobile, Tablet ও Desktop সব device-এ

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI Library |
| **Vite 7** | Build Tool & Dev Server |
| **TailwindCSS 4** | Utility-First CSS Framework |
| **React Router 7** | Client-side Routing |
| **Firebase** | Authentication & Hosting |
| **Axios** | HTTP Client (API calls) |
| **Stripe (React)** | Payment Integration |
| **Framer Motion** | Animations |
| **AOS** | Scroll Animations |
| **React Slick** | Carousel/Slider |
| **SweetAlert2** | Beautiful Alerts |
| **React Icons** | Icon Library |

---

## 📁 Project Structure

```
Book-shope-app-client/
│
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React Context (Auth, etc.)
│   ├── routes/          # Route configuration
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Root App component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (not pushed)
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies & scripts
```

---

## ⚙️ Environment Variables

`.env` ফাইলে নিচের variables সেট করুন:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_API_URL=https://book-shope-app-server.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> ⚠️ **Important:** Vite-এ সব environment variable-এর আগে `VITE_` prefix থাকা বাধ্যতামূলক।

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- npm বা yarn

### Installation

```bash
# 1. Repository clone করুন
git clone https://github.com/your-username/Book-shope-app-client.git

# 2. Directory-তে যান
cd Book-shope-app-client

# 3. Dependencies install করুন
npm install

# 4. .env ফাইল তৈরি করুন এবং variables সেট করুন
# (উপরের Environment Variables section দেখুন)

# 5. Development server চালু করুন
npm run dev
```

> ✅ App চালু হলে দেখুন: `http://localhost:5173`

---

## 📜 Scripts

```bash
npm run dev       # Development server চালু করুন (Vite HMR সহ)
npm run build     # Production build তৈরি করুন
npm run preview   # Production build locally preview করুন
npm run lint      # ESLint check চালান
```

---

## 🔐 Authentication Flow

```
User → Firebase Login (Google / Email)
     → JWT Token নিন from Server (POST /jwt)
     → Token localStorage-এ save করুন
     → Protected routes-এ Token পাঠান
     → Server Token verify করে data দেয়
```

---

## 🛒 App Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured books, categories |
| Shop | `/shop` | সব books, filter by category |
| Book Details | `/books/:id` | Book details ও add to cart |
| Cart | `/cart` | Shopping cart, quantity management |
| Wishlist | `/wishlist` | Saved favourite books |
| Checkout | `/checkout` | Stripe payment |
| Orders | `/orders` | Order history |
| Profile | `/profile` | User profile update |
| Admin Dashboard | `/admin` | Admin panel (books, users, orders) |
| Login | `/login` | Firebase login |
| Register | `/register` | New user registration |

---

## 🌍 Deployment

এই app Firebase Hosting বা Vercel/Netlify-এ deploy করা যায়।

### Firebase Hosting

```bash
# Firebase CLI install করুন
npm install -g firebase-tools

# Login করুন
firebase login

# Initialize করুন
firebase init hosting

# Build করুন
npm run build

# Deploy করুন
firebase deploy
```

### Vercel / Netlify

1. GitHub-এ push করুন
2. Vercel/Netlify-এ repo connect করুন
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variables সেট করুন

---

## 🤝 Contributing

```bash
# Fork করুন → Branch তৈরি করুন → Changes করুন → Pull Request পাঠান
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Made with ❤️ for Book Lovers
  <br/>
  <strong>Book Shop App Client</strong> © 2025
</p>
