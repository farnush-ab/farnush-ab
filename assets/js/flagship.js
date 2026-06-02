// Design Station — Flagship interactions
// Outline cursor, scroll-reveal, hero shine, brand hover, tile tilt,
// smart switch toggle, form floating labels, nav state, footer time.

(function () {
  // ---------- Cursor ----------
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
  function cursorLoop() {
    const ax = (tx - x) * 0.18 - vx * 0.20;
    const ay = (ty - y) * 0.18 - vy * 0.20;
    vx += ax; vy += ay;
    x += vx; y += vy;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  const hoverSel = 'a, button, .tile, .brand, .smart-switch, .field input, .field select, .submit';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.add('is-hover');
    if (e.target.matches('input, select')) cursor.classList.add('is-text');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
    if (e.target.matches('input, select')) cursor.classList.remove('is-text');
  });

  // ---------- Scroll-reveal ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));

  // ---------- Nav scroll state + active section ----------
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__menu a');
  const sections = ['concept', 'brands', 'experience', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
    // active section
    let cur = 'concept';
    const probe = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((s) => {
      if (s.offsetTop <= probe) cur = s.id;
    });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hero — slow Ken Burns + cursor shine + intro ----------
  const heroStage = document.querySelector('.hero__stage');
  if (heroStage) {
    requestAnimationFrame(() => heroStage.classList.add('is-ready'));

    const shine = heroStage.querySelector('.hero__shine');
    heroStage.addEventListener('pointermove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      heroStage.style.setProperty('--shine-x', sx + '%');
      heroStage.style.setProperty('--shine-y', sy + '%');
    });

    // Parallax fade on scroll
    const heroCaption = document.querySelector('.hero__caption');
    window.addEventListener('scroll', () => {
      const rect = heroStage.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / vh));
      heroStage.style.transform = `translateY(${p * 60}px) scale(${1 - p * 0.04})`;
      heroStage.style.opacity = String(1 - p * 0.7);
      if (heroCaption) heroCaption.style.opacity = String(1 - p * 1.4);
    }, { passive: true });
  }

  // ---------- Smart switch — toggle the concept visual ----------
  const sw = document.querySelector('.smart-switch');
  if (sw) {
    const visual = document.querySelector('.concept__visual');
    sw.addEventListener('click', () => {
      const on = sw.classList.contains('is-on');
      sw.classList.toggle('is-on', !on);
      sw.classList.toggle('is-off', on);
      if (visual) visual.classList.toggle('is-dim', on);
    });
  }

  // ---------- Tile tilt (3D-feel) ----------
  document.querySelectorAll('.tile').forEach((tile) => {
    let tmx = 0, tmy = 0, lmx = 0, lmy = 0;
    tile.addEventListener('pointermove', (e) => {
      const rect = tile.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    tile.addEventListener('pointerleave', () => { tmx = 0; tmy = 0; });

    function tileLoop() {
      lmx += (tmx - lmx) * 0.08;
      lmy += (tmy - lmy) * 0.08;
      tile.style.transform = `perspective(1000px) rotateY(${lmx * 4}deg) rotateX(${-lmy * 4}deg) translateZ(0)`;
      const visual = tile.querySelector('.tile__visual');
      if (visual) visual.style.transform = `translate(${lmx * 12}px, ${lmy * 12}px) scale(1.04)`;
      requestAnimationFrame(tileLoop);
    }
    tileLoop();
  });

  // ---------- Form floating labels — set has-value when filled ----------
  document.querySelectorAll('.field select').forEach((sel) => {
    sel.classList.toggle('has-value', !!sel.value);
    sel.addEventListener('change', () => sel.classList.toggle('has-value', !!sel.value));
  });

  // ---------- Footer time greeting ----------
  function setFootTime() {
    const el = document.querySelector('[data-time]');
    if (!el) return;
    const isFa = document.documentElement.lang === 'fa';
    const now = new Date();
    const locale = isFa ? 'fa-IR' : 'en-GB';
    let str;
    try {
      str = new Intl.DateTimeFormat(locale, {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tehran'
      }).format(now);
    } catch (e) {
      const h = now.getUTCHours() + 3, m = now.getUTCMinutes() + 30;
      const hh = ((h + (m >= 60 ? 1 : 0)) % 24).toString().padStart(2,'0');
      const mm = (m % 60).toString().padStart(2,'0');
      str = `${hh}:${mm}`;
    }
    // For greeting calc, get hour in latin digits
    let hourStr;
    try {
      hourStr = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', hour12: false, timeZone: 'Asia/Tehran'
      }).format(now);
    } catch (e) { hourStr = '12'; }
    const hh = Number(hourStr.slice(0,2));
    let greet;
    if (isFa) {
      if (hh < 5) greet = 'شب بخیر';
      else if (hh < 12) greet = 'صبح بخیر';
      else if (hh < 17) greet = 'ظهر بخیر';
      else greet = 'غروب بخیر';
      el.innerHTML = `${greet}، تهران &nbsp;·&nbsp; ${str}`;
    } else {
      if (hh < 5) greet = 'Late night';
      else if (hh < 12) greet = 'Good morning';
      else if (hh < 17) greet = 'Good afternoon';
      else greet = 'Good evening';
      el.innerHTML = `${greet}, Tehran &nbsp;·&nbsp; ${str}`;
    }
  }
  setFootTime();
  setInterval(setFootTime, 30000);

  // ---------- Nav meta time ----------
  function setNavMeta() {
    const el = document.querySelector('[data-nav-time]');
    if (!el) return;
    const isFa = document.documentElement.lang === 'fa';
    const locale = isFa ? 'fa-IR' : 'en-GB';
    let str;
    try {
      str = new Intl.DateTimeFormat(locale, {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tehran'
      }).format(new Date());
    } catch (e) { str = '—'; }
    el.textContent = isFa ? `تهران · ${str}` : `Tehran · ${str}`;
  }
  setNavMeta();
  setInterval(setNavMeta, 30000);
})();
