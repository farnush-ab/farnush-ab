const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Inertial cursor — overshoots and settles, like a weighted brush.
let tx = 0, ty = 0, x = 0, y = 0;
let vx = 0, vy = 0;          // velocity
let lastTime = performance.now();
let prevX = 0, prevY = 0;

window.addEventListener('pointermove', (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

function loop() {
  const now = performance.now();
  const dt = Math.min(40, now - lastTime); // ms, clamp
  lastTime = now;
  // Spring-damped (k=0.18, d=0.78) — feels heavy
  const ax = (tx - x) * 0.18 - vx * 0.22;
  const ay = (ty - y) * 0.18 - vy * 0.22;
  vx += ax;
  vy += ay;
  x += vx;
  y += vy;
  prevX = x;
  prevY = y;
  cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  requestAnimationFrame(loop);
}
loop();

const hoverable = 'a, button, .discipline, .curation__item, .studio, .intent-list label, .calendar__day.is-avail, .archive__item, .scenario__toggle button, .quiet-toggle';
const materialSelector = '[data-material]';

const materialClasses = ['material-brass', 'material-light', 'material-glass', 'material-stone'];
function clearMaterial() {
  materialClasses.forEach((c) => cursor.classList.remove(c));
}

document.addEventListener('pointerover', (e) => {
  if (e.target.closest(hoverable)) cursor.classList.add('is-hover');
  const mat = e.target.closest(materialSelector);
  if (mat) {
    clearMaterial();
    cursor.classList.add('material-' + mat.dataset.material);
  }
});
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(hoverable)) cursor.classList.remove('is-hover');
  if (e.target.closest(materialSelector)) clearMaterial();
});

// Trail canvas — light, only when over [data-material]
const trail = document.createElement('canvas');
trail.className = 'cursor__trail';
document.body.appendChild(trail);
const tctx = trail.getContext('2d');
function sizeTrail() {
  trail.width = window.innerWidth * window.devicePixelRatio;
  trail.height = window.innerHeight * window.devicePixelRatio;
  trail.style.width = window.innerWidth + 'px';
  trail.style.height = window.innerHeight + 'px';
  tctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
sizeTrail();
window.addEventListener('resize', sizeTrail);

const particles = [];
let activeMaterial = null;
document.addEventListener('pointerover', (e) => {
  const mat = e.target.closest(materialSelector);
  activeMaterial = mat ? mat.dataset.material : null;
});
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(materialSelector)) activeMaterial = null;
});

const MATERIAL_COLORS = {
  brass: 'rgba(201, 169, 110, ',
  light: 'rgba(255, 216, 154, ',
  glass: 'rgba(180, 200, 220, ',
  stone: 'rgba(160, 150, 140, ',
};

// Fluid-trail emission — particles inherit cursor velocity for a fluid feel
let lastEX = 0, lastEY = 0, lastET = performance.now();
window.addEventListener('pointermove', (e) => {
  if (!activeMaterial) { lastEX = e.clientX; lastEY = e.clientY; return; }
  const now = performance.now();
  const dt = Math.max(8, now - lastET);
  const evx = (e.clientX - lastEX) / dt;
  const evy = (e.clientY - lastEY) / dt;
  lastEX = e.clientX; lastEY = e.clientY; lastET = now;

  // Emit count proportional to velocity (faster = denser trail)
  const speed = Math.min(20, Math.hypot(evx, evy) * 12);
  const count = Math.max(2, Math.floor(speed * 0.6));

  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 4;
    particles.push({
      x: e.clientX + Math.cos(a) * r,
      y: e.clientY + Math.sin(a) * r,
      // Inherit velocity + diffusion + slight buoyancy
      vx: evx * 0.5 + (Math.random() - 0.5) * 0.8,
      vy: evy * 0.5 + (Math.random() - 0.5) * 0.8 - 0.25,
      life: 1,
      size: 1.5 + Math.random() * (activeMaterial === 'brass' ? 4 : 3),
      color: MATERIAL_COLORS[activeMaterial] || MATERIAL_COLORS.brass,
      // Vorticity coefficient — curl the trail
      curl: (Math.random() - 0.5) * 0.02
    });
  }
});

function tick() {
  tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    // Curl/vorticity — rotate velocity slightly
    const cosC = Math.cos(p.curl), sinC = Math.sin(p.curl);
    const nx = p.vx * cosC - p.vy * sinC;
    const ny = p.vx * sinC + p.vy * cosC;
    p.vx = nx; p.vy = ny;
    // Drag
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.018; // longer trail than v2
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    tctx.fillStyle = p.color + (p.life * 0.7) + ')';
    tctx.beginPath();
    tctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    tctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();
