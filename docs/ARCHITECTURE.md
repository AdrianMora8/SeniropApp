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

## 2. Detailed Structure Analysis

### `src/features/` (The Heart of the CRM)

This is where business logic lives.

- **`features/articles/`**: Article management module.
  - `application/hooks/`: Complex state logic. Placing logic in visual components is avoided to facilitate unit testing logic separately.
  - `domain/`: Data contracts. Using TypeScript + Zod here allows for a "Single Source of Truth" for validations.
  - `presentation/components/`: Components that only make sense within the context of articles.
- **`features/dashboard/`**: Main panel module.
  - `presentation/templates/`: Contains `DashboardTemplate`. This component receives `header`, `sidebar`, `content` as props (slots), following the **Inversion of Control (IoC)** principle, making it highly testable and flexible.

### `src/pages/` (The Router)

This layer is thin. Its only responsibility is to connect a Route (URL) with a Feature.

- _Why it exists_: Decouples Routing from business logic. `DashboardPage.tsx` acts as a "Controller": it fetches data using `application` hooks and passes it to `presentation` templates.

### `src/shared/` (Common Code)

Code that belongs to no specific domain.

- **`hooks/`**: Generic infrastructure hooks (e.g., global event handling, media queries). _Note: Business hooks do NOT go here._
- **`utils/`**: Pure functions (helpers). E.g., `dateFormatter`. Kept pure to be easily testable.

---

## 3. Technical Decisions and Code Patterns

### Applied SOLID Principles

- **Single Responsibility Principle (SRP)**: Each component or hook has a single reason to change. `ArticleForm` only handles form UI, `useArticleForm` handles its logic.
- **Dependency Inversion**: High-level components (`DashboardPage`) inject dependencies (data and functions) into low-level components (`ArticleTable`), rather than the latter fetching them directly.

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

## 4. Efficient State Management

A global monolithic store (like Redux) is avoided for this scope in favor of:

1.  **Server/Data State**: (Simulated in hooks) Kept close to where it is consumed.
2.  **UI State**: (Modals, Sidebar) Kept locally or lifted to the nearest common parent (`Lifting State Up`).
    This reduces complexity and improves performance by avoiding unnecessary re-renders in unrelated components.
