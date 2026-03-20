// Create and append loader to body
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('div');
    loader.id = 'loader-wrapper';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);

    const navLinks = document.querySelectorAll('#nav-list a, .logo, .footer-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Don't intercept if it's an anchor or blank
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
            
            e.preventDefault();
            loader.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 600); // 600ms delay for the animation
        });
    });
});

const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active'); // open/close nav
    menuToggle.classList.toggle('open'); // animate hamburger
});

// Close menu when a link is clicked
document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

// ===== script.js =====

// Fade-in sections on scroll
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.about-content, .grid-3, .card');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// ===== LIGHT / DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        localStorage.setItem('theme', theme);
    });
}

// ===== DROPDOWN TOGGLE ON CLICK =====
document.querySelectorAll('.dropdown > a').forEach(dropdownTitle => {
    dropdownTitle.addEventListener('click', (e) => {
        // Prevent default only if the href is javascript:void(0) or #
        const href = dropdownTitle.getAttribute('href');
        if (href === 'javascript:void(0)' || href === '#') {
            e.preventDefault();
        }
        
        const content = dropdownTitle.nextElementSibling;
        if (content && content.classList.contains('dropdown-content')) {
            // Close other open dropdowns first (if any)
            document.querySelectorAll('.dropdown-content.active').forEach(openContent => {
                if (openContent !== content) openContent.classList.remove('active');
            });
            content.classList.toggle('active');
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content.active').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// ===== COUNTER ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-anim');
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// --- MOUSE TRACKING GLOW ---
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
// --- DASHBOARD SIDEBAR TOGGLE ---
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}
