# QA_Sedekahjer

Automated testing suite for the Sedekah.je web application using the Page Object Model (POM) design pattern.

This repository contains end-to-end (E2E), regression, and core test suites built using JavaScript and Playwright.

## Project Structure

```
Playwright_Sedekahje/
├── .github/
│   └── workflows/                    # GitHub Actions CI/CD
│       ├── playwright-push-pr.yml   # Playwright tests on push/PR to main or master
│       └── playwright-scheduled.yml # Playwright tests on schedule + manual dispatch
│
├── helpers/                          # Page Object Model classes & utilities
│   ├── homepage.js                   # HomePage class - main page functionality
│   ├── LainCardDetail.js             # LainCardDetailPage class - Lain-lain section
│   ├── SedekahRawak.js               # SedekahRawak class - randomizer functionality
│   ├── test-utils.js                 # Shared utilities (cache clearing, setup helpers)
│   └── SurauCardDetail.js            # SurauCardDetailPage class - Surau section, footer, and Doa
│
├── playwright/
│   └── .auth/
│       ├── global-setup.js           # GitHub OAuth global setup (saves auth state)
│       └── user.json                 # Saved auth session (gitignored)
│
├── tests/
│   ├── TestSuite/                    # Test specification files
│   │   ├── Dashboard/
│   │   │   └── Login.spec.js         # Dashboard login tests (CF-033, CF-034)
│   │   ├── homepage.spec.js          # Homepage tests
│   │   ├── Lain_detailpage.spec.js   # Lain-lain detail page tests
│   │   ├── SedekahRawak.spec.js      # Randomizer feature tests
│   │   └── Surau_detailpage.spec.js  # Surau detail page tests
│   │
│   ├── Test-Cases/                   # Test case documentation
│   │   ├── README.md                 # Test cases index
│   │   ├── homepage-tests.md
│   │   ├── lain-detail-tests.md
│   │   ├── sedekahrawak-tests.md
│   │   ├── Surau-Detail-Tests.md
│   │   └── Festive_Ramadhan.md       # Ramadhan banner test cases (RTC-01 to RTC-04)
│   │
│   ├── E2E/                          # End-to-End test cases (planned)
│   └── Regression/                   # Regression test cases (planned)
│
├── .env                              # Local env vars (gitignored)
├── .env.example                      # Env var template (safe to commit)
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Page Object Model (POM) Architecture

This project follows the Page Object Model design pattern for better maintainability and code reusability.

### Page Objects

**HomePage** (`homepage.js`)

- Modal verification and dismissal
- Logo and theme toggle
- Organization filters (Masjid, Surau, Lain-lain)
- State dropdown filter
- Search functionality

**LainCardDetailPage** (`LainCardDetail.js`)

- Lain-lain button and filtering
- Card result verification
- Card expansion
- Peta (map) button functionality

**SedekahRawak** (`SedekahRawak.js`)

- Sedekah Rawak button
- QR code randomizer functionality
- QR regeneration verification

**SurauCardDetailPage** (`SurauCardDetail.js`)

- Surau button and filtering
- Card result verification
- Peta (map) button functionality
- GetDoa section (shared across pages)
- Footer verification (shared across pages)
  - Brand section
  - Social media links
  - Rujukan (reference) links
  - Projek Komuniti links

### Utility Helpers

A few shared utilities simplify test setup and maintenance:

- **test-utils.js**: Provides standardized `setupTestSession` helper that clears browser cache/storage, handles flaky Firefox network errors, and navigates to the base URL.
- Cache-clearing helpers enable clean state between tests and explicit data removal when needed.

Tests may import and use these helpers in `beforeEach` hooks instead of writing the same logic repeatedly.

### Test Specifications

All test files use the POM classes and follow a consistent structure:

1. **Setup**: `beforeEach` hook navigates to the site and dismisses modal
2. **Test Steps**: Uses `test.step()` for clear test reporting
3. **Page Objects**: Creates instances of page classes as needed

### Authentication Setup

The project uses a global setup file (`playwright/.auth/global-setup.js`) for GitHub OAuth authentication:

- On first run, opens a headed browser so you can complete GitHub login manually
- Saves the authenticated session to `playwright/.auth/user.json` (gitignored)
- On subsequent runs, reuses the saved session — no re-login needed
- `playwright.config.js` applies `storageState` conditionally, so unauthenticated tests run normally before auth is set up

To generate the auth state for the first time:

```bash
npx playwright test
```

## Prerequisites

Before running tests locally, ensure you have:

- Node.js v18 or above
- npm (comes with Node.js)
- Playwright installed (`npx playwright install`)
- **Optional but recommended:** Allure Commandline if you plan to view advanced reports (`npm install -g allure-commandline` or see [Allure docs](https://docs.qameta.io/allure/)).

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/TestSuite/homepage.spec.js
npx playwright test tests/TestSuite/Surau_detailpage.spec.js
npx playwright test tests/TestSuite/Lain_detailpage.spec.js
npx playwright test tests/TestSuite/SedekahRawak.spec.js
npx playwright test tests/TestSuite/Dashboard/Login.spec.js
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Generate and view Allure reports

By default the project is configured with the `allure-playwright` reporter, which outputs results to `./allure-results`.

After executing a test run you can generate a report with:

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

Alternatively install the Allure CLI globally and run the same commands.

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run tests in specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## View Test Report

```bash
npx playwright show-report
```

## Test Coverage

### Homepage Tests (CF-002 to CF-007)

- Page title verification
- Logo display and attributes
- Theme toggle functionality
- Organization button filters
- State dropdown functionality
- Search bar functionality

### Surau Detail Page Tests (CF-011 to CF-017)

- Surau button and card display
- Peta (map) button functionality
- GetDoa section verification
- Footer sections verification

### Lain Detail Page Tests (CF-018 to CF-024)

- Lain-lain button and card display
- Peta (map) button functionality
- GetDoa section verification
- Footer sections verification

### Randomizer Tests (CF-025 to CF-032)

- Sedekah Rawak button verification
- QR randomizer functionality
- QR regeneration testing
- GetDoa section verification
- Footer sections verification

### Dashboard Login Tests (CF-033 to CF-034)

- Login button presence and visibility
- Login button redirects to GitHub OAuth

### Festive Ramadhan Tests (RTC-01 to RTC-04)

- Ramadhan banner visibility and styling
- Banner day indicator and mosque name
- "Lihat QR" link presence and navigation
- "Kongsi ke X" share button visibility

> **Note:** Test case documentation is in `tests/Test-Cases/Festive_Ramadhan.md`. Spec and helper implementations (`tests/TestSuite/ramadanbanner.spec.js`, `helpers/ramadanbanner.js`) are pending.

## Key Features

- **Page Object Model**: Centralized locators and methods for better maintainability
- **Reusable Components**: Shared functionality (Footer, Doa) accessed via SurauCardDetailPage
- **Utility Helpers**: `helpers/test-utils.js` offers standardized setup, cache clearing, and retry logic (firefox network workarounds)
- **Auth State Management**: GitHub OAuth session saved once via `global-setup.js` and reused across all test runs
- **Test Steps**: Clear test reporting with `test.step()` for better debugging
- **Consistent Structure**: All tests follow the same pattern and conventions
- **Multi‑browser Config**: Supports chromium, firefox, and webkit projects with parallel runs
- **Flexible Reporting**: HTML and Allure reporters enabled out‑of‑the‑box

- **Comprehensive Coverage**: Tests cover main functionality and shared components

## Coding Standards

### Naming Conventions

- **Classes**: PascalCase (e.g., `HomePage`, `SurauCardDetailPage`)
- **Methods**: camelCase (e.g., `verifyPageTitle()`, `clickSurauButton()`)
- **Variables**: camelCase (e.g., `homePage`, `surauPage`)
- **Constants**: camelCase (e.g., `baseURL`, `pageTitle`)

### File Organization

- Page objects in `helpers/` directory (root level)
- Test specs in `tests/TestSuite/` directory
- Test documentation in `tests/Test-Cases/` directory
- One page object per file
- One test suite per file

### Test Structure

```javascript
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyAndCloseModal();
});

