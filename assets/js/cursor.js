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

const hoverable = 'a, button, .discipline, .curation__item, .studio, .intent-list label, .calendar__day.is-avail, .archive__item';
document.addEventListener('pointerover', (e) => {
  if (e.target.closest(hoverable)) cursor.classList.add('is-hover');
});
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(hoverable)) cursor.classList.remove('is-hover');
});
