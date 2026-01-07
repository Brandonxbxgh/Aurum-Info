/**
 * Referral Logic for Aurum Funnel
 * Handles URL-based referral tracking using localStorage
 */

const AurumReferral = {
  STORAGE_KEY: 'aurum_referral',
  DEFAULT_LINK: 'https://example.com/default',
  
  /**
   * Initialize referral tracking on page load
   */
  init() {
    // Check for ref parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    
    if (refParam) {
      this.setReferral(refParam);
    }
    
    // Update all CTA buttons on the page
    this.updateCTAButtons();
  },
  
  /**
   * Set referral code in localStorage
   * @param {string} referralCode - The referral code to store
   */
  setReferral(referralCode) {
    if (referralCode && referralCode.trim()) {
      localStorage.setItem(this.STORAGE_KEY, referralCode.trim());
      return true;
    }
    return false;
  },
  
  /**
   * Get current referral code from localStorage
   * @returns {string|null} The stored referral code or null
   */
  getReferral() {
    return localStorage.getItem(this.STORAGE_KEY);
  },
  
  /**
   * Clear referral code from localStorage
   */
  clearReferral() {
    localStorage.removeItem(this.STORAGE_KEY);
  },
  
  /**
   * Get the full referral link based on stored referral code
   * @returns {string} The complete referral link or default link
   */
  getReferralLink() {
    const ref = this.getReferral();
    if (ref) {
      return `https://example.com/signup?ref=${encodeURIComponent(ref)}`;
    }
    return this.DEFAULT_LINK;
  },
  
  /**
   * Update all CTA buttons on the page with current referral link
   */
  updateCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, [data-cta]');
    const referralLink = this.getReferralLink();
    
    ctaButtons.forEach(button => {
      button.href = referralLink;
    });
  },
  
  /**
   * Copy referral link to clipboard
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  async copyReferralLink() {
    const link = this.getReferralLink();
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  },
  
  /**
   * Generate shareable link for current page with referral
   * @param {string} pagePath - Optional page path (defaults to current page)
   * @returns {string} Full URL with referral parameter
   */
  getShareableLink(pagePath = window.location.pathname) {
    const ref = this.getReferral();
    const baseUrl = window.location.origin;
    
    if (ref) {
      return `${baseUrl}${pagePath}?ref=${encodeURIComponent(ref)}`;
    }
    return `${baseUrl}${pagePath}`;
  }
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AurumReferral.init());
} else {
  AurumReferral.init();
}

// Expose globally for use in other scripts
window.AurumReferral = AurumReferral;
