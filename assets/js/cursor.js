const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let tx = 0, ty = 0, x = 0, y = 0;

window.addEventListener('pointermove', (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

function loop() {
  x += (tx - x) * 0.22;
  y += (ty - y) * 0.22;
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

window.addEventListener('pointermove', (e) => {
  if (!activeMaterial) return;
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: e.clientX + (Math.random() - 0.5) * 6,
      y: e.clientY + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.2,
      life: 1,
      size: 2 + Math.random() * 3,
      color: MATERIAL_COLORS[activeMaterial] || MATERIAL_COLORS.brass
    });
  }
});

function tick() {
  tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.025;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    tctx.fillStyle = p.color + (p.life * 0.7) + ')';
    tctx.beginPath();
    tctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    tctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();
