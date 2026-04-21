document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.getElementById('navbar');
    const logoImg = document.getElementById('logo-img');
    
    // Rutas de tus dos logos
    const logoBlanco = 'img/logo-horizontal.png';
    const logoDorado = 'img/logo-dorado.png';

    window.addEventListener('scroll', () => {
        // En la página de contacto no hacemos el efecto, siempre es oscuro
        if (header.classList.contains('inner-header')) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Cambia físicamente al logo dorado
            if (logoImg) logoImg.src = logoDorado;
        } else {
            header.classList.remove('scrolled');
            // Regresa al logo blanco original
            if (logoImg) logoImg.src = logoBlanco;
        }
    });

    // Menú Móvil Desplegable
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Animaciones Fade-In
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Scroll Suave inteligente
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.pathname === window.location.pathname || (this.pathname === '/' && window.location.pathname.endsWith('index.html'))) {
                const targetId = this.hash;
                if(targetId) {
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
});