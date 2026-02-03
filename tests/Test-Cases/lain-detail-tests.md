# Lain Detail Page Test Cases

**Feature**: Lain Detail Page  
**Base URL**: https://sedekah.je/  
**Test File**: `tests/TestSuite/Lain_detailpage.spec.js`  
**Helper Files**: 
- `helpers/LainCardDetail.js`
- `helpers/SurauCardDetail.js` (for shared footer and Doa functionality)

---

## CF-018: Lain-lain button is present and visible

**Priority**: High  
**Status**: Active  
**Helper Function**: `navigateToLainSection()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Locate "Lain-lain" button
3. Verify button is visible and clickable
4. Click "Lain-lain" button
5. Verify filter results appear

### Expected Results

- "Lain-lain" button is visible and clickable
- Clicking button filters results to show Lain-lain institutions
- "Jumlah Hasil Tapisan" text appears after clicking

### Test Data

- Button name: "Lain-lain"
- Filter text: "Jumlah Hasil Tapisan"

### Actual Implementation

```javascript
test('CF-018 | Lain Detail Page | Lain-lain button is present and visible', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  await lainPage.navigateToLainSection();
});
```

---

## CF-019: Lain Detail Card is present and visible

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `clickLainButton()`
- `verifyLainCardResult()`
- `verifyAndClickPetaButton()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Click "Lain-lain" button to filter results
3. Verify card results are filtered and visible
4. Verify card components are present
5. Verify Peta button is present

### Expected Results

- Lain-lain button is visible and accepts input
- Cards are filtered according to Lain-lain category
- Result cards display properly
- Card contains:
  - Category logo image
  - Institution title
  - Download button
  - Share button
- Peta button is present and functional

### Test Data

- Button name: "Lain-lain"
- Filter text: "Jumlah Hasil Tapisan"
- Card selector: `div.rounded-lg.bg-card`

### Actual Implementation

```javascript
test('CF-019 | Lain Detail Page | Lain Detail Card is present and visible', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);

  await test.step('Verify Lain-lain button is visible and accepts input', async () => {
    await lainPage.clickLainButton();
  });

  await test.step('Card Filtered and Expand', async () => {
    await lainPage.verifyLainCardResult();
  });

  await test.step('Button is present', async () => {
    await lainPage.verifyAndClickPetaButton();
  });
});
```

---

## CF-020: Peta button is present and visible in the detail page

**Priority**: High  
**Status**: Active  
**Helper Function**: `navigateAndVerifyPeta()`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to Lain-lain section
2. Verify card results are filtered
3. Expand the Lain card
4. Locate "Peta" button
5. Verify button is visible
6. Click "Peta" button
7. Verify map container appears

### Expected Results

- Card expands when clicked
- "Peta" button is visible after expansion
- Clicking "Peta" shows map container
- Map container has class `leaflet-container`
- Map is visible within expected timeout

### Test Data

- Peta button label: "Peta"
- Map selector: `div.leaflet-container`
- Visibility timeout: 10000ms

### Actual Implementation

```javascript
test('CF-020 | Lain Detail Page | Peta button is present and visible in the detail page', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  await lainPage.navigateAndVerifyPeta();
});
```

---

## CF-021: Verify Doa Section is present in Lain Detail Page

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickLainButton()`
- `verifyLainCardResult()`
- `expandLainCard()`
- `verifyCardGetDoa()` (from SurauCardDetailPage)

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to Lain-lain section
2. Verify card results are filtered and visible
3. Expand the Lain card
4. Scroll to "Doa Harian" section
5. Verify section title is visible
6. Verify doa subtitle appears
7. Verify doa structure and content
8. Verify hadis components
9. Verify GetDoa attribution

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
test('CF-021 | Verify Doa Section is present in Lain Detail Page', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  const surauPage = new SurauCardDetailPage(page); 

  await test.step('Navigate to Lain-lain section', async () => {
    await lainPage.clickLainButton();
  });

  await test.step('Verify card results are filtered and visible', async () => {
    await lainPage.verifyLainCardResult();
  });

  await test.step('Expand the Lain card', async () => {
    await lainPage.expandLainCard();
  });
  
  await test.step('Verify Doa section is present', async () => {
    await surauPage.verifyCardGetDoa(); 
  });
});
```

---

## CF-022: Footer Social Media is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickLainButton()`
- `verifyLainCardResult()`
- `expandLainCard()`
- `verifyFooterBrandSection()` (from SurauCardDetailPage)
- `verifyFooterSocmedia()` (from SurauCardDetailPage)

### Preconditions

- User is on Lain detail page
- Card is expanded
- User has scrolled to footer

### Test Steps

1. Navigate to Lain-lain section
2. Verify card is filtered according to Lain-lain button
3. Expand the Lain card
4. Scroll to footer
5. Verify footer brand section
6. Verify social media links

