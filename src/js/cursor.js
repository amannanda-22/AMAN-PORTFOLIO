export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    rx = lerp(rx, mx, 0.1);
    ry = lerp(ry, my, 0.1);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    raf = requestAnimationFrame(loop);
  }

  loop();

  // Cursor states from data-cursor attributes
  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const state = el.dataset.cursor;
      document.body.classList.remove('cursor-hover', 'cursor-view');
      if (state === 'hover') {
        document.body.classList.add('cursor-hover');
        if (label) { label.textContent = ''; label.style.opacity = '0'; }
      } else if (state === 'view') {
        document.body.classList.add('cursor-view');
        if (label) { label.textContent = el.dataset.cursorLabel || 'VIEW'; label.style.opacity = '1'; }
      }
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover', 'cursor-view');
      if (label) label.style.opacity = '0';
    });
  });

  // Also apply hover to all links and buttons without explicit data-cursor
  document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor])').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Magnetic buttons
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-resume').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Show dot and ring on mouse enter
  document.documentElement.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  document.documentElement.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
}
