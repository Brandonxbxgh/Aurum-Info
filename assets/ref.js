/**
 * Aurum Referral System
 * Handles referral tracking, persistence, and dynamic CTA propagation
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'aurum_ref';
  const DEFAULT_SIGNUP_URL = 'https://backoffice.aurum.foundation/auth/sign-up';
  const REF_PARAM = 'ref';

  /**
   * Get referral URL from URL parameters or localStorage
   * If ref contains a full URL, it's stored and returned as-is
   */
  function getReferralUrl() {
    // First, check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get(REF_PARAM);
    
    if (urlRef && urlRef.trim()) {
      // Valid ref in URL, store it
      localStorage.setItem(STORAGE_KEY, urlRef.trim());
      return urlRef.trim();
    }
    
    // Check localStorage
    const storedRef = localStorage.getItem(STORAGE_KEY);
    if (storedRef && storedRef.trim()) {
      return storedRef.trim();
    }
    
    return null;
  }

  /**
   * Build signup URL - use referral URL directly if it's a full URL,
   * otherwise use the default signup URL
   */
  function buildSignupUrl(refUrl) {
    if (!refUrl) {
      return DEFAULT_SIGNUP_URL;
    }
    
    // Check if refUrl is a full URL (starts with http:// or https://)
    if (refUrl.startsWith('http://') || refUrl.startsWith('https://')) {
      return refUrl;
    }
    
    // If it's not a full URL, use default
    return DEFAULT_SIGNUP_URL;
  }

  /**
   * Get the current referral link for this user
   */
  function getMyReferralLink() {
    // This would typically come from user data, but for static site
    // we'll generate a placeholder that could be customized
    const baseUrl = window.location.origin + window.location.pathname;
    const userId = 'user-' + Math.random().toString(36).substr(2, 9);
    return baseUrl + '?' + REF_PARAM + '=' + userId;
  }

  /**
   * Copy text to clipboard
   */
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve();
      } catch (err) {
        document.body.removeChild(textarea);
        return Promise.reject(err);
      }
    }
  }

  /**
   * Initialize referral system on page load
   */
  function initReferralSystem() {
    const refUrl = getReferralUrl();
    const finalUrl = buildSignupUrl(refUrl);
    
    // Update all elements with data-ref-cta attribute
    document.querySelectorAll('[data-ref-cta]').forEach(element => {
      if (element.tagName === 'A') {
        element.href = finalUrl;
      } else if (element.tagName === 'BUTTON') {
        element.addEventListener('click', () => {
          window.location.href = finalUrl;
        });
      }
    });

    // Handle copy referral link buttons
    document.querySelectorAll('[data-copy-ref-link]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const refLink = getMyReferralLink();
        
        copyToClipboard(refLink).then(() => {
          // Show success feedback
          const originalText = button.textContent;
          button.textContent = '✓ Copied!';
          button.classList.add('copied');
          
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy:', err);
          alert('Failed to copy link. Please try again.');
        });
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReferralSystem);
  } else {
    initReferralSystem();
  }

  // Export API for programmatic access
  window.AurumReferral = {
    getReferralUrl,
    buildSignupUrl,
    getMyReferralLink,
    copyToClipboard,
    refresh: initReferralSystem
  };
})();
