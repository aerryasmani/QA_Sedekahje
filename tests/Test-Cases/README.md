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
| Homepage          | CF-002 to CF-008 (7 tests) | ✅ Active      | [homepage-tests.md](homepage-tests.md)         |
| Surau Detail Page | CF-011 to CF-017 (7 tests) | ✅ Active      | [surau-detail-tests.md](surau-detail-tests.md) |
| Lain Detail Page  | CF-01 (1 test)             | 🚧 In Progress | [lain-detail-tests.md](lain-detail-tests.md)   |
| **Total**         | **15 tests**               |                |                                                |

---

## Test Cases by Feature

### Homepage Tests (7 test cases)

- **CF-002**: Title displays correctly on page load
- **CF-003**: Logo displays correctly on page load
- **CF-004**: Mode toggle displays correctly on page load
- **CF-005**: Institution buttons display and function correctly
- **CF-006**: Dropdown displays correctly on page load
- **CF-007**: Searchbar displays correctly on page load
- **CF-008**: Surau button displays and works correctly

### Surau Detail Page Tests (7 test cases)

- **CF-011**: Card detail page is present
- **CF-012**: Peta button is present and visible
- **CF-013**: Doa section is present
- **CF-014**: Footer section is present
- **CF-015**: Footer social media is present
- **CF-016**: Footer Rujukan links are present
- **CF-017**: Footer Project Komuniti links are present

### Lain Detail Page Tests (1 test case)

- **CF-01**: Title displays correctly on page load

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
npx playwright test homepage.spec.js
```

### View Test Reports

```bash
# Generate and open HTML report
npx playwright show-report
```

---

## File Structure

```
tests/
├── TestSuite/
│   ├── homepage.js              (Helper functions)
│   ├── SurauCardDetail.js       (Helper functions)
│   ├── LainCardDetail.js        (Helper functions)
│   ├── homepage.spec.js         (Test specs)
│   ├── Surau_detailpage.spec.js (Test specs)
│   └── Lain_detailpage.spec.js  (Test specs)
└── test-cases/
    ├── README.md                (This file)
    ├── homepage-tests.md
    ├── surau-detail-tests.md
    ├── lain-detail-tests.md
    └── test-execution-guide.md
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

- [Test Execution Guide](test-execution-guide.md)
- [Playwright Documentation](https://playwright.dev/)
- [Project Repository](https://github.com/khrnchn/sedekah-je)

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
