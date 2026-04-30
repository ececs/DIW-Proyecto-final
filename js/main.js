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

    // 5. Secuencia de Terminal Táctico (Animación Marvel)
    const startTerminalBtn = document.getElementById('start-terminal-btn');
    const terminalModal = document.getElementById('tactical-terminal');
    const terminalContent = document.getElementById('terminal-content');

    if (startTerminalBtn && terminalModal && terminalContent) {
        const terminalLines = [
            "> INITIALIZING HYPERION PROTOCOL...",
            "> ESTABLISHING SECURE UPLINK TO GLOBAL SATELLITE NETWORK...",
            "> ACCESSING S.H.I.E.L.D. OMEGA-LEVEL DATABASE...",
            "> [SYSTEM]: AUTHENTICATION GRANTED. WELCOME AGENT FURY.",
            "> DECRYPTING FILES: [██████████] 100%",
            "> EXTRACTING AGENT INTEL...",
            "> IRON_MAN.LOG -> DOWNLOADED",
            "> CAP_AMERICA.LOG -> DOWNLOADED",
            "> THOR_ODINSON.LOG -> DOWNLOADED",
            "> HULK_DATA.BIN -> DOWNLOADED",
            "> WARNING: ANOMALY DETECTED IN SOKOVIA RECORDS...",
            "> BYPASSING SECURITY FILTERS...",
            "> COMPILING TACTICAL INTERFACE...",
            "> SYSTEM READY. ACCESS GRANTED."
        ];

        let lineIndex = 0;

        const typeLine = () => {
            if (lineIndex < terminalLines.length) {
                const p = document.createElement('div');
                p.textContent = terminalLines[lineIndex];
                terminalContent.appendChild(p);
                terminalContent.scrollTop = terminalContent.scrollHeight;
                lineIndex++;
                setTimeout(typeLine, Math.random() * 150 + 50);
            } else {
                // Secuencia finalizada
                setTimeout(() => {
                    terminalModal.style.opacity = '0';
                    setTimeout(() => {
                        terminalModal.classList.remove('active');
                        terminalModal.style.display = 'none';
                        document.body.style.overflow = ''; // Restaurar scroll
                        
                        // Ir a la sección de agentes
                        const agentesSection = document.getElementById('agentes');
                        if (agentesSection) {
                            agentesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 500);
                }, 1000);
            }
        };

        startTerminalBtn.addEventListener('click', () => {
            // Iniciar música si estaba pausada
            if (bgMusic) bgMusic.play().catch(() => {});

            // Preparar terminal
            terminalContent.innerHTML = "";
            lineIndex = 0;
            
            // Bloquear scroll
            document.body.style.overflow = 'hidden';
            
            // Mostrar modal
            terminalModal.style.display = 'flex';
            setTimeout(() => {
                terminalModal.classList.add('active');
                terminalModal.style.opacity = '1';
                
                // Iniciar escritura
                setTimeout(typeLine, 500);
            }, 10);
        });
    }
});
