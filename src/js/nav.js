export function initNav() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (!nav) return;

  // Scroll handler: blur bg + show nav links
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) {
      nav.classList.add('scrolled');
      navLinks?.classList.add('visible');
    } else {
      nav.classList.remove('scrolled');
    }
    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Reveal nav links after preloader
  setTimeout(() => {
    navLinks?.classList.add('visible');
  }, 2800);
}
