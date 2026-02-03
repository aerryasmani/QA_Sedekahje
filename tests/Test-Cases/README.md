# Test Cases Index - Sedekah.je

## Overview

This directory contains all test case documentation for the Sedekah.je platform. Test cases are organized by feature/page and stored as markdown files for easy version control and collaboration.

**Last Updated**: December 2024  
**Test Framework**: Playwright  
**Base URL**: https://sedekah.je/

---

## Test Coverage Summary

| Feature Area      | Test Cases                 | Status         | File                                           |
| ----------------- | -------------------------- | -------------- | ---------------------------------------------- |
| Homepage          | CF-002 to CF-007 (6 tests) | ✅ Active      | [homepage-tests.md](homepage-tests.md)         |
| Surau Detail Page | CF-011 to CF-017 (7 tests) | ✅ Active      | [Surau-Detail-Tests.md](Surau-Detail-Tests.md) |
| Lain Detail Page  | CF-018 to CF-024 (7 tests) | ✅ Active      | [lain-detail-tests.md](lain-detail-tests.md)   |
| SedekahRawak      | CF-025 to CF-032 (8 tests) | ✅ Active      | _Documentation pending_                        |
| **Total**         | **28 tests**               |                |                                                |

---

## Test Cases by Feature

### Homepage Tests (6 test cases)

- **CF-002**: Title displays correctly on page load
- **CF-003**: Logo displays correctly on page load
- **CF-004**: Mode toggle displays correctly on page load
- **CF-005**: Institution buttons display and function correctly
- **CF-006**: Dropdown displays correctly on page load
- **CF-007**: Searchbar displays correctly on page load

### Surau Detail Page Tests (7 test cases)

- **CF-011**: Card detail page is present
- **CF-012**: Peta button is present and visible
- **CF-013**: Doa section is present
- **CF-014**: Footer section is present
- **CF-015**: Footer social media is present
- **CF-016**: Footer Rujukan links are present
- **CF-017**: Footer Project Komuniti links are present

### Lain Detail Page Tests (7 test cases)

- **CF-018**: Lain-lain button is present and visible
- **CF-019**: Lain Detail Card is present and visible
- **CF-020**: Peta button is present and visible in the detail page
- **CF-021**: Verify Doa Section is present in Lain Detail Page
- **CF-022**: Footer Social Media is present
- **CF-023**: Footer Rujukan Link is present
- **CF-024**: Footer Project Komuniti is present

### SedekahRawak/Randomizer Tests (8 test cases)

- **CF-025**: Verify the Sedekah Rawak Button is present and visible
- **CF-026**: Verify the Randomizer button functionality
- **CF-027**: Verify the Second Randomizer button functionality
- **CF-028**: Verify GetDoa Sections are Present
- **CF-029**: Verify Footer Sections are Present
- **CF-030**: Verify Footer Social Media column are Present and visible
- **CF-031**: Verify Footer Rujukan column are Present and visible
- **CF-032**: Verify Footer Project Komuniti section is present

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/TestSuite/homepage.spec.js
npx playwright test tests/TestSuite/Surau_detailpage.spec.js
npx playwright test tests/TestSuite/Lain_detailpage.spec.js
npx playwright test tests/TestSuite/SedekahRawak.spec.js
```

### View Test Reports

```bash
# Generate and open HTML report
npx playwright show-report
```

---

## File Structure

```
Playwright_Sedekahje/
├── helpers/                      (Page Object Model classes)
│   ├── homepage.js               (Helper functions)
│   ├── SurauCardDetail.js       (Helper functions)
│   ├── LainCardDetail.js        (Helper functions)
│   └── SedekahRawak.js          (Helper functions)
├── tests/
│   ├── TestSuite/
│   │   ├── homepage.spec.js         (Test specs)
│   │   ├── Surau_detailpage.spec.js (Test specs)
│   │   ├── Lain_detailpage.spec.js  (Test specs)
│   │   └── SedekahRawak.spec.js     (Test specs)
│   └── Test-Cases/
│       ├── README.md                (This file)
│       ├── homepage-tests.md
│       ├── Surau-Detail-Tests.md
│       └── lain-detail-tests.md     (Documentation pending)
```

---

## Test Case Naming Convention

Format: `CF-XXX | Feature | Description`

- **CF**: Component/Feature test
- **XXX**: Sequential number
- **Feature**: Page or component being tested
- **Description**: Brief description of test

---

## Test Case Template

When adding new test cases, use this template:

```markdown
## CF-XXX: [Test Case Title]

**Feature**: [Feature/Page Name]  
**Priority**: High/Medium/Low  
**Status**: Active/Draft/Deprecated  
**Test File**: `filename.spec.js`  
**Helper Functions**: `functionName()`

### Preconditions

- [List any setup requirements]

### Test Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Results

- [Expected outcome 1]
- [Expected outcome 2]

### Test Data

- Input: [test data]
- Expected: [expected data]

### Notes

- [Any additional information]
```

---

## Related Documentation

- [Homepage Tests](homepage-tests.md) - ✅ Available
- [Surau Detail Tests](Surau-Detail-Tests.md) - ✅ Available
- [Lain Detail Tests](lain-detail-tests.md) - 🚧 Pending
- SedekahRawak Tests - 🚧 Pending
- [Playwright Documentation](https://playwright.dev/)
- [Project Repository](https://github.com/khrnchn/sedekah-je)

### Documentation Status

- **Available**: Homepage and Surau Detail Page test documentation are complete
- **Pending**: Lain Detail Page and SedekahRawak test documentation need to be created

---

## How Contributing

When adding new test cases:

1. Create test case documentation first
2. Implement test in appropriate `.spec.js` file
3. Update this README with new test case
4. Submit PR with both code and documentation

---

## 📧 Contact

For questions about test cases, please create an issue in the repository.
