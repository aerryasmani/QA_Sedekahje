# Playwright Testing Skill

## When to Activate

Load this skill when user mentions: running tests, Playwright, debugging tests, test results, or E2E testing.

## First Thing: Check Prerequisites

Always start by checking these:

```bash
# 1. Check if Playwright is installed
if npm list @playwright/test >/dev/null 2>&1; then
  echo "✅ Playwright is installed"
else
  echo "❌ Playwright not found. Install with: npm install -D @playwright/test"
  exit 1
fi

# 2. Check for config file
if [ -f "playwright.config.js" ] || [ -f "playwright.config.ts" ]; then
  echo "✅ Playwright config found"
else
  echo "⚠️  No playwright.config found - tests might not run correctly"
fi

# 3. Check tests directory
if [ -d "tests" ] || [ -d "e2e" ]; then
  echo "✅ Test directory found"
else
  echo "⚠️  No tests directory found"
fi
```

## Common Test Commands

### 1. Run All Tests

**User says:** "run all tests" | "run playwright tests" | "execute test suite"

**What to do:**

```bash
# Basic run (headless)
npx playwright test

# See browser (helpful for debugging)
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium
# Available: chromium, firefox, webkit
```

**Tell user:**

```
Running all Playwright tests in headless mode...
Use --headed flag to see the browser in action.
```

### 2. Run Specific Test File

**User says:** "run login test" | "test checkout" | "run [filename]"

**What to do:**

```bash
# By filename
npx playwright test tests/login.spec.js

# Multiple files
npx playwright test tests/login.spec.js tests/signup.spec.js

# By folder
npx playwright test tests/auth/
```

### 3. Run Tests Matching Pattern

**User says:** "run tests about user" | "test anything with checkout"

**What to do:**

```bash
# Match test names
npx playwright test --grep "user login"
npx playwright test -g "checkout"

# Exclude tests
npx playwright test --grep-invert "slow"
```

### 4. Debug a Test

**User says:** "debug test" | "why is test failing" | "show me test running"

**What to do:**

```bash
# Open Playwright Inspector (BEST for debugging)
npx playwright test --debug

# Debug specific test
npx playwright test tests/login.spec.js --debug

# Run with trace (can view later)
npx playwright test --trace on

# View trace file
npx playwright show-trace trace.zip
```

**Tell user:**

```
Opening Playwright Inspector...
Tips:
- Click "Step Over" to go through test line by line
- Hover over selectors to see them highlighted
- Console tab shows all logs
- Screenshots tab shows what the test saw
```

### 5. Show Test Results/Reports

**User says:** "show test results" | "test report" | "what failed"

**What to do:**

```bash
# Generate and show HTML report
npx playwright test
npx playwright show-report

# Just show last report (don't re-run)
npx playwright show-report

# Generate JSON report
npx playwright test --reporter=json > results.json

# Parse failures
npx playwright test --reporter=list
```

### 6. Run Failed Tests Only

**User says:** "rerun failed tests" | "run only failures"

**What to do:**

```bash
# Run only tests that failed last time
npx playwright test --last-failed
```

### 7. Run in CI/Production Mode

**User says:** "run in CI" | "production test mode" | "CI pipeline"

**What to do:**

```bash
# Full CI command with retries, screenshots, videos
npx playwright test \
  --reporter=github,html \
  --workers=4 \
  --retries=2 \
  --screenshot=only-on-failure \
  --video=retain-on-failure
```

## Creating New Tests

### Pattern: User Wants Login Test

**User says:** "create a test for login" | "write login test"

**Create this file:**

```javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should login with valid credentials", async ({ page }) => {
    // Navigate to login page
    await page.goto("https://your-app.com/login");

    // Fill in credentials
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL("**/dashboard");

    // Verify we're logged in
    await expect(page.locator(".user-profile")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("https://your-app.com/login");

    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpass");
    await page.click('button[type="submit"]');

    // Check error message appears
    await expect(page.locator(".error-message")).toBeVisible();
    await expect(page.locator(".error-message")).toContainText(
      "Invalid credentials",
    );
  });
});
```

### Pattern: User Wants API Test

**User says:** "test the API" | "create API test with Playwright"

**Create this file:**

```javascript
// tests/api/users.spec.js
import { test, expect } from "@playwright/test";

test.describe("Users API", () => {
  test("GET /users returns user list", async ({ request }) => {
    const response = await request.get("https://api.example.com/users");

    // Check status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Check response data
    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
  });

  test("POST /users creates new user", async ({ request }) => {
    const response = await request.post("https://api.example.com/users", {
      data: {
        name: "Test User",
        email: "test@example.com",
      },
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.id).toBeDefined();
  });
});
```

