/* ==========================================================
   CURSOS VIRTUAIS — INTERAÇÕES DO SITE
   ========================================================== */

// 1. Elementos principais
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

// 2. Cabeçalho ao rolar a página
function updateHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// 3. Menu responsivo
function closeMenu() {
  document.body.classList.remove('menu-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }
}
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 1050) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

// 4. Destaca a página atual no menu
const currentPage = document.body.dataset.page;
if (currentPage && nav) {
  const activeLink = nav.querySelector(`[data-page="${currentPage}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// 5. Animações de entrada durante o scroll
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// 6. Ano automático no rodapé
document.querySelectorAll('[data-year]').forEach(item => {
  item.textContent = new Date().getFullYear();
});

// 7. Parallax discreto no hero da página inicial
const heroImage = document.querySelector('.hero-bg');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroImage && !reduceMotion) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImage.style.transform = `scale(1.04) translateY(${window.scrollY * 0.08}px)`;
    }
  }, { passive: true });
}