test("Test description", async ({ page }) => {
  const myPage = new MyPage(page);

  await test.step("Step description", async () => {
    await myPage.methodName();
  });
});
```

## Future Enhancements

- E2E test suite for complete user journeys
- Regression test suite for critical bug fixes
- Festive Ramadhan spec implementation (`ramadanbanner.spec.js` and `helpers/ramadanbanner.js`)
- API testing integration
- Performance testing
- Visual regression testing

## Folder Purpose

| Folder        | Purpose                                                         | Status  |
| ------------- | --------------------------------------------------------------- | ------- |
| `helpers/`    | Page Object Model classes & helpers (including `test-utils.js`) | Active  |
| `TestSuite/`  | Test specification files                                        | Active  |
| `Test-Cases/` | Test case documentation                                         | Active  |
| `E2E/`        | Full user journey tests                                         | Planned |
| `Regression/` | High-priority regression tests                                  | Planned |

## Contributing

When adding new tests:

1. Create page object classes in `helpers/` for new pages
2. Use existing page objects for shared functionality (Footer, Doa)
3. Follow the established naming conventions
4. Add descriptive test steps using `test.step()`
5. Update this README with new test coverage

## Technology Stack

- **Test Framework**: Playwright
- **Language**: JavaScript
- **Design Pattern**: Page Object Model (POM)
- **Test Organization**: Test suites with beforeEach hooks
- **Reporting**: Playwright HTML Reporter , Allure
