/* ==========================================
   AVENTURA GLOBAL - ANIMACIONES & INTERACTIVIDAD
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. PRELOADER ANIMATION ===== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 600);
      }, 800);
    });
    setTimeout(() => {
      if (document.body.contains(preloader)) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 600);
      }
    }, 2000);
  }

  /* ===== 2. CUSTOM CURSOR (DESKTOP POINTER FINE ONLY) ===== */
  if (window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverElements = document.querySelectorAll('a, button, input, select, textarea, .destination-card, .package-card, .gallery-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ===== 3. RIPPLE EFFECT ON BUTTONS ===== */
  const rippleButtons = document.querySelectorAll('.btn-primary, .btn-cta, .btn-outline, .filter-btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ===== 4. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ===== */
  const animateElements = document.querySelectorAll('[data-animate]');
  if (animateElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => animObserver.observe(el));
  }

});
