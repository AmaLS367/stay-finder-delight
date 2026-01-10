<div align="center">

# 🏗️ Architecture

**System design, structure, and architectural patterns of StayFinder**

[← Documentation Home](./README.md) • [Components →](./components.md)

</div>

---

## 📐 System Overview

StayFinder follows a **component-based, frontend-only architecture** with clear separation of concerns. The application is built using React with TypeScript, leveraging modern patterns and best practices.

### Core Principles

- 🧩 **Component Composition** - Small, reusable components
- 📦 **Separation of Concerns** - Clear boundaries between layers
- 🔒 **Type Safety** - Full TypeScript coverage
- ⚡ **Performance** - Optimized rendering and lazy loading
- 💾 **Local Persistence** - localStorage for user data

---

## 🗂️ Project Structure

```
stay-finder-delight/
│
├── 📁 public/                    # Static assets
│   ├── favicon.svg              # App icon
│   ├── site.webmanifest        # PWA manifest
│   └── robots.txt               # SEO config
│
├── 📁 src/
│   ├── 📁 components/           # React components
│   │   ├── 📁 common/           # Business components
│   │   │   ├── ListingCard.tsx  # Listing display card
│   │   │   └── SearchForm.tsx   # Search form component
│   │   │
│   │   ├── 📁 layout/           # Layout components
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── Navbar.tsx       # Navigation bar
│   │   │   └── Footer.tsx       # Footer component
│   │   │
│   │   ├── NavLink.tsx          # Custom navigation link
│   │   │
│   │   └── 📁 ui/               # shadcn/ui primitives (50+)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ...              # More UI components
│   │
│   ├── 📁 data/                 # Static data
│   │   └── listings.json        # Accommodation listings
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── useWishlist.ts       # Wishlist management
│   │   ├── useBookings.ts       # Booking management
│   │   ├── useLocalStorage.ts   # localStorage wrapper
│   │   └── use-mobile.tsx       # Mobile detection hook
│   │
│   ├── 📁 lib/                  # Utilities & helpers
│   │   ├── constants.ts         # App constants
│   │   ├── formatters.ts        # Formatting functions
│   │   ├── dateUtils.ts         # Date utilities
│   │   ├── queryParams.ts       # URL query handling
│   │   └── storage.ts           # Storage helpers
│   │
│   ├── 📁 pages/                # Page components
│   │   ├── Home.tsx             # Home page
│   │   ├── Search.tsx           # Search results
│   │   ├── Listing.tsx          # Listing details
│   │   ├── Trips.tsx            # User trips
│   │   └── Wishlist.tsx         # User wishlist
│   │
│   ├── 📁 types/                # TypeScript definitions
│   │   └── index.ts             # All type definitions
│   │
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
│
├── 📁 docs/                     # Documentation
├── 📁 .github/workflows/        # CI/CD
│   └── deploy-pages.yml         # GitHub Actions
│
└── Configuration files
    ├── vite.config.ts          # Vite config
    ├── tailwind.config.ts      # Tailwind config
    └── tsconfig.json            # TypeScript config
```

---

## 🏛️ Architecture Layers

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[Pages] --> B[Layout Components]
        A --> C[Common Components]
        C --> D[UI Components]
    end

    subgraph "Business Logic Layer"
        E[Custom Hooks] --> F[State Management]
        E --> G[Data Processing]
    end

    subgraph "Data Layer"
        H[Static JSON] --> I[Listings Data]
        J[LocalStorage] --> K[User Data]
    end

    subgraph "Infrastructure Layer"
        L[Routing] --> A
        M[Build Tools] --> N[Vite]
        O[Styling] --> P[Tailwind]
    end

    A --> E
    E --> H
    E --> J
    B --> E
```

---

## 🔄 Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Page
    participant Hook
    participant Storage
    participant Data

    User->>Page: Interacts with UI
    Page->>Hook: Calls hook function
    Hook->>Storage: Reads/Writes data
    Storage->>Hook: Returns data
    Hook->>Page: Updates state
    Page->>User: UI updates

    Note over Page,Data: Static data flow
    Page->>Data: Reads listings.json
    Data->>Page: Returns listings
```

---

## 🧩 Component Architecture

### Component Hierarchy

