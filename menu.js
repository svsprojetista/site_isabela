document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-wrapper');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
});