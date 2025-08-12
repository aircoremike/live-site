document.addEventListener('DOMContentLoaded', function() {
  // Navbar and mobile menu logic, now as a function for re-initialization after navbar injection
  window.initNavbarScripts = function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('open');
      });
    }

    // Active link underline for nav links
    function setActiveNavLink(link) {
      document.querySelectorAll('.nav-links li a, .mobile-nav li a').forEach(a => {
        a.classList.remove('active-link');
      });
      if (link) link.classList.add('active-link');
    }

    // Set active link on page load based on URL only
    function setActiveLinkByUrl() {
      const path = window.location.pathname;
      const isHome = path === '/' || path.endsWith('/index.html');
      let found = false;
      document.querySelectorAll('.nav-links li a, .mobile-nav li a').forEach(link => {
        const href = link.getAttribute('href');
        // For Home, match href="#", href="index.html", or href="/"
        if (
          (isHome && (href === '#' || href === 'index.html' || href === '/' || href === './' || href === './index.html')) ||
          (!isHome && href && (href === path.split('/').pop() || href === '#' + path.split('/').pop().replace('.html', '')))
        ) {
          link.classList.add('active-link');
          found = true;
        } else {
          link.classList.remove('active-link');
        }
      });
      // If no match, default to first nav link
      if (!found) {
        const first = document.querySelector('.nav-links li a, .mobile-nav li a');
        if (first) first.classList.add('active-link');
      }
    }
    setActiveLinkByUrl();

    // Shrinking navbar on scroll (desktop/landscape tablet only)
    const navbar = document.querySelector('.navbar');
    const logoImg = document.querySelector('.logo img');
    const mainContent = document.querySelector('.main-content');
    let hasShrunk = false;
    let lastScrollY = 0;

    // Helper: Only enable on desktop/landscape tablet
    function isDesktopOrLandscapeTablet() {
      return window.matchMedia('(min-width: 769px), (min-width: 1025px) and (orientation: landscape)').matches;
    }

    function handleNavbarShrink() {
      if (!navbar || !isDesktopOrLandscapeTablet()) {
        // Remove shrink if resizing to mobile/tablet portrait or if navbar doesn't exist
        if (navbar) navbar.classList.remove('navbar-shrink');
        document.body.classList.remove('navbar-shrink');
        if (mainContent) mainContent.classList.remove('navbar-shrink');
        hasShrunk = false;
        return;
      }
      if (window.scrollY > 10 && !hasShrunk) {
        navbar.classList.add('navbar-shrink');
        document.body.classList.add('navbar-shrink');
        if (mainContent) mainContent.classList.add('navbar-shrink');
        hasShrunk = true;
      } else if (window.scrollY <= 10 && hasShrunk) {
        navbar.classList.remove('navbar-shrink');
        document.body.classList.remove('navbar-shrink');
        if (mainContent) mainContent.classList.remove('navbar-shrink');
        hasShrunk = false;
      }
    }

    // Listen for scroll and resize
    window.addEventListener('scroll', handleNavbarShrink);
    window.addEventListener('resize', handleNavbarShrink);
    // Initial check
    handleNavbarShrink();

    // Smooth scroll to anchor with navbar offset
    function getNavbarHeight() {
      var navbar = document.querySelector('.navbar');
      if (!navbar) return 0;
      var styles = window.getComputedStyle(navbar);
      return navbar.offsetHeight + parseInt(styles.marginTop || 0) + parseInt(styles.marginBottom || 0);
    }
    function scrollToHash(hash) {
      var el = document.getElementById(hash.replace('#', ''));
      if (!el) return;
      var navbarHeight = getNavbarHeight();
      var rect = el.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var top = rect.top + scrollTop - navbarHeight - 8; // 8px extra spacing
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      var hash = link.getAttribute('href');
      if (hash && hash.length > 1 && document.getElementById(hash.replace('#', ''))) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToHash(hash);
          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        });
      }
    });

    // Logo click always goes home
    var logoLink = document.querySelector('.logo a');
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  };

  // Initial call to navbar scripts
  window.initNavbarScripts();
});

