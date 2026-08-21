/* ==========================================
   AVENTURA GLOBAL - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. MOBILE MENU TOGGLE ===== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .nav-cta');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== 2. HERO CAROUSEL ===== */
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track ? track.children : []);
  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');
  const dotsContainer = document.querySelector('.carousel-dots');
  const progressBar = document.querySelector('.carousel-progress');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000;

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
      slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next', 'hidden-slide');
        
        if (index === currentIndex) {
          slide.classList.add('active');
        } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
        } else if (index === (currentIndex + 1) % slides.length) {
          slide.classList.add('next');
        } else {
          slide.classList.add('hidden-slide');
        }
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      if (progressBar) {
        progressBar.classList.remove('running');
        void progressBar.offsetWidth;
        progressBar.classList.add('running');
      }
    }

    // Initialize first slide state
    updateCarousel();

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    function startTimer() {
      if (progressBar) progressBar.classList.add('running');
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        if (progressBar) progressBar.classList.remove('running');
      });
      heroSection.addEventListener('mouseleave', () => {
        startTimer();
      });
    }

    startTimer();
  }

  /* ===== 3. INTERACTIVE DESTINATIONS FILTER ===== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  if (filterButtons.length > 0 && destinationCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        destinationCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ===== 4. DESTINATION DETAILS & MULTI-IMAGE SLIDER MODAL ===== */
  const destinationsData = {
    "isla_mucura": {
      title: "Isla Múcura",
      country: "Colombia",
      category: "Playa",
      duration: "⏱ Desde 4 días",
      summary: "Un paraíso de aguas turquesas y arena blanca en medio del archipiélago de San Bernardo. Disfruta de atardeceres mágicos, snorkeling con arrecifes de coral y desconexión total en el Caribe.",
      images: [
        "img/sitios/Colombia/Isla_Múcura/Isla Múcura.webp",
        "img/sitios/Colombia/Isla_Múcura/Isla Múcura_1.png",
        "img/sitios/Colombia/Isla_Múcura/Isla Múcura_2.png"
      ]
    },
    "nevados": {
      title: "Parque de los Nevados",
      country: "Colombia",
      category: "Montaña",
      duration: "⏱ Desde 3 días",
      summary: "Majestuosos paisajes volcánicos, frailejones y cumbres nevadas en la cordillera de los Andes. Una experiencia de senderismo de alta montaña inolvidable.",
      images: [
        "img/sitios/Colombia/Parque-de-los-Nevados/Parque-de-los-Nevados.webp",
        "img/sitios/Colombia/Parque-de-los-Nevados/Parque-de-los-Nevados_1.png",
        "img/sitios/Colombia/Parque-de-los-Nevados/Parque-de-los-Nevados_2.png"
      ]
    },
    "salvador": {
      title: "Salvador de Bahía",
      country: "Brasil",
      category: "Cultura",
      duration: "⏱ Desde 5 días",
      summary: "Coloridas calles coloniales en Pelourinho, ritmo afrobrasileño y playas paradisíacas en el nordeste brasileño con una gastronomía e historia fascinantes.",
      images: [
        "img/sitios/Brasil/Pelourinho y Playas de Salvador de Bahía.jfif",
        "img/sitios/Brasil/Pelourinho y Playas de Salvador de Bahía_1.png",
        "img/sitios/Brasil/Pelourinho y Playas de Salvador de Bahía_2.png",
        "img/sitios/Brasil/Pelourinho y Playas de Salvador de Bahía_3.png",
        "img/sitios/Brasil/Pelourinho y Playas de Salvador de Bahía_4.png"
      ]
    },
    "diocleciano": {
      title: "Palacio de Diocleciano",
      country: "Croacia",
      category: "Historia",
      duration: "⏱ Desde 6 días",
      summary: "Antigua fortaleza romana en Split convertida en el corazón vibrante de la ciudad croata. Murallas milenarias, plazas de mármol y vistas al mar Adriático.",
      images: [
        "img/sitios/Crocia/Palacio de Diocleciano.jpg",
        "img/sitios/Crocia/Palacio de Diocleciano_1.png",
        "img/sitios/Crocia/Palacio de Diocleciano_2.png",
        "img/sitios/Crocia/Palacio de Diocleciano_3.png",
        "img/sitios/Crocia/Palacio de Diocleciano_4.png"
      ]
    },
    "ostia": {
      title: "Ostia Antica",
      country: "Italia",
      category: "Historia",
      duration: "⏱ Desde 4 días",
      summary: "Impresionante ciudad portuaria de la antigua Roma excepcionalmente bien conservada. Recorre templos, teatros y tabernas con más de dos mil años de historia.",
      images: [
        "img/sitios/Italia/Sitio Arqueológico de Ostia Antica.jpg",
        "img/sitios/Italia/Sitio Arqueológico de Ostia Antica_1.png",
        "img/sitios/Italia/Sitio Arqueológico de Ostia Antica_2.png",
        "img/sitios/Italia/Sitio Arqueológico de Ostia Antica_3.png"
      ]
    },
    "cenote": {
      title: "Cenote Ik Kil",
      country: "México",
      category: "Naturaleza",
      duration: "⏱ Desde 5 días",
      summary: "Un cenote abierto de aguas cristalinas rodeado de lianas y vegetación mística en la península de Yucatán, perfecto para un baño inolvidable.",
      images: [
        "img/sitios/Mexico/Cenote Ik Kil/Cenote Ik Kil.png",
        "img/sitios/Mexico/Cenote Ik Kil/Cenote Ik Kil_1.png",
        "img/sitios/Mexico/Cenote Ik Kil/Cenote Ik Kil_2.png",
        "img/sitios/Mexico/Cenote Ik Kil/Cenote Ik Kil_3.png"
      ]
    },
    "cancun": {
      title: "Cancún y Riviera Maya",
      country: "México",
      category: "Playa",
      duration: "⏱ Desde 5 días",
      summary: "Playas de arena blanca, mar turquesa Caribeño y una vibrante vida nocturna combinada con cultura maya.",
      images: [
        "img/sitios/Mexico/Cancun/Cancun.png",
        "img/sitios/Mexico/Cancun/Cancun_1.png",
        "img/sitios/Mexico/Cancun/Cancun_2.png",
        "img/sitios/Mexico/Cancun/Cancun_3.png"
      ]
    },
    "alpes_suizos": {
      title: "Alpes Suizos",
      country: "Suiza",
      category: "Montaña",
      duration: "⏱ Desde 6 días",
      summary: "Majestuosas cumbres nevadas, lagos alpinos cristalinos y pueblos de postal en el corazón de Europa.",
      images: [
        "img/sitios/Suiza/Alpes_Suizos.png",
        "img/sitios/Suiza/Alpes_Suizos_1.png",
        "img/sitios/Suiza/Alpes_Suizos_2.png"
      ]
    },
    "machu_picchu": {
      title: "Machu Picchu",
      country: "Perú",
      category: "Montaña",
      duration: "⏱ Desde 8 días",
      summary: "La majestuosa ciudadela Inca encumbrada en los Andes peruanos con vistas impresionantes y una energía ancestral incomparable.",
      images: [
        "img/sitios/Peru/Machu_Picchu.jpg",
        "img/sitios/Peru/Machu_Picchu_1.jpg",
        "img/sitios/Peru/Machu_Picchu_2.jpg",
        "img/sitios/Peru/Machu_Picchu_3.jpg",
        "img/sitios/Peru/Machu_Picchu_4.png"
      ]
    },
    "iguazu": {
      title: "Cataratas del Iguazú",
      country: "Argentina / Brasil",
      category: "Naturaleza",
      duration: "⏱ Desde 6 días",
      summary: "Un sistema de cataratas descomunal rodeado de selva subtropical y pasarelas que te sumergen en la imponente Garganta del Diablo.",
      images: [
        "img/sitios/Argentina/Cataratas del Iguazú.webp",
        "img/sitios/Argentina/Cataratas del Iguazú_1.jpeg",
        "img/sitios/Argentina/Cataratas del Iguazú_2.png",
        "img/sitios/Argentina/Cataratas del Iguazú_3.png",
        "img/sitios/Argentina/Cataratas del Iguazú_4.png"
      ]
    },
    "valle_cocora": {
      title: "Valle de Cocora",
      country: "Colombia",
      category: "Naturaleza",
      duration: "⏱ Desde 4 días",
      summary: "El hogar de las palmas de cera más altas del mundo en el Eje Cafetero colombiano, con senderos de niebla y neblina andina.",
      images: [
        "img/sitios/Colombia/Valle de Cocora/Valle de Cocora.jpg",
        "img/sitios/Colombia/Valle de Cocora/Valle de Cocora_1.png",
        "img/sitios/Colombia/Valle de Cocora/Valle de Cocora_2.png"
      ]
    },
    "santuario": {
      title: "Santuario de la Verdad",
      country: "Tailandia",
      category: "Cultura",
      duration: "⏱ Desde 7 días",
      summary: "Impresionante estructura arquitectónica de madera tallada a mano frente al mar de Pattaya, símbolo de la filosofía oriental y el arte ancestral.",
      images: [
        "img/sitios/Tailandia/Santuario de la verdad.png",
        "img/sitios/Tailandia/Santuario de la verdad_1.png",
        "img/sitios/Tailandia/Santuario de la verdad_2.png",
        "img/sitios/Tailandia/Santuario de la verdad_3.png",
        "img/sitios/Tailandia/Santuario de la verdad_4.png"
      ]
    }
  };

  let destModal = document.querySelector('.destination-modal');
  if (!destModal) {
    destModal = document.createElement('div');
    destModal.className = 'destination-modal';
    destModal.innerHTML = `
      <div class="destination-modal-content">
        <div class="destination-modal-header">
          <div class="modal-slider-track"></div>
          <button class="destination-modal-close" aria-label="Cerrar modal">&times;</button>
          <button class="modal-slide-btn modal-prev" aria-label="Anterior">&#10094;</button>
          <button class="modal-slide-btn modal-next" aria-label="Siguiente">&#10095;</button>
          <div class="modal-dots"></div>
        </div>
        <div class="destination-modal-body">
          <span class="modal-country-tag"></span>
          <h3></h3>
          <p class="modal-summary"></p>
          <div class="destination-modal-footer">
            <span class="modal-duration" style="font-weight: 600; color: var(--color-primary-container);"></span>
            <a href="#contacto" class="btn-primary modal-reserve-btn">Reservar Este Destino ✈</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(destModal);
  }

  const modalSliderTrack = destModal.querySelector('.modal-slider-track');
  const modalClose = destModal.querySelector('.destination-modal-close');
  const modalPrev = destModal.querySelector('.modal-prev');
  const modalNext = destModal.querySelector('.modal-next');
  const modalDots = destModal.querySelector('.modal-dots');
  const modalTag = destModal.querySelector('.modal-country-tag');
  const modalTitle = destModal.querySelector('h3');
  const modalSummary = destModal.querySelector('.modal-summary');
  const modalDuration = destModal.querySelector('.modal-duration');
  const modalReserveBtn = destModal.querySelector('.modal-reserve-btn');

  let currentModalSlide = 0;
  let currentModalImages = [];

  function renderModalSlider() {
    modalSliderTrack.innerHTML = '';
    modalDots.innerHTML = '';

    currentModalImages.forEach((imgSrc, idx) => {
      const slideImg = document.createElement('img');
      slideImg.src = imgSrc;
      slideImg.alt = "Foto del destino";
      if (idx === 0) slideImg.classList.add('active');
      modalSliderTrack.appendChild(slideImg);

      const dot = document.createElement('button');
      dot.className = `modal-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentModalSlide = idx;
        updateModalSlide();
      });
      modalDots.appendChild(dot);
    });
  }

  function updateModalSlide() {
    const slides = modalSliderTrack.querySelectorAll('img');
    const dots = modalDots.querySelectorAll('button');
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentModalSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentModalSlide);
    });
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', () => {
      currentModalSlide = (currentModalSlide - 1 + currentModalImages.length) % currentModalImages.length;
      updateModalSlide();
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', () => {
      currentModalSlide = (currentModalSlide + 1) % currentModalImages.length;
      updateModalSlide();
    });
  }

  function openDestinationById(destId) {
    const data = destinationsData[destId];
    if (!data) return;

    currentModalImages = data.images;
    currentModalSlide = 0;
    renderModalSlider();

    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary + " Incluye guías expertos, traslados y el respaldo total de Aventura Global.";
    modalTag.textContent = `${data.country} · ${data.category}`;
    modalDuration.textContent = data.duration;

    destModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDestinationModal() {
    destModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      const destId = card.getAttribute('data-id');
      if (destId) openDestinationById(destId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeDestinationModal);
  if (modalReserveBtn) modalReserveBtn.addEventListener('click', closeDestinationModal);
  destModal.addEventListener('click', (e) => {
    if (e.target === destModal) closeDestinationModal();
  });

  // Expose function globally so amCharts map click can call it
  window.openDestinationById = openDestinationById;

  /* ===== COUNTRY MODAL FOR MULTI-DESTINATION COUNTRIES (e.g. Colombia) ===== */
  let countryModal = document.querySelector('.country-modal');
  if (!countryModal) {
    countryModal = document.createElement('div');
    countryModal.className = 'country-modal';
    countryModal.innerHTML = `
      <div class="country-modal-content">
        <button class="country-modal-close" aria-label="Cerrar modal">&times;</button>
        <h3 class="country-modal-title"></h3>
        <div class="country-destinations-grid"></div>
      </div>
    `;
    document.body.appendChild(countryModal);
  }

  const countryModalTitle = countryModal.querySelector('.country-modal-title');
  const countryDestGrid = countryModal.querySelector('.country-destinations-grid');
  const countryModalClose = countryModal.querySelector('.country-modal-close');

  function openCountryModal(countryName, destIds) {
    countryModalTitle.textContent = `Destinos en ${countryName} (${destIds.length})`;
    countryDestGrid.innerHTML = '';

    destIds.forEach(id => {
      const data = destinationsData[id];
      if (!data) return;

      const card = document.createElement('div');
      card.className = 'destination-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <figure style="position: relative; height: 180px; overflow: hidden;">
          <img src="${data.images[0]}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="tag" style="position: absolute; top: 12px; left: 12px; background: rgba(0,63,135,0.9); color: white; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${data.category}</span>
        </figure>
        <div class="card-body" style="padding: 20px;">
          <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">${data.title}</h4>
          <p style="font-size: 14px; color: var(--color-on-surface-variant); margin-bottom: 16px;">${data.summary.substring(0, 90)}...</p>
          <div class="card-meta" style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600;">
            <span style="color: var(--color-primary-container);">${data.duration}</span>
            <span class="btn-link">Ver fotos →</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        countryModal.classList.remove('active');
        openDestinationById(id);
      });

      countryDestGrid.appendChild(card);
    });

    countryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCountryModal() {
    countryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (countryModalClose) countryModalClose.addEventListener('click', closeCountryModal);
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) closeCountryModal();
  });

  window.openCountryModal = openCountryModal;

  /* ===== 5. GALLERY LIGHTBOX ===== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightboxModal = document.querySelector('.lightbox-modal');

  if (!lightboxModal && galleryItems.length > 0) {
    lightboxModal = document.createElement('div');
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Cerrar lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Imagen anterior">&#10094;</button>
        <button class="lightbox-next" aria-label="Imagen siguiente">&#10095;</button>
        <img src="" alt="Vista ampliada">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightboxModal);
  }

  if (galleryItems.length > 0) {
    const lightboxImg = lightboxModal.querySelector('img');
    const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
    const closeBtn = lightboxModal.querySelector('.lightbox-close');
    const prevBtn = lightboxModal.querySelector('.lightbox-prev');
    const nextBtn = lightboxModal.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const imagesData = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4') ? item.querySelector('h4').textContent : '';
      const desc = item.querySelector('p') ? item.querySelector('p').textContent : '';
      return { src: img.src, caption: `${title} – ${desc}` };
    });

    function openLightbox(index) {
      currentImageIndex = index;
      lightboxImg.src = imagesData[currentImageIndex].src;
      lightboxCaption.textContent = imagesData[currentImageIndex].caption;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
      lightboxImg.src = imagesData[currentImageIndex].src;
      lightboxCaption.textContent = imagesData[currentImageIndex].caption;
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % imagesData.length;
      lightboxImg.src = imagesData[currentImageIndex].src;
      lightboxCaption.textContent = imagesData[currentImageIndex].caption;
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
        closeDestinationModal();
      }
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  }

  /* ===== 6. STATS COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('.stat-number');
  let animatedCounters = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      function updateCounter() {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      updateCounter();
    });
  }

  const resenasSection = document.querySelector('#resenas');
  if (resenasSection && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedCounters) {
          runCounters();
          animatedCounters = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(resenasSection);
  }

  /* ===== 7. CONTACT FORM VALIDATION ===== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const destinoSelect = document.getElementById('destino');
    const mensajeTextarea = document.getElementById('mensaje');
    const terminosCheckbox = document.getElementById('terminos');

    function validateField(input, condition, errorMsgId, errorText) {
      const errorSpan = document.getElementById(errorMsgId);
      if (!condition) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (errorSpan) errorSpan.textContent = errorText;
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorSpan) errorSpan.textContent = '';
        return true;
      }
    }

    if (nombreInput) {
      nombreInput.addEventListener('blur', () => {
        validateField(nombreInput, nombreInput.value.trim().length >= 3, 'nombre-error', 'El nombre debe tener al menos 3 caracteres.');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error', 'Por favor ingresa un correo electrónico válido.');
      });
    }

    if (destinoSelect) {
      destinoSelect.addEventListener('change', () => {
        validateField(destinoSelect, destinoSelect.value !== '', 'destino-error', 'Por favor selecciona un destino.');
      });
    }

    if (mensajeTextarea) {
      mensajeTextarea.addEventListener('blur', () => {
        validateField(mensajeTextarea, mensajeTextarea.value.trim().length >= 20, 'mensaje-error', 'El mensaje debe tener al menos 20 caracteres.');
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNombreValid = nombreInput ? nombreInput.value.trim().length >= 3 : true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailInput ? emailRegex.test(emailInput.value.trim()) : true;
      const isDestinoValid = destinoSelect ? destinoSelect.value !== '' : true;
      const isMensajeValid = mensajeTextarea ? mensajeTextarea.value.trim().length >= 20 : true;
      const isTerminosValid = terminosCheckbox ? terminosCheckbox.checked : true;

      if (nombreInput) validateField(nombreInput, isNombreValid, 'nombre-error', 'El nombre debe tener al menos 3 caracteres.');
      if (emailInput) validateField(emailInput, isEmailValid, 'email-error', 'Por favor ingresa un correo electrónico válido.');
      if (destinoSelect) validateField(destinoSelect, isDestinoValid, 'destino-error', 'Por favor selecciona un destino.');
      if (mensajeTextarea) validateField(mensajeTextarea, isMensajeValid, 'mensaje-error', 'El mensaje debe tener al menos 20 caracteres.');

      if (isNombreValid && isEmailValid && isDestinoValid && isMensajeValid && isTerminosValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (btnText && btnLoading) {
          btnText.hidden = true;
          btnLoading.hidden = false;
        }
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.innerHTML = `
            <div class="form-success-msg">
              <h4>¡Mensaje Enviado con Éxito! ✈</h4>
              <p>Gracias por contactar a Aventura Global. Uno de nuestros asesores expertos se comunicará contigo en menos de 24 horas para planear tu viaje soñado.</p>
            </div>
          `;
        }, 1500);
      }
    });
  }

  /* ===== 8. BACK TO TOP BUTTON ===== */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '&#8593;';
  backToTopBtn.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ===== 9. NAVBAR SCROLLED STATE & SMOOTH SCROLL ===== */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== 10. DARK/LIGHT MODE THEME SWITCHER ===== */
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile, #theme-toggle-floating');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'Cambiar a modo claro');
        const icon = btn.querySelector('.theme-icon');
        const label = btn.querySelector('.theme-label');
        if (icon) icon.textContent = '🌙';
        if (label) label.textContent = 'Modo Claro';
      });
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggleBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        const icon = btn.querySelector('.theme-icon');
        const label = btn.querySelector('.theme-label');
        if (icon) icon.textContent = '☀️';
        if (label) label.textContent = 'Modo Oscuro';
      });
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  });

  /* ===== 10. INTERACTIVE PACKAGE CALCULATOR ===== */
  const nightsSelects = document.querySelectorAll('.nights-select');
  nightsSelects.forEach(select => {
    select.addEventListener('change', () => {
      const pkgName = select.getAttribute('data-package');
      const basePrice = parseFloat(select.getAttribute('data-base-price'));
      const baseNights = parseInt(select.getAttribute('data-base-nights'), 10);
      const selectedNights = parseInt(select.value, 10);

      const pricePerNight = 80;
      const diff = selectedNights - baseNights;
      let newPrice = basePrice + (diff * pricePerNight);
      if (newPrice < 300) newPrice = 300;
      const newDays = selectedNights + 1;

      const card = select.closest('.package-card');
      if (card) {
        const priceEl = card.querySelector('.package-price');
        const nightsDisplay = card.querySelector('[id^="nights-display-"]');
        const daysDisplay = card.querySelector('[id^="days-display-"]');

        if (priceEl) priceEl.textContent = `$${Math.round(newPrice).toLocaleString()} USD`;
        if (nightsDisplay) nightsDisplay.textContent = selectedNights;
        if (daysDisplay) daysDisplay.textContent = newDays;
      }

      const packageSelection = {
        package: pkgName,
        nights: selectedNights,
        days: newDays,
        price: `$${Math.round(newPrice).toLocaleString()} USD`
      };
      localStorage.setItem('userSelectedPackage', JSON.stringify(packageSelection));
    });
  });

  const reservePackageBtns = document.querySelectorAll('.select-package-btn');
  reservePackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-pkg-name');
      const card = btn.closest('.package-card');
      const select = card ? card.querySelector('.nights-select') : null;
      const nights = select ? select.value : '7';
      const priceEl = card ? card.querySelector('.package-price') : null;
      const price = priceEl ? priceEl.textContent : '';

      const selection = {
        package: pkgName,
        nights: nights,
        price: price
      };
      localStorage.setItem('userSelectedPackage', JSON.stringify(selection));
    });
  });

  /* ===== 11. CHATBOT INTERACTIVITY ===== */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');

  if (chatbotToggle && chatbotContainer) {
    let chatHistory = [];
    const chatbotClear = document.getElementById('chatbot-clear');

    try {
      const savedHistory = sessionStorage.getItem('chatHistory');
      if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        if (chatHistory.length > 0) {
          chatbotMessages.innerHTML = '';
          chatHistory.forEach(item => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chatbot-message ${item.role === 'user' ? 'user' : 'bot'}`;
            if (item.role === 'model') {
              msgDiv.innerHTML = formatMarkdown(item.content);
            } else {
              msgDiv.textContent = item.content;
            }
            chatbotMessages.appendChild(msgDiv);
          });
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
      }
    } catch (e) {
      chatHistory = [];
    }

    if (chatbotClear) {
      chatbotClear.addEventListener('click', () => {
        chatHistory = [];
        sessionStorage.removeItem('chatHistory');
        chatbotMessages.innerHTML = `
          <div class="chatbot-message bot">
            ¡Hola! Soy tu asistente de viajes virtual de Aventura Global impulsado por IA. ¿A qué destino te gustaría viajar o qué paquete deseas consultar?
          </div>
        `;
      });
    }

    chatbotToggle.addEventListener('click', () => {
      const isOpen = chatbotContainer.classList.toggle('active');
      chatbotToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen && chatbotInput) chatbotInput.focus();
    });

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotToggle.setAttribute('aria-expanded', 'false');
      });
    }

    function formatMarkdown(text) {
      if (!text) return '';
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      html = html.replace(/^[-\*]\s+(.*)$/gm, '• $1');
      html = html.replace(/\n/g, '<br>');

      return html;
    }

    async function handleChatSend() {
      const text = chatbotInput.value.trim();
      if (!text) return;

      chatbotInput.disabled = true;
      if (chatbotSend) chatbotSend.disabled = true;

      const userMsg = document.createElement('div');
      userMsg.className = 'chatbot-message user';
      userMsg.textContent = text;
      chatbotMessages.appendChild(userMsg);
      chatbotInput.value = '';
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

      const loadingMsg = document.createElement('div');
      loadingMsg.className = 'chatbot-message bot chatbot-loading';
      loadingMsg.textContent = 'Aventura AI está escribiendo...';
      chatbotMessages.appendChild(loadingMsg);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

      try {
        let requestHistory = [...chatHistory];
        if (requestHistory.length === 0) {
          const selectedPkg = localStorage.getItem('userSelectedPackage');
          if (selectedPkg) {
            try {
              const pkgData = JSON.parse(selectedPkg);
              requestHistory.push({
                role: 'user',
                content: `[Contexto previo: El usuario ha seleccionado el paquete '${pkgData.package}' con ${pkgData.nights} noches por un valor de ${pkgData.price}].`
              });
              requestHistory.push({
                role: 'model',
                content: `¡Entendido! Veo que seleccionaste el paquete ${pkgData.package} (${pkgData.nights} noches, ${pkgData.price}). ¿Te gustaría proceder con la reserva o tienes alguna pregunta sobre el viaje?`
              });
            } catch (e) {}
          }
        }

        const response = await fetch('http://localhost:8000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: text,
            history: requestHistory
          })
        });

        loadingMsg.remove();

        if (!response.ok) {
          throw new Error('Error en el servidor');
        }

        const data = await response.json();
        const reply = data.response || '¡Hola! ¿En qué más puedo ayudarte con tu viaje?';

        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'model', content: reply });
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));

        const botMsg = document.createElement('div');
        botMsg.className = 'chatbot-message bot';
        botMsg.innerHTML = formatMarkdown(reply);
        chatbotMessages.appendChild(botMsg);
      } catch (error) {
        if (loadingMsg.parentNode) loadingMsg.remove();

        const errorMsg = document.createElement('div');
        errorMsg.className = 'chatbot-message bot chatbot-error';
        errorMsg.textContent = 'No pude conectarme con Aventura AI. Intenta nuevamente.';
        chatbotMessages.appendChild(errorMsg);
      } finally {
        chatbotInput.disabled = false;
        if (chatbotSend) chatbotSend.disabled = false;
        chatbotInput.focus();
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    }

    if (chatbotSend) chatbotSend.addEventListener('click', handleChatSend);
    if (chatbotInput) {
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
      });
    }
  }

});
