document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('navbar');
    const logoImg = document.getElementById('logo-img');

    // Rutas de los dos logos
    const logoBlanco = 'img/logo-horizontal.png';
    const logoDorado = 'img/logo-dorado.png';

    // Precarga el logo dorado para que no parpadee al hacer scroll
    new Image().src = logoDorado;

    // Header: cambia de transparente a oscuro al hacer scroll (solo en la portada)
    if (header && !header.classList.contains('inner-header')) {
        let isScrolled = null;

        const updateHeader = () => {
            const shouldBeScrolled = window.scrollY > 50;
            if (shouldBeScrolled === isScrolled) return; // solo actúa cuando cambia el estado
            isScrolled = shouldBeScrolled;

            header.classList.toggle('scrolled', shouldBeScrolled);
            if (logoImg) logoImg.src = shouldBeScrolled ? logoDorado : logoBlanco;
        };

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader(); // aplica el estado correcto si la página carga ya desplazada
    }

    // Menú móvil desplegable
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        const setMenu = (open) => {
            navMenu.classList.toggle('active', open);
            menuToggle.setAttribute('aria-expanded', String(open));
            menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        };

        menuToggle.addEventListener('click', () => {
            setMenu(!navMenu.classList.contains('active'));
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
    }

    // Animaciones fade-in
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => appearOnScroll.observe(el));
    } else {
        // Navegadores antiguos: mostrar todo sin animación
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // El scroll suave a #servicios lo hace el CSS (scroll-behavior: smooth),
    // por eso ya no hace falta código extra aquí.
});
