import { HomePage } from './homepage.js';

/**
 * Standardized test setup with cache clearing
 * Use this function in beforeEach hooks for consistent test preparation
 */
export async function setupTestSession(page, browserName) {
  const homePage = new HomePage(page);
  
  // Always start by clearing cache for clean test environment
  console.log(`🧹 Clearing cache for ${browserName} browser...`);
  await homePage.resetBrowserState();
  
  // Verify cache clearing was successful
  const cacheWasCleared = await homePage.verifyCacheCleared();
  if (cacheWasCleared) {
    console.log(`✅ Cache successfully cleared for ${browserName}`);
  } else {
    console.warn(`⚠️  Storage may not be completely cleared for ${browserName}`);
  }
  
  // Navigate to the base URL and handle popups
  try {
    await homePage.navigate();
    await homePage.verifyAndCloseModal();
  } catch (error) {
    if (browserName === 'firefox' && 
        (error.message.includes('NS_ERROR_UNKNOWN_HOST') || error.message.includes('Network'))) {
      console.log(`🔧 Firefox network issue, retrying with fresh cache...`);
      
      // Clear cache again and retry
      await homePage.clearBrowserCache();
      await page.waitForTimeout(2000);
      
      await homePage.navigate();
      await homePage.verifyAndCloseModal();
    } else {
      throw error;
    }
  }
  
  return homePage;
}

/**
 * Quick cache clearing function for specific scenarios
 */
export async function clearBrowserData(page) {
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    
    // Clear any persistent flags or cached data
    const storageKeys = ['temp-flag', 'cache-version', 'session-check'];
    storageKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  });
  
  // Clear cookies
  await page.evaluate(() => {
    const cookies = document.cookie.split('"');
    for (let i = 0; i < cookies.length; i++) {
      const name = cookies[i].split("=")[0].trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  });
  
  console.log('🗑️  Browser data cleared');
}