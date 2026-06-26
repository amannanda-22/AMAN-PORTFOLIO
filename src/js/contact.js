export function initContact() {
  const toast = document.getElementById('copy-toast');

  // ── Resume dropdown toggle ──────────────────────────────────
  const resumeBtn = document.getElementById('resume-btn');
  const resumeDropdown = document.getElementById('resume-dropdown');

  if (resumeBtn && resumeDropdown) {
    resumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resumeDropdown.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', () => {
      resumeDropdown.classList.remove('open');
    });

    // Keep open when clicking inside dropdown
    resumeDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  // ── Nav resume dropdown ─────────────────────────────────────
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const navResumeDropdown = document.getElementById('nav-resume-dropdown');

  if (navResumeBtn && navResumeDropdown) {
    navResumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navResumeDropdown.classList.toggle('open');
      // close hero one if open
      resumeDropdown?.classList.remove('open');
    });
    navResumeDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  function showToast(msg = 'Copied to clipboard!') {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied: ' + text);
      } catch {
        showToast('Copy failed — try manually');
      }
    });
  });

  // Copy rows (contact rows)
  document.querySelectorAll('.contact-row[data-copy-val]').forEach(row => {
    row.addEventListener('click', async () => {
      const val = row.dataset.copyVal;
      if (!val) return;
      try {
        await navigator.clipboard.writeText(val);
        showToast('Copied: ' + val);
      } catch {
        showToast('Copy failed');
      }
    });
  });

  // IST clock
  const clockEl = document.getElementById('hero-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Form — Web3Forms submission
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const key = form.querySelector('[name="access_key"]')?.value;
    if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
      formStatus.style.color = 'var(--ember)';
      formStatus.textContent = '⚠ Web3Forms key not set. Check index.html line with access_key.';
      return;
    }

    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        formStatus.style.color = 'var(--volt)';
        formStatus.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
        form.reset();
        submitBtn.textContent = 'SENT ✓';
        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE →';
          submitBtn.disabled = false;
          formStatus.textContent = '';
        }, 4000);
      } else {
        throw new Error(json.message || 'Failed');
      }
    } catch (err) {
      formStatus.style.color = 'var(--ember)';
      formStatus.textContent = '✕ Something went wrong. Email directly: nandaamannaidu@gmail.com';
      submitBtn.textContent = 'SEND MESSAGE →';
      submitBtn.disabled = false;
    }
  });
}
