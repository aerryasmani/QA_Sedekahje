# Festive_Ramadhan Test Cases

**Feature**: Festive Ramadhan (Ramadan Banner 2026)  
**Base URL**: https://sedekah.je/  
**Test File**: `tests/TestSuite/ramadanbanner.spec.js`  
**Helper File**: `helpers/ramadanbanner.js`

---

## RTC-01: Banner is visible during Ramadhan month

**Priority**: High  
**Status**: Active  
**Helper Function**: `VerifyRamadanBanner(page)`

### Preconditions

- User navigates to base URL
- Modal popup has been dismissed
- Ramadhan banner is displayed (during Ramadhan period or when banner is enabled)

### Test Steps

1. Navigate to https://sedekah.je/
2. Dismiss modal popup
3. Verify Ramadhan banner is visible
4. Verify banner contains day indicator, mosque name, Lihat QR link, and Kongsi ke X button

### Expected Results

- Banner with gradient styling (emerald to teal) is visible
- Day indicator text is visible
- Mosque name is visible
- "Lihat QR" link (href="/ramadhan") is visible
- "Kongsi ke X" button and X icon are visible

### Test Data

- Banner selector: `.bg-gradient-to-r.from-emerald-400.to-teal-800`
- Lihat QR link: `a[href="/ramadhan"]`

### Actual Implementation

```javascript
test('RTC-01: Banner is visible during Ramadhan month', async ({ page }) => {
    await VerifyRamadanBanner(page);
});
```

---

## RTC-02: Banner countdown timer is visible

**Priority**: Medium  
**Status**: Draft  
**Helper Function**: _To be implemented_

### Preconditions

- User is on homepage
- Modal popup has been dismissed
- Ramadhan banner is displayed

### Test Steps

1. Navigate to homepage
2. Dismiss modal popup
3. Locate the Ramadhan banner
4. Verify countdown timer element is present and visible

### Expected Results

- Countdown timer is visible within the banner
- Timer displays remaining time (e.g. days/hours to end of Ramadhan)

### Notes

- Test implementation is pending in `ramadanbanner.spec.js`

---

## RTC-03: View QR button is present in the banner

**Priority**: High  
**Status**: Draft  
**Helper Function**: _To be implemented_

### Preconditions

- User is on homepage
- Modal popup has been dismissed
- Ramadhan banner is displayed

### Test Steps

1. Navigate to homepage
2. Dismiss modal popup
3. Locate the "Lihat QR" (View QR) button/link in the banner
4. Verify it is visible and clickable
5. Optionally verify it links to /ramadhan

### Expected Results

- "Lihat QR" button/link is present in the banner
- Element is visible and functional
- Link targets /ramadhan (if applicable)

### Notes

- Partially covered by `VerifyRamadanBanner()` (lihatQRBtn visibility). Dedicated test implementation is pending in `ramadanbanner.spec.js`.

---

## RTC-04: The X share button is visible and functional

**Priority**: Medium  
**Status**: Draft  
**Helper Function**: _To be implemented_

### Preconditions

- User is on homepage
- Modal popup has been dismissed
- Ramadhan banner is displayed

### Test Steps

1. Navigate to homepage
2. Dismiss modal popup
3. Locate the "Kongsi ke X" (Share to X) button in the banner
4. Verify button is visible
5. Verify button is clickable and functional (e.g. opens share intent)

### Expected Results

- "Kongsi ke X" button is visible in the banner
- Button contains X/Twitter icon
- Button is clickable and performs share action when clicked

### Notes

- Partially covered by `VerifyRamadanBanner()` (kongsiXBtn and xIcon visibility). Functional click test is pending in `ramadanbanner.spec.js`.
