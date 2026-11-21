// Año del pie de página
var y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Menú móvil
var burger = document.querySelector('.burger');
var menu = document.querySelector('.menu');
if (burger && menu) {
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    burger.querySelector('path').setAttribute('d', open ? 'M5 5l14 14M19 5L5 19' : 'M3 8h18M3 16h18');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelector('path').setAttribute('d', 'M3 8h18M3 16h18');
    });
  });
}