```mermaid
graph TD
    A[App] --> B[HashRouter]
    B --> C[Routes]
    C --> D[Home Page]
    C --> E[Search Page]
    C --> F[Listing Page]
    C --> G[Trips Page]
    C --> H[Wishlist Page]

    D --> I[Layout]
    E --> I
    F --> I
    G --> I
    H --> I

    I --> J[Navbar]
    I --> K[Footer]
    I --> L[Page Content]

    L --> M[SearchForm]
    L --> N[ListingCard]
    L --> O[UI Components]

    M --> O
    N --> O
```

### Component Categories

| Category   | Purpose                      | Examples                            |
| ---------- | ---------------------------- | ----------------------------------- |
| **Pages**  | Top-level route components   | `Home.tsx`, `Search.tsx`            |
| **Layout** | Structure and navigation     | `Layout.tsx`, `Navbar.tsx`          |
| **Common** | Reusable business components | `ListingCard.tsx`, `SearchForm.tsx` |
| **UI**     | Low-level primitives         | `Button`, `Card`, `Dialog`          |

---

## 🔀 Routing Architecture

StayFinder uses **HashRouter** for client-side routing:

```mermaid
graph LR
    A[HashRouter] --> B[Routes]
    B --> C[/ - Home]
    B --> D[/#/search - Search]
    B --> E[/#/listing/:id - Details]
    B --> F[/#/trips - Trips]
    B --> G[/#/wishlist - Wishlist]
    B --> H[* - 404]

    style C fill:#e1f5ff
    style D fill:#e1f5ff
    style E fill:#e1f5ff
    style F fill:#e1f5ff
    style G fill:#e1f5ff
    style H fill:#ffe1e1
```

### Why HashRouter?

- ✅ Works with static hosting (GitHub Pages)
- ✅ No server configuration needed
- ✅ Avoids 404 errors on refresh
- ✅ Deep linking works out of the box

---

## 💾 State Management

### State Architecture

```mermaid
graph TB
    subgraph "Component State"
        A[useState] --> B[Local Component State]
    end

    subgraph "Persistent State"
        C[useLocalStorage] --> D[LocalStorage]
        E[useWishlist] --> C
        F[useBookings] --> C
    end

    subgraph "URL State"
        G[useSearchParams] --> H[Query Parameters]
    end

    I[Pages] --> A
    I --> E
    I --> F
    I --> G
```

### State Management Strategy

| State Type           | Solution          | Use Case                     |
| -------------------- | ----------------- | ---------------------------- |
| **Component State**  | `useState`        | UI state, form inputs        |
| **Persistent State** | `useLocalStorage` | Wishlist, bookings           |
| **URL State**        | `useSearchParams` | Search filters, pagination   |
| **Derived State**    | `useMemo`         | Filtered lists, calculations |

---

## 🎣 Hooks Architecture

### Custom Hooks Flow

```mermaid
graph TD
    A[useLocalStorage] --> B[Base Hook]
    B --> C[useWishlist]
    B --> D[useBookings]

    C --> E[Wishlist Operations]
    D --> F[Booking Operations]

    E --> G[Add/Remove/Toggle]
    F --> H[Create/Cancel/Filter]

    G --> I[LocalStorage]
    H --> I
```

### Hook Dependencies

```mermaid
graph LR
    A[useLocalStorage] --> B[Core Storage]
    C[useWishlist] --> A
    D[useBookings] --> A
    D --> E[dateUtils]

    F[Pages] --> C
    F --> D
```

---

## 📊 Data Flow Patterns

### Search Flow

```mermaid
sequenceDiagram
    participant User
    participant SearchForm
    participant SearchPage
    participant QueryParams
    participant Listings

    User->>SearchForm: Enters search criteria
    SearchForm->>QueryParams: Builds URL
    QueryParams->>SearchPage: Updates route
    SearchPage->>Listings: Filters data
    Listings->>SearchPage: Returns results
    SearchPage->>User: Displays results
```

### Booking Flow

```mermaid
sequenceDiagram
    participant User
    participant ListingPage
    participant useBookings
    participant LocalStorage
    participant TripsPage

    User->>ListingPage: Clicks "Reserve"
    ListingPage->>useBookings: createBooking()
    useBookings->>LocalStorage: Saves booking
    LocalStorage->>useBookings: Confirms save
    useBookings->>ListingPage: Returns booking
    ListingPage->>User: Shows confirmation
    User->>TripsPage: Views trips
    TripsPage->>useBookings: Reads bookings
    useBookings->>LocalStorage: Fetches data
    LocalStorage->>TripsPage: Returns bookings
```

