/* 
  ============================================================
  S.H.I.E.L.D. TERMINAL — INTERACTIVE LOGIC
  ============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("S.H.I.E.L.D. System Online...");

    // 1. Overlay de Carga
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }, 2500);
    }

    // 2. Control del Carrusel de Agentes
    const carousel = document.getElementById('agent-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 400;

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 3. Sistema de Sonido Dinámico
    const bgMusic = document.getElementById('bg-music');
    // El sonido se activa con la interacción del usuario en el Hero

    // 4. Animación de scroll para elementos (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.agent-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
});
