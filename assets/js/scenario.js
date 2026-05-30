const MOODS = ['morning', 'studio', 'evening', 'late'];
const STORAGE_KEY = 'ds-mood';
const QUIET_KEY = 'ds-quiet';

const html = document.documentElement;

function setMood(mood) {
  if (!MOODS.includes(mood)) return;
  html.dataset.mood = mood;
  try { localStorage.setItem(STORAGE_KEY, mood); } catch (e) {}
  document.querySelectorAll('.scenario__toggle button').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.mood === mood);
  });
  updateScenarioReadout(mood);
  updateLiveLightReadout(mood);
  window.dispatchEvent(new CustomEvent('moodchange', { detail: { mood } }));
}

function setQuiet(on) {
  html.dataset.quiet = on ? 'true' : 'false';
  try { localStorage.setItem(QUIET_KEY, on ? '1' : '0'); } catch (e) {}
  const dot = document.querySelector('.quiet-toggle__dot');
  const label = document.querySelector('.quiet-toggle__label');
  if (label) label.textContent = on ? 'Quiet Mode · On' : 'Quiet Mode · Off';
}

const SCENARIO_COPY = {
  morning: {
    title: 'A slow start.',
    body: 'Blinds half-drawn. Pendants barely lit. The kettle in the kitchen warms a kelvin from the window — and the page warms with it.',
    attest: '"Morning Arrival" is the actual Lutron scene we commission for residences with east-facing apertures.',
    sequence: [
      ['07:14', 'Living pendants',  '12% · 4500K'],
      ['07:14', 'Kitchen task',     '40% · 4500K'],
      ['07:18', 'Blinds — north',   'half open'],
      ['07:20', 'HVAC',             '20.5°C → 21.5°C'],
    ]
  },
  studio: {
    title: 'The default day.',
    body: 'Even light, even shadows. The room is for working — drawings flat, materials weighed, fixtures considered without theatre.',
    attest: '"Studio" is what your client sees the first time they walk into our Hub. It is the honest light.',
    sequence: [
      ['11:00', 'Living pendants',  '30% · 3500K'],
      ['11:00', 'Spot — bench',     '80% · 3500K'],
      ['11:00', 'Blinds — south',   'half open'],
      ['11:00', 'HVAC',             '21.0°C — steady'],
    ]
  },
  evening: {
    title: 'The room <em>warms.</em>',
    body: 'Shadows lengthen by three. Pendants commit to their temperature. Bronze begins to glow. The page changes its mind about contrast — and the architect feels it.',
    attest: '"Evening" is what the client sees on the night of the dinner. It is what closes the contract.',
    sequence: [
      ['19:43', 'Living pendants',  '85% · 2700K'],
      ['19:43', 'Wall — entry',     '60% · 2700K'],
      ['19:44', 'Blinds — west',    'closed'],
      ['19:45', 'HVAC',             '19.5°C — quiet'],
    ]
  },
  late: {
    title: 'A held breath.',
    body: 'A single floor lamp. The architectural drawing of the apartment dissolves into shadow. The audio path remains, drawn but unlit. Quiet, by intent.',
    attest: '"Late" is the scene a sleeping house holds. Type drops half a weight. Nothing else moves.',
    sequence: [
      ['23:12', 'Living pendants',  '0%'],
      ['23:12', 'Floor — Sampei',   '20% · 2200K'],
      ['23:12', 'Blinds',           'all closed'],
      ['23:12', 'HVAC',             '18.0°C — held'],
    ]
  }
};

function updateScenarioReadout(mood) {
  const data = SCENARIO_COPY[mood];
  if (!data) return;
  const titleEl = document.querySelector('.scenario__notes h3');
  const bodyEl = document.querySelector('.scenario__notes p');
  const attestEl = document.querySelector('.scenario__attest');
  const seqEl = document.querySelector('.scenario__sequence');
  if (titleEl) titleEl.innerHTML = data.title;
  if (bodyEl) bodyEl.textContent = data.body;
  if (attestEl) attestEl.textContent = data.attest;
  if (seqEl) {
    seqEl.innerHTML = data.sequence.map(([t, n, v]) => `
      <div class="seq">
        <span class="seq__time">${t}</span>
        <span class="seq__name">${n}</span>
        <span class="seq__val">${v}</span>
      </div>`).join('');
  }

  // Floor-plan animation
  const fp = document.querySelector('.floorplan svg');
  if (!fp) return;
  const lights = fp.querySelectorAll('.fp-light');
  const blinds = fp.querySelectorAll('.fp-blind');
  const audio = fp.querySelector('.fp-audio');
  const hvac = document.querySelector('.floorplan__hvac');

  const states = {
    morning: { lightR: 4, lightOp: 0.45, blindScale: 0.6, audioOp: 0.2, hvac: '21.5°C' },
    studio:  { lightR: 6, lightOp: 0.7,  blindScale: 0.7, audioOp: 0.5, hvac: '21.0°C' },
    evening: { lightR: 10, lightOp: 1.0, blindScale: 0.0, audioOp: 0.9, hvac: '19.5°C' },
    late:    { lightR: 2, lightOp: 0.2,  blindScale: 0.0, audioOp: 0.6, hvac: '18.0°C' }
  };
  const s = states[mood];
  lights.forEach((l, i) => {
    if (mood === 'late' && i !== 0) {
      l.setAttribute('r', '0');
      l.style.opacity = '0';
    } else {
      l.setAttribute('r', String(s.lightR));
      l.style.opacity = String(s.lightOp);
    }
  });
  blinds.forEach((b) => { b.style.transform = `scaleY(${s.blindScale})`; });
  if (audio) audio.style.opacity = String(s.audioOp);
  if (hvac) hvac.firstChild.textContent = s.hvac;
}

const LIVE_LIGHT_READOUT = {
  morning: { kelvin: '4500K', lumens: '180 lm', state: 'Cool · low', dim: '12%' },
  studio:  { kelvin: '3500K', lumens: '420 lm', state: 'Neutral · half', dim: '30%' },
  evening: { kelvin: '2700K', lumens: '980 lm', state: 'Warm · raised', dim: '85%' },
  late:    { kelvin: '2200K', lumens: '120 lm', state: 'Amber · held', dim: '20%' }
};
function updateLiveLightReadout(mood) {
  const data = LIVE_LIGHT_READOUT[mood];
  if (!data) return;
  const el = document.querySelector('.livelight__readout');
  if (!el) return;
  el.innerHTML = `
    <div><dt>Color temperature</dt><dd><em>${data.kelvin}</em></dd></div>
    <div><dt>Output</dt><dd>${data.lumens}</dd></div>
    <div><dt>State</dt><dd>${data.state}</dd></div>
    <div><dt>Dim level</dt><dd>${data.dim}</dd></div>`;
}

// Wire up
document.querySelectorAll('.scenario__toggle button').forEach((b) => {
  b.addEventListener('click', () => setMood(b.dataset.mood));
});

const quietBtn = document.querySelector('.quiet-toggle');
if (quietBtn) {
  quietBtn.addEventListener('click', () => {
    setQuiet(html.dataset.quiet !== 'true');
  });
}

// Hydrate from storage
try {
  const savedMood = localStorage.getItem(STORAGE_KEY) || 'studio';
  setMood(savedMood);
  const savedQuiet = localStorage.getItem(QUIET_KEY) === '1';
  setQuiet(savedQuiet);
} catch (e) {
  setMood('studio');
}