// Fade-in on scroll for .section-fade, but only after hero image loads
(function() {
  function onEntry(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-fade-visible');
        observer.unobserve(entry.target);
      }
    });
  }
  function enableSectionFade() {
    var observer = new window.IntersectionObserver(onEntry, {
      threshold: 0.15
    });
    document.querySelectorAll('.section-fade').forEach(function(el) {
      observer.observe(el);
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener('load', enableSectionFade);
    } else {
      enableSectionFade();
    }
  });
})();

// Smooth scroll to anchor with navbar offset
(function() {
  function getNavbarHeight() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return 0;
    var styles = window.getComputedStyle(navbar);
    return navbar.offsetHeight + parseInt(styles.marginTop || 0) + parseInt(styles.marginBottom || 0);
  }
  function scrollToHash(hash) {
    var el = document.getElementById(hash.replace('#', ''));
    if (!el) return;
    var navbarHeight = getNavbarHeight();
    var rect = el.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect.top + scrollTop - navbarHeight - 8; // 8px extra spacing
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      var hash = link.getAttribute('href');
      if (hash && hash.length > 1 && document.getElementById(hash.replace('#', ''))) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToHash(hash);
          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        });
      }
    });
    
  });
})();

// Global: Always navigate to index.html when clicking the logo in the navbar
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var logoLink = document.querySelector('.logo a');
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  });
})();

