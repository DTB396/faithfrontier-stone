/**
 * PREMIUM HEADER INTERACTIONS
 * 
 * Handles scroll-triggered animations and mobile navigation
 * Optimized for performance with requestAnimationFrame
 */

(function() {
  'use strict';

  // Configuration
  const SCROLL_THRESHOLD = 50;
  const SCROLL_CLASS = 'is-scrolled';
  
  // Elements
  const header = document.querySelector('.premium-header');
  const navToggle = document.querySelector('.premium-nav-toggle');
  const nav = document.querySelector('.premium-nav--mobile');
  const navClose = document.querySelector('.premium-nav__close');
  const navLinks = document.querySelectorAll('.premium-nav--mobile .premium-nav__link');
  
  // State
  let lastScroll = 0;
  let ticking = false;
  let navOverlay = null;

  /**
   * Handle scroll events with RAF optimization
   */
  function handleScroll() {
    lastScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderState(lastScroll);
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Update header state based on scroll position
   */
  function updateHeaderState(scrollPos) {
    if (!header) return;

    if (scrollPos > SCROLL_THRESHOLD) {
      header.classList.add(SCROLL_CLASS);
    } else {
      header.classList.remove(SCROLL_CLASS);
    }
  }

  /**
   * Create and append nav overlay
   */
  function createNavOverlay() {
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'premium-nav-overlay';
      navOverlay.setAttribute('aria-hidden', 'true');
      navOverlay.addEventListener('click', closeNav);
      document.body.appendChild(navOverlay);
    }
    return navOverlay;
  }

  /**
   * Open mobile navigation
   */
  function openNav() {
    if (!nav || !navToggle) return;

    const overlay = createNavOverlay();
    
    // Update ARIA states
    navToggle.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    
    // Add classes
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first link
    const firstLink = nav.querySelector('.premium-nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }

  /**
   * Close mobile navigation
   */
  function closeNav() {
    if (!nav || !navToggle) return;

    // Update ARIA states
    navToggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    
    // Remove classes
    nav.classList.remove('is-open');
    if (navOverlay) {
      navOverlay.classList.remove('is-visible');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle
    navToggle.focus();
  }

  /**
   * Toggle mobile navigation
   */
  function toggleNav() {
    if (!nav) return;
    
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  /**
   * Handle escape key to close nav
   */
  function handleEscape(event) {
    if (event.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      closeNav();
    }
  }

  /**
   * Close nav when clicking a link
   */
  function handleNavLinkClick() {
    if (window.innerWidth <= 1024) {
      closeNav();
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    if (window.innerWidth > 1024 && nav && nav.classList.contains('is-open')) {
      closeNav();
    }
  }

  /**
   * Initialize smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Close mobile nav if open
          if (nav && nav.classList.contains('is-open')) {
            closeNav();
          }
          
          // Calculate offset for fixed header
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, '', href);
          
          // Focus target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.removeAttribute('tabindex');
        }
      });
    });
  }

  /**
   * Add active state to current page link
   */
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Initialize all header functionality
   */
  function init() {
    // Initial header state
    updateHeaderState(window.pageYOffset || document.documentElement.scrollTop);
    
    // Scroll handling
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mobile nav toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }
    
    // Mobile nav close button
    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }
    
    // Nav link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
    
    // Escape key handling
    document.addEventListener('keydown', handleEscape);
    
    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Highlight current page
    highlightCurrentPage();
    
    // Add loaded class for animations
    setTimeout(() => {
      if (header) {
        header.classList.add('is-loaded');
      }
    }, 100);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (navOverlay && navOverlay.parentNode) {
      navOverlay.parentNode.removeChild(navOverlay);
    }
  });

})();
