/* ═══════════════════════════════════════
   DESIGN STATION — app.js
   Emil animation principles:
   ✓ Durations 180-250ms
   ✓ ease-out on all hover interactions
   ✓ Stagger 50-80ms between entries
   ✓ Keyboard actions → no animation
   ✓ Hover gated with CSS @media(hover:hover)
═══════════════════════════════════════ */

(function () {
  'use strict';

  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  /* ── Custom cursor ───────────────────── */
  const cursor = qs('#js-cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    });
    document.querySelectorAll('a, button, .brand-row__trigger').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--big'));
    });
  }

  /* ── Nav scroll state ────────────────── */
  const nav = qs('#js-nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Scroll reveal ───────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = Number(el.dataset.delay ?? 0);
      setTimeout(() => el.classList.add('is-visible'), delay);
      revealObs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  qsa('.js-reveal').forEach(el => revealObs.observe(el));

  /* ── Hero 3D tilt ────────────────────── */
  const heroStage = qs('#js-hero-stage');
  const heroCard  = qs('#js-hero-card');

  if (heroCard && window.matchMedia('(hover: hover)').matches) {
    heroStage.addEventListener('mousemove', e => {
      const rect = heroCard.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
      const dy   = (e.clientY - cy) / (rect.height / 2);
      heroCard.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg) translateZ(8px)`;
    });
    heroStage.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  }

  /* ── Brand drawers ───────────────────── */
  qsa('.brand-row').forEach(row => {
    const btn    = qs('.brand-row__trigger', row);
    const drawer = qs('.brand-drawer', row);
    if (!btn || !drawer) return;

    // Remove native hidden so CSS max-height transition works
    drawer.removeAttribute('hidden');
    drawer.style.maxHeight = '0';
    drawer.style.opacity   = '0';
    drawer.style.overflow  = 'hidden';

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close any open drawer first
      qsa('.brand-row__trigger[aria-expanded="true"]').forEach(other => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        const otherDrawer = other.nextElementSibling;
        if (otherDrawer) {
          otherDrawer.style.maxHeight = '0';
          otherDrawer.style.opacity   = '0';
        }
      });

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        drawer.style.maxHeight = '0';
        drawer.style.opacity   = '0';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        drawer.style.maxHeight = '400px';
        drawer.style.opacity   = '1';
      }
    });
  });

  /* ── Showroom carousel ───────────────── */
  const slides    = qsa('.showroom__slide');
  const dots      = qsa('.showroom__dot');
  const prevBtn   = qs('#js-prev');
  const nextBtn   = qs('#js-next');
  let   current   = 0;
  let   carouselTimer;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goTo(current + 1), 5000);
  }

  if (slides.length) {
    prevBtn?.addEventListener('click', () => { goTo(current - 1); startCarousel(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); startCarousel(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.target); startCarousel(); }));
    startCarousel();
  }

  /* ── Testimonials carousel ───────────── */
  const tTrack  = qs('#js-testimonials');
  const tDots   = qsa('#js-tdots .testimonials__dot');
  const tPrev   = qs('#js-tprev');
  const tNext   = qs('#js-tnext');
  const tSlides = qsa('.testimonial');
  let   tCur    = 0;
  let   tTimer;

  function tGoTo(idx) {
    tDots[tCur]?.classList.remove('is-active');
    tCur = (idx + tSlides.length) % tSlides.length;
    tTrack.style.transform = `translateX(${tCur * 100}%)`;
    tDots[tCur]?.classList.add('is-active');
  }

  function startTestimonials() {
    clearInterval(tTimer);
    tTimer = setInterval(() => tGoTo(tCur + 1), 6000);
  }

  if (tSlides.length) {
    tPrev?.addEventListener('click', () => { tGoTo(tCur - 1); startTestimonials(); });
    tNext?.addEventListener('click', () => { tGoTo(tCur + 1); startTestimonials(); });
    tDots.forEach(d => d.addEventListener('click', () => { tGoTo(+d.dataset.target); startTestimonials(); }));
    startTestimonials();

    // RTL: translateX is positive direction since body is RTL
    // Override: use negative for visual left-motion
    function tGoTo(idx) {
      tDots[tCur]?.classList.remove('is-active');
      tCur = (idx + tSlides.length) % tSlides.length;
      // Each slide is 100% wide; shift left by tCur steps
      tTrack.style.transform = `translateX(${tCur * -100}%)`;
      tDots[tCur]?.classList.add('is-active');
    }
    tGoTo(0);
  }

  /* ── Contact form ────────────────────── */
  const form = qs('#js-contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = qs('button[type="submit"]', form);
      btn.textContent = '✓ درخواست ارسال شد';
      btn.style.background = 'var(--taupe-dk)';
      btn.disabled = true;
    });
  }

  /* ── Smooth anchor scroll ─────────────── */
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = qs(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
