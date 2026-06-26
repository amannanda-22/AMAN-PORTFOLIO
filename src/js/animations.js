// All GSAP-powered animations: reveals, marquee, parallax, counters, timeline

export function initAnimations() {
  // ─── Wait for GSAP ──────────────────────────────────────────────────────────
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ─── Scroll Progress ─────────────────────────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.width = (self.progress * 100) + '%';
      },
    });
  }

  // ─── Section Counter ─────────────────────────────────────────────────────────
  const counterCurrent = document.getElementById('counter-current');
  const sections = document.querySelectorAll('section[data-index]');
  if (counterCurrent && sections.length) {
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => { counterCurrent.textContent = String(sec.dataset.index).padStart(2, '0'); },
        onEnterBack: () => { counterCurrent.textContent = String(sec.dataset.index).padStart(2, '0'); },
      });
    });
  }

  // ─── Hero entrance ───────────────────────────────────────────────────────────
  const clips = document.querySelectorAll('.clip-inner');
  if (clips.length) {
    gsap.to(clips, {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.08,
      delay: 2.4, // after preloader
    });
  }

  const heroItems = [
    '.hero-eyebrow', '.hero-role-wrap', '.hero-tagline', '.hero-ctas',
    '.hero-status', '.hero-stats-bar',
  ];
  gsap.fromTo(heroItems.join(','), {
    y: 30, opacity: 0,
  }, {
    y: 0, opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 2.8,
  });

  // ─── Generic scroll reveals ───────────────────────────────────────────────────
  function revealOnScroll(selector, fromVars, toVars, triggerOpts = {}) {
    document.querySelectorAll(selector).forEach(el => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          ...triggerOpts,
        },
      });
    });
  }

  revealOnScroll('.reveal-up', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
  revealOnScroll('.reveal-left', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
  revealOnScroll('.reveal-right', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

  // Section headings + labels
  document.querySelectorAll('.section-heading, .section-label, .section-sub').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    );
  });

  // ─── Project rows ─────────────────────────────────────────────────────────────
  document.querySelectorAll('.project-row').forEach(row => {
    const [left, right] = row.children;
    if (left) gsap.fromTo(left, { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none none' },
    });
    if (right) gsap.fromTo(right, { x: 50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none none' },
    });
  });

  // ─── Timeline line draw ───────────────────────────────────────────────────────
  document.querySelectorAll('.timeline-line-fill').forEach(fill => {
    gsap.to(fill, {
      scaleY: 1,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: fill.closest('.timeline'),
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: 0.5,
      },
    });
  });

  // Timeline cards stagger
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item, { x: -30, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // ─── Bento cards stagger ──────────────────────────────────────────────────────
  document.querySelectorAll('.bento-card').forEach((card, i) => {
    gsap.fromTo(card, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      delay: (i % 3) * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // ─── CountUp for stats ────────────────────────────────────────────────────────
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
          },
          onComplete() {
            el.textContent = prefix + target.toFixed(decimals) + suffix;
          },
        });
      },
    });
  });

  // ─── Marquee (main strip) ─────────────────────────────────────────────────────
  function initMarquee(container, speed = 0.5) {
    const track = container.querySelector('.marquee-track');
    if (!track) return;

    // Clone items to fill
    const clone = track.cloneNode(true);
    container.appendChild(clone);

    let x = 0;
    const width = track.offsetWidth;

    function loop() {
      x -= speed;
      if (Math.abs(x) >= width) x = 0;
      track.style.transform = `translateX(${x}px)`;
      clone.style.transform = `translateX(${x + width}px)`;
      requestAnimationFrame(loop);
    }

    loop();
  }

  document.querySelectorAll('.marquee-strip').forEach(strip => {
    initMarquee(strip, 0.6);
  });

  // ─── Skill rows infinite scroll ───────────────────────────────────────────────
  document.querySelectorAll('.skill-row').forEach(row => {
    const track = row.querySelector('.skill-track');
    const items = row.querySelector('.skill-items');
    const dir = row.dataset.dir === 'right' ? 1 : -1;
    const speed = parseFloat(row.dataset.speed || '0.5');
    if (!track || !items) return;

    // Clone for seamless loop
    const clone = items.cloneNode(true);
    track.appendChild(clone);

    let x = dir === -1 ? 0 : -items.offsetWidth;

    function loop() {
      x += dir * speed;
      const w = items.offsetWidth;
      if (dir === -1 && x <= -w) x = 0;
      if (dir === 1 && x >= 0) x = -w;
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(loop);
    }

    loop();
  });

  // ─── Project card 3D tilt ─────────────────────────────────────────────────────
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ─── About left column parallax ───────────────────────────────────────────────
  const aboutLeft = document.querySelector('.about-left');
  if (aboutLeft) {
    gsap.fromTo(aboutLeft, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '#about', start: 'top 80%' },
    });
  }

  // ─── Hero role ticker ─────────────────────────────────────────────────────────
  const roles = [
    'Generative AI Engineer',
    'Multi-Agent Systems Builder',
    'NLP & LLM Specialist',
    'Quantum ML Researcher',
    'Data Analytics Expert',
  ];

  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    let idx = 0;

    function nextRole() {
      roleEl.classList.add('exit');
      setTimeout(() => {
        idx = (idx + 1) % roles.length;
        roleEl.textContent = roles[idx];
        roleEl.classList.remove('exit');
        roleEl.classList.add('enter');
        setTimeout(() => roleEl.classList.remove('enter'), 50);
      }, 600);
    }

    setInterval(nextRole, 3000);
  }

  // ─── Footer glow on hover ─────────────────────────────────────────────────────
  const footerBg = document.querySelector('.footer-bg-text');
  if (footerBg) {
    ScrollTrigger.create({
      trigger: 'footer',
      start: 'top 90%',
      onEnter: () => {
        gsap.to(footerBg, { color: '#1A1A18', duration: 1.5, ease: 'power2.out' });
      },
    });
  }
}
