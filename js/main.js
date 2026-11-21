// Año del pie de página
var y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Menú móvil (panel lateral)
var burger = document.querySelector('.burger');
var drawer = document.getElementById('drawer');
var overlay = document.getElementById('drawer-overlay');
var closeBtn = document.getElementById('drawer-close');
function setDrawer(open) {
  if (!drawer) return;
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  if (burger) burger.setAttribute('aria-expanded', String(open));
  if (open && closeBtn) closeBtn.focus();
}
if (burger && drawer) {
  burger.addEventListener('click', function () { setDrawer(true); });
  closeBtn.addEventListener('click', function () { setDrawer(false); });
  overlay.addEventListener('click', function () { setDrawer(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
}

// Resalta en el menú móvil la sección visible
var links = drawer ? drawer.querySelectorAll('.drawer-nav a[href*="#"]') : [];
if (links.length && 'IntersectionObserver' in window) {
  var map = {};
  links.forEach(function (a) { var id = a.getAttribute('href').split('#')[1]; var sec = document.getElementById(id); if (sec) map[id] = a; });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('active'); });
        if (map[en.target.id]) map[en.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(function (id) { obs.observe(document.getElementById(id)); });
}

// Menú fijo al hacer scroll (solo escritorio)
var header = document.querySelector('header');
var icon = header && header.querySelector('.brand-icon');
var word = header && header.querySelector('.brand-word');
var desktop = window.matchMedia('(min-width: 1021px)');
function setLogo(light) {
  if (!icon || !word) return;
  icon.src = light ? 'img/logo-icono-claro.svg' : 'img/logo-icono.svg';
  word.src = light ? 'img/logo-texto-claro.svg' : 'img/logo-texto.svg';
}
function onScroll() {
  if (!header) return;
  var fixed = desktop.matches && window.scrollY > 120;
  if (fixed !== header.classList.contains('fixed')) {
    header.classList.toggle('fixed', fixed);
    setLogo(fixed);
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
desktop.addEventListener('change', onScroll);
onScroll();
// Precarga del logo claro para que el cambio sea instantáneo
['img/logo-icono-claro.svg', 'img/logo-texto-claro.svg'].forEach(function (s) { new Image().src = s; });