### Pattern: User Wants Screenshot/Visual Test

**User says:** "screenshot test" | "visual regression"

**Create this file:**

```javascript
// tests/visual/homepage.spec.js
import { test, expect } from "@playwright/test";

test("homepage matches snapshot", async ({ page }) => {
  await page.goto("https://your-app.com");

  // Wait for page to fully load
  await page.waitForLoadState("networkidle");

  // Compare screenshot
  await expect(page).toHaveScreenshot("homepage.png");
});
```

## Environment Variables

If tests need authentication or URLs, ask user for these:

```bash
export BASE_URL="https://your-app.com"
export TEST_EMAIL="test@example.com"
export TEST_PASSWORD="password123"
export API_TOKEN="your-api-token"
```

## Output Format

Always format test results like this:

```
=== Playwright Test Results ===
Browser: Chromium
Tests: 15 total
✅ Passed: 13
❌ Failed: 2
⏭️  Skipped: 0
⏱️  Duration: 34.2s

Failed Tests:
❌ tests/checkout.spec.js:25
   "Complete purchase flow"
   Error: Timeout waiting for selector ".success-message"

❌ tests/profile.spec.js:12
   "Update user info"
   Error: Expected "New Name" but got "Old Name"

To debug:
npx playwright test --debug tests/checkout.spec.js

To view report:
npx playwright show-report
```

## Auto-Diagnose & Fix Failed Tests

When a test fails, **always** follow this workflow before reporting the failure to the user:

### Step 1: Parse the Failure Output

Read the test output carefully and classify the error. Look for these **locator-related** error patterns:

| Error Pattern                                        | Meaning                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| `Timeout waiting for selector "..."`                 | Locator never matched an element                                 |
| `Error: locator.click: Error: strict mode violation` | Locator matched multiple elements                                |
| `Element is not visible`                             | Element exists but is hidden/off-screen                          |
| `Element is outside of the viewport`                 | Element not scrolled into view                                   |
| `waiting for locator('...')`                         | Playwright auto-wait timed out                                   |
| `expect(locator).toBeVisible()` failed               | Assertion locator didn't find visible element                    |
| `expect(locator).toHaveText(...)` failed             | Locator found element but text mismatch — could be wrong element |
| `Target page, context or browser has been closed`    | Navigation happened, old locator became stale                    |

If the error matches any of the above, proceed to **Step 2**. Otherwise, skip to "Non-Locator Failures" below.

### Step 2: Inspect the Page to Find the Correct Element

Use browser automation to navigate to the same page state the test expects and inspect the actual DOM:

```bash
# Option A: Use Playwright codegen to explore the live page
npx playwright codegen <target-url>

# Option B: Run the failing test in debug mode and pause before the failing line
npx playwright test <test-file> --debug
```

**Or use the browser MCP tools** (preferred when available):

1. `browser_navigate` to the page the test targets.
2. `browser_snapshot` to capture the current page structure.
3. Search the snapshot for the element the test was trying to interact with.
4. Identify the correct locator for the element.

### Step 3: Choose a Better Locator

Follow this priority order when picking a replacement locator (best first):

```
1. Role-based (most resilient)
   page.getByRole('button', { name: 'Submit' })
   page.getByRole('link', { name: 'Sign In' })

2. data-testid (explicit testing hook)
   page.locator('[data-testid="submit-btn"]')
   page.getByTestId('submit-btn')

3. Text-based (good for buttons/labels)
   page.getByText('Submit Order')
   page.getByLabel('Email address')
   page.getByPlaceholder('Enter your email')

4. CSS selector (use specific attributes)
   page.locator('button[type="submit"]')
   page.locator('input[name="email"]')

5. XPath (last resort only)
   page.locator('xpath=//button[contains(text(),"Submit")]')
```

**Avoid** fragile locators like:

- Long CSS chains: `.container > div:nth-child(3) > span.text`
- Class-only selectors that look auto-generated: `.css-1a2b3c`, `.sc-bdVTJa`
- Index-based selectors when order may change: `li:nth-child(5)`

### Step 4: Fix the Test Code

Open the test file that failed and replace the broken locator:

