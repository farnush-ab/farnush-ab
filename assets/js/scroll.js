const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

const threshold = document.querySelector('.threshold__word');
if (threshold) {
  window.addEventListener('scroll', () => {
    const rect = threshold.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = 1 - Math.max(0, Math.min(1, (rect.top + rect.height / 2) / vh));
    const scale = 0.5 + progress * 0.8;
    const opacity = 0.2 + progress * 0.8;
    threshold.style.transform = `scale(${scale})`;
    threshold.style.opacity = opacity;
  }, { passive: true });
}

const heroSection = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero h1');
if (heroSection && heroTitle) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight * 1.2) {
      heroTitle.style.transform = `translateY(${scroll * 0.18}px)`;
      heroTitle.style.opacity = Math.max(0, 1 - scroll / (window.innerHeight * 0.9));
    }
  }, { passive: true });
}
