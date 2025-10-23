# QA_Sedekahjer

Automated testing suite for the Sedekahjer web application.

This repository contains end-to-end(E2E),Regression, and core test suites built using javascript on Playwright.

## 📁 Folder Structure

```
tests/
├── E2E/ # End-to-End test cases*
├── Regression/ # Regression test cases*
└── TestSuite/ # Core functional test cases (main test scripts)

- The content for the folder with * will be add on later once the TestSuite folder is finised
```

## ⚙️ Prerequisites

Before running tests locally, make sure you have:

- Node.js v18 or above
- npm (comes with Node.js)

## ▶️ Run Tests

### Run all test

```
 npx playwright test
```

### Run a specific test file

```
 npx playwright test tests/TestSuite/<test-file>.spec.js
```

### Run tests in UI mode

```
 npx playwright test --ui
```

## 📊 View Test Report

```
 npx playwright show-report
```

## ▶️ TL:DR Folder Structure

| Folder       | Purpose                            | Example Test Type                    |
| ------------ | ---------------------------------- | ------------------------------------ |
| `E2E`        | Full user journey tests            | Choose type of category → Type of meal → result       |
| `Regression` | High-priority tests from past bugs | Result generated from randomizer                   |
| `TestSuite`  | Core functions                     | Verify homepage, navigation, buttons |
