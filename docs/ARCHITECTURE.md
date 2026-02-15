# Architecture & Design Decisions

## 1. Core Design Philosophy

### Modular Feature-Based Architecture

We adopt a **Feature-First** architecture, moving away from traditional structures grouped by technical types (components, hooks, utils).

**Justification:**

- **Horizontal Scalability**: In large CRM-type applications, grouping by functionality allows the team to scale. A developer can work on the `dashboard` module without touching `articles`.
- **Co-location**: By keeping logic (`application`), types (`domain`), and interface (`presentation`) together, cognitive load is reduced. The developer has all necessary context in a single folder.
- **Long-Term Maintainability**: Facilitates dead code elimination. If a feature becomes obsolete, the entire folder is removed without leaving scattered residues throughout the application.

### Clean Architecture (Frontend Adapted)

Within each module (`features/`), a separation of concerns inspired by Clean Architecture is applied:

1.  **Domain (`/domain`)**: The core. Defines **WHAT** the data is (TypeScript interfaces) and its validation rules (Zod schemas). It has no dependency on React.
    - _Example_: The `Article` interface and `articleSchema`.
2.  **Application (`/application`)**: The logic. Defines **HOW** the application behaves (use cases). Custom hooks residing here connect the view with data or services.
    - _Example_: `useArticleForm` manages form state and submission logic.
3.  **Presentation (`/presentation`)**: The view. Defines **HOW IT LOOKS**. These are pure React components that receive data and emit events.
    - _Example_: `ArticleForm`, `ArticleTable`.

### Atomic Design (Shared UI)

For reusable, business-agnostic components (`src/shared/components`), a strict Atomic Design methodology is implemented.

**Structure and Rationale:**

- **Atoms (`/atoms`)**: The indivisible unit. Components like `Button`, `Input`, `Label`.
  - _Why_: Ensures the base visual identity (colors, typography, borders) is identical throughout the app. A change here propagates globally.
- **Molecules (`/molecules`)**: Functional combinations of atoms. E.g., `SearchBar` (Input + Icon + Button).
  - _Why_: Standardizes common interaction patterns.
- **Organisms (`/organisms`)**: Complex interface blocks. E.g., `Sidebar`, `ArticleTable`.
  - _Why_: Explicitly compose complex layouts.
- **Templates (`/templates`)** (in features): Define the structure (layout) of a page without specific content.
  - _Why_: Separate visual structure from real content, allowing reuse of a dashboard's "shape" in different contexts.

---

## 2. Directory Structure

The project follows a scalable and modular structure. Below is the complete tree of the `src/` directory with a brief explanation of each key module.

```
src/
├── __tests__/              # Global test configuration and shared mocks
├── assets/                 # Static assets (images, fonts, global styles)
├── features/               # BUSINESS VERTICALS (Modular Architecture)
│   ├── articles/           # Article Management Module
│   │   ├── application/    # Hooks & Logic (useArticles, useArticleForm)
│   │   ├── domain/         # Types & Schemas (Article, ArticleSchema)
│   │   ├── infrastructure/ # Services & Storage (articleService)
│   │   └── presentation/   # UI Components (ArticleForm, ArticleTable)
│   └── dashboard/          # Dashboard Module
│       ├── application/    # Dashboard-specific Logic (Pagination, Selection)
│       └── presentation/   # Dashboard UI Templates & View Components
├── pages/                  # Router "Controllers" (DashboardPage)
├── shared/                 # SHARED KERNEL (Atomic Design)
│   ├── components/         # Reusable UI Library
│   │   ├── atoms/          # Base components (Button, Input, Switch)
│   │   ├── molecules/      # Composite components (SearchBar, FormField)
│   │   ├── organisms/      # Complex blocks (Sidebar, Header, AsidePanel)
│   │   ├── templates/      # Layout structures
│   │   └── ui/             # Shadcn/Radix primitives (popover, calendar)
│   ├── hooks/              # Generic hooks (useMobile, useToast)
│   ├── icons/              # SVG Icon components
│   └── utils/              # Pure utility functions (dateFormatter, cn)
├── App.tsx                 # Root Component & Router Configuration
└── main.tsx                # Entry Point
```

This structure ensures that:

1.  **Features are self-contained**: `articles` has its own domain, logic, and UI.
2.  **Shared code is strictly separated**: `shared/` contains only business-agnostic code.
3.  **Unidirectional dependency flow**: `features` depend on `shared`, but `shared` never depends on `features`.

---

## 3. Detailed Structure Analysis

### `src/features/` (The Heart of the CRM)

This is where business logic lives.

