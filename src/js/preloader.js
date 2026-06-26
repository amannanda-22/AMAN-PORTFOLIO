export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const letters = document.querySelectorAll('.pl-letter span');
  const counter = document.getElementById('preloader-counter');
  const topPanel = document.getElementById('preloader-top');
  const botPanel = document.getElementById('preloader-bot');

  if (!preloader || !letters.length) {
    onComplete?.();
    return;
  }

  document.body.style.overflow = 'hidden';

  // Use native GSAP from CDN
  const tl = gsap.timeline();

  // Reveal letters with stagger
  tl.to(letters, {
    y: '0%',
    duration: 1,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.2,
  });

  // Count up
  let count = 0;
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 15) + 5;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
    }
    if (counter) counter.textContent = count + '%';
  }, 40);

  // Exit: wipe panels + fade letters
  tl.to(letters, {
    y: '-110%',
    duration: 0.6,
    ease: 'power3.in',
    stagger: 0.04,
    delay: 0.6,
  })
  .to(topPanel, {
    yPercent: -100,
    duration: 0.7,
    ease: 'power3.inOut',
  }, '-=0.3')
  .to(botPanel, {
    yPercent: 100,
    duration: 0.7,
    ease: 'power3.inOut',
  }, '<')
  .add(() => {
    preloader.style.pointerEvents = 'none';
    preloader.style.visibility = 'hidden';
    document.body.style.overflow = '';
    onComplete?.();
  });
}
