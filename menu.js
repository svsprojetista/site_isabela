document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-wrapper');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      menu.classList.remove('open');
    }
  });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && e.target !== toggle) {
      menu.classList.remove('open');
    }
  });
});