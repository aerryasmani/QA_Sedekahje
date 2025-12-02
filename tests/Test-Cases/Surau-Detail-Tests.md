# Surau Detail Page Test Cases

**Feature**: Surau Detail Page  
**Base URL**: https://sedekah.je/  
**Test File**: `tests/TestSuite/Surau_detailpage.spec.js`  
**Helper File**: `helpers/SurauCardDetail.js`

---

## CF-011: Card Detail Page is present

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifySurauButton(page)`
- `VerifyCard_Result(page)`

### Preconditions

- User is on homepage
- Modal popup has been dismissed

### Test Steps

1. Navigate to homepage
2. Click "Surau" filter button
3. Verify filter results appear
4. Verify first result card is visible
5. Verify card components

### Expected Results

- Surau button is visible and clickable
- "Jumlah Hasil Tapisan" text appears
- First result card displays properly
- Card contains:
  - Category logo image (visible)
  - Institution title: "AJK Surau Darul Istiqamah"
  - Download button (with lucide-download icon)
  - Share button (with lucide-share2 icon)

### Test Data

- Button name: "Surau"
- Filter text: "Jumlah Hasil Tapisan"
- Card selector: `div.rounded-lg.bg-card`
- Expected institution: "AJK Surau Darul Istiqamah"
- Card title selector: `h3.text-lg.font-semibold`

### Actual Implementation

```javascript
test("CF - 011 | Surau Detail Page | Card Detail Page Is Present", async ({
  page,
}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
});
```

---

## CF-012: Peta button is present and visible

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifySurauButton(page)`
- `VerifyCard_Result(page)`
- `VerifyCard_PetaButton(page)`
- `VerifyPetaButton_Result(page)`

### Preconditions

- User has navigated to Surau detail page
- Card is visible and expanded

### Test Steps

1. Click Surau button to filter results
2. Verify card result is displayed
3. Click on the card to expand it
4. Locate "Peta" button
5. Verify button is visible
6. Click "Peta" button
7. Verify map container appears

### Expected Results

- Card expands when clicked
- Card shows full details: "AJK Surau Darul IstiqamahKuching, SarawakKongsi"
- "Peta" button is visible after expansion
- Clicking "Peta" shows map container
- Map container has class `leaflet-container`
- Map is visible within 10 seconds

### Test Data

- Card location: "Kuching, Sarawak"
- Peta button label: "Peta"
- Map selector: `div.leaflet-container`
- Visibility timeout: 10000ms

### Actual Implementation

```javascript
test("CF - 012 | Surau Detail Page | Peta button is present and visible", async ({
  page,
}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyPetaButton_Result(page);
});
```

---

## CF-013: Doa section is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `VerifySurauButton(page)`
- `VerifyCard_Result(page)`
- `VerifyCard_PetaButton(page)`
- `VerifyCard_GetDoa(page)`

### Preconditions

- User is on Surau detail page
- Card is expanded
- User has scrolled to Doa section

### Test Steps

