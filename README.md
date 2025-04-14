# MemoTag: AI-Powered Dementia Care Solution

<div align="center">

![MemoTag Logo](https://img.shields.io/badge/MemoTag-AI%20Powered%20Dementia%20Care-blue?style=for-the-badge&logo=react)

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-blue?style=flat-square&logo=postgresql)](https://neon.tech/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

![Screenshot 2025-04-14 131155](https://github.com/user-attachments/assets/33fc83ce-51b1-4e4a-aaaa-e65fc8e58721)


<p align="center">
  <b>A cutting-edge web application providing innovative solutions for dementia care through artificial intelligence</b>
</p>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td>
        <strong>🧠 AI-Powered Memory Support</strong><br/>
        Tailored memory assistance using advanced AI
      </td>
      <td>
        <strong>📱 Responsive Design</strong><br/>
        Optimized experience across all devices 
      </td>
      <td>
        <strong>🔒 Secure Architecture</strong><br/>
        Built with security best practices
      </td>
    </tr>
    <tr>
      <td>
        <strong>📊 Interactive Dashboard</strong><br/>
        Comprehensive monitoring tools
      </td>
      <td>
        <strong>📬 Waitlist System</strong><br/>
        Easy onboarding for new users
      </td>
      <td>
        <strong>📧 Email Notifications</strong><br/>
        Timely communication via SendGrid
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- NeonDB account (or PostgreSQL database)
- SendGrid account (optional)

### Automatic Setup ⚡

```bash
# Install dependencies and set up everything with one command
npm run setup
```

The setup script will:
1. Install all dependencies
2. Guide you through environment configuration
3. Initialize the database schema

### Manual Setup 🔧

<details>
<summary>Click to expand manual setup steps</summary>

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Configure Environment
Create a `.env` file in the root directory:
```env
# Database configuration
DATABASE_URL=your_neon_database_url

# Email configuration
SENDGRID_API_KEY=your_sendgrid_api_key

# For development
NODE_ENV=development
```

#### 3. Initialize Database
```bash
npm run db:push
```
</details>

---

## 💻 Development

```bash
# Start the development server
npm run dev
```

Access the application at http://localhost:5000

## 🏗️ Building for Production

```bash
# Create an optimized production build
npm run build
```

## 🚀 Production Deployment

```bash
# Start the production server
npm start
```

---

## 🏛️ Architecture

<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=MemoTag+Architecture" alt="Architecture Diagram" width="800px"/>
</div>

### Project Structure

```
MemoTag/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML entry point
│
├── server/                # Express backend
│   ├── db.ts              # Database connection
│   ├── email.ts           # Email service
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Storage utilities
│   └── vite.ts            # Vite configuration
│
├── shared/                # Shared code between frontend and backend
│
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Project dependencies
├── setup.js               # Setup script
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 🛠️ Technology Stack

<div align="center">
  <table>
    <tr>
      <th>Category</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>
        React, TailwindCSS, Shadcn UI, Framer Motion, React Hook Form, React Query
      </td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>
        Express, Node.js, TypeScript, Passport.js
      </td>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td>
        PostgreSQL (via NeonDB), Drizzle ORM
      </td>
    </tr>
    <tr>
      <td><strong>Validation</strong></td>
      <td>
        Zod, TypeScript
      </td>
    </tr>
    <tr>
      <td><strong>Integration</strong></td>
      <td>
        SendGrid (email), WebSockets
      </td>
    </tr>
    <tr>
      <td><strong>Development</strong></td>
      <td>
        Vite, ESBuild, TypeScript, Tailwind
      </td>
    </tr>
  </table>
</div>

---

## 🧪 Testing & Verification

```bash
# Verify API endpoints
npm run verify-api

# Verify database connection
npm run verify-db

# Verify server setup
npm run verify-server

# Verify application setup
npm run verify-setup
```

---

## 📋 Key Features Details

### Landing Page Components

- **Hero Section**: Eye-catching introduction with clear value proposition
- **Problem Explanation**: Detailed outline of dementia care challenges
- **Solution Overview**: Comprehensive explanation of MemoTag's approach
- **Traction Indicators**: User growth and success metrics
- **Call to Action**: Strategic conversion points throughout the page

### User Experience

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG compliant components from Radix UI
- **Animation**: Subtle, performance-optimized animations via Framer Motion

### Backend Capabilities

- **RESTful API**: Well-structured endpoints following best practices
- **Database Integration**: Efficient PostgreSQL operations through Drizzle ORM
- **Email System**: Templated notification system via SendGrid

---

## 🤝 Contributing

We welcome contributions to MemoTag! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**Made with ❤️ by the MemoTag Team**

[Website](https://memotag.com) • [Documentation](https://docs.memotag.com) • [Report Bug](https://github.com/memotag/issues)

</div> 
