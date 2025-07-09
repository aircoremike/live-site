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
      if (!isDesktopOrLandscapeTablet()) {
        // Remove shrink if resizing to mobile/tablet portrait
        navbar.classList.remove('navbar-shrink');
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

// Carousel functionality
(function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const arrowLeft = document.getElementById('carouselArrowLeft');
  const arrowRight = document.getElementById('carouselArrowRight');
  let current = 0;
  const slideCount = slides.length;

  function goToSlide(idx) {
    current = idx;
    // Responsive centering logic
    if (
      window.innerWidth <= 700 ||
      (window.innerWidth <= 1024 && window.matchMedia('(orientation: portrait)').matches)
    ) {
      // Mobile & tablet portrait: slide is 84vw, margin 2vw each side, so total 88vw
      const slideWidth = 84; // vw
      const slideMargin = 2; // vw
      const totalSlide = slideWidth + 2 * slideMargin; // 88vw
      const offset = (100 - slideWidth) / 2; // 8vw
      const translate = offset - current * totalSlide;
      track.style.transform = `translateX(${translate}vw)`;
    } else {
      // Desktop: fallback to old logic
      track.style.transform = `translateX(-${100 * current}%)`;
    }
    updateArrows();
  }

  function updateArrows() {
    if (!arrowLeft || !arrowRight) return;
    arrowLeft.disabled = current === 0;
    arrowRight.disabled = current === slideCount - 1;
  }

  if (arrowLeft && arrowRight) {
    arrowLeft.addEventListener('click', function(e) {
      e.stopPropagation();
      if (current > 0) goToSlide(current - 1);
    });
    arrowRight.addEventListener('click', function(e) {
      e.stopPropagation();
      if (current < slideCount - 1) goToSlide(current + 1);
    });
  }

  // Touch/click navigation
  let startX = null;
  let endX = null;
  let dragging = false;
  let isTouch = false;

  // Use the carousel container for touch events
  const carouselContainer = track.parentElement.parentElement;

  function onTouchStart(e) {
    if (e.touches && e.touches.length > 1) return; // Only single-finger
    dragging = true;
    isTouch = !!e.touches;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    endX = startX;
  }
  function onTouchMove(e) {
    if (!dragging) return;
    if (e.touches && e.touches.length > 1) return;
    endX = e.touches ? e.touches[0].clientX : e.clientX;
    // Prevent vertical scroll if horizontal swipe is detected
    if (isTouch && Math.abs(endX - startX) > 10) {
      e.preventDefault();
    }
  }
  function onTouchEnd(e) {
    if (!dragging || startX === null || endX === null) return;
    const dx = endX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && current < slideCount - 1) goToSlide(current + 1);
      else if (dx > 0 && current > 0) goToSlide(current - 1);
    }
    dragging = false;
    startX = null;
    endX = null;
    isTouch = false;
  }

  // Click for desktop: advance to next slide
  function onClick() {
    if (isTouchDevice()) return;
    goToSlide((current + 1) % slideCount);
  }

  // Remove old listeners from track
  track.removeEventListener('mousedown', onTouchStart);
  track.removeEventListener('mousemove', onTouchMove);
  track.removeEventListener('mouseup', onTouchEnd);
  track.removeEventListener('mouseleave', onTouchEnd);
  track.removeEventListener('touchstart', onTouchStart);
  track.removeEventListener('touchmove', onTouchMove);
  track.removeEventListener('touchend', onTouchEnd);
  track.removeEventListener('click', onClick);

  // Add listeners to carousel container
  carouselContainer.addEventListener('mousedown', onTouchStart);
  carouselContainer.addEventListener('mousemove', onTouchMove);
  carouselContainer.addEventListener('mouseup', onTouchEnd);
  carouselContainer.addEventListener('mouseleave', onTouchEnd);
  carouselContainer.addEventListener('touchstart', onTouchStart, { passive: false });
  carouselContainer.addEventListener('touchmove', onTouchMove, { passive: false });
  carouselContainer.addEventListener('touchend', onTouchEnd);
  carouselContainer.addEventListener('click', onClick);

  // Init
  goToSlide(0);
})();

