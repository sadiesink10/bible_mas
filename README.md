# 📖 Bible MAS — Social Bible Reading Platform

A modern social Bible reading app with streaks, gamification, community feeds, and an AI-powered Mini Pastor assistant.

Built with **Next.js 16**, **Prisma**, **PostgreSQL**, **NextAuth.js**, and **Tailwind CSS**.

---

## 🚀 Quick Start — Docker (Recommended)

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd bible_mas

# 2. Set up environment
cp .env.example .env
# Edit .env with your secrets (optional: add OPENAI_API_KEY)

# 3. Launch everything
docker compose up --build

# 4. Open in browser
# → http://localhost:3000
```

**That's it!** PostgreSQL + the app are both running. Data persists across restarts.

### Useful Docker Commands

```bash
# Stop everything
docker compose down

# Stop & delete all data (fresh start)
docker compose down -v

# View logs
docker compose logs -f app

# Rebuild after code changes
docker compose up --build
```

---

## ☁️ Deploy to Vercel (Production + HTTPS)

### Step 1: Set Up a Free PostgreSQL Database

Go to [Neon](https://neon.tech) (free tier) and create a new project. Copy the connection string.

### Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add these **Environment Variables** in Vercel's dashboard:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `AUTH_SECRET` | Run `npx auth secret` to generate one |
| `OPENAI_API_KEY` | *(Optional)* Your OpenAI key for Mini Pastor |

4. Click **Deploy** — Vercel handles HTTPS automatically! 🔒

### Step 3: Run Initial Migration

After the first deploy, run this from your local machine:

```bash
# Set DATABASE_URL to your Neon connection string
DATABASE_URL="postgresql://..." npx prisma db push
```

---

## 🛠️ Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Set up PostgreSQL locally or use Neon free tier
# Update DATABASE_URL in .env

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Start dev server
npm run dev
```

---

## 📁 Project Structure

```
bible_mas/
├── prisma/
│   └── schema.prisma      # Database schema (PostgreSQL)
├── src/
│   ├── app/
│   │   ├── (app)/          # Protected routes (dashboard, bible, pastor, log)
│   │   ├── api/            # API routes (auth, chat)
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── page.tsx        # Landing page
│   ├── lib/
│   │   └── db.ts           # Prisma client singleton
│   ├── auth.ts             # NextAuth configuration
│   └── middleware.ts       # Route protection
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # App + PostgreSQL orchestration
├── docker-entrypoint.sh    # Auto-migration on startup
└── .env.example            # Environment template
```

## ✨ Features

- 📖 **KJV Bible Reader** — Browse Old & New Testament
- 🔥 **Streaks & Gamification** — Track daily reading, earn Jesus Points
- 📊 **Dashboard** — View stats, streaks, and progress
- 👥 **Activity Feed** — See community reading activity
- 🤖 **Mini Pastor AI** — Biblical guidance chatbot (OpenAI-powered)
- 🔐 **Authentication** — Secure login/register with NextAuth.js
- 📱 **Mobile-First** — Responsive design for all devices
