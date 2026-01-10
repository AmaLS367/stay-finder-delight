<div align="center">

# 🏠 StayFinder

**A production-like booking UI demo built with React, TypeScript and Vite**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?logo=react)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg)](LICENSE)

</div>

---

<div align="center">

### ✨ Features

**Search & Discover** • **Wishlist Management** • **Trip Booking** • **Responsive Design** • **PWA Ready**

</div>

---

## 📖 About

StayFinder is a modern, production-ready booking UI demonstration application. It showcases a complete user experience for searching accommodations, viewing detailed listings, managing wishlists, and booking trips. Built with cutting-edge technologies and best practices.

### 🎯 Key Features

- 🔍 **Advanced Search** - Search by location, dates, and guests with real-time filtering
- ❤️ **Wishlist** - Save your favorite stays for later
- 📅 **Trip Management** - Book and manage your upcoming and past trips
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite and React best practices
- 🔒 **Local Storage** - Data persists across sessions
- 🌐 **PWA Ready** - Installable as a Progressive Web App

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ 
- **npm** 10+ (or compatible package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/stay-finder-delight.git
cd stay-finder-delight

# Install dependencies
npm ci

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- 📖 [Getting Started](./docs/getting-started.md) - Quick start guide
- 🏗️ [Architecture](./docs/architecture.md) - Project structure and design patterns
- 🧩 [Components](./docs/components.md) - Component library documentation
- 🎣 [Hooks](./docs/hooks.md) - Custom React hooks API
- 📊 [API & Data](./docs/api-data.md) - Data structures and types
- 🚀 [Deployment](./docs/deployment.md) - Deployment guide

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 5.4 |
| **UI Components** | shadcn/ui (Radix UI) |
| **Styling** | Tailwind CSS 3.4 |
| **Routing** | React Router 6.30 (HashRouter) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **State Management** | React Hooks + LocalStorage |
| **Date Handling** | date-fns 3.6 |

</div>

---

## 📁 Project Structure

```
stay-finder-delight/
├── public/              # Static assets
│   ├── favicon.svg     # App icon
│   └── site.webmanifest # PWA manifest
├── src/
│   ├── components/     # React components
│   │   ├── common/     # Shared components
│   │   ├── layout/     # Layout components
│   │   └── ui/         # shadcn/ui components
│   ├── data/           # Static data (listings.json)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Page components
│   └── types/          # TypeScript type definitions
├── docs/               # Documentation
├── .github/
│   └── workflows/      # GitHub Actions
└── README.md
```

For detailed structure, see [Architecture Documentation](./docs/architecture.md).

---

## 🚢 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - Any push triggers the deployment workflow
2. **Configure GitHub Pages** - Go to Settings → Pages → Source: GitHub Actions
3. **Wait for deployment** - Check the Actions tab for build status
4. **Access your site** - Available at `https://<USERNAME>.github.io/<REPO_NAME>/`

For detailed deployment instructions, see [Deployment Guide](./docs/deployment.md).

### Important Notes

- ⚙️ **Base Path** - Vite base is set to `"./"` for GitHub Pages compatibility
- 🔗 **HashRouter** - Uses HashRouter to avoid 404 errors on refresh
- 📦 **Build Output** - Production build outputs to `dist/` directory

---

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- **ESLint** - Configured with React and TypeScript rules
- **TypeScript** - Strict mode enabled
- **Prettier** - Recommended for code formatting

---

## 📝 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes

Full license text: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the blazing-fast build tool

---

<div align="center">

**Made with ❤️ using React, TypeScript, and Vite by Ama**

[📖 Documentation](./docs/) • [🚀 Deploy Guide](./docs/deployment.md) • [🏗️ Architecture](./docs/architecture.md)

</div>