// Carousel functionality - Pixel-perfect rewrite
(function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const arrowLeft = document.getElementById('carouselArrowLeft');
  const arrowRight = document.getElementById('carouselArrowRight');
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Check if mobile/tablet portrait
  function isMobile() {
    return window.innerWidth <= 700 || 
           (window.innerWidth <= 1024 && window.matchMedia('(orientation: portrait)').matches);
  }
  
  // Get precise measurements from the DOM
  function getSlideMetrics() {
    if (slides.length === 0) return null;
    
    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;
    
    // Get actual gap from computed styles
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap || trackStyle.columnGap || '0');
    
    console.log('CSS gap from computed style:', trackStyle.gap, 'parsed:', gap);
    
    // For mobile, use viewport width as container (slides should overflow)
    // For desktop, use the actual carousel container width
    let containerWidth;
    if (isMobile()) {
      containerWidth = window.innerWidth; // Mobile: slides overflow viewport
    } else {
      containerWidth = track.parentElement.getBoundingClientRect().width; // Desktop: contained
    }
    
    return {
      slideWidth,
      gap,
      containerWidth,
      slideWithGap: slideWidth + gap
    };
  }
  
  // Calculate exact pixel position for a slide
  function calculatePosition(index) {
    const metrics = getSlideMetrics();
    if (!metrics) return 0;
    
    // Position to center the slide at index
    const slideOffset = index * metrics.slideWithGap;
    const centerOffset = (metrics.containerWidth - metrics.slideWidth) / 2;
    const finalPosition = centerOffset - slideOffset;
    
    console.log(`Calculate position for slide ${index}:`, {
      slideWidth: metrics.slideWidth,
      gap: metrics.gap,
      containerWidth: metrics.containerWidth,
      slideWithGap: metrics.slideWithGap,
      slideOffset: slideOffset,
      centerOffset: centerOffset,
      finalPosition: finalPosition
    });
    
    return finalPosition;
  }
  
  // Move to specific slide
  function goToSlide(index) {
    // Clamp index to valid range
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    // Calculate exact pixel position
    const position = calculatePosition(currentIndex);
    console.log(`Going to slide ${currentIndex}, position: ${position}px`);
    
    track.style.transform = `translateX(${position}px)`;
    
    updateArrows();
  }
  
  // Update arrow states
  function updateArrows() {
    if (arrowLeft) arrowLeft.disabled = currentIndex === 0;
    if (arrowRight) arrowRight.disabled = currentIndex === totalSlides - 1;
  }
  
  // Navigation functions
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }
  
  // Arrow click handlers
  if (arrowLeft) {
    arrowLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }
  
  if (arrowRight) {
    arrowRight.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }
  
  // Touch/swipe and mouse drag handling
  const carouselContainer = track.parentElement.parentElement;
  let isInteracting = false;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  function handleStart(e) {
    if (e.touches && e.touches.length > 1) return; // Multi-touch
    
    isInteracting = true;
    isDragging = false;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    currentX = startX;
  }
  
  function handleMove(e) {
    if (!isInteracting) return;
    if (e.touches && e.touches.length > 1) return;
    
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = Math.abs(currentX - startX);
    
    // Mark as dragging if moved enough
    if (deltaX > 5) {
      isDragging = true;
    }
    
    // Prevent scrolling on touch devices during horizontal swipe
    if (e.touches && deltaX > 10) {
      e.preventDefault();
    }
  }
  
  function handleEnd(e) {
    if (!isInteracting) return;
    
    const deltaX = currentX - startX;
    const threshold = 50; // Minimum swipe distance
    
    if (isDragging && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide(); // Swipe right = previous
      } else {
        nextSlide(); // Swipe left = next
      }
    }
    
    isInteracting = false;
    isDragging = false;
    startX = 0;
    currentX = 0;
  }
  
  // Desktop click navigation (left/right sides)
  function handleClick(e) {
    // Don't navigate if we were dragging or on a touch device
    if (isDragging || isTouchDevice()) return;
    
    // Don't navigate if clicking on interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    const rect = carouselContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isLeftHalf = clickX < rect.width / 2;
    
    if (isLeftHalf) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
  
  // Event listeners
  carouselContainer.addEventListener('mousedown', handleStart);
  carouselContainer.addEventListener('mousemove', handleMove);
  carouselContainer.addEventListener('mouseup', handleEnd);
  carouselContainer.addEventListener('mouseleave', handleEnd);
  carouselContainer.addEventListener('touchstart', handleStart, { passive: false });
  carouselContainer.addEventListener('touchmove', handleMove, { passive: false });
  carouselContainer.addEventListener('touchend', handleEnd);
  carouselContainer.addEventListener('click', handleClick);
  
  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate position for current slide with new dimensions
      // Wait for layout to settle after resize
      requestAnimationFrame(() => {
        goToSlide(currentIndex);
      });
    }, 100);
  });
  
  // Initialize
  function init() {
    currentIndex = 0;
    console.log('Carousel init - Mobile:', isMobile(), 'Window width:', window.innerWidth);
    console.log('Track initial transform:', track.style.transform);
    
    // Ensure layout is ready before positioning
    requestAnimationFrame(() => {
      // Double-check that we have proper measurements
      const metrics = getSlideMetrics();
      console.log('Init metrics:', metrics);
      
      if (metrics && metrics.slideWidth > 0) {
        goToSlide(0);
      } else {
        // If measurements aren't ready, try again shortly
        setTimeout(() => {
          console.log('Retrying init with metrics:', getSlideMetrics());
          goToSlide(0);
        }, 100);
      }
    });
  }
  
  // Start after DOM is ready and styles are applied
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Give extra time for CSS to load and apply
    setTimeout(init, 100);
  }
})();

