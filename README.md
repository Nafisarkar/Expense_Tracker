# 💰 Expense Tracker

![Expense Tracker Banner](Images/banner.webp "Expense Tracker")

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)

A modern, full-stack expense tracking application built with React, Express.js, and PostgreSQL. Track your income and expenses with a clean, responsive interface and secure authentication.

## 📋 Table of Contents

- [💰 Expense Tracker](#-expense-tracker)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [DevOps \& Tools](#devops--tools)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
  - [📚 API Documentation](#-api-documentation)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
      - [Health Check](#health-check)
      - [Transactions](#transactions)
      - [Users](#users)
    - [Example Transaction Request](#example-transaction-request)
  - [📁 Project Structure](#-project-structure)
  - [💖 Support](#-support)
  - [🙏 Acknowledgements](#-acknowledgements)

## ✨ Features

- 🔐 **Secure Authentication** - User authentication powered by Clerk
- 💳 **Transaction Management** - Add, edit, and delete income/expense transactions
- 📊 **Categorization** - Organize transactions by custom categories
- 💰 **Real-time Balance** - Track your current financial status
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS and DaisyUI
- 🔄 **Real-time Updates** - Instant transaction updates with optimistic UI
- 📈 **Dashboard Overview** - Visual representation of your financial data

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + DaisyUI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Authentication**: Clerk React

### Backend

- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Clerk Express
- **CORS**: Enabled for cross-origin requests
- **Logging**: Morgan
- **Environment**: dotenv

### DevOps & Tools

- **Package Manager**: Bun
- **Database Migrations**: Drizzle Kit
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** (latest version) - [Download here](https://bun.sh/)
- **PostgreSQL** (v12 or higher) - [Download here](https://postgresql.org/)
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   # Install backend dependencies
   cd Backend
   bun install

   # Install frontend dependencies
   cd ../Frontend
   bun install
   ```

### Environment Setup

1. **Backend Environment Variables**

   Create a `.env` file in the `Backend` directory:

   ```env
   # Server Configuration
   PORT=3000

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker

   # Clerk Authentication
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

2. **Frontend Environment Variables**

   Create a `.env` file in the `Frontend` directory:

   ```env
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   # API Configuration
   VITE_API_URL=http://localhost:3000/api
   ```

### Database Setup

1. **Create PostgreSQL Database**

   ```bash
   createdb expense_tracker
   ```

2. **Run Database Migrations**

   ```bash
   cd Backend
   bun run generate
   bun run migrate
   ```

3. **Optional: Open Drizzle Studio**
   ```bash
   bun run studio
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   bun run dev
   ```

   The backend will be available at `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   bun run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Health Check

```http
GET /ping
```

#### Transactions

```http
GET    /transactions     # Get all transactions for authenticated user
POST   /transactions     # Create a new transaction
PUT    /transactions/:id # Update a transaction
DELETE /transactions/:id # Delete a transaction
```

#### Users

```http
POST /users/sync        # Sync user data with Clerk
GET  /users/profile     # Get user profile
```

### Example Transaction Request

```json
{
  "type": "expense",
  "amount": "29.99",
  "category": "Food & Dining",
  "note": "Lunch at restaurant",
  "date": "2025-09-01T12:00:00Z"
}
```

## 📁 Project Structure

```
expense-tracker/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── db/             # Database configuration and schema
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── drizzle/            # Database migrations
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── store/          # State management
│   │   ├── lib/            # Utility libraries
│   │   └── App.tsx         # Main application component
│   └── package.json
└── README.md
```

## 💖 Support

If you find this project helpful, please consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs** via GitHub Issues
- 💡 **Suggesting new features**
- 🔗 **Sharing with others**

## 🙏 Acknowledgements

- [Clerk](https://clerk.dev/) - For seamless authentication
- [Drizzle ORM](https://orm.drizzle.team/) - For type-safe database operations
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [DaisyUI](https://daisyui.com/) - For beautiful UI components
- [Lucide](https://lucide.dev/) - For beautiful icons

---