```javascript
// BEFORE (broken — class was removed or renamed)
await page.locator(".old-submit-btn").click();

// AFTER (fixed — using role-based locator)
await page.getByRole("button", { name: "Submit" }).click();
```

If the element genuinely no longer exists (e.g., UI redesign), update the full interaction:

```javascript
// BEFORE (old UI had a single submit button)
await page.click("#checkout-submit");

// AFTER (new UI uses a two-step confirmation)
await page.getByRole("button", { name: "Continue" }).click();
await page.getByRole("button", { name: "Confirm Order" }).click();
```

### Step 5: Re-Run the Fixed Test

```bash
# Re-run only the specific test file that failed
npx playwright test <test-file>

# Or re-run only the specific test by name
npx playwright test -g "test name that failed"
```

- If the test **passes**, report the fix to the user with what was changed.
- If the test **still fails**, repeat from Step 2 — the page may have additional changes.
- If it fails **3 times** on the same test, stop and report the issue to the user with:
  - The original error
  - What locator fixes were attempted
  - A snapshot or screenshot of the current page state (if available)

### Step 6: Report the Fix to the User

```
=== Test Auto-Fix Report ===
File:     tests/checkout.spec.js
Test:     "Complete purchase flow"
Status:   ✅ Fixed & Passing

Problem:  Locator '.old-submit-btn' no longer exists on the page.
Fix:      Replaced with page.getByRole('button', { name: 'Submit' })
          at line 25

Re-run result: ✅ Passed
```

### Non-Locator Failures

If the failure is **not** caused by a locator issue, check these common causes:

| Failure Type                                       | What to Do                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| **Assertion mismatch** (expected value !== actual) | Check if expected data changed, update assertion or test data        |
| **Network/API error** (5xx, timeout, CORS)         | Verify the backend is running; check BASE_URL config                 |
| **Authentication expired**                         | Re-generate auth state: re-run login setup or refresh `storageState` |
| **Race condition / flaky**                         | Add explicit waits or use `toPass()` retry pattern                   |
| **Environment issue** (missing env var, wrong URL) | Check `.env` file and `playwright.config` baseURL                    |

```javascript
// Retry pattern for flaky assertions
await expect(async () => {
  const response = await page.request.get("/api/status");
  expect(response.status()).toBe(200);
}).toPass({ timeout: 15000 });
```

If a failure cannot be auto-fixed, always provide the user with:

1. The **exact error message**
2. The **file and line number**
3. A **suggested fix** or next debugging step

---

## Common Problems & Solutions

### Problem: "Element not found" or "Timeout"

**Solution:**

```javascript
// DON'T do this:
await page.click(".button"); // Might be too fast

// DO this:
await page.locator(".button").click(); // Has built-in waiting

// Or this:
await page.waitForSelector(".button", { state: "visible" });
await page.click(".button");
```

### Problem: "Test is flaky" (passes sometimes, fails other times)

**Solution:**

```javascript
// Add retries to flaky tests
test.describe.configure({ retries: 2 });

// Or use better waits
await expect(page.locator(".element")).toBeVisible({ timeout: 10000 });
```

### Problem: "Need to test authenticated pages"

**Solution:**

```javascript
// Save login state
test.use({
  storageState: "auth.json",
});

// Or login in beforeEach
test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard");
});
```

## Best Practices

When writing or debugging tests:

1. **Use data-testid attributes** for reliable selectors

   ```javascript
   // Good
   await page.click('[data-testid="submit-button"]');

   // Bad (can break easily)
   await page.click(".btn.btn-primary.submit");
   ```

2. **Wait for elements properly**

   ```javascript
   // Built-in waiting (best)
   await page.locator(".element").click();

   // Explicit wait
   await page.waitForSelector(".element");
   ```

3. **Make tests independent**

   ```javascript
   // Each test should work alone
   test.beforeEach(async ({ page }) => {
     // Set up fresh state
   });

   test.afterEach(async ({ page }) => {
     // Clean up
   });
   ```

4. **Use meaningful test names**

   ```javascript
   // Good
   test('should redirect to dashboard after successful login', ...)

   // Bad
   test('login test', ...)
   ```

## Cheat Sheet: Common Commands

```bash
# Run everything
npx playwright test

# See browser
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Specific file
npx playwright test tests/login.spec.js

# Specific browser
npx playwright test --project=chromium

# Show report
npx playwright show-report

# Run failed only
npx playwright test --last-failed

# Watch mode
npx playwright test --watch

# Update snapshots
npx playwright test --update-snapshots
```