// Modal System - HTML-based modals
(function() {
  let currentModal = null;
  let handleCloseButtonPosition = null; // Store reference for cleanup
  let stickyCloseButton = null; // Store reference for cleanup
  
  function findModalElement(materialType) {
    // Map material types to modal IDs
    const modalMap = {
      'stainless': 'stainless-modal',
      'hccr': 'hccr-modal', 
      'titanium': 'titanium-modal',
      'copper': 'copper-modal',
      'nickel': 'nickel-modal',
      'tungsten': 'tungsten-modal'
    };
    
    const modalId = modalMap[materialType];
    return modalId ? document.getElementById(modalId) : null;
  }

  function createCloseButton() {
    // Create the close button container
    const closeContainer = document.createElement('div');
    closeContainer.className = 'modal-close-container';
    closeContainer.innerHTML = `
      <button class="modal-close" aria-label="Close modal">
        <svg width="50" height="50" viewBox="-12 -12 56 56" fill="none">
          <path d="M35 -3L-3 35M-3 -3L35 35" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
        </svg>
      </button>
    `;
    
    return closeContainer;
  }

  function openModal(materialType) {
    if (currentModal) closeModal();
    
    const modal = findModalElement(materialType);
    
    if (!modal) {
      console.warn(`Modal not found for material: ${materialType}`);
      return;
    }

    // Remove any existing close button container
    const existingCloseContainer = document.querySelector('.modal-close-container');
    if (existingCloseContainer) {
      existingCloseContainer.remove();
    }

    // Create and add close button container
    const closeContainer = createCloseButton();
    document.body.appendChild(closeContainer);
    
    // Add click handler to close button
    const closeButton = closeContainer.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    
    currentModal = modal;
    
    // Calculate scrollbar width to prevent horizontal shifting
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply styles to prevent scrolling and shifting
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Also apply scrollbar compensation to navbar to prevent it from shifting
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Function to handle sticky close button behavior on mobile
    handleCloseButtonPosition = function() {
      if (!closeContainer || window.innerWidth > 768) {
        // Desktop - keep original fixed positioning
        if (stickyCloseButton) {
          stickyCloseButton.remove();
          stickyCloseButton = null;
          closeContainer.style.display = '';
        }
        return;
      }
      
      const modalContainer = modal.querySelector('.modal-container');
      const modalContent = modal.querySelector('.modal-content');
      const materialInfo = modalContainer.querySelector('.material-info');
      if (!modalContainer || !modalContent || !materialInfo) return;
      
      // Hide the original fixed close button
      closeContainer.style.display = 'none';
      
      // Create or update sticky close button within modal container
      if (!stickyCloseButton) {
        stickyCloseButton = document.createElement('div');
        stickyCloseButton.className = 'modal-close-sticky';
        stickyCloseButton.innerHTML = `
          <button class="modal-close" aria-label="Close modal">
            <svg width="50" height="50" viewBox="-12 -12 56 56" fill="none">
              <path d="M35 -3L-3 35M-3 -3L35 35" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
            </svg>
          </button>
        `;
        
        // Style the sticky container
        stickyCloseButton.style.cssText = `
          position: sticky;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1010;
          pointer-events: none;
          height: 0;
          width: 0;
        `;
        
        // Style the button inside to match original but allow CSS animations
        const stickyButton = stickyCloseButton.querySelector('.modal-close');
        stickyButton.style.cssText = `
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%) scale(0);
          background: rgba(45, 45, 47, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 8px solid transparent;
          color: #f5f5f7;
          cursor: pointer;
          padding: 13.6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1),
                      opacity 0.75s cubic-bezier(0.2, 0.8, 0.2, 1),
                      background-color 0.2s ease;
          will-change: transform, opacity;
        `;
        
        // Add click handler
        stickyButton.addEventListener('click', closeModal);
        
        // Add to modal-content after material-info so it appears in the padded area below
        modalContent.appendChild(stickyCloseButton);
        
        // Add visible class to trigger animation if the main close button is also visible
        const originalCloseContainer = document.querySelector('.modal-close-container');
        if (originalCloseContainer && originalCloseContainer.classList.contains('visible')) {
          stickyCloseButton.classList.add('visible');
        }
      } else {
        // Update visibility state to match main close button
        const originalCloseContainer = document.querySelector('.modal-close-container');
        if (originalCloseContainer && originalCloseContainer.classList.contains('visible')) {
          stickyCloseButton.classList.add('visible');
        } else {
          stickyCloseButton.classList.remove('visible');
        }
      }
    };

    // Set up sticky close button (mobile only)
    handleCloseButtonPosition();

    // Add resize listener to handle orientation changes
    window.addEventListener('resize', handleCloseButtonPosition);
    
    // Wait for all images to load before animating
    const images = modal.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    function checkAllImagesLoaded() {
      loadedImages++;
      if (loadedImages === totalImages) {
        // All images loaded, now animate in
        requestAnimationFrame(() => {
          modal.classList.add('modal-opening');
          // Delay close button entrance by 500ms
          setTimeout(() => {
            closeContainer.classList.add('visible');
            // Set initial close button position after it becomes visible
            setTimeout(handleCloseButtonPosition, 50);
          }, 500);
          // After a brief moment, transition to visible state
          setTimeout(() => {
            modal.classList.remove('modal-opening');
            modal.classList.add('modal-visible');
          }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
        });
      }
    }
    
    if (totalImages === 0) {
      // No images to load, animate immediately
      requestAnimationFrame(() => {
        modal.classList.add('modal-opening');
        // Delay close button entrance by 500ms
        setTimeout(() => {
          closeContainer.classList.add('visible');
          // Set initial close button position after it becomes visible
          setTimeout(handleCloseButtonPosition, 50);
        }, 500);
        // After a brief moment, transition to visible state
        setTimeout(() => {
          modal.classList.remove('modal-opening');
          modal.classList.add('modal-visible');
        }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
      });
    } else {
      // Set up image loading listeners
      images.forEach(img => {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.addEventListener('load', checkAllImagesLoaded);
          img.addEventListener('error', checkAllImagesLoaded); // Count errors as "loaded" to prevent hanging
        }
      });
    }
    
    // Close handlers
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Prevent scroll propagation to background
    modal.addEventListener('scroll', (e) => {
      e.stopPropagation();
    });
    
    // Prevent wheel events from affecting background when modal scroll reaches limits
    modal.addEventListener('wheel', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Also prevent touchmove events on mobile
    modal.addEventListener('touchmove', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.touches[0].clientY > e.touches[0].startY) || 
          (isAtBottom && e.touches[0].clientY < e.touches[0].startY)) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  function closeModal() {
    if (!currentModal) return;
    
    // Start closing animation
    currentModal.classList.remove('modal-visible');
    currentModal.classList.add('modal-closing');
    
    // Also animate close button out
    const closeContainer = document.querySelector('.modal-close-container');
    if (closeContainer) {
      closeContainer.classList.remove('visible');
      closeContainer.classList.add('closing');
    }
    
    // Clean up event listeners and sticky button
    if (handleCloseButtonPosition) {
      window.removeEventListener('resize', handleCloseButtonPosition);
      
      // Clean up sticky button if it exists
      if (stickyCloseButton) {
        stickyCloseButton.remove();
        stickyCloseButton = null;
      }
      
      handleCloseButtonPosition = null;
    }
    
    // Wait for animation to complete before restoring scrollbar
    setTimeout(() => {
      // Remove modal-open classes and inline styles
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      
      // Remove scrollbar compensation from navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
      
      // Reset modal state instead of removing it
      if (currentModal) {
        currentModal.classList.remove('modal-opening', 'modal-visible', 'modal-closing');
        // Reset scroll position to top for next opening
        currentModal.scrollTop = 0;
      }
      
      // Remove close button container
      const closeContainer = document.querySelector('.modal-close-container');
      if (closeContainer && closeContainer.parentElement) {
        closeContainer.parentElement.removeChild(closeContainer);
      }
      
      currentModal = null;
    }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--modal-close-duration')) * 1000);
  }

  // Keyboard support with natural key repeat behavior
  let keyHoldState = {
    ArrowUp: { isHolding: false, timeout: null },
    ArrowDown: { isHolding: false, timeout: null }
  };
  
  document.addEventListener('keydown', (e) => {
    if (!currentModal) return;
    
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    
    // Enable keyboard scrolling when modal is open
    const initialScrollAmount = 40; // Initial smaller scroll
    const repeatScrollAmount = 20; // Smaller, smoother continuous scroll
    const pageScrollAmount = currentModal.clientHeight * 0.8; // 80% of modal height for page scrolling
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (!keyHoldState.ArrowUp.isHolding) {
          // First keypress - initial scroll
          currentModal.scrollBy({ top: -initialScrollAmount, behavior: 'smooth' });
          keyHoldState.ArrowUp.isHolding = true;
          
          // Start continuous scrolling after brief delay (simulating key repeat delay)
          keyHoldState.ArrowUp.timeout = setTimeout(() => {
            const continuousScroll = () => {
              if (keyHoldState.ArrowUp.isHolding) {
                currentModal.scrollBy({ top: -repeatScrollAmount, behavior: 'auto' });
                requestAnimationFrame(continuousScroll);
              }
            };
            continuousScroll();
          }, 400); // 400ms delay before repeat starts
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (!keyHoldState.ArrowDown.isHolding) {
          // First keypress - initial scroll
          currentModal.scrollBy({ top: initialScrollAmount, behavior: 'smooth' });
          keyHoldState.ArrowDown.isHolding = true;
          
          // Start continuous scrolling after brief delay
          keyHoldState.ArrowDown.timeout = setTimeout(() => {
            const continuousScroll = () => {
              if (keyHoldState.ArrowDown.isHolding) {
                currentModal.scrollBy({ top: repeatScrollAmount, behavior: 'auto' });
                requestAnimationFrame(continuousScroll);
              }
            };
            continuousScroll();
          }, 400); // 400ms delay before repeat starts
        }
        break;
        
      case 'PageUp':
        e.preventDefault();
        currentModal.scrollBy({ top: -pageScrollAmount, behavior: 'smooth' });
        break;
      case 'PageDown':
        e.preventDefault();
        currentModal.scrollBy({ top: pageScrollAmount, behavior: 'smooth' });
        break;
      case 'Home':
        e.preventDefault();
        currentModal.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'End':
        e.preventDefault();
        currentModal.scrollTo({ top: currentModal.scrollHeight, behavior: 'smooth' });
        break;
      case ' ': // Spacebar
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + Space = scroll up one page
          currentModal.scrollBy({ top: -pageScrollAmount, behavior: 'smooth' });
        } else {
          // Space = scroll down one page
          currentModal.scrollBy({ top: pageScrollAmount, behavior: 'smooth' });
        }
        break;
    }
  });
  
  // Handle key release to stop continuous scrolling
  document.addEventListener('keyup', (e) => {
    if (!currentModal) return;
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const state = keyHoldState[e.key];
      if (state) {
        state.isHolding = false;
        if (state.timeout) {
          clearTimeout(state.timeout);
          state.timeout = null;
        }
      }
    }
  });

  // Initialize modal functionality - called after modals are loaded
  window.initMaterialModals = function() {
    // Add click handlers to all learn more buttons
    document.querySelectorAll('.learn-more-btn[data-material]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const material = button.getAttribute('data-material');
        openModal(material);
      });
    });
  };

  // Global function to open modals (maintain backward compatibility)
  window.openMaterialModal = openModal;
})();

// Utility function for touch device detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Loading sequence for homepage
function initializeLoadingSequence() {
  const heroImg = document.querySelector('.hero-img');
  const heroTitle = document.querySelector('.hero-flex h1');
  const bodyContent = document.querySelector('.body-rows-flex');

  // Only run on homepage where these elements exist
  if (!heroImg || !heroTitle || !bodyContent) {
    return;
  }

  // Reset opacity for hero image
  heroImg.style.opacity = '0';
  
  // Function to start the sequence
  function startSequence() {
    // Fade in hero image
    heroImg.style.transition = 'opacity 1s ease-out';
    heroImg.style.opacity = '1';

    // After hero image loads and 1 second passes, show the title
    setTimeout(() => {
      heroTitle.classList.remove('hidden');
      heroTitle.classList.add('fade-in');
      
      // After title fades in and 1 second passes, show the body content
      setTimeout(() => {
        bodyContent.classList.remove('hidden');
        bodyContent.classList.add('fade-in');
      }, 1000);
    }, 1000);
  }

  // Wait for hero image to load before starting sequence
  if (heroImg.complete) {
    startSequence();
  } else {
    heroImg.onload = startSequence;
  }
}

// Initialize loading sequence when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLoadingSequence);