### Expected Results

**Brand Section:**

- Logo image visible with alt: "Logo Masjid SedekahJe"
- Heading: "sedekah.je"
- Subheading: "QR Directory"
- Description text: "Senarai QR masjid, surau, dan institusi yang dikumpulkan oleh netizen untuk memudahkan sedekah dan sumbangan."

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

- Logo alt text: "Logo Masjid SedekahJe"
- Brand heading: "sedekah.je"
- Brand subheading: "QR Directory"
- X link: "https://x.com/sedekahje"
- GitHub link: "https://github.com/khrnchn/sedekah-je"

### Actual Implementation

```javascript
test('CF-022 | Footer Social Media is present', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  const surauPage = new SurauCardDetailPage(page);

  await test.step('Verify Lain-lain button is visible and accepts input', async () => {
    await lainPage.clickLainButton();
  });

  await test.step('Verify card is filtered according to lain-lain button', async () => {
    await lainPage.verifyLainCardResult();
    await lainPage.expandLainCard();
  });

  await test.step('Verify Footer Sections are Present', async () => {
    await surauPage.verifyFooterBrandSection(); 
    await surauPage.verifyFooterSocmedia();      
  });
});
```

---

## CF-023: Footer Rujukan Link is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickLainButton()`
- `verifyLainCardResult()`
- `expandLainCard()`
- `verifyFooterRujukanLinks()` (from SurauCardDetailPage)

### Preconditions

- User is on Lain detail page
- Card is expanded
- User has scrolled to footer

### Test Steps

1. Navigate to Lain-lain section
2. Verify card is filtered according to Lain-lain button
3. Expand the Lain card
4. Scroll to footer
5. Locate "Rujukan" heading
6. Verify all reference links

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
test('CF-023 | Footer Rujukan Link is present', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  const surauPage = new SurauCardDetailPage(page); 

  await test.step('Verify Lain-lain button is visible and accepts input', async () => {
    await lainPage.clickLainButton();
  });

  await test.step('Verify card is filtered according to lain-lain button', async () => {
    await lainPage.verifyLainCardResult();
    await lainPage.expandLainCard();
  });

  await test.step('Verify Footer Sections are Present', async () => {
    await surauPage.verifyFooterRujukanLinks(); 
  });
});
```

---

## CF-024: Footer Project Komuniti is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `clickLainButton()`
- `verifyLainCardResult()`
- `expandLainCard()`
- `verifyFooterProjectKomuniti()` (from SurauCardDetailPage)

### Preconditions

- User is on Lain detail page
- Card is expanded
- User has scrolled to footer

### Test Steps

1. Navigate to Lain-lain section
2. Verify card is filtered according to Lain-lain button
3. Expand the Lain card
4. Scroll to footer
5. Locate "Projek Komuniti" heading
6. Verify all 12 community project links

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
test('CF-024 | Footer Project Komuniti is present', async ({ page }) => {
  const lainPage = new LainCardDetailPage(page);
  const surauPage = new SurauCardDetailPage(page);

  await test.step('Verify Lain-lain button is visible and accepts input', async () => {
    await lainPage.clickLainButton();
  });

  await test.step('Verify card is filtered according to lain-lain button', async () => {
    await lainPage.verifyLainCardResult();
    await lainPage.expandLainCard();
  });

  await test.step('Verify Project Komuniti Sections are Present', async () => {
    await surauPage.verifyFooterProjectKomuniti(); 
  });
});
```

---

## Common Setup (beforeEach)

All Lain detail tests use the following setup:

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
# Run all Lain detail tests
npx playwright test tests/TestSuite/Lain_detailpage.spec.js

# Run specific test
npx playwright test tests/TestSuite/Lain_detailpage.spec.js -g "CF-018"

# Run with UI
npx playwright test tests/TestSuite/Lain_detailpage.spec.js --ui

# Debug mode
npx playwright test tests/TestSuite/Lain_detailpage.spec.js --debug
```

---

## Dependencies

These tests depend on helper functions from:

- `helpers/LainCardDetail.js` - Main helper functions for Lain-lain features
- `helpers/SurauCardDetail.js` - Shared footer and Doa functionality
- `helpers/homepage.js` - Modal popup and navigation helpers

Helper functions are imported using relative paths:

```javascript
import { LainCardDetailPage } from '../../helpers/LainCardDetail';
import { SurauCardDetailPage } from '../../helpers/SurauCardDetail';
import { HomePage } from '../../helpers/homepage';
```

---

## Notes

- Test timeout: 300000ms (5 minutes)
- Tests follow a sequential flow pattern
- Footer and Doa functionality is shared with Surau detail page via SurauCardDetailPage
- Footer tests verify both functionality and security attributes
