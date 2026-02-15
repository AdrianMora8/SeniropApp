# Senirop CRM

Customer Relationship Management (CRM) and Content Management System (CMS), built as a modern, scalable, and maintainable web application.

![License](https://img.shields.io/badge/license-Private-red)
![React](https://img.shields.io/badge/react-19.0.0-blue)
![Vite](https://img.shields.io/badge/vite-6.0.0-purple)
![TypeScript](https://img.shields.io/badge/typescript-5.0.0-blue)

## 📋 Key Features

This CRM is designed to optimize content management and visualize key metrics:

- **Interactive Dashboard**: Visualize key metrics and an article table with advanced filtering.
- **Article Management (CRUD)**: Create, Read, Update, and Delete articles with robust validation.
- **Responsive Design**: Interface optimized for mobile and desktop, with an adaptive sidebar.
- **Modular Architecture**: Folder structure based on functionality ("Feature-First") for long-term scalability.
- **Data Validation**: Client-side data integrity guaranteed via Zod.

---

## 🚀 Key Technologies

This project uses a modern stack optimized for performance and developer experience:

- **React 19**: The latest version of the UI library.
- **Vite**: Next-generation build tool, significantly faster than Webpack.
- **Tailwind CSS 4**: Utility-first CSS framework for fast and maintainable styling.
- **TypeScript**: JavaScript superset adding static typing for extra safety.
- **Vitest**: Unit testing framework compatible with Vite.
- **Playwright**: Framework for reliable End-to-End (E2E) testing.
- **Zod**: Validation for schemas and types at runtime.
- **TanStack Form**: Efficient and headless form state management.

---

## 🤝 Code Quality

To maintain code quality and consistency, please follow these guidelines:

1.  **Branches**: Create feature branches (`feat/feature-name`) or fix branches (`fix/bug-name`) from `main` or `develop`.
2.  **Commits**: Use descriptive messages following [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add date filter`).
3.  **Linting**: Ensure `npm run lint` passes without errors before pushing.
4.  **Tests**: Add or update tests if you modify business logic. Verify `npm run test` passes.

---

## 📚 Documentation

Detailed documentation is located in the `docs/` folder:

- **📘 [Architecture & Design](./docs/ARCHITECTURE.md)**:
  Mandatory reading. Explains folder structure (`features/` vs `shared/`), design decisions, and patterns used.
- **🧪 [Testing Guide](./docs/TESTING.md)**:
  How to run and write unit and E2E tests.

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Steps to start

1.  **Clone the repository**:

    ```bash
    git clone <https://github.com/AdrianMora8/SeniropApp>
    cd SeniropApp
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📦 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production in the `dist/` folder.
- `npm run preview`: Locally serves the production build for verification.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run test`: Runs unit tests with Vitest.
- `npm run test:e2e`: Runs E2E tests with Playwright.

---

## 🚢 Deployment

The project is a static SPA, so it can be deployed to any static server (AWS S3, Vercel, Netlify, Nginx).

1. Run `npm run build`.
2. Upload the `dist/` folder content to your hosting provider.
3. Ensure rewrite rules are configured so all routes point to `index.html` (to support React Router).

---

## 🎨 Project Structure (Summary)

```
src/
├── features/        # Business modules (Articles, Dashboard)
│   ├── articles/
│   └── dashboard/
├── shared/          # Globally reusable code
│   ├── components/  # Atoms, Molecules, Organisms
│   ├── hooks/
│   └── utils/
├── App.tsx          # Route Configuration
└── main.tsx         # Entry Point
```

For more details, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md).
