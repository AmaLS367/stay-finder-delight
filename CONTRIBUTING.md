<div align="center">

# 🤝 Contributing to StayFinder

**Guidelines and instructions for contributing to StayFinder**

[← Back to README](./README.md)

</div>

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Standards](#-code-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Testing](#-testing)
- [Documentation](#-documentation)

---

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive environment

---

## 🚀 Getting Started

### Step 1: Fork and Clone

```bash
git clone https://github.com/AmaLS367/stay-finder-delight.git
cd stay-finder-delight
```

### Step 2: Install Dependencies

```bash
npm ci
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Step 4: Run Checks

Before making changes, ensure all checks pass:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test
```

---

## 🔄 Development Workflow

### Before Making Changes

1. Ensure you're on the latest `main` branch:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

### Making Changes

1. Write your code following the project's standards
2. Add tests if applicable
3. Update documentation if needed
4. Ensure all checks pass:
   ```bash
   npm run lint
   npm run typecheck
   npm run format:check
   npm run test
   npm run build
   ```

---

## 📐 Code Standards

| Standard          | Requirement                     | Command             |
| ----------------- | ------------------------------- | ------------------- |
| **TypeScript**    | All code must be fully typed    | `npm run typecheck` |
| **Formatting**    | Use Prettier                    | `npm run format`    |
| **Linting**       | Follow ESLint rules (no errors) | `npm run lint`      |
| **Testing**       | Add tests for new features      | `npm run test`      |
| **Documentation** | Update relevant docs            | Manual              |

### Formatting

Always format your code before committing:

```bash
npm run format
```

### Type Safety

- All files must be fully typed
- No `any` types (unless absolutely necessary)
- Use proper TypeScript interfaces and types

---

## 📝 Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type       | Description              | Example                                                |
| ---------- | ------------------------ | ------------------------------------------------------ |
| `feat`     | New feature              | `feat(search): add price range filter`                 |
| `fix`      | Bug fix                  | `fix(dates): prevent UTC drift in date inputs`         |
| `docs`     | Documentation changes    | `docs(readme): update deployment instructions`         |
| `style`    | Code style changes       | `style(components): format with prettier`              |
| `refactor` | Code refactoring         | `refactor(hooks): simplify logic`                      |
| `test`     | Adding or updating tests | `test(hooks): add useLocalStorage race condition test` |
| `chore`    | Maintenance tasks        | `chore(deps): update dependencies`                     |

### Examples

```bash
feat(search): add price range filter
fix(dates): prevent UTC drift in date inputs
docs(readme): update deployment instructions
test(hooks): add useLocalStorage race condition test
chore(deps): update package dependencies
```

---

## 🔀 Pull Request Process

### Step 1: Update Your Branch

```bash
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

### Step 2: Ensure All Checks Pass

Before creating a PR, verify:

- ✅ Lint: `npm run lint` (0 errors)
- ✅ Typecheck: `npm run typecheck` (no errors)
- ✅ Format: `npm run format:check` (all files formatted)
- ✅ Tests: `npm run test` (all tests pass)
- ✅ Build: `npm run build` (builds successfully)

### Step 3: Create Pull Request

1. Push your branch to GitHub:

   ```bash
   git push origin your-branch
   ```

2. Create a Pull Request with:
   - Clear, descriptive title
   - Reference related issues (if any)
   - Description of changes and why
   - Screenshots for UI changes

### Step 4: PR Review

- All CI checks must pass
- Code review feedback will be addressed
- Once approved, it will be merged

---

## 🧪 Testing

### Writing Tests

- Write tests for new features
- Ensure existing tests still pass
- Aim for good test coverage

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Test Structure

Tests are located in:

- `src/lib/__tests__/` - Unit tests for utilities
- `src/hooks/__tests__/` - Hook tests
- `src/__tests__/` - Integration/smoke tests

---

## 📚 Documentation

### When to Update Documentation

- Adding new features
- Changing existing functionality
- Fixing bugs that affect user experience
- Updating dependencies or tooling

### Documentation Files

| File              | Purpose                          |
| ----------------- | -------------------------------- |
| `README.md`       | Project overview and quick start |
| `docs/en/`        | English documentation            |
| `docs/ru/`        | Russian documentation            |
| `CHANGELOG.md`    | Version history                  |
| `CONTRIBUTING.md` | This file                        |

### Documentation Standards

- Keep documentation in sync with code
- Add examples for new features
- Update both English and Russian versions
- Use clear, concise language

---

## ❓ Questions?

If you have questions or need help:

- Open an issue for discussion
- Check existing documentation in `docs/` folder
- Review existing code for examples

---

<div align="center">

**Thank you for contributing to StayFinder!** 🎉

</div>