- **`features/articles/`**: Article management module.
  - `application/hooks/`: Complex state logic. Placing logic in visual components is avoided to facilitate unit testing logic separately.
  - `domain/`: Data contracts. Using TypeScript + Zod here allows for a "Single Source of Truth" for validations.
  - `presentation/components/`: Components that only make sense within the context of articles.
    - **`ArticleItem`**: Desktop table row. Optimized with `React.memo` to prevent re-renders and `useMemo` for date formatting.
    - **`ArticleCard`**: Mobile-optimized view (Card format).
    - **`ArticleDetails`**: Full view for SidePanel.
    - **`ArticleForm`**: Form for Create/Edit with Zod + TanStack Form validation.
- **`features/dashboard/`**: Main panel module.
  - `application/hooks/`: Contains specialized hooks for dashboard logic, split by responsibility:
    - `useDashboardLogic.ts`: Main entry point that orchestrates other hooks.
    - `useDashboardPagination.ts`: Manages pagination state and logic.
    - `useDashboardSelection.ts`: Handles article selection and row actions.
  - `presentation/hooks/`: Contains hooks specific to UI implementation details (view helpers).
    - `useArticleActions.tsx`: Generates UI configuration objects (icons, labels) for table actions. Separated from application logic as it deals with JSX/View concerns.
  - `presentation/templates/`: Contains `DashboardTemplate`. This component receives `header`, `sidebar`, `content`, `articleTable`, `filterBar`, `asidePanel` as props (slots).
  - `presentation/components/`:
    - `ArticleTable/`: Desktop view for articles.
    - `ArticleViews/`: Contains `ArticleCardListView` for mobile responsive view.

### `src/pages/` (The Router)

This layer is thin. Its only responsibility is to connect a Route (URL) with a Feature.

- _Why it exists_: Decouples Routing from business logic. `DashboardPage.tsx` acts as a "Controller": it fetches data using `application` hooks, configures UI using `presentation` hooks, and passes everything to `presentation` templates.

### `src/shared/` (Common Code)

Code that belongs to no specific domain.

- **`components/`**: Reusable UI blocks following Atomic Design.
  - **`organisms/Sidebar`**: Primary navigation. Implements a dual-mode strategy (Fixed/Overlay for mobile, Static for desktop) and Scalable configuration via `NAV_ITEMS`.
- **`hooks/`**: Generic infrastructure hooks (e.g., global event handling, media queries). _Note: Business hooks do NOT go here._
- **`utils/`**: Pure functions (helpers). E.g., `dateFormatter`. Kept pure to be easily testable.

---

## 4. Technical Decisions and Code Patterns

### Applied SOLID Principles

- **Single Responsibility Principle (SRP)**: Each component or hook has a single reason to change. `ArticleForm` only handles form UI, `useArticleForm` handles its logic.
- **Dependency Inversion**: High-level components (`DashboardPage`) inject dependencies (data and functions) into low-level components (`ArticleTable`), rather than the latter fetching them directly.

### Separation of Concerns: Application vs Presentation Hooks

We distinguish between two types of hooks to maintain strict Clean Architecture boundaries:

1.  **Application Hooks (`features/**/application/hooks`)\*\*:
    - **Responsibility**: Handle **Business Logic** and **State Management**.
    - **Scope**: Fetching data, managing form state, coordinating complex workflows.
    - **Example**: `useDashboardLogic`, `useArticles`.
    - **Relationship**: Connects the Domain layer to the View.

2.  **Presentation Hooks (`features/**/presentation/hooks`)\*\*:
    - **Responsibility**: Handle **UI Implementation Details** and **View Logic**.
    - **Scope**: Returning JSX elements (Icons), managing local UI animations, defining column configurations or action menus that contain UI components.
    - **Example**: `useArticleActions`.
    - **Relationship**: Tightly coupled to the rendering requirements of a specific component.

### Technology Stack: The "Why"

#### Vite

Vite is chosen over traditional tools like Webpack.

- **Reason**: Development server startup time is nearly instant thanks to ESBuild (Go-based). This drastically improves Developer Experience (DX) and feedback loops.

#### Tailwind CSS 4

- **Reason**:
  1.  **Performance**: Generates only the CSS used. No dead CSS.
  2.  **Maintainability**: Avoids "global classes" issues and name collisions.
  3.  **Design System**: Allows defining tokens (colors, spacing) in native CSS variables, facilitating dynamic theming.

#### Zod

- **Reason**: TypeScript only checks types at compile time. Zod verifies data at **runtime**. This is critical in CRM forms to ensure user-inputted data is valid before processing.

#### TanStack Form (React Form)

- **Reason**: Handling complex forms with `useState` causes many re-renders. TanStack Form manages form state efficiently and headless (without UI), giving us total control over design while it handles validation and dirty/touched states.

---

## 5. Efficient State Management

A global monolithic store (like Redux) is avoided for this scope in favor of:

1.  **Server/Data State**: (Simulated in hooks) Kept close to where it is consumed.
2.  **UI State**: (Modals, Sidebar) Kept locally or lifted to the nearest common parent (`Lifting State Up`).
    This reduces complexity and improves performance by avoiding unnecessary re-renders in unrelated components.
