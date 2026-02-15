# Testing Strategy and Guide

This document details the testing strategy implemented in the CRM. The test structure reflects the "feature" architecture, locating tests close to the code they verify.

## 1. Execution Commands

Before diving into the strategy, here are the commands to run the different test suites.

### Unit and Integration Tests (Vitest)

| Command                    | Description                                                         |
| :------------------------- | :------------------------------------------------------------------ |
| `npm run test`             | Runs all tests (Unit + Integration) in "watch" mode.                |
| `npm run test:unit`        | Runs **only** unit tests (`src/__tests__/unit`) once.               |
| `npm run test:integration` | Runs **only** integration tests (`src/__tests__/integration`) once. |
| `npm run test:ui`          | Opens a web GUI to view and run interactive tests.                  |

### End-to-End Tests (Playwright)

| Command                                  | Description                                                                   |
| :--------------------------------------- | :---------------------------------------------------------------------------- |
| `npm run test:e2e`                       | Runs all E2E tests in "headless" mode (no visible browser).                   |
| `npm run test:e2e -- --ui`               | Opens the Playwright UI for interactive execution and step-by-step debugging. |
| `npm run test:e2e -- --project=chromium` | Runs tests only in **Chromium** (Google Chrome).                              |
| `npm run test:e2e -- --project=firefox`  | Runs tests only in **Firefox**.                                               |
| `npm run test:e2e -- --project=webkit`   | Runs tests only in **WebKit** (Safari).                                       |
| `npm run test:e2e -- --debug`            | Runs paused tests, allowing you to inspect the browser step-by-step.          |
| `npm run test:e2e -- -g "create"`        | Runs only tests whose title contains the word "create".                       |

---

## 2. Test Directory Structure

The entire test suite is centralized in `src/__tests__`, organized by layers (unit, integration, e2e) and by functionality.

```
src/__tests__/
└── features/
    └── articles/           # Article module tests
        ├── unit/           # Pure logic tests (utils, services)
        ├── integration/    # Component tests (Forms, Tables)
        └── e2e/            # Full flow tests (Playwright)
```

---

## 3. Unit Tests (`unit/`)

**Technology:** Vitest
**Objective:** Verify isolated business logic and utility functions.

### File: `articles.utils.test.ts`

This file thoroughly tests the functions of the domain service `articleService.ts`.

- **Filtering (`filterArticles`)**:
  - Verifies that filtering by 'published' status returns only articles with `published: true`.
- **Search (`searchArticles`)**:
  - Verifies that text search correctly matches the `headline`.
- **Validation (`validateArticle`)**:
  - _Valid Case_: Returns `true` when an object meets partial `ArticleFormData`.
  - _Invalid Case_: Returns `false` if required fields like `headline` are missing.
- **Creation (`createArticle`)**:
  - Verifies that a unique ID and timestamps (`createdAt`) are generated when creating an article object from the form.
- **Status Toggle (`togglePublished`)**:
  - _True to False_: Verifies the status change.
  - _False to True_: Verifies the reverse change.
  - _Immutability_: **Critical**. Ensures the function returns a new object and does not mutate the original (React immutability principle).
- **Update (`updateArticle`)**:
  - Verifies that only sent fields are updated.
  - Verifies `updatedAt` automatically updates to a later date than the original.
  - Verifies immutability.

---

## 4. Integration Tests (`integration/`)

**Technology:** Vitest + React Testing Library
**Objective:** Verify that components interact correctly with the user and DOM.

### File: `ArticleForm.test.tsx`

Tests the critical data entry component.

- **Initial State (Disabled)**: Verifies the "SAVE" button is disabled (`toBeDisabled()`) when the form is empty.
- **Validation and Enablement**: Simulates user typing in `headline`, `author`, `body` and date selection. Verifies the "SAVE" button becomes enabled (`toBeEnabled()`) only when all required fields are valid.
- **Submission**: Verifies that clicking save calls the `onSubmit` prop function with the correct form data.

### File: `ArticleTable.test.tsx`

Tests list visualization and actions.

- **Rendering**: Verifies passed articles (titles, authors) are displayed in the DOM.
- **Interaction**: Simulates clicking a row and verifies the `onArticleClick` prop is called with the correct article ID.

---

## 5. End-to-End Tests (`e2e/`)

**Technology:** Playwright
**Objective:** Verify full user flows in a real browser.

### File: `create-article.spec.ts`

Simulates the "Create New Article" flow.

1.  Navigates to the Dashboard URL.
2.  Clicks "Add Article".
3.  Fills all inputs (Text and Dates).
4.  Clicks "SAVE".
5.  **Assertion**: Expects the new article headline to be visible in the table.

### File: `edit-article.spec.ts`

Simulates the "Edit Existing Article" flow.

1.  Clicks an existing row.
2.  Clicks the "UPDATE/EDIT" button.
3.  Clears the title input and types a new one.
4.  Saves changes.
5.  **Assertion**: Verifies the updated text appears in the list.

### File: `view-article.spec.ts`

Simulates details viewing.

1.  Clicks an article.
2.  **Assertion**: Verifies the details panel opens (looks for "Article" heading).
