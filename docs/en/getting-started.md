<div align="center">

# 🚀 Getting Started

**Quick start guide to get StayFinder running on your machine**

[← Documentation Home](./README.md) • [Architecture →](./architecture.md)

</div>

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Purpose            |
| ----------- | ------- | ------------------ |
| **Node.js** | 20+     | JavaScript runtime |
| **npm**     | 10+     | Package manager    |
| **Git**     | Latest  | Version control    |

### ✅ Verify Installation

```bash
# Check Node.js version
node --version  # Should be v20.0.0 or higher

# Check npm version
npm --version   # Should be 10.0.0 or higher

# Check Git
git --version
```

---

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/AmaLS367/stay-finder-delight.git
cd stay-finder-delight
```

### Step 2: Install Dependencies

```bash
# Using npm (recommended)
npm ci

# Or using npm install
npm install
```

> **💡 Tip:** `npm ci` is recommended as it installs exact versions from `package-lock.json`, ensuring consistent builds.

### Step 3: Start Development Server

```bash
npm run dev
```

The development server will start at:

- **Local:** `http://localhost:8080`
- **Network:** `http://[your-ip]:8080`

You should see output like:

```
  VITE v5.4.19  ready in 500 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.x.x:8080/
```

---

## 🎯 First Steps

### 1. Explore the Application

Once the dev server is running:

1. **Home Page** - Browse featured stays and trending destinations
2. **Search** - Try searching for a location (e.g., "Paris", "Tokyo")
3. **Listing Details** - Click on any listing to see full details
4. **Wishlist** - Add listings to your wishlist (saved in localStorage)
5. **Trips** - Book a stay to see it in your trips

### 2. Understand the Structure

Familiarize yourself with the project structure:

```
src/
├── pages/          # Start here - page components
├── components/     # Reusable components
├── hooks/         # Custom React hooks
├── lib/           # Utilities
└── types/         # TypeScript types
```

### 3. Make Your First Change

Try modifying the home page:

1. Open `src/pages/Home.tsx`
2. Change the hero title from "Find your perfect stay" to your own message
3. Save the file - Vite will hot-reload automatically!

---

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server (port 8080)
npm run dev -- --port 3000  # Start on custom port
```

### Building

```bash
npm run build        # Build for production
npm run build:dev    # Build in development mode
```

### Preview

```bash
npm run preview      # Preview production build locally
```

### Code Quality

```bash
npm run lint         # Run ESLint
```

---

## 📁 Key Files to Know

| File                 | Purpose                           |
| -------------------- | --------------------------------- |
| `src/App.tsx`        | Main app component, routing setup |
| `src/main.tsx`       | Application entry point           |
| `src/pages/Home.tsx` | Home page component               |
| `vite.config.ts`     | Vite configuration                |
| `tailwind.config.ts` | Tailwind CSS configuration        |
| `tsconfig.json`      | TypeScript configuration          |

---

## 🎨 Development Workflow

### 1. Component Development

When creating a new component:

```typescript
// src/components/common/MyComponent.tsx
import type { MyComponentProps } from '@/types';

export function MyComponent({ prop }: MyComponentProps) {
  return <div>{prop}</div>;
}
```

### 2. Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`:

```typescript
const MyPage = lazy(() => import('./pages/MyPage'));

// In Routes:
<Route path="/mypage" element={<MyPage />} />
```

3. Add navigation link in `src/components/layout/Navbar.tsx`

### 3. Using Custom Hooks

```typescript
import { useWishlist } from "@/hooks/useWishlist";

function MyComponent() {
  const { wishlist, toggleWishlist } = useWishlist();
  // Use the hook...
}
```

---

## 🔍 Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR:

- **Component changes** - Update instantly without page reload
- **Style changes** - Apply immediately
- **State preservation** - React state is maintained during updates

### TypeScript

The project uses strict TypeScript:

- All files must have proper types
- Use `@/` alias for imports from `src/`
- Check types with: `npx tsc --noEmit`

### Styling

- Use **Tailwind CSS** utility classes
- Custom styles in `src/index.css`
- Component-specific styles with Tailwind

### Debugging

1. **React DevTools** - Install browser extension
2. **Console Logs** - Use `console.log` (removed in production)
3. **Vite DevTools** - Built-in error overlay

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit

# Restart TypeScript server in your IDE
```

### Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

---

## 📚 Next Steps

Now that you're set up:

1. 📖 Read the [Architecture Guide](./architecture.md) to understand the system
2. 🧩 Explore [Components](./components.md) to see what's available
3. 🎣 Learn about [Custom Hooks](./hooks.md)
4. 📊 Understand [Data Structures](./api-data.md)

---

## 💡 Common Tasks

### Adding a New Dependency

```bash
npm install package-name
npm install -D dev-package-name  # For dev dependencies
```

### Updating Dependencies

```bash
npm update
npm outdated  # Check for updates
```

### Running Type Check

```bash
npx tsc --noEmit
```

---

<div align="center">

**Ready to build?** Check out the [Architecture Guide](./architecture.md) →

</div>
