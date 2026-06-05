/* =========================================
   DESIGN STATION — main.js
   ========================================= */

(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.09;
    followerY += (mouseY - followerY) * 0.09;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .brand-item, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor-follower--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor-follower--hover');
    });
  });

  /* ── Hero Media Ken Burns ── */
  const heroMedia = document.querySelector('.hero__img, .hero__video');
  if (heroMedia) {
    if (heroMedia.tagName === 'VIDEO') {
      requestAnimationFrame(() => heroMedia.classList.add('loaded'));
    } else if (heroMedia.complete) {
      heroMedia.classList.add('loaded');
    } else {
      heroMedia.addEventListener('load', () => heroMedia.classList.add('loaded'));
    }
  }

  /* ── Hero Text Entrance ── */
  function initHeroAnimations() {
    const targets = [
      document.querySelector('.hero__eyebrow'),
      ...document.querySelectorAll('.hero__title-line'),
      document.querySelector('.hero__sub'),
    ];
    targets.forEach(el => el && el.classList.add('active'));
  }
  window.addEventListener('load', initHeroAnimations);

  /* ── Nav State ── */
  const nav = document.getElementById('nav');
  function updateNav() {
    const atTop = window.scrollY < 80;
    nav.classList.toggle('scrolled', !atTop);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Scroll Reveal ── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Parallax on showroom image ── */
  const parallaxImg = document.querySelector('.parallax-img');
  if (parallaxImg) {
    function onScroll() {
      const parent = parallaxImg.closest('.showroom-hero');
      if (!parent) return;
      const rect   = parent.getBoundingClientRect();
      const vh     = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (rect.top / vh);
      const offset   = progress * 60;
      parallaxImg.style.transform = `translateY(${offset}px) scale(1.1)`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Smooth Anchor Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'ارسال شد ✓';
      btn.style.background = '#bc846c';
      btn.disabled = true;
    });
  }

  /* ── Brand items stagger on scroll ── */
  const brandObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = document.querySelectorAll('.brand-item');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 80);
          });
          brandObs.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );
  const brandsGrid = document.querySelector('.brands__grid');
  if (brandsGrid) brandObs.observe(brandsGrid);

})();