---

## 🎨 Styling Architecture

### Tailwind CSS Structure

```mermaid
graph TB
    A[Tailwind CSS] --> B[Utility Classes]
    B --> C[Components]
    C --> D[Pages]

    E[Custom Config] --> A
    F[Theme Variables] --> A
    G[Custom Utilities] --> A
```

### Styling Approach

- **Utility-First** - Tailwind utility classes
- **Component Variants** - Using `class-variance-authority`
- **Theme System** - CSS variables for theming
- **Responsive Design** - Mobile-first approach

---

## ⚡ Performance Optimizations

### Code Splitting

```mermaid
graph LR
    A[App.tsx] --> B[Lazy Loading]
    B --> C[Home]
    B --> D[Search]
    B --> E[Listing]
    B --> F[Trips]
    B --> G[Wishlist]

    H[Route Change] --> I[Load Component]
    I --> J[Render]
```

### Optimization Strategies

| Technique              | Implementation           | Benefit                |
| ---------------------- | ------------------------ | ---------------------- |
| **Lazy Loading**       | `React.lazy()`           | Smaller initial bundle |
| **Code Splitting**     | Route-based              | Load on demand         |
| **Memoization**        | `useMemo`, `useCallback` | Prevent re-renders     |
| **Image Optimization** | Lazy loading             | Faster page load       |

---

## 🔐 Type Safety

### TypeScript Architecture

```mermaid
graph TB
    A[Type Definitions] --> B[Interfaces]
    A --> C[Types]
    A --> D[Enums]

    B --> E[Listing]
    B --> F[Booking]
    B --> G[Host]

    E --> H[Components]
    F --> H
    G --> H

    H --> I[Type Safety]
```

### Type Coverage

- ✅ **100% Type Coverage** - All files are typed
- ✅ **Strict Mode** - TypeScript strict enabled
- ✅ **Type Inference** - Leverages TypeScript inference
- ✅ **Generic Types** - Reusable type patterns

---

## 🚀 Build & Deployment

### Build Process

```mermaid
graph LR
    A[Source Code] --> B[Vite]
    B --> C[TypeScript Compilation]
    C --> D[Bundling]
    D --> E[Optimization]
    E --> F[Static Assets]
    F --> G[dist/]

    H[GitHub Actions] --> B
    G --> I[GitHub Pages]
```

### Deployment Flow

```mermaid
sequenceDiagram
    participant Dev
    participant GitHub
    participant Actions
    participant Pages

    Dev->>GitHub: Push to main
    GitHub->>Actions: Triggers workflow
    Actions->>Actions: Install deps
    Actions->>Actions: Build project
    Actions->>Actions: Upload artifact
    Actions->>Pages: Deploy
    Pages->>Dev: Site live
```

---

## 📦 Dependency Management

### Core Dependencies

```mermaid
graph TB
    A[React] --> B[Core Framework]
    C[React Router] --> D[Routing]
    E[shadcn/ui] --> F[UI Components]
    G[Tailwind] --> H[Styling]
    I[TypeScript] --> J[Type Safety]

    B --> K[Application]
    D --> K
    F --> K
    H --> K
    J --> K
```

---

## 🎯 Design Patterns

### Patterns Used

| Pattern                     | Implementation            | Purpose           |
| --------------------------- | ------------------------- | ----------------- |
| **Component Composition**   | Small, focused components | Reusability       |
| **Custom Hooks**            | Business logic extraction | Code organization |
| **Higher-Order Components** | Layout wrapper            | Code reuse        |
| **Render Props**            | Flexible component API    | Flexibility       |
| **Controlled Components**   | Form inputs               | Predictable state |

---

## 🔄 Lifecycle & Updates

### Component Lifecycle

```mermaid
graph TD
    A[Component Mount] --> B[useEffect]
    B --> C[Data Fetching]
    C --> D[State Update]
    D --> E[Re-render]
    E --> F[User Interaction]
    F --> G[State Change]
    G --> E
    E --> H[Component Unmount]
    H --> I[Cleanup]
```

---

<div align="center">

**Next:** Learn about [Components](./components.md) →

</div>
