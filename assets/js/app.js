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

  /* ── Hero Three.js 3D scene ──────────── */
  (function initHero3D() {
    if (typeof THREE === 'undefined') return;
    const canvas = qs('#js-hero-canvas');
    if (!canvas) return;

    const wrap   = canvas.parentElement;
    const W      = wrap.clientWidth;
    const H      = wrap.clientHeight;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    /* Scene & Camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    /* Materials */
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0bfa8, metalness: 0.88, roughness: 0.14,
      clearcoat: 1.0, clearcoatRoughness: 0.08,
    });

    /* ─ Arch faucet body (TubeGeometry) ─ */
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0.00, -2.10, 0),
      new THREE.Vector3( 0.00, -1.30, 0),
      new THREE.Vector3( 0.00, -0.40, 0),
      new THREE.Vector3( 0.05,  0.20, 0),
      new THREE.Vector3( 0.20,  0.90, 0),
      new THREE.Vector3( 0.55,  1.50, 0),
      new THREE.Vector3( 1.05,  1.85, 0),
      new THREE.Vector3( 1.55,  1.80, 0),
      new THREE.Vector3( 1.88,  1.50, 0),
      new THREE.Vector3( 2.00,  1.10, 0),
      new THREE.Vector3( 1.98,  0.65, 0),
    ], false, 'catmullrom', 0.45);

    const tubeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(archCurve, 140, 0.072, 28, false),
      brassMat
    );
    tubeMesh.castShadow = true;
    scene.add(tubeMesh);

    /* ─ Spout tip cap ─ */
    const tipPt  = archCurve.getPoint(1);
    const tipCap = new THREE.Mesh(new THREE.SphereGeometry(0.072, 20, 20), brassMat);
    tipCap.position.copy(tipPt);
    scene.add(tipCap);

    /* ─ Base cylinder ─ */
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.28, 0.35, 32),
      brassMat
    );
    base.position.set(0, -2.28, 0);
    base.castShadow = true;
    scene.add(base);

    /* ─ Valve / cross handle ─ */
    const valveGroup = new THREE.Group();
    valveGroup.position.set(0, -1.55, 0);

    const valveBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.10, 32), brassMat);
    valveGroup.add(valveBody);

    const armMat  = brassMat.clone();
    const armGeo  = new THREE.CylinderGeometry(0.035, 0.035, 0.72, 16);
    const arm1    = new THREE.Mesh(armGeo, armMat);
    const arm2    = new THREE.Mesh(armGeo, armMat);
    arm2.rotation.z = Math.PI / 2;
    valveGroup.add(arm1, arm2);
    scene.add(valveGroup);

    /* Center faucet group */
    const faucetGroup = new THREE.Group();
    faucetGroup.add(tubeMesh, tipCap, base, valveGroup);
    faucetGroup.position.x = -0.8;
    faucetGroup.position.y = 0.3;
    scene.add(faucetGroup);

    /* ─ Water particles ─ */
    const particleCount = 280;
    const positions     = new Float32Array(particleCount * 3);
    const velocities    = new Float32Array(particleCount);   // y velocity

    function resetParticle(i) {
      const worldTip = tipPt.clone();
      faucetGroup.localToWorld(worldTip);
      positions[i * 3]     = worldTip.x + (Math.random() - 0.5) * 0.06;
      positions[i * 3 + 1] = worldTip.y;
      positions[i * 3 + 2] = worldTip.z + (Math.random() - 0.5) * 0.06;
      velocities[i]         = -(Math.random() * 0.04 + 0.02);
    }

    for (let i = 0; i < particleCount; i++) {
      resetParticle(i);
      positions[i * 3 + 1] -= Math.random() * 3.5;   // spread vertically at start
    }

    const pGeo  = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat  = new THREE.PointsMaterial({
      color: 0xb8d8e8, size: 0.055, transparent: true, opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const dropFloor = faucetGroup.position.y - 4.5;

    /* ─ Lighting ─ */
    scene.add(new THREE.AmbientLight(0xfdf6ee, 0.55));

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f4ff, 0.5);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xbc846c, 1.2, 18);
    rimLight.position.set(-3, 4, -3);
    scene.add(rimLight);

    /* ─ Mouse tracking ─ */
    let mouseNX = 0, mouseNY = 0;
    let targetRotY = 0, targetRotX = 0;
    let currentRotY = 0, currentRotX = 0;

    const heroSection = qs('#hero');
    heroSection && heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      mouseNX = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouseNY = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
    });

    /* ─ Resize ─ */
    const resizeObs = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObs.observe(wrap);

    /* ─ Animate ─ */
    let autoAngle = 0;
    function tick() {
      requestAnimationFrame(tick);

      autoAngle += 0.006;

      targetRotY = mouseNX * 0.35 + Math.sin(autoAngle) * 0.18;
      targetRotX = mouseNY * 0.18 + Math.cos(autoAngle * 0.7) * 0.08;

      currentRotY += (targetRotY - currentRotY) * 0.04;
      currentRotX += (targetRotX - currentRotX) * 0.04;

      faucetGroup.rotation.y = currentRotY;
      faucetGroup.rotation.x = currentRotX;
      valveGroup.rotation.y  = autoAngle * 0.4;

      /* Update particles */
      const pArr = pGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        velocities[i] -= 0.0018;
        pArr[i * 3 + 1] += velocities[i];
        if (pArr[i * 3 + 1] < dropFloor) resetParticle(i);
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    tick();
  })();

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
