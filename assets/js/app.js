/* ═══════════════════════════════════════
   DESIGN STATION — app.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  /* ── Custom cursor ── */
  const cursor = qs('#js-cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    qsa('a, button, .col-card, .brand-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--big'));
    });
  }

  /* ── Nav scroll state ── */
  const nav = qs('#js-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = Number(el.dataset.delay ?? 0);
      setTimeout(() => el.classList.add('is-visible'), delay);
      revealObs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  qsa('.js-reveal').forEach(el => revealObs.observe(el));

  /* ── Hero Three.js 3D faucet ── */
  (function initHero3D() {
    if (typeof THREE === 'undefined') return;
    const canvas = qs('#js-hero-canvas');
    if (!canvas) return;

    const wrap = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;

    const scene  = new THREE.Scene();
    scene.background = new THREE.Color(0xede8dc);

    function getSize() { return { w: wrap.clientWidth, h: wrap.clientHeight || window.innerHeight }; }
    const { w, h } = getSize();

    const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
    camera.position.set(0, 0, 10);
    renderer.setSize(w, h);

    /* Brass material */
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc0a878,
      metalness: 0.92,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    /* Arch faucet body */
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0.00, -2.20, 0),
      new THREE.Vector3( 0.00, -1.40, 0),
      new THREE.Vector3( 0.00, -0.50, 0),
      new THREE.Vector3( 0.05,  0.20, 0),
      new THREE.Vector3( 0.22,  1.00, 0),
      new THREE.Vector3( 0.60,  1.65, 0),
      new THREE.Vector3( 1.10,  2.00, 0),
      new THREE.Vector3( 1.62,  1.95, 0),
      new THREE.Vector3( 1.98,  1.60, 0),
      new THREE.Vector3( 2.12,  1.15, 0),
      new THREE.Vector3( 2.10,  0.62, 0),
    ], false, 'catmullrom', 0.45);

    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(archCurve, 160, 0.075, 32, false),
      brassMat
    );
    tube.castShadow = true;

    /* Tip cap */
    const tipPt  = archCurve.getPoint(1);
    const tipCap = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), brassMat);
    tipCap.position.copy(tipPt);

    /* Base cylinder */
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.30, 0.40, 40),
      brassMat
    );
    base.position.set(0, -2.40, 0);
    base.castShadow = true;

    /* Round valve knob */
    const knob = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.21, 0.14, 40),
      brassMat
    );
    knob.position.set(0, -1.58, 0);

    /* Knurling detail ring */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.21, 0.026, 14, 48),
      brassMat
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(knob.position);

    const faucetGroup = new THREE.Group();
    faucetGroup.add(tube, tipCap, base, knob, ring);
    faucetGroup.position.set(-0.85, 0.15, 0);
    scene.add(faucetGroup);

    /* Water particles */
    const COUNT   = 300;
    const pos     = new Float32Array(COUNT * 3);
    const vel     = new Float32Array(COUNT);
    const worldTip = tipPt.clone().add(faucetGroup.position);

    for (let i = 0; i < COUNT; i++) {
      pos[i*3]   = worldTip.x + (Math.random() - 0.5) * 0.08;
      pos[i*3+1] = worldTip.y - Math.random() * 4.2;
      pos[i*3+2] = (Math.random() - 0.5) * 0.08;
      vel[i]     = -(Math.random() * 0.045 + 0.02);
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x7a9baa,
      size: 0.052,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));
    const dropFloor = worldTip.y - 5.8;

    function resetDrop(i) {
      pos[i*3]   = worldTip.x + (Math.random() - 0.5) * 0.08;
      pos[i*3+1] = worldTip.y;
      pos[i*3+2] = (Math.random() - 0.5) * 0.08;
      vel[i]     = -(Math.random() * 0.045 + 0.02);
    }

    /* Lighting — warm studio */
    scene.add(new THREE.AmbientLight(0xfdf4e8, 0.55));

    const key = new THREE.DirectionalLight(0xfff8f0, 2.0);
    key.position.set(4, 7, 5);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe0eef8, 0.6);
    fill.position.set(-5, 2, 3);
    scene.add(fill);

    const rim = new THREE.PointLight(0x9a9b78, 1.6, 22); // sage rim
    rim.position.set(-4, 5, -4);
    scene.add(rim);

    const bot = new THREE.PointLight(0xc0a878, 0.5, 14);
    bot.position.set(2, -4, 3);
    scene.add(bot);

    /* Mouse interaction */
    let mx = 0, my = 0, rY = 0, rX = 0;
    const heroEl = qs('#hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', e => {
        const r = heroEl.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width)  * 2 - 1;
        my = ((e.clientY - r.top)  / r.height) * 2 - 1;
      });
      heroEl.addEventListener('mouseleave', () => { mx = 0; my = 0; });
    }

    /* Resize */
    new ResizeObserver(() => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }).observe(wrap);

    /* Animate */
    let t = 0;
    (function tick() {
      requestAnimationFrame(tick);
      t += 0.007;

      const tY = mx * 0.42 + Math.sin(t)       * 0.20;
      const tX = my * 0.20 + Math.cos(t * 0.6) * 0.09;
      rY += (tY - rY) * 0.035;
      rX += (tX - rX) * 0.035;

      faucetGroup.rotation.y = rY;
      faucetGroup.rotation.x = rX;
      knob.rotation.y  = t * 0.45;
      ring.rotation.y  = t * 0.45;

      const pArr = pGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        vel[i] -= 0.0018;
        pArr[i*3+1] += vel[i];
        if (pArr[i*3+1] < dropFloor) resetDrop(i);
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    })();
  })();

  /* ── Showroom carousel ── */
  const slides   = qsa('.showroom__slide');
  const dots     = qsa('.showroom__dot');
  const prevBtn  = qs('#js-prev');
  const nextBtn  = qs('#js-next');
  let   current  = 0;
  let   stTimer;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }
  function startCarousel() {
    clearInterval(stTimer);
    stTimer = setInterval(() => goTo(current + 1), 5000);
  }
  if (slides.length) {
    prevBtn?.addEventListener('click', () => { goTo(current - 1); startCarousel(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); startCarousel(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.target); startCarousel(); }));
    startCarousel();
  }

  /* ── Contact form ── */
  const form = qs('#js-contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = qs('button[type="submit"]', form);
      btn.textContent = '✓ درخواست ارسال شد';
      btn.style.background = 'var(--sage-dk)';
      btn.disabled = true;
    });
  }

  /* ── Smooth anchor scroll ── */
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
