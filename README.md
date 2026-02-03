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
├── helpers/                          # Page Object Model classes
│   ├── homepage.js                   # HomePage class - main page functionality
│   ├── LainCardDetail.js             # LainCardDetailPage class - Lain-lain section
│   ├── SedekahRawak.js               # SedekahRawak class - randomizer functionality
│   └── SurauCardDetail.js            # SurauCardDetailPage class - Surau section, footer, and Doa
│
├── tests/
│   ├── TestSuite/                    # Test specification files
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
│   │   └── Surau-Detail-Tests.md
│   │
│   ├── E2E/                          # End-to-End test cases (currently using only tests)
│   └── Regression/                   # Regression test cases (coming soon)
│
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

### Test Specifications

All test files use the POM classes and follow a consistent structure:

1. **Setup**: `beforeEach` hook navigates to the site and dismisses modal
2. **Test Steps**: Uses `test.step()` for clear test reporting
3. **Page Objects**: Creates instances of page classes as needed

## Prerequisites

Before running tests locally, ensure you have:

- Node.js v18 or above
- npm (comes with Node.js)
- Playwright installed

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
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

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

## Key Features

- **Page Object Model**: Centralized locators and methods for better maintainability
- **Reusable Components**: Shared functionality (Footer, Doa) accessed via SurauCardDetailPage
- **Test Steps**: Clear test reporting with `test.step()` for better debugging
- **Consistent Structure**: All tests follow the same pattern and conventions
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
- API testing integration
- Performance testing
- Visual regression testing
- CI/CD pipeline integration

## Folder Purpose

| Folder        | Purpose                        | Status  |
| ------------- | ------------------------------ | ------- |
| `helpers/`    | Page Object Model classes      | Active  |
| `TestSuite/`  | Test specification files       | Active  |
| `Test-Cases/` | Test case documentation        | Active  |
| `E2E/`        | Full user journey tests        | Active  |
| `Regression/` | High-priority regression tests | Planned |

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
