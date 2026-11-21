/**
* Template Name: Day
* Template URL: https://bootstrapmade.com/day-multipurpose-html-template-for-free/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    scrollY > 30 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled, { passive: true });
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button visibility toggle
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      let config = JSON.parse(configEl.innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });

    if (typeof glightbox !== 'undefined' && glightbox && typeof glightbox.reload === 'function') {
      glightbox.reload();
    }
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = (typeof GLightbox !== 'undefined') ? GLightbox({
    selector: '.glightbox'
  }) : null;

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    const scrollPos = (window.pageYOffset || document.documentElement.scrollTop || 0) + 200;
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      if (scrollPos >= section.offsetTop && scrollPos <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy, { passive: true });

  /**
   * -------------------------------------------------------------
   * Glowing Top Reading Progress Bar
   * -------------------------------------------------------------
   */
  function initScrollProgressBar() {
    let bar = document.querySelector('.scroll-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'scroll-progress-bar';
      document.body.prepend(bar);
    }
  }

  function updateScrollProgress() {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      bar.style.width = '0%';
      return;
    }
    const pct = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
    bar.style.width = pct.toFixed(2) + '%';
  }

  initScrollProgressBar();

  /**
   * -------------------------------------------------------------
   * Ultra-Smooth Momentum Scrolling Engine (Butter-Smooth 60/120fps)
   * -------------------------------------------------------------
   */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia('(pointer: coarse)').matches);

  let targetScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  let currentScrollY = targetScrollY;
  let isScrolling = false;
  let scrollRafId = null;

  function getMaxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function smoothScrollStep() {
    if (!isScrolling) return;

    // Exponential lerp easing (0.082 provides an ultra-luxurious, smooth gliding feel)
    const ease = 0.082;
    currentScrollY += (targetScrollY - currentScrollY) * ease;

    // Snap and complete when within subpixel tolerance
    if (Math.abs(targetScrollY - currentScrollY) < 0.45) {
      currentScrollY = targetScrollY;
      window.scrollTo(0, currentScrollY);
      isScrolling = false;
      updateScrollProgress();
      updateParallax();
      toggleScrolled();
      toggleScrollTop();
      navmenuScrollspy();
      return;
    }

    window.scrollTo(0, currentScrollY);
    updateScrollProgress();
    updateParallax();
    toggleScrolled();
    toggleScrollTop();
    navmenuScrollspy();

    scrollRafId = requestAnimationFrame(smoothScrollStep);
  }

  function startSmoothScroll() {
    if (!isScrolling) {
      isScrolling = true;
      scrollRafId = requestAnimationFrame(smoothScrollStep);
    }
  }

  // Globally exposed smooth scroll function (used by anchor links and buttons)
  window.smoothScrollTo = function (destY) {
    const maxScroll = getMaxScroll();
    targetScrollY = Math.max(0, Math.min(maxScroll, destY));
    startSmoothScroll();
  };

  // Only intercept mouse wheel on desktop non-touch devices with fine pointer
  if (!isTouchDevice && !prefersReducedMotion) {
    window.addEventListener('wheel', function (e) {
      // Allow scrolling inside overflowing modals/dropdowns/textareas
      let el = e.target;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          return;
        }
        el = el.parentElement;
      }

      e.preventDefault();

      const maxScroll = getMaxScroll();

      // Normalize delta across browsers and trackpads vs mouse wheels
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 36;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      // Smooth inertia factor
      const wheelMultiplier = 1.08;
      targetScrollY = Math.max(0, Math.min(maxScroll, targetScrollY + delta * wheelMultiplier));

      startSmoothScroll();
    }, { passive: false });

    // Sync if user manually drags scrollbar thumb or clicks scrollbar track
    window.addEventListener('scroll', function () {
      if (!isScrolling) {
        currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        targetScrollY = currentScrollY;
        updateScrollProgress();
        updateParallax();
        toggleScrolled();
        toggleScrollTop();
        navmenuScrollspy();
      }
    }, { passive: true });

    // Keyboard Smooth Scrolling (PageDown, PageUp, ArrowDown, ArrowUp, Space, Home, End)
    window.addEventListener('keydown', function (e) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
      }

      let delta = 0;
      const maxScroll = getMaxScroll();

      if (e.key === 'ArrowDown') delta = 90;
      else if (e.key === 'ArrowUp') delta = -90;
      else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) delta = window.innerHeight * 0.75;
      else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) delta = -window.innerHeight * 0.75;
      else if (e.key === 'Home') delta = -targetScrollY;
      else if (e.key === 'End') delta = maxScroll - targetScrollY;

      if (delta !== 0) {
        e.preventDefault();
        targetScrollY = Math.max(0, Math.min(maxScroll, targetScrollY + delta));
        startSmoothScroll();
      }
    });
  } else {
    // Touch screens: preserve native high-refresh touch momentum
    window.addEventListener('scroll', () => {
      updateScrollProgress();
      updateParallax();
      toggleScrolled();
      toggleScrollTop();
      navmenuScrollspy();
    }, { passive: true });
  }

  // Smooth Hash Link Navigation
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const pathParts = href.split('#');
      const targetPath = pathParts[0];
      const targetHash = '#' + pathParts[1];

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const isTargetOnCurrentPage = !targetPath || targetPath === currentPath || targetPath === 'index.html' && (currentPath === '' || currentPath === 'index.html');

      if (isTargetOnCurrentPage && targetHash) {
        const targetEl = document.querySelector(targetHash);
        if (targetEl) {
          e.preventDefault();

          if (document.querySelector('body').classList.contains('mobile-nav-active')) {
            mobileNavToogle();
          }

          const headerOffset = 72;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const destY = elementPosition + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset;

          if (window.smoothScrollTo && !isTouchDevice && !prefersReducedMotion) {
            window.smoothScrollTo(destY);
          } else {
            window.scrollTo({
              top: destY,
              behavior: 'smooth'
            });
          }

          if (history.pushState) {
            history.pushState(null, null, targetHash);
          } else {
            window.location.hash = targetHash;
          }
        }
      }
    });
  });

  // Scroll Top Button with smooth glide
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.smoothScrollTo && !isTouchDevice && !prefersReducedMotion) {
        window.smoothScrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // Handle URL hash on initial load smoothly
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const headerOffset = 72;
          const elementPosition = target.getBoundingClientRect().top;
          const destY = elementPosition + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset;
          if (window.smoothScrollTo && !isTouchDevice && !prefersReducedMotion) {
            window.smoothScrollTo(destY);
          } else {
            window.scrollTo({
              top: destY,
              behavior: 'smooth'
            });
          }
        }, 150);
      }
    }
  });

  /**
   * -------------------------------------------------------------
   * High-Performance Parallax Engine (60/120fps GPU-Accelerated)
   * -------------------------------------------------------------
   */
  const heroSection = document.querySelector('#hero');
  const heroBg = document.querySelector('.hero-parallax-bg');
  const heroContent = document.querySelector('.hero-parallax-content');
  const ambientOrbs = document.querySelectorAll('.hero-ambient-orb, .section-ambient-orb');
  const watermarkTitles = document.querySelectorAll('.section-title span');
  const aboutSection = document.querySelector('#about');
  const aboutImg = document.querySelector('.about-img-frame img');
  const aboutBadge = document.querySelector('.about-floating-badge');
  const subpageBanners = document.querySelectorAll('.hero-recruiter, .hero-jobs, .hero-privacy, .hero-deletion');

  function updateParallax() {
    if (prefersReducedMotion) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const viewportHeight = window.innerHeight;

    // 1. Hero Background & Content Depth Parallax
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      if (heroRect.bottom > 0 && heroRect.top < viewportHeight) {
        if (heroBg) {
          const bgOffset = scrollY * 0.38;
          heroBg.style.transform = `translate3d(0, ${bgOffset.toFixed(1)}px, 0) scale(1.05)`;
        }
        if (heroContent) {
          const contentOffset = scrollY * 0.16;
          const heroHeight = heroRect.height || 700;
          const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.85)));
          heroContent.style.transform = `translate3d(0, ${contentOffset.toFixed(1)}px, 0)`;
          heroContent.style.opacity = opacity.toFixed(2);
        }
      }
    }

    // 2. Ambient Floating Glowing Orbs (Atmospheric Depth)
    ambientOrbs.forEach(orb => {
      const parentSection = orb.closest('section') || orb.parentElement;
      if (parentSection) {
        const rect = parentSection.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < viewportHeight + 100) {
          const speed = parseFloat(orb.getAttribute('data-parallax-speed')) || 0.15;
          const relativeCenter = (rect.top + rect.height / 2) - (viewportHeight / 2);
          const yOffset = relativeCenter * speed;
          orb.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
        }
      }
    });

    // 3. Section Watermark Heading Parallax Drift
    watermarkTitles.forEach(span => {
      const section = span.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < viewportHeight) {
          const progress = ((viewportHeight / 2) - (rect.top + rect.height / 2)) / (viewportHeight / 2);
          const xOffset = progress * 32;
          span.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0)`;
        }
      }
    });

    // 4. About Section Image & Floating Badge Dual-Layer Depth
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      if (aboutRect.bottom > 0 && aboutRect.top < viewportHeight) {
        const progress = ((viewportHeight / 2) - (aboutRect.top + aboutRect.height / 2)) / (viewportHeight / 2);
        if (aboutImg) {
          const imgOffset = progress * 24;
          aboutImg.style.transform = `translate3d(0, ${imgOffset.toFixed(1)}px, 0) scale(1.06)`;
        }
        if (aboutBadge) {
          const badgeOffset = progress * -28;
          aboutBadge.style.transform = `translate3d(0, ${badgeOffset.toFixed(1)}px, 0)`;
        }
      }
    }

    // 5. Subpage Hero Banners Parallax
    subpageBanners.forEach(banner => {
      const rect = banner.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        const offset = scrollY * 0.35;
        banner.style.backgroundPositionY = `calc(50% + ${offset.toFixed(1)}px)`;
      }
    });
  }

  window.addEventListener('load', updateParallax);

  /**
   * -------------------------------------------------------------
   * Hero Magnetic Mouse Move Parallax (Desktop Only)
   * -------------------------------------------------------------
   */
  function initHeroMouseParallax() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const hero = document.querySelector('#hero');
    if (!hero) return;

    const badge = hero.querySelector('.hero-badge');
    const title = hero.querySelector('h2');
    const orbs = hero.querySelectorAll('.hero-ambient-orb');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    hero.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function animateHeroMouse() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (badge) {
        badge.style.transform = `translate3d(${(currentX * 10).toFixed(2)}px, ${(currentY * 8).toFixed(2)}px, 0)`;
      }
      if (title) {
        title.style.transform = `translate3d(${(currentX * 5).toFixed(2)}px, ${(currentY * 4).toFixed(2)}px, 0)`;
      }
      orbs.forEach((orb, i) => {
        const factor = i === 0 ? -18 : -12;
        orb.style.marginLeft = `${(currentX * factor).toFixed(2)}px`;
        orb.style.marginTop = `${(currentY * factor).toFixed(2)}px`;
      });

      requestAnimationFrame(animateHeroMouse);
    }
    requestAnimationFrame(animateHeroMouse);
  }

  initHeroMouseParallax();

  /**
   * -------------------------------------------------------------
   * 3D Interactive Card Tilt Physics with Spotlight Reflection (Desktop)
   * -------------------------------------------------------------
   */
  function initCard3DTilt() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const tiltTargets = document.querySelectorAll(
      '.capability-card, .service-item, .hero-stat-card, .info-item, .map-card, .wizard-card, .about-feature-box'
    );

    tiltTargets.forEach(card => {
      card.classList.add('tilt-card');

      let rafId = null;

      card.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const normX = (x / rect.width - 0.5) * 2;
          const normY = (y / rect.height - 0.5) * 2;

          const maxTilt = 7;
          const rotX = -normY * maxTilt;
          const rotY = normX * maxTilt;

          card.style.setProperty('--mouse-x', `${x.toFixed(0)}px`);
          card.style.setProperty('--mouse-y', `${y.toFixed(0)}px`);
          card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px) translateZ(8px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)';
        card.style.setProperty('--mouse-x', '-999px');
        card.style.setProperty('--mouse-y', '-999px');
      });
    });
  }

  window.addEventListener('load', initCard3DTilt);



})();

// EmailJS Form Integration
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof emailjs === 'undefined') {
      return;
    }
    emailjs.init("bQeh4P_XaN0fbDxXr");

    const form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const loading = form.querySelector(".loading");
      const errorMessage = form.querySelector(".error-message");
      const sentMessage = form.querySelector(".sent-message");

      if (loading) loading.style.display = "block";
      if (errorMessage) errorMessage.style.display = "none";
      if (sentMessage) sentMessage.style.display = "none";

      emailjs.sendForm(
        "service_cb23ur9",
        "template_yf4se73",
        form
      )
        .then((response) => {
          if (loading) loading.style.display = "none";
          if (sentMessage) sentMessage.style.display = "block";
          form.reset();
        })
        .catch((error) => {
          if (loading) loading.style.display = "none";
          if (errorMessage) {
            errorMessage.textContent = error.text || "Failed to send message. Please try again.";
            errorMessage.style.display = "block";
          }
        });
    });

  });

})();

/**
 * Copy Address helper with animated feedback
 */
function copyAddressText(btn) {
  const addr = "2nd Floor, Thirumala Plaza, 7/1, Sanjay Nagar Main Rd, Amarjyothi Layout, RMV 2nd Stage, Bengaluru, Karnataka 560094";

  const showSuccess = () => {
    const label = btn.querySelector('span');
    const icon = btn.querySelector('i');
    const origText = label ? label.textContent : "Copy Address";

    if (label) label.textContent = "Copied!";
    if (icon) icon.className = "bi bi-check2";
    btn.classList.add('copied');

    setTimeout(() => {
      if (label) label.textContent = origText;
      if (icon) icon.className = "bi bi-clipboard";
      btn.classList.remove('copied');
    }, 2000);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(addr)
      .then(showSuccess)
      .catch(() => fallbackCopy(addr, showSuccess));
  } else {
    fallbackCopy(addr, showSuccess);
  }
}

function fallbackCopy(text, callback) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    if (callback) callback();
  } catch (err) {
    console.error("Copy failed", err);
  }
  document.body.removeChild(ta);
}
