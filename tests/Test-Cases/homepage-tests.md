# Homepage Test Cases

**Feature**: Homepage  
**Base URL**: https://sedekah.je/  
**Test File**: `tests/TestSuite/homepage.spec.js`  
**Helper File**: `helpers/homepage.js`

---

## CF-002: Title displays correctly on page load

**Priority**: High  
**Status**: Active  
**Helper Function**: `VerifyPageTitle(page)`

### Preconditions

- User navigates to base URL
- Modal popup has been dismissed

### Test Steps

1. Navigate to https://sedekah.je/
2. Dismiss modal popup
3. Verify page title

### Expected Results

- Page title should be: "Sedekah Je - Platform Sedekah QR Malaysia"

### Test Data

- Expected Title: `Sedekah Je - Platform Sedekah QR Malaysia`

### Actual Implementation

```javascript
test("CF-002 | Homepage | Title displays correctly on page load", async ({
  page,
}) => {
  await VerifyPageTitle(page);
});
```

---

## CF-003: Logo displays correctly on page load

**Priority**: High  
**Status**: Active  
**Helper Function**: `VerifyLogoVisibility(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate logo image with alt text "Masjid"
3. Verify logo is visible
4. Verify logo attributes

### Expected Results

- Logo is visible on page
- Logo has correct attributes:
  - `alt`: "Masjid"
  - `src`: "/masjid.svg"
  - `width`: "100"
  - `height`: "100"
  - `loading`: "lazy"

### Test Data

- Logo selector: `img[alt="Masjid"]`

---

## CF-004: Mode toggle displays correctly on page load

**Priority**: Medium  
**Status**: Active  
**Helper Function**: `VerifyToogleButton(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate theme toggle button
3. Verify button is visible
4. Click toggle button
5. Verify dark mode icon appears
6. Click toggle button again to reset

### Expected Results

- Toggle button is visible with "Toggle theme" label
- Button switches between light/dark mode
- Moon icon appears in dark mode with class `dark:size-[1.2rem]`

### Test Data

- Button label: "Toggle theme"
- Dark mode icon class: `.lucide-moon`

---

## CF-005: Institution buttons display and function correctly

**Priority**: High  
**Status**: Active  
**Helper Function**: `VerifyOrgButton(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Verify all institution buttons are visible:
   - Masjid
   - Surau
   - Lain-lain
3. Click each button individually
4. Verify filter results appear
5. Navigate back to base URL after each test

### Expected Results

- All three buttons (Masjid, Surau, Lain-lain) are visible
- Clicking each button shows "Jumlah hasil tapisan" text
- Filter functionality works for each category
- Page returns to base URL after testing each button

### Test Data

- Button labels: `['Masjid', 'Surau', 'Lain-lain']`
- Filter result text: "Jumlah hasil tapisan"
- Wait timeout: 5000ms between tests

---

## CF-006: Dropdown displays correctly on page load

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifyDropdown(page)`
- `DropdownFunctionality(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Verify dropdown combobox is visible
3. Verify default text "Semua Negeri"
4. Click dropdown to open options
5. Verify all 16 state options are visible
6. Test filtering functionality for each state
7. Verify filter results appear for each selection

### Expected Results

- Dropdown is visible with "Semua Negeri" text
- All 16 Malaysian states are listed:
  - Johor, Kedah, Kelantan, Melaka
  - Negeri Sembilan, Pahang, Perak, Perlis
  - Pulau Pinang, Sabah, Sarawak, Selangor
  - Terengganu, W.P. Kuala Lumpur, W.P. Labuan, W.P. Putrajaya
- Each state selection shows "Jumlah Hasil Tapisan"
- Dropdown scrolls properly for all options

### Test Data

- Default dropdown text: "Semua Negeri"
- Total states: 16
- Filter result text: "Jumlah Hasil Tapisan"
- Scroll trigger: At "Terengganu" option
- Wait timeout: 5000ms between selections

### Special Notes

- Test includes automatic scrolling for better UX testing
- 300px mouse wheel scroll at "Terengganu" option

---

## CF-007: Searchbar displays correctly on page load

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifySearchbar(page)`
- `VerifySearchbar_Result(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate search input field
3. Verify searchbar is visible
4. Verify placeholder text
5. Click searchbar
6. Enter search term: "Masjid Taman Pulai Indah"
7. Verify search value
8. Verify search results appear

### Expected Results

- Searchbar is visible with type "search"
- Placeholder text: "Cari masjid/surau/institusi..."
- Searchbar accepts text input
- Search value is correctly stored
- Result card appears with matching institution
- Institution name "Masjid Taman Pulai Indah" is visible in results

### Test Data

- Searchbar selector: `input[type="search"][placeholder*="Cari masjid"]`
- Placeholder: "Cari masjid/surau/institusi..."
- Test search term: "Masjid Taman Pulai Indah"
- Result card selector: `.rounded-lg.bg-card.text-card-foreground`

---

## CF-008: Surau button displays and works correctly

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifySurauButton(page)` (from SurauCardDetail.js)
- `VerifyCard_Result(page)` (from SurauCardDetail.js)

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate "Surau" button
3. Verify button is visible
4. Click "Surau" button
5. Verify filter results text appears
6. Verify result card is displayed
7. Verify card components (logo, title, buttons)

### Expected Results

- "Surau" button is visible and clickable
- "Jumlah Hasil Tapisan" text appears after clicking
- First result card is visible
- Card shows:
  - Category logo image
  - Institution title (h3 element)
  - Download button (with lucide-download icon)
  - Share button (with lucide-share2 icon)

### Test Data

- Button name: "Surau"
- Filter text: "Jumlah Hasil Tapisan"
- Card selector: `div.rounded-lg.bg-card`
- Expected first result: "AJK Surau Darul Istiqamah"

---

## Common Setup (beforeEach)

All homepage tests use the following setup:

```javascript
test.beforeEach(async ({ page }) => {
  await page.goto("https://sedekah.je/");
  await VerifyModalPopup(page);
});
```

This ensures:

- User starts at base URL
- Modal popup is dismissed before each test
- Clean state for each test case

---

## Test Execution

```bash
# Run all homepage tests
npx playwright test homepage.spec.js

# Run specific test
npx playwright test homepage.spec.js -g "CF-002"

# Run with UI
npx playwright test homepage.spec.js --ui

# Debug mode
npx playwright test homepage.spec.js --debug
```

---

## Notes

- Test timeout is set to 300000ms (5 minutes)
- CF-001 (Modal Popup test) is commented out as it's verified in beforeEach
- All tests depend on modal popup being dismissed first
- Tests use helper functions from `/helpers/` folder for reusability and maintenance
- Helper functions are imported from `../../helpers/homepage` in the spec files
