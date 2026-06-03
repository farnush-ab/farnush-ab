// DESIGN STATION — Atelier v6
// Self-contained interaction layer per DESIGN-STATION-BRIEF.md

(function () {

  // ---------- Loader ----------
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('is-done'), 1700);
  });

  // ---------- Cursor (spring-damped, material-aware) ----------
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
  function curLoop() {
    const ax = (tx - x) * 0.18 - vx * 0.20;
    const ay = (ty - y) * 0.18 - vy * 0.20;
    vx += ax; vy += ay;
    x += vx; y += vy;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(curLoop);
  }
  curLoop();

  const hover = 'a, button, .brand, .scene-pills button, .date-strip button, .intent-list label, .story, .stories__scroller, .nav__cta, .booking__submit, input';
  const hotspotSel = '.hotspot';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(hotspotSel)) cursor.classList.add('is-hotspot');
    else if (e.target.closest(hover)) cursor.classList.add('is-hover');
    if (e.target.matches('input')) cursor.classList.add('is-text');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(hotspotSel)) cursor.classList.remove('is-hotspot');
    if (e.target.closest(hover)) cursor.classList.remove('is-hover');
    if (e.target.matches('input')) cursor.classList.remove('is-text');
  });

  // ---------- Scroll progress ----------
  const sp = document.querySelector('.scroll-progress__bar');
  function spTick() {
    if (!sp) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    sp.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0%';
  }
  window.addEventListener('scroll', spTick, { passive: true });
  spTick();

  // ---------- Nav scroll state + active section ----------
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__menu a');
  const sectionIds = ['statement', 'walkthrough', 'brands', 'smartlab', 'hub', 'stories', 'booking'];
  function navTick() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 80);
    let cur = sectionIds[0];
    const probe = window.scrollY + window.innerHeight * 0.35;
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= probe) cur = id;
    });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', navTick, { passive: true });
  navTick();

  // ---------- Scroll reveal ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));

  // ---------- Hero — sticky scroll parallax ----------
  const hero = document.querySelector('.hero');
  const heroL1 = document.querySelector('.hero__layer--l1');
  const heroL2 = document.querySelector('.hero__layer--l2');
  const heroL3 = document.querySelector('.hero__layer--l3');
  const heroL4 = document.querySelector('.hero__layer--l4');
  const heroTitle = document.querySelector('.hero__title-wrap');

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener('pointermove', (e) => {
    tmx = (e.clientX / window.innerWidth - 0.5) * 2;
    tmy = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function heroTick() {
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;

    if (!hero) { requestAnimationFrame(heroTick); return; }

    // Scroll progress inside hero (0..1 across the 200vh container)
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    const traveled = Math.max(0, Math.min(total, -rect.top));
    const sp = total > 0 ? traveled / total : 0;

    // Layer parallax (mouse + scroll combined)
    if (heroL1) heroL1.style.transform = `translate(${mx * 8}px, ${-my * 6 + sp * 30}px) scale(${1 + sp * 0.04})`;
    if (heroL2) heroL2.style.transform = `translate(${mx * 14}px, ${-my * 10 + sp * 40}px)`;
    if (heroL3) {
      // L3 (product close-up) fades in and grows as user scrolls
      heroL3.style.transform = `translate(${mx * 24}px, ${-my * 18 - sp * 60}px) scale(${1 + sp * 0.45})`;
      heroL3.style.opacity = String(Math.min(1, sp * 1.4));
    }
    if (heroL4) {
      // L4 (foreground detail) appears late
      heroL4.style.transform = `translate(${mx * 38}px, ${-my * 28 - sp * 90}px) scale(${1 + sp * 0.7})`;
      heroL4.style.opacity = String(Math.max(0, (sp - 0.3) * 2));
    }

    if (heroTitle) {
      heroTitle.style.transform = `translate(${mx * -4}px, ${my * -3}px)`;
      heroTitle.style.opacity = String(Math.max(0, 1 - sp * 1.2));
    }

    requestAnimationFrame(heroTick);
  }
  heroTick();

  // ---------- Walkthrough — room dissolves + dot picker ----------
  const rooms = document.querySelectorAll('.walkthrough__room');
  const rdots = document.querySelectorAll('.walkthrough__dots button');
  const wnav = document.querySelector('.walkthrough__nav');
  let activeRoom = 0;

  function showRoom(i) {
    activeRoom = (i + rooms.length) % rooms.length;
    rooms.forEach((r, idx) => r.classList.toggle('is-active', idx === activeRoom));
    rdots.forEach((d, idx) => d.classList.toggle('is-on', idx === activeRoom));
    if (wnav) {
      const isFa = document.documentElement.lang === 'fa';
      const cur = isFa ? new Intl.NumberFormat('fa-IR').format(activeRoom + 1) : (activeRoom + 1).toString().padStart(2, '0');
      const total = isFa ? new Intl.NumberFormat('fa-IR').format(rooms.length) : rooms.length.toString().padStart(2, '0');
      wnav.textContent = `${cur} / ${total}`;
    }
  }
  if (rooms.length) showRoom(0);
  rdots.forEach((d, i) => d.addEventListener('click', () => showRoom(i)));

  // Auto-advance the walkthrough on scroll progress
  const walkthrough = document.querySelector('.walkthrough');
  if (walkthrough && rooms.length > 1) {
    window.addEventListener('scroll', () => {
      const rect = walkthrough.getBoundingClientRect();
      const total = walkthrough.offsetHeight - window.innerHeight;
      const traveled = Math.max(0, Math.min(total, -rect.top));
      const sp = total > 0 ? traveled / total : 0;
      const target = Math.min(rooms.length - 1, Math.floor(sp * rooms.length));
      if (target !== activeRoom) showRoom(target);
    }, { passive: true });
  }

  // ---------- Smart Lab — scene picker + dim slider ----------
  const lab = document.querySelector('.smartlab');
  const scenes = document.querySelectorAll('.scene-pills button');
  const sceneTitle = document.querySelector('[data-scene-title]');
  const sceneSub = document.querySelector('[data-scene-sub]');

  const SCENE_COPY = {
    morning:  { title: 'بیداری',  sub: 'صبح · ۷:۰۰ · ۴۰۰۰K' },
    work:     { title: 'کار',     sub: 'روز · ۱۰:۳۰ · ۳۵۰۰K' },
    evening:  { title: 'شب',      sub: 'غروب · ۱۹:۴۰ · ۲۷۰۰K' },
    night:    { title: 'پایان',   sub: 'شب · ۲۳:۱۵ · ۲۲۰۰K' }
  };

  function setScene(name) {
    if (!lab) return;
    lab.dataset.scene = name;
    scenes.forEach((b) => b.classList.toggle('is-on', b.dataset.scene === name));
    const c = SCENE_COPY[name];
    if (c && sceneTitle) sceneTitle.textContent = c.title;
    if (c && sceneSub) sceneSub.textContent = c.sub;
  }
  scenes.forEach((b) => b.addEventListener('click', () => setScene(b.dataset.scene)));

  // Dim slider
  const railEl = document.querySelector('.dim-slider__rail');
  const fillEl = document.querySelector('.dim-slider__fill');
  const handleEl = document.querySelector('.dim-slider__handle');
  const valueEl = document.querySelector('.dim-slider__value');

  let dimValue = 65;
  function paintDim() {
    if (fillEl) fillEl.style.height = dimValue + '%';
    if (handleEl) handleEl.style.bottom = dimValue + '%';
    if (valueEl) {
      const isFa = document.documentElement.lang === 'fa';
      valueEl.textContent = (isFa ? new Intl.NumberFormat('fa-IR').format(Math.round(dimValue)) : Math.round(dimValue)) + '٪';
    }
    if (lab) lab.style.setProperty('--dim-mul', dimValue / 100);
  }
  paintDim();

  function dimFromEvent(e) {
    if (!railEl) return;
    const rect = railEl.getBoundingClientRect();
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    const pct = 100 - Math.max(0, Math.min(100, (y / rect.height) * 100));
    dimValue = pct;
    paintDim();
  }
  if (railEl) {
    let dragging = false;
    railEl.addEventListener('pointerdown', (e) => { dragging = true; dimFromEvent(e); railEl.setPointerCapture(e.pointerId); });
    railEl.addEventListener('pointermove', (e) => { if (dragging) dimFromEvent(e); });
    railEl.addEventListener('pointerup', () => { dragging = false; });
  }

  // ---------- Booking ----------
  const dateStrip = document.querySelector('.date-strip');
  const intentInputs = document.querySelectorAll('.intent-list input');
  const bookingForm = document.querySelector('.booking');
  const bookingWidget = document.querySelector('.booking__widget');
  const bookingSubmitWrap = document.querySelector('.booking__submit-wrap');
  const bookingSubmit = document.querySelector('.booking__submit');
  const bookingSuccess = document.querySelector('.booking__success');

  // Generate next 7 days
  if (dateStrip) {
    const isFa = document.documentElement.lang === 'fa';
    const dowFa = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const dowEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const btn = document.createElement('button');
      btn.type = 'button';
      const dow = isFa ? dowFa[(d.getDay() + 1) % 7] : dowEn[d.getDay()];
      const day = isFa ? new Intl.NumberFormat('fa-IR').format(d.getDate()) : d.getDate();
      btn.innerHTML = `<span class="dow">${dow}</span><span class="day">${day}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.date-strip button').forEach((b) => b.classList.remove('is-on'));
        btn.classList.add('is-on');
      });
      dateStrip.appendChild(btn);
    }
    // pre-select day 2
    const first = dateStrip.children[1];
    if (first) first.classList.add('is-on');
  }

  if (bookingSubmit) {
    bookingSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingWidget) bookingWidget.style.display = 'none';
      if (bookingSubmitWrap) bookingSubmitWrap.style.display = 'none';
      if (bookingSuccess) bookingSuccess.classList.add('is-visible');
    });
  }

  // Open booking via any data-book trigger by scrolling
  document.querySelectorAll('[data-book]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('booking');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- Newsletter ----------
  document.querySelectorAll('.newsletter').forEach((nl) => {
    nl.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = nl.querySelector('input');
      const btn = nl.querySelector('button');
      if (!inp.value.trim()) { inp.focus(); return; }
      const isFa = document.documentElement.lang === 'fa';
      const old = btn.textContent;
      btn.textContent = isFa ? 'ثبت شد ✓' : 'Subscribed ✓';
      inp.value = '';
      setTimeout(() => { btn.textContent = old; }, 2400);
    });
  });

  // ---------- Time greeting ----------
  function fmt(opts) {
    try { return new Intl.DateTimeFormat('fa-IR', { timeZone: 'Asia/Tehran', ...opts }).format(new Date()); }
    catch (e) { return '--:--'; }
  }
  function hourTehran() {
    try { return Number(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: 'Asia/Tehran' }).format(new Date()).slice(0, 2)); }
    catch (e) { return 19; }
  }
  function setTimes() {
    const t = fmt({ hour: '2-digit', minute: '2-digit', hour12: false });
    const h = hourTehran();
    let greet, daypart;
    if (h < 5) { greet = 'شب بخیر';      daypart = 'شب'; }
    else if (h < 12) { greet = 'صبح بخیر'; daypart = 'صبح'; }
    else if (h < 17) { greet = 'ظهر بخیر'; daypart = 'روز'; }
    else { greet = 'غروب بخیر';            daypart = 'غروب طلایی'; }

    const nm = document.querySelector('[data-nav-meta]');
    if (nm) nm.textContent = `تهران · ${t} · ${daypart}`;
    const fb = document.querySelector('[data-foot-time]');
    if (fb) fb.innerHTML = `${greet}، تهران &nbsp;·&nbsp; ${t}`;
  }
  setTimes();
  setInterval(setTimes, 30000);

})();
