// ===== CAROUSEL =====
        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        const counter = document.getElementById('carouselCounter');
        const slides = document.querySelectorAll('.carousel-slide');
        const total = slides.length;
        let current = 0;
        let autoplayTimer;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            document.querySelectorAll('.carousel-dot').forEach((d, i) =>
                d.classList.toggle('active', i === current)
            );
            counter.textContent = `${current + 1} / ${total}`;
        }

        document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
        document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

        function startAutoplay() { autoplayTimer = setInterval(() => goTo(current + 1), 4000); }
        function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }
        startAutoplay();

        let touchStartX = 0;
        track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); resetAutoplay(); }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') { goTo(current - 1); resetAutoplay(); }
            if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoplay(); }
        });

        // ===== MODALS =====
        function openModal(id) {
            document.getElementById(id).classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('open');
            document.body.style.overflow = '';
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.open').forEach(m => {
                    m.classList.remove('open');
                    document.body.style.overflow = '';
                });
            }
        });

        // ===== HAMBURGER MENU =====
        function toggleMenu() {
            const hamburger = document.getElementById('hamburger');
            const navPanel = document.getElementById('navPanel');
            const navOverlay = document.getElementById('navOverlay');
            hamburger.classList.toggle('open');
            navPanel.classList.toggle('open');
            navOverlay.classList.toggle('open');
            document.body.style.overflow = navPanel.classList.contains('open') ? 'hidden' : '';
        }
        // ===== FLOATING COFFEE CUPS =====
const bg = document.createElement('div');
bg.className = 'coffee-bg';
document.body.appendChild(bg);

const emojis = ['☕', '🫖', '☕', '🍵', '🍵'];

for (let i = 0; i < 18; i++) {
    const cup = document.createElement('div');
    cup.className = 'cup';
    cup.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    cup.style.left = Math.random() * 100 + 'vw';
    cup.style.fontSize = (1.2 + Math.random() * 2.5) + 'rem';
    cup.style.animationDuration = (12 + Math.random() * 20) + 's';
    cup.style.animationDelay = -(Math.random() * 30) + 's';
    cup.style.opacity = (0.1 + Math.random() * 0.08).toString();
    bg.appendChild(cup);
}