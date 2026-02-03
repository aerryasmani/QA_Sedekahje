# SedekahRawak/Randomizer Test Cases

**Feature**: SedekahRawak (Randomizer)  
**Base URL**: https://sedekah.je/  
**Test File**: `tests/TestSuite/SedekahRawak.spec.js`  
**Helper Files**: 
- `helpers/SedekahRawak.js`
- `helpers/SurauCardDetail.js` (for shared footer and Doa functionality)

---

## CF-025: Verify the Sedekah Rawak Button is present and visible

**Priority**: High  
**Status**: Active  
**Helper Function**: `verifySedekahRawakButton()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate "Sedekah Rawak" button
3. Verify button is visible
4. Verify button is clickable

### Expected Results

- "Sedekah Rawak" button is visible on the page
- Button is clickable and functional
- Button has correct styling and positioning

### Test Data

- Button name: "Sedekah Rawak"
- Button selector: Based on implementation in SedekahRawak.js

### Actual Implementation

```javascript
test('CF-025 | Randomizer Detail Page | Verify the Sedekah Rawak Button is present and visible', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  await rawakPage.verifySedekahRawakButton();
});
```

---

## CF-026: Verify the Randomizer button functionality

**Priority**: High  
**Status**: Active  
**Helper Function**: `navigateToRandomizer()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Click "Sedekah Rawak" button
3. Verify randomizer page loads
4. Verify randomizer functionality is accessible

### Expected Results

- Clicking "Sedekah Rawak" button navigates to randomizer page
- Randomizer page loads successfully
- Randomizer interface is visible and functional

### Test Data

- Button name: "Sedekah Rawak"
- Expected page: Randomizer page with QR code display

### Actual Implementation

```javascript
test('CF-026 | Randomizer Detail Page | Verify the Randomizer button functionality', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  await rawakPage.navigateToRandomizer();
});
```

---

## CF-027: Verify the Second Randomizer button functionality

**Priority**: High  
**Status**: Active  
**Helper Function**: `openAndTestRandomizer()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Click "Sedekah Rawak" button
3. Navigate to randomizer page
4. Locate second randomizer button
5. Click second randomizer button
6. Verify QR code regenerates
7. Verify new QR code is displayed

### Expected Results

- Second randomizer button is visible and clickable
- Clicking button regenerates QR code
- New QR code is displayed
- QR code changes between clicks
- QR code is visible and properly rendered

### Test Data

- Button name: "Randomizer" or "Rawak" (second button)
- QR code selector: Based on implementation
- Expected behavior: QR code regeneration on each click

### Actual Implementation

```javascript
test('CF-027 | Randomizer Detail Page | Verify the Second Randomizer button functionality', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  await rawakPage.openAndTestRandomizer();
});
```

---

## CF-028: Verify GetDoa Sections are Present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickSedekahRawakButton()`
- `verifyCardGetDoa()` (from SurauCardDetailPage)

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to randomizer page
2. Scroll to "Doa Harian" section
3. Verify section title is visible
4. Verify doa subtitle appears
5. Verify doa structure and content
6. Verify hadis components
7. Verify GetDoa attribution

### Expected Results

- "Doa Harian" title is visible
- Subtitle: "Doa untuk dibaca setiap hari" is present
- Arabic text (font-arabic class) is visible
- Hadis title exists and is not empty
- Hadis description with "Maksud:" is visible and not empty
- "Dikuasakan oleh" text appears
- GetDoa link is present with:
  - href: "https://getdoa.com"
  - target: "_blank"
  - External link icon (lucide-external-link)

### Test Data

- Doa title: "Doa Harian"
- Doa subtitle: "Doa untuk dibaca setiap hari"
- Arabic text selector: `.font-arabic`
- Hadis title selector: `h3.text-sm.font-semibold.leading-relaxed`
- Hadis description selector: `p` with text "Maksud:"
- Attribution text: "Dikuasakan oleh"
- GetDoa link: "https://getdoa.com"

### Actual Implementation

