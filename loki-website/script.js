const nav = document.querySelector('.nav');
const progress = document.querySelector('.progress');
const revealItems = document.querySelectorAll('.reveal');
const canvas = document.querySelector('.starfield');
const ctx = canvas.getContext('2d', { alpha: true });
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let width = 0;
let height = 0;
let pixelRatio = 1;
let raf = 0;
let pointer = { x: 0.5, y: 0.5, active: false };
let points = [];

function updateChrome() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pct = Math.min(100, (window.scrollY / maxScroll) * 100);
  const threshold = Math.max(120, window.innerHeight * 0.2);
  const deepLink = window.location.hash && window.location.hash !== '#top';

  nav.classList.toggle('visible', window.scrollY > threshold || deepLink);
  progress.style.setProperty('--scroll-progress', `${pct}%`);
}

function syncHashTarget() {
  const id = window.location.hash.slice(1);

  if (!id || id === 'top') {
    updateChrome();
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    updateChrome();
    return;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({ block: 'start' });
    updateChrome();
  });
}

function buildPoints() {
  const count = Math.min(96, Math.max(42, Math.round((width * height) / 15500)));
  points = Array.from({ length: count }, (_, index) => ({
    x: (index * 0.618033 + Math.random() * 0.28) % 1,
    y: Math.random(),
    z: 0.35 + Math.random() * 0.9,
    drift: Math.random() * Math.PI * 2,
  }));
}

function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  buildPoints();
}

function paint(time = 0) {
  ctx.clearRect(0, 0, width, height);

  const t = time * 0.00008;
  const pullX = pointer.active ? (pointer.x - 0.5) * 28 : 0;
  const pullY = pointer.active ? (pointer.y - 0.5) * 18 : 0;

  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const ax = a.x * width + Math.sin(t * 7 + a.drift) * 16 * a.z + pullX * a.z;
    const ay = a.y * height + Math.cos(t * 5 + a.drift) * 10 * a.z + pullY * a.z;

    for (let j = i + 1; j < points.length; j += 1) {
      const b = points[j];
      const bx = b.x * width + Math.sin(t * 7 + b.drift) * 16 * b.z + pullX * b.z;
      const by = b.y * height + Math.cos(t * 5 + b.drift) * 10 * b.z + pullY * b.z;
      const distance = Math.hypot(ax - bx, ay - by);

      if (distance < 122) {
        const alpha = (1 - distance / 122) * 0.12;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }

    ctx.fillStyle = `rgba(255,255,255,${0.22 + a.z * 0.18})`;
    ctx.beginPath();
    ctx.arc(ax, ay, Math.max(0.55, a.z * 1.15), 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reduceMotion) {
    raf = requestAnimationFrame(paint);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -12% 0px',
  },
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('scroll', updateChrome, { passive: true });
window.addEventListener('resize', () => {
  resizeCanvas();
  updateChrome();
});
window.addEventListener('hashchange', syncHashTarget);
window.addEventListener('pointermove', (event) => {
  pointer = {
    x: event.clientX / window.innerWidth,
    y: event.clientY / window.innerHeight,
    active: true,
  };
}, { passive: true });
window.addEventListener('pointerleave', () => {
  pointer.active = false;
});

resizeCanvas();
updateChrome();
syncHashTarget();

// Disable canvas animation on mobile screens (below 768px)
const isMobileScreen = window.innerWidth < 768;
if (!isMobileScreen && !reduceMotion) {
  paint();
}

if (reduceMotion) {
  cancelAnimationFrame(raf);
}
