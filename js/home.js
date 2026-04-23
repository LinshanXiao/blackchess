/* home.js — animated chess grid canvas + hero entrance */

(function () {
  /* ── ANIMATED CANVAS GRID ── */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, dots = [];
  const GOLD = 'rgba(184,151,90,';
  const COLS = 18;
  const ROWS = 10;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const gx = W / COLS;
    const gy = H / ROWS;
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        dots.push({
          x: c * gx,
          y: r * gy,
          baseX: c * gx,
          baseY: r * gy,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.4,
          amp:   4 + Math.random() * 8,
          size:  Math.random() > 0.85 ? 1.5 : 0.5,
        });
      }
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    /* draw grid lines */
    ctx.strokeStyle = GOLD + '0.06)';
    ctx.lineWidth = 0.5;

    const gx = W / COLS;
    const gy = H / ROWS;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * gx, 0);
      ctx.lineTo(c * gx, H);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * gy);
      ctx.lineTo(W, r * gy);
      ctx.stroke();
    }

    /* draw animated dots at intersections */
    dots.forEach(d => {
      d.x = d.baseX + Math.sin(t * d.speed + d.phase) * d.amp * 0.3;
      d.y = d.baseY + Math.cos(t * d.speed + d.phase * 1.3) * d.amp * 0.3;
      const alpha = 0.2 + 0.4 * Math.abs(Math.sin(t * d.speed + d.phase));
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + alpha + ')';
      ctx.fill();
    });

    /* draw a couple of moving highlight lines */
    const hl1 = (Math.sin(t * 0.4) * 0.5 + 0.5) * W;
    const grad1 = ctx.createLinearGradient(hl1 - 60, 0, hl1 + 60, 0);
    grad1.addColorStop(0, GOLD + '0)');
    grad1.addColorStop(0.5, GOLD + '0.12)');
    grad1.addColorStop(1, GOLD + '0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(hl1 - 60, 0, 120, H);

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  resize();
  draw();

  /* ── HERO ENTRANCE ── */
  const heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 180);
  });

  /* ── NUMBER COUNT-UP ── */
  function countUp(el, target, suffix, duration) {
    const isFloat = target % 1 !== 0;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = isFloat
        ? (target * ease).toFixed(2)
        : Math.round(target * ease);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* trigger count-up when stats enter viewport */
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        statsObs.unobserve(e.target);
        e.target.querySelectorAll('[data-count]').forEach(el => {
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          countUp(el, target, suffix, 1400);
        });
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.perf-card').forEach(c => statsObs.observe(c));

})();
