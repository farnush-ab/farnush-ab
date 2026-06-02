// INHABITED — interaction layer
// Self-contained: cursor + parallax + scroll-reveal.

(function () {
  // ---- Cursor ----
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let tx = 0, ty = 0, x = 0, y = 0;
  let vx = 0, vy = 0;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
  function loop() {
    const ax = (tx - x) * 0.16 - vx * 0.20;
    const ay = (ty - y) * 0.16 - vy * 0.20;
    vx += ax; vy += ay;
    x += vx; y += vy;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const hoverSel = 'a, button, .hotspot, .studio-cards button, .choice-list label, .contents__item, .indexlist__row';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.add('is-hover');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
  });

  // ---- Scroll-reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-clip, .reveal-image').forEach((el) => io.observe(el));

  // ---- Parallax (mouse + scroll) ----
  // Mouse parallax for hero
  const coverTitle = document.querySelector('.cover__title');
  const coverShadow = document.querySelector('.cover__shadow');
  let mX = 0, mY = 0, tmX = 0, tmY = 0;

  if (coverTitle || coverShadow) {
    window.addEventListener('pointermove', (e) => {
      tmX = (e.clientX / window.innerWidth - 0.5) * 2;
      tmY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    function tickPx() {
      mX += (tmX - mX) * 0.06;
      mY += (tmY - mY) * 0.06;
      if (coverTitle) coverTitle.style.transform = `translate(${mX * -6}px, ${mY * -4}px)`;
      if (coverShadow) coverShadow.style.transform = `translate(${mX * 32}px, ${mY * 18}px)`;
      requestAnimationFrame(tickPx);
    }
    tickPx();
  }

  // Scroll parallax — spread image scales gently as it scrolls past
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  function onScroll() {
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const p = (center - vh / 2) / vh; // -1..1 across viewport
      const speed = Number(el.dataset.parallax) || 0.15;
      el.style.transform = `translateY(${p * speed * 100}px)`;
    });

    // Cover title scroll-fade
    const cover = document.querySelector('.cover');
    if (cover) {
      const sc = window.scrollY;
      const cH = cover.offsetHeight;
      const fade = Math.max(0, 1 - sc / (cH * 0.7));
      const titleEl = document.querySelector('.cover__title');
      if (titleEl) titleEl.style.opacity = fade;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Reserve page interactions ----
  document.querySelectorAll('.studio-cards button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.studio-cards button').forEach((x) => x.classList.remove('is-on'));
      b.classList.add('is-on');
      const sum = document.querySelector('[data-sum="studio"]');
      if (sum) sum.textContent = b.dataset.studio || b.querySelector('.name').textContent.trim();
    });
  });

  document.querySelectorAll('.choice-list input').forEach((inp) => {
    inp.addEventListener('change', () => {
      const sum = document.querySelector('[data-sum="intent"]');
      if (sum) {
        const lbl = inp.closest('label').querySelector('span');
        if (lbl) sum.textContent = lbl.textContent.trim();
      }
    });
  });
})();
