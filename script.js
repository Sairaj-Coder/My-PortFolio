const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Reveal-on-scroll animation
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

// Animated counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target || 0);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 45));

            const tick = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = `${target}+`;
                    return;
                }
                counter.textContent = current;
                requestAnimationFrame(tick);
            };

            tick();
            observer.unobserve(counter);
        });
    },
    { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Small tilt interaction on desktop project cards
const tiltEnabled = window.matchMedia('(pointer: fine)').matches;

if (tiltEnabled) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -2.4;
            const rotateY = ((x / rect.width) - 0.5) * 2.4;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Active nav item based on visible section
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

const activeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => activeObserver.observe(section));
