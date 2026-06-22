/**
 * Valerius — Interactive Luxury E-Commerce
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.navbar__nav');
  const cartBadge = document.getElementById('cartBadge');
  const toast = document.getElementById('toast');
  const newsletterForm = document.getElementById('newsletterForm');
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.getElementById('testimonialDots');

  let cartCount = 0;
  let testimonialIndex = 0;
  let testimonialInterval = null;
  let toastTimeout = null;

  /* ---- Navbar scroll ---- */
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile menu ---- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Cart ---- */
  function updateCartBadge() {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle('visible', cartCount > 0);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const name = card?.dataset.product || 'Item';
      cartCount += 1;
      updateCartBadge();
      showToast(`${name} added to cart`);
    });
  });

  /* ---- Testimonials carousel ---- */
  const slides = testimonialTrack
    ? Array.from(testimonialTrack.querySelectorAll('.testimonial-slide'))
    : [];

  function buildDots() {
    if (!testimonialDots || slides.length === 0) return;

    testimonialDots.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goToSlide(i));
      testimonialDots.appendChild(dot);
    });
  }

  function goToSlide(index) {
    if (slides.length === 0) return;

    testimonialIndex = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === testimonialIndex);
    });

    const dots = testimonialDots?.querySelectorAll('.testimonial-dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
      dot.setAttribute('aria-selected', i === testimonialIndex ? 'true' : 'false');
    });
  }

  function startCarousel() {
    stopCarousel();
    testimonialInterval = setInterval(() => {
      
      goToSlide(testimonialIndex + 1);
    }, 6000);
  }

  function stopCarousel() {
    if (testimonialInterval) {
      clearInterval(testimonialInterval);
      testimonialInterval = null;
    }
  }

  if (slides.length > 0) {
    buildDots();
    startCarousel();

    const carousel = document.getElementById('testimonialCarousel');
    carousel?.addEventListener('mouseenter', stopCarousel);
    carousel?.addEventListener('mouseleave', startCarousel);
  }

  /* ---- Newsletter ---- */
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    if (input?.value) {
      showToast('Welcome to The Journal');
      input.value = '';
    }
  });

  /* ---- Smooth reveal on scroll ---- */
  const revealElements = document.querySelectorAll(
    '.category-card, .product-card, .section-header, .editorial__item, .in-stock__item'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.style.color =
              href === `#${id}` ? 'var(--gold)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();
