# DealDrop Master Guide

Welcome to the DealDrop E-Commerce Platform project! This document contains the initial environment configuration, the architecture outline, integrations setup guides, and deployment strategies.

## Folder Structure

```text
DealDrop/
├── src/
│   ├── app/                 # Next.js App Router (pages: /, /products, /product/[id], /cart, /checkout, /admin, /api)
│   ├── components/          # Reusable UI components (Navbar, Footer, ProductCard, CTA, Auth forms)
│   ├── lib/                 # Utilites (MongoDB connection, Stripe config, auth helpers)
│   ├── models/              # Mongoose Database Models (User, Product, Order)
│   ├── store/               # Zustand global state (cart store)
│   └── styles/              # Global CSS, Tailwind rules (colors, fonts, sizes)
├── public/                  # Static assets
├── .env.local               # Environment Variables (ignored in Git)
├── tailwind.config.ts       # Tailwind Configuration (Colors, Typography rules)
└── package.json             # Dependencies
```

## Environment Configuration

Create a `.env.local` file at the root of the project with the following shape:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dealdrop?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_strong_secret_key_here

# Stripe Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## MongoDB Connection

We are using MongoDB Atlas. The connection logic is handled inside `src/lib/mongoose.ts` caching the connection to avoid multiple instances in dev.

## Stripe Integration Setup

1. **Test Mode**: Use Stripe test keys during development.
2. **Checkout Session**: The frontend creates a `Checkout Session` hitting our `api/checkout` route.
3. **Webhook Handler**: We will create an `api/webhook/stripe` endpoint. This receives signals like `checkout.session.completed` in order to finalize DB orders.

## Deployment Guide (AWS EC2)

1. **Launch an EC2 Instance**: Amazon Linux 2 or Ubuntu 20.04+.
2. **Install Node & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm i -g pm2
   ```
3. **Clone Repo & Build**:
   ```bash
   git clone <repo-url> dealdrop
   cd dealdrop
   npm install
   npm run build
   ```
4. **Environment Variables**: Create `.env` on the server with production keys.
5. **Start with PM2**: `pm2 start npm --name "dealdrop" -- start`
6. **Reverse Proxy (Nginx)**: Configure Nginx to forward port 80/443 traffic to `localhost:3000`. Install Certbot to generate the SSL cert.

## Production Optimization Guide

- **Image Optimization**: Use Next.js `<Image>` component carefully with correct sizing properties.
- **API Rate Limiting**: Limit spam to auth or payment endpoints.
- **DB Scaling**: Use MongoDB Atlas robust tier and create indexes on queries (like Product categories, Search terms, User emails).

Next, we will proceed with initializing the application folder schema, design tokens, and critical pages.