```javascript
test('CF-028 | Randomizer Page | Verify GetDoa Sections are Present', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  const surauPage = new SurauCardDetailPage(page);
  
  await test.step('Navigate to randomizer', async () => {
    await rawakPage.clickSedekahRawakButton();
  });

  await test.step('Verify GetDoa section is present', async () => {
    await surauPage.verifyCardGetDoa();
  });
});
```

---

## CF-029: Verify Footer Sections are Present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickSedekahRawakButton()`
- `verifyFooterBrandSection()` (from SurauCardDetailPage)

### Preconditions

- User is on randomizer page
- User has scrolled to footer

### Test Steps

1. Navigate to randomizer page
2. Scroll to footer
3. Verify footer brand section
4. Verify brand components

### Expected Results

**Brand Section:**

- Logo image visible with alt: "Logo Masjid SedekahJe"
- Heading: "sedekah.je"
- Subheading: "QR Directory"
- Description text: "Senarai QR masjid, surau, dan institusi yang dikumpulkan oleh netizen untuk memudahkan sedekah dan sumbangan."

### Test Data

- Logo alt text: "Logo Masjid SedekahJe"
- Brand heading: "sedekah.je"
- Brand subheading: "QR Directory"

### Actual Implementation

```javascript
test('CF-029 | Randomizer Page | Verify Footer Sections are Present', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  const surauPage = new SurauCardDetailPage(page);
  
  await test.step('Navigate to randomizer', async () => {
    await rawakPage.clickSedekahRawakButton();
  });

  await test.step('Verify footer brand section', async () => {
    await surauPage.verifyFooterBrandSection();
  });
});
```

---

## CF-030: Verify Footer Social Media column are Present and visible

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickSedekahRawakButton()`
- `verifyFooterSocmedia()` (from SurauCardDetailPage)

### Preconditions

- User is on randomizer page
- User has scrolled to footer

### Test Steps

1. Navigate to randomizer page
2. Scroll to footer
3. Verify footer social media links

### Expected Results

**Social Media:**

- X (Twitter) link:
  - href: "https://x.com/sedekahje"
  - target: "_blank"
  - rel: "noreferrer"
- GitHub link:
  - href: "https://github.com/khrnchn/sedekah-je"
  - target: "_blank"
  - rel: "noreferrer"

### Test Data

- X link: "https://x.com/sedekahje"
- GitHub link: "https://github.com/khrnchn/sedekah-je"

### Actual Implementation

```javascript
test('CF-030 | Randomizer Page | Verify Footer Social Media column are Present and visible', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  const surauPage = new SurauCardDetailPage(page);
  
  await test.step('Navigate to randomizer', async () => {
    await rawakPage.clickSedekahRawakButton();
  });

  await test.step('Verify footer social media section', async () => {
    await surauPage.verifyFooterSocmedia();
  });
});
```

---

## CF-031: Verify Footer Rujukan column are Present and visible

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickSedekahRawakButton()`
- `verifyFooterRujukanLinks()` (from SurauCardDetailPage)

### Preconditions

- User is on randomizer page
- User has scrolled to footer

### Test Steps

1. Navigate to randomizer page
2. Scroll to footer
3. Locate "Rujukan" heading
4. Verify all reference links

### Expected Results

- "Rujukan" heading is visible
- All three reference links are present:
  1. **Sumber Kod**: https://github.com/khrnchn/sedekah-je
  2. **Data Trafik**: https://analytics.farhanhelmy.com/share/qqGVUCdO8JGBoSk5/sedekah.je
  3. **Logo**: https://www.flaticon.com/free-icons/holy
- All links open in new tab (_blank)
- All links have correct href attributes

### Test Data

```javascript
rujukanLinks = [
  { name: "Sumber Kod", href: "https://github.com/khrnchn/sedekah-je" },
  {
    name: "Data Trafik",
    href: "https://analytics.farhanhelmy.com/share/qqGVUCdO8JGBoSk5/sedekah.je",
  },
  { name: "Logo", href: "https://www.flaticon.com/free-icons/holy" },
];
```

### Actual Implementation

