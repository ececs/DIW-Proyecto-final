/**
 * MARVEL S.H.I.E.L.D. DATABASE — Main Orchestrator
 */

import { initParticles } from './particles.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ══════════════════════════════════════════════════════════
// 1. INTRO OVERLAY
// ══════════════════════════════════════════════════════════
function runIntroAnimation() {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  const DURATION = reducedMotion ? 0 : 2200;

  setTimeout(() => {
    overlay.classList.add('fade-out');
    overlay.addEventListener('animationend', () => {
      overlay.remove();
      // Revelar hero content + iniciar glitch
      revealHeroContent();
    }, { once: true });

    // Fallback por si animationend no dispara
    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
      revealHeroContent();
    }, 800);
  }, DURATION);
}

function revealHeroContent() {
  const content = document.querySelector('.hero-content');
  if (content) content.classList.add('revealed');

  // Glitch periódico en el título
  if (!reducedMotion) {
    scheduleGlitch();
  }

  // Dar foco al main para lectores de pantalla
  const main = document.getElementById('main');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
  }
}

function scheduleGlitch() {
  const title = document.getElementById('hero-title');
  if (!title) return;

  function doGlitch() {
    title.classList.add('glitch');
    setTimeout(() => title.classList.remove('glitch'), 280);
    setTimeout(doGlitch, 4500 + Math.random() * 3000);
  }
  setTimeout(doGlitch, 800);
}

// ══════════════════════════════════════════════════════════
// 2. PARTÍCULAS
// ══════════════════════════════════════════════════════════
function startParticles() {
  if (!reducedMotion) {
    initParticles('particle-canvas');
  }
}

// ══════════════════════════════════════════════════════════
// 3. SCROLL OBSERVERS
// ══════════════════════════════════════════════════════════
function initScrollObservers() {
  // Cards — entrada escalonada
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.agent-card').forEach(card => {
    cardObserver.observe(card);
  });

  // Barras de habilidad
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bar-animate');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.bar-fill').forEach(bar => {
    barObserver.observe(bar);
  });

  // Stats — counters + reveal
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);
}

// ══════════════════════════════════════════════════════════
// 4. COUNTERS
// ══════════════════════════════════════════════════════════
function triggerStats() {
  const items = document.querySelectorAll('.stat-item');
  items.forEach((item, i) => {
    item.style.setProperty('--si', i);
    item.classList.add('revealed');
  });

  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = parseInt(el.dataset.countTo, 10);
    if (isNaN(target)) return;
    animateCounter(el, target);
  });
}

function animateCounter(el, target) {
  if (reducedMotion) { el.textContent = target; return; }

  const duration = 1800;
  const start = performance.now();

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOutCubic(progress) * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ══════════════════════════════════════════════════════════
// 5. TILT 3D (solo desktop)
// ══════════════════════════════════════════════════════════
function initTiltEffect() {
  if (navigator.maxTouchPoints > 0) return; // no en touch

  const MAX_TILT = 12;

  document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT;
      const ry = ((e.clientX - cx) / (rect.width  / 2)) *  MAX_TILT;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // Focus: solo brillo, sin rotación
    card.addEventListener('focus', () => {
      card.style.boxShadow = '0 0 40px rgba(232,0,28,0.25)';
    });
    card.addEventListener('blur', () => {
      card.style.boxShadow = '';
    });
  });
}

// ══════════════════════════════════════════════════════════
// 6. NAV SCROLL
// ══════════════════════════════════════════════════════════
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ══════════════════════════════════════════════════════════
// 7. KEYBOARD NAV
// ══════════════════════════════════════════════════════════
function initKeyboardNav() {
  // Enter/Space en tarjetas activa efecto hover visual
  document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('button')?.click();
      }
    });
  });

  // Smooth scroll en links del sidebar y nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
}

// ══════════════════════════════════════════════════════════
// 8. VIDEO PLAYER — overlay personalizado
// ══════════════════════════════════════════════════════════
function initVideoPlayer() {
  const video       = document.getElementById('marvel-video');
  const placeholder = document.getElementById('video-placeholder');
  if (!video || !placeholder) return;

  const bgMusic = document.getElementById('bg-music');

  // Click en overlay → reproducir video y pausar música
  placeholder.addEventListener('click', () => {
    placeholder.classList.add('hidden');
    if (bgMusic) bgMusic.pause();
    video.play();
  });

  // Si el video se pausa → mostrar overlay y reanudar música
  video.addEventListener('pause', () => {
    if (video.currentTime > 0 && !video.ended) {
      setTimeout(() => placeholder.classList.remove('hidden'), 200);
      if (bgMusic) bgMusic.play().catch(e => console.log("Audio play blocked", e));
    }
  });

  // Al terminar → mostrar overlay y reanudar música
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    placeholder.classList.remove('hidden');
    if (bgMusic) bgMusic.play().catch(e => console.log("Audio play blocked", e));
  });

  // Click directo en el video (fuera de controles) → toggle play/pause
  video.addEventListener('click', (e) => {
    if (video.paused) {
      placeholder.classList.add('hidden');
      if (bgMusic) bgMusic.pause();
      video.play();
    } else {
      if (bgMusic) bgMusic.play().catch(e => console.log("Audio play blocked", e));
      video.pause();
    }
  });

  // Observer para revelar el header de la sección
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('.video-section-header')?.classList.add('revealed');
        document.querySelector('.video-badge')?.classList.add('revealed');
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const videoSection = document.getElementById('video-section');
  if (videoSection) headerObserver.observe(videoSection);
}

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  runIntroAnimation();
  startParticles();
  initScrollObservers();
  initTiltEffect();
  initNavScroll();
  initKeyboardNav();
  initVideoPlayer();
  initProfilesSlider();

  // Iniciar audio en la primera interacción (Chrome/Safari policy)
  const startAudioOnInteraction = () => {
    const bgMusic = document.getElementById('bg-music');
    const video = document.getElementById('marvel-video');
    
    // Solo iniciar si el video no se está reproduciendo
    if (bgMusic && video && video.paused) {
      bgMusic.play().catch(e => console.log("Audio play blocked", e));
    }
    document.removeEventListener('click', startAudioOnInteraction);
  };
  document.addEventListener('click', startAudioOnInteraction);
});

// ══════════════════════════════════════════════════════════
// 9. PROFILES SLIDER
// ══════════════════════════════════════════════════════════
function initProfilesSlider() {
  const grid = document.querySelector('.profiles-grid');
  const nextBtn = document.querySelector('.btn-nav-arrow[aria-label="Siguiente"]');
  const prevBtn = document.querySelector('.btn-nav-arrow[aria-label="Anterior"]');
  
  if (!grid || !nextBtn || !prevBtn) return;

  const getScrollAmount = () => {
    const card = grid.querySelector('.agent-card');
    if (!card) return 400;
    const style = window.getComputedStyle(grid);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  };

  nextBtn.addEventListener('click', () => {
    grid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  // Opcional: Desactivar botones si no hay más scroll
  const updateButtons = () => {
    prevBtn.style.opacity = grid.scrollLeft <= 10 ? '0.3' : '1';
    prevBtn.style.cursor = grid.scrollLeft <= 10 ? 'default' : 'pointer';
    
    const atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10;
    nextBtn.style.opacity = atEnd ? '0.3' : '1';
    nextBtn.style.cursor = atEnd ? 'default' : 'pointer';
  };

  grid.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
}
