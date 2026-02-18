# Playwright Testing Skill

## What This Does

Helps Cursor AI agent run, debug, and create Playwright tests for you.

## Example Usage

In Cursor chat:

- "Run all Playwright tests"
- "Debug the login test"
- "Create a test for the checkout page"
- "Show me test results"
- "Run tests in Chrome"

## Prerequisites

- @playwright/test installed: `npm install -D @playwright/test`
- Tests in `tests/` or `e2e/` directory
- playwright.config.js or playwright.config.ts

## Commands This Skill Uses

- `npx playwright test` - Run tests
- `npx playwright test --debug` - Debug mode
- `npx playwright show-report` - View results
- `npx playwright test --headed` - See browser

## Customization

Edit `SKILL.md` to add your specific:

- Test patterns
- Authentication flows
- Custom commands
- Company-specific practices
