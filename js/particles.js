/**
 * MARVEL S.H.I.E.L.D. DATABASE — Particle System
 * Canvas DPI-aware, respeta prefers-reduced-motion
 */

export function initParticles(canvasId) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId = null;
  let particles = [];

  // ── Configuración ──────────────────────────────────────
  const CONFIG = {
    count: 110,
    maxDist: 140,
    speedRange: [0.08, 0.35],
    sizeRange: [0.8, 2.2],
    redRatio: 3,        // 1 de cada N partículas es roja
  };

  // ── Resize + DPI ───────────────────────────────────────
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ── Crear partícula ────────────────────────────────────
  function createParticle() {
    const isRed = Math.random() < 1 / CONFIG.redRatio;
    const speed = CONFIG.speedRange[0] + Math.random() * (CONFIG.speedRange[1] - CONFIG.speedRange[0]);
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: CONFIG.sizeRange[0] + Math.random() * (CONFIG.sizeRange[1] - CONFIG.sizeRange[0]),
      alpha: 0.3 + Math.random() * 0.5,
      color: isRed
        ? `rgba(232,0,28,`
        : Math.random() > 0.5
          ? `rgba(180,200,255,`
          : `rgba(229,225,231,`,
    };
  }

  // ── Init partículas ────────────────────────────────────
  function initAll() {
    particles = Array.from({ length: CONFIG.count }, createParticle);
  }

  // ── Dibujar ────────────────────────────────────────────
  function draw() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    ctx.clearRect(0, 0, W, H);

    // Conexiones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDist) {
          const opacity = (1 - dist / CONFIG.maxDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(232,0,28,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Partículas
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    }
  }

  // ── Mover ──────────────────────────────────────────────
  function update() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }
  }

  // ── Loop ───────────────────────────────────────────────
  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  // ── IntersectionObserver: pausa fuera de viewport ──────
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!animId) animId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.1 });

  observer.observe(canvas.closest('section') || canvas);

  // ── Arranque ───────────────────────────────────────────
  resize();
  initAll();
  animId = requestAnimationFrame(loop);

  // Resize listener
  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas.parentElement || document.body);
}