```javascript
test('CF-031 | Randomizer | Verify Footer Rujukan column are Present and visible', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  const surauPage = new SurauCardDetailPage(page);
  
  await test.step('Navigate to randomizer', async () => {
    await rawakPage.clickSedekahRawakButton();
  });

  await test.step('Verify footer rujukan links', async () => {
    await surauPage.verifyFooterRujukanLinks();
  });
});
```

---

## CF-032: Verify Footer Project Komuniti section is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickSedekahRawakButton()`
- `verifyFooterProjectKomuniti()` (from SurauCardDetailPage)

### Preconditions

- User is on randomizer page
- User has scrolled to footer

### Test Steps

1. Navigate to randomizer page
2. Scroll to footer
3. Locate "Projek Komuniti" heading
4. Verify all 12 community project links

### Expected Results

- "Projek Komuniti" heading is visible
- All 12 community project links are present and visible
- All links have correct href with ref parameter
- All links open in new tab (_blank)

### Test Data

Community project links (12 total):

1. **Cari Fatwa**: https://carifatwa.com?ref=sedekah.je
2. **GetDoa**: https://getdoa.com
3. **Kelas Mengaji Online**: https://kelasmengaji.online?ref=sedekah.je
4. **Saham Akhirat**: https://sahamakhirat.org?ref=sedekah.je
5. **Belasungkawa**: https://belasungkawa.my?ref=sedekah.je
6. **Quran Manzil**: https://quran-manzil.com?ref=sedekah.je
7. **Quran Sunnah AI**: https://quran-sunnah-ai.com?ref=sedekah.je
8. **Meem**: https://usemeem.com?ref=sedekah.je
9. **duaa.my**: https://duaa.my?ref=sedekah.je
10. **SemakHadis.com**: https://semakhadis.com?ref=sedekah.je
11. **CariTadika.my**: https://caritadika.my?ref=sedekah.je
12. **e-Masjid.my**: https://e-masjid.my?ref=sedekah.je

### Notes

- All links include `?ref=sedekah.je` parameter (except GetDoa)
- Links support community ecosystem tracking

### Actual Implementation

```javascript
test('CF-032 | Randomizer | Verify Footer Project Komuniti section is present', async ({ page }) => {
  const rawakPage = new SedekahRawak(page);
  const surauPage = new SurauCardDetailPage(page);
  
  await test.step('Navigate to randomizer', async () => {
    await rawakPage.clickSedekahRawakButton();
  });

  await test.step('Verify footer project komuniti section', async () => {
    await surauPage.verifyFooterProjectKomuniti();
  });
});
```

---

## Common Setup (beforeEach)

All SedekahRawak tests use the following setup:

```javascript
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyAndCloseModal();
});
```

This ensures:

- User starts at base URL
- Modal popup is dismissed before each test
- Clean state for each test case

---

## Test Execution

```bash
# Run all SedekahRawak tests
npx playwright test tests/TestSuite/SedekahRawak.spec.js

# Run specific test
npx playwright test tests/TestSuite/SedekahRawak.spec.js -g "CF-025"

# Run with UI
npx playwright test tests/TestSuite/SedekahRawak.spec.js --ui

# Debug mode
npx playwright test tests/TestSuite/SedekahRawak.spec.js --debug
```

---

## Dependencies

These tests depend on helper functions from:

- `helpers/SedekahRawak.js` - Main helper functions for randomizer features
- `helpers/SurauCardDetail.js` - Shared footer and Doa functionality
- `helpers/homepage.js` - Modal popup and navigation helpers

Helper functions are imported using relative paths:

```javascript
import { SedekahRawak } from '../../helpers/SedekahRawak';
import { SurauCardDetailPage } from '../../helpers/SurauCardDetail';
import { HomePage } from '../../helpers/homepage';
```

---

## Notes

- Test timeout: 300000ms (5 minutes)
- Tests follow a sequential flow pattern
- Footer and Doa functionality is shared with other detail pages via SurauCardDetailPage
- Footer tests verify both functionality and security attributes
- Randomizer tests verify QR code generation and regeneration functionality