1. Navigate to Surau detail page
2. Expand card details
3. Scroll to "Doa Harian" section
4. Verify section title is visible
5. Verify doa subtitle appears
6. Click on Doa section
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
  - target: "\_blank"
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
test("CF - 013| Surau Detail Page| Doa Section is present", async ({
  page,
}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyCard_GetDoa(page);
});
```

---

## CF-014: Footer section is present

**Priority**: High  
**Status**: Active  
**Helper Functions**:

- `VerifySurauButton(page)`
- `VerifyCard_Result(page)`
- `VerifyCard_PetaButton(page)`
- `VerifyFooter_BrandSection(page)`
- `VerifyFooter_Socmedia(page)`

### Preconditions

- User is on Surau detail page
- User has scrolled to footer

### Test Steps

1. Navigate to Surau detail page
2. Complete card verification flow
3. Scroll to bottom of page
4. Verify footer brand section
5. Verify footer social media links

### Expected Results

**Brand Section:**

- Logo image visible with alt: "Logo Masjid SedekahJe"
- Heading: "sedekah.je"
- Subheading: "QR Directory"
- Description text: "Senarai QR masjid, surau, dan institusi yang dikumpulkan oleh netizen untuk memudahkan sedekah dan sumbangan."

**Social Media:**

- X (Twitter) link:
  - href: "https://x.com/sedekahje"
  - target: "\_blank"
  - rel: "noreferrer"
- GitHub link:
  - href: "https://github.com/khrnchn/sedekah-je"
  - target: "\_blank"
  - rel: "noreferrer"

### Test Data

- Logo alt text: "Logo Masjid SedekahJe"
- Brand heading: "sedekah.je"
- Brand subheading: "QR Directory"
- X link: "https://x.com/sedekahje"
- GitHub link: "https://github.com/khrnchn/sedekah-je"

### Actual Implementation

```javascript
test("CF - 014| Surau Detail Page| Footer Section is present", async ({
  page,
}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyFooter_BrandSection(page);
  await VerifyFooter_Socmedia(page);
});
```

---

## CF-015: Footer social media is present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `VerifySurau_Flow(page)` (Combined flow function)
- `VerifyFooter_Socmedia(page)`

### Preconditions

- User has completed Surau verification flow
- User has scrolled to footer

### Test Steps

1. Execute complete Surau flow (button click, card view, Peta, Doa)
2. Scroll to footer
3. Verify social media links

### Expected Results

- X (Twitter) link is visible and properly configured
- GitHub link is visible and properly configured
- Both links open in new tab (\_blank)
- Both links have rel="noreferrer" for security

### Test Data

- X link: "https://x.com/sedekahje"
- GitHub link: "https://github.com/khrnchn/sedekah-je"

### Notes

- Uses `VerifySurau_Flow()` which combines:
  - `VerifySurauButton()`
  - `VerifyCard_Result()`
  - `VerifyCard_PetaButton()`
  - `VerifyCard_GetDoa()`

### Actual Implementation

```javascript
test("CF - 015 | Footer Social Media is present", async ({ page }) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_Socmedia(page);
});
```

---

## CF-016: Footer Rujukan links are present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `VerifySurau_Flow(page)`
- `VerifyFooter_RujukanLinks(page)`

### Preconditions

- User has completed Surau verification flow
- User has scrolled to footer

### Test Steps

1. Execute complete Surau flow
2. Scroll to footer
3. Locate "Rujukan" heading
4. Verify all reference links

### Expected Results

- "Rujukan" heading is visible
- All three reference links are present:
  1. **Sumber Kod**: https://github.com/khrnchn/sedekah-je
  2. **Data Trafik**: https://analytics.farhanhelmy.com/share/qqGVUCdO8JGBoSk5/sedekah.je
  3. **Logo**: https://www.flaticon.com/free-icons/holy
- All links open in new tab (\_blank)
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
test("CF - 016| Footer Rujukan Links are present", async ({ page }) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_RujukanLinks(page);
});
```

---

## CF-017: Footer Project Komuniti links are present

**Priority**: Medium  
**Status**: Active  
**Helper Functions**:

- `VerifySurau_Flow(page)`
- `VerifyFooter_ProjectKomuniti(page)`

### Preconditions

- User has completed Surau verification flow
- User has scrolled to footer

### Test Steps

1. Execute complete Surau flow
2. Scroll to footer
3. Locate "Projek Komuniti" heading
4. Verify all 12 community project links

### Expected Results

- "Projek Komuniti" heading is visible
- All 12 community project links are present and visible
- All links have correct href with ref parameter
- All links open in new tab (\_blank)

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
test("CF - 017 | Footer Project Komuniti Links are present", async ({
  page,
}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_ProjectKomuniti(page);
});
```

---

## Common Setup (beforeEach)

All Surau detail tests use the following setup:

```javascript
test.beforeEach(async ({ page }) => {
  await page.goto("https://sedekah.je/");
  await VerifyModalPopup(page);
});
```

---

## Test Execution

```bash
# Run all Surau detail tests
npx playwright test Surau_detailpage.spec.js

# Run specific test
npx playwright test Surau_detailpage.spec.js -g "CF-011"

# Run with UI
npx playwright test Surau_detailpage.spec.js --ui

# Debug mode
npx playwright test Surau_detailpage.spec.js --debug
```

---

## Dependencies

These tests depend on helper functions from:

- `helpers/SurauCardDetail.js` - Main helper functions for Surau features
- `helpers/homepage.js` - Modal popup and navigation helpers

Helper functions are imported using relative paths:

```javascript
import {...} from '../../helpers/SurauCardDetail';
import {...} from '../../helpers/homepage';
```

---

## Notes

- Test timeout: 300000ms (5 minutes)
- Tests follow a sequential flow pattern
- `VerifySurau_Flow()` combines multiple verification steps
- Footer tests verify both functionality and security attributes
