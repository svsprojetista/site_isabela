// ===== Site Isabela — fade.v1.js (Option C: JS-driven) =====
// - Mantém um gradiente único no body.
// - Aplica fade de alfa na imagem do hero com CSS mask, controlado por JS.
// - Aplica parallax Y leve (sem background-attachment:fixed, bom pro iOS).

(function(){
  const root = document.documentElement;
  const body = document.body;
  const hero = document.querySelector('.hero');
  if(!hero) return;

  // Configuração (ajuste fino rápido)
  const FADE_START_FRAC = 0.65;  // 65% da viewport: até aqui a imagem é 100% visível
  const FADE_END_FRAC   = 1.00;  // 100% da viewport: termina o fade
  const SHIFT_MAX_PX_DESKTOP = 120; // parallax máximo no desktop
  const SHIFT_MAX_PX_MOBILE  = 60;  // parallax máximo no mobile
  const MOBILE_BP = 560;            // breakpoint

  const supportsMask = CSS.supports('-webkit-mask-image','linear-gradient(black, transparent)') ||
                       CSS.supports('mask-image','linear-gradient(black, transparent)');

  if(supportsMask){
    body.classList.add('mask-ok');
  }

  function viewportHeight(){
    return (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  }

  function updateMaskStops(){
    const vh = viewportHeight();
    // Calcula posições em pixels para evitar variações de vh/svh
    const startPx = Math.round(FADE_START_FRAC * vh);
    const endPx   = Math.round(FADE_END_FRAC   * vh);

    root.style.setProperty('--mask-solid', startPx + 'px');
    root.style.setProperty('--mask-end',   endPx   + 'px');
  }

  function updateParallax(){
    const vh = viewportHeight();
    const scrollY = window.scrollY || window.pageYOffset || 0;
    // progresso no hero (0 topo -> 1 base do hero)
    const prog = Math.max(0, Math.min(1, scrollY / Math.max(1, vh)));
    const isMobile = window.innerWidth <= MOBILE_BP;
    const maxShift = isMobile ? SHIFT_MAX_PX_MOBILE : SHIFT_MAX_PX_DESKTOP;
    // desloca para cima conforme rola (efeito sutil)
    const shift = - Math.round(prog * maxShift);
    root.style.setProperty('--hero-shift', shift + 'px');
  }

  function onTick(){
    updateMaskStops();
    updateParallax();
  }

  // Eventos
  window.addEventListener('scroll', onTick, {passive:true});
  window.addEventListener('resize', onTick, {passive:true});
  window.addEventListener('orientationchange', onTick, {passive:true});
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', onTick, {passive:true});
  }

  // Primeira medição
  onTick();
})();
