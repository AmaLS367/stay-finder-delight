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

### Requirements

- Node.js (LTS recommended)
- npm

### Scripts

Install dependencies:

```bash
npm ci
```

Run dev server:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

**English:**
- 📖 [Getting Started](./docs/getting-started.md) - Quick start guide
- 🏗️ [Architecture](./docs/architecture.md) - Project structure and design patterns
- 🧩 [Components](./docs/components.md) - Component library documentation
- 🎣 [Hooks](./docs/hooks.md) - Custom React hooks API
- 📊 [API & Data](./docs/api-data.md) - Data structures and types
- 🚀 [Deployment](./docs/deployment.md) - Deployment guide

**Русский:**
- 📖 [Быстрый старт](./docs/ru/getting-started.md) - Руководство по быстрому старту
- 🏗️ [Архитектура](./docs/ru/architecture.md) - Структура проекта и паттерны
- 🧩 [Компоненты](./docs/ru/components.md) - Документация библиотеки компонентов
- 🎣 [Hooks](./docs/ru/hooks.md) - API кастомных React hooks
- 📊 [API и данные](./docs/ru/api-data.md) - Структуры данных и типы
- 🚀 [Развертывание](./docs/ru/deployment.md) - Руководство по развертыванию

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

## 🚢 GitHub Pages (Project Pages)

This repository is deployed to GitHub Pages using GitHub Actions.
The site URL format for Project Pages is:

`https://AmaLS367.github.io/<repo-name>/`

Routing works on GitHub Pages because the app uses hash-based routing (`HashRouter`).

For detailed deployment instructions, see [Deployment Guide](./docs/deployment.md).

---

## 📝 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes

See the full license text:
[https://creativecommons.org/licenses/by-nc/4.0/legalcode](https://creativecommons.org/licenses/by-nc/4.0/legalcode)

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
