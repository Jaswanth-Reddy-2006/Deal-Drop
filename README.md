# DealDrop

DealDrop is a premium, modern, interactive electronics and accessories marketplace built with Next.js, Tailwind CSS, MongoDB, Stripe, and NextAuth.

## Features
- **Sleek UI/UX:** Responsive design, glassmorphism, dynamic animations matching a premium brand.
- **Role-Based Authentication:** Dedicated pathways for Customers and Sellers via NextAuth.
- **Seller Dashboard:** Sellers can manage inventory, view orders, track revenue, and add products directly to the MongoDB backend.
- **Customer Experience:** Real-time search, dynamic sorting, interactive product catalog, and secure cart system.
- **Secure Handling:** Mongo-backed stock tracking prevents overselling during checkout.
- **Stripe Integration:** Integrated Stripe secure checkout redirects.
- **Full-Stack Next.js:** End-to-end functionality leveraging Next.js API routes, App Router, React Server Components (where applicable), and robust data fetching patterns.

## Tech Stack
- Frontend: Next.js 14, React, Tailwind CSS, Framer Motion
- Backend: Next.js API Routes, NextAuth.js
- Database: MongoDB (Mongoose)
- Payments: Stripe (Checkout Sessions)
- State Management: Zustand

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example` and populate it with your real credentials (MongoDB URI, NextAuth strings, Stripe API keys).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Acknowledgments
Built to explore the capabilities of modern Next.js and secure full-stack commerce integrations.
