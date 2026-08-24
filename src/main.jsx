import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import gsap from 'gsap';
import Lenis from 'lenis';
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  BrainCircuit,
  Cloud,
  Cpu,
  DatabaseZap,
  Hexagon,
  Menu,
  Network,
  Orbit,
  ShieldCheck,
  Sparkle,
  Workflow,
  Zap,
} from 'lucide-react';
import './styles.css';

const services = [
  {
    icon: BrainCircuit,
    index: '01',
    title: 'AI Solutions',
    body: 'Custom AI systems that learn, adapt, and create operational lift inside real teams.',
  },
  {
    icon: Braces,
    index: '02',
    title: 'Software Engineering',
    body: 'Scalable product engineering with precise architecture, clean interfaces, and measurable performance.',
  },
  {
    icon: Cloud,
    index: '03',
    title: 'Cloud Infrastructure',
    body: 'Secure, resilient, future-ready cloud architecture for products that cannot feel fragile.',
  },
  {
    icon: Workflow,
    index: '04',
    title: 'Automation',
    body: 'Workflow engines, handoff logic, and integrations that remove repetitive human drag.',
  },
  {
    icon: Bot,
    index: '05',
    title: 'AI Agents',
    body: 'Agentic systems with tools, memory, permissions, evaluation loops, and clear escalation paths.',
  },
  {
    icon: Cpu,
    index: '06',
    title: 'Digital Products',
    body: 'End-to-end digital experiences engineered for speed, adoption, and long-term maintainability.',
  },
];

const studies = [
  ['NOVA GRID', 'Autonomous energy operations layer', 'AI / CLOUD'],
  ['ORBITAL CRM', 'Revenue intelligence for enterprise teams', 'PRODUCT / DATA'],
  ['SIGNAL OPS', 'Agentic support across voice and web', 'AUTOMATION'],
  ['BLACKSTACK', 'Resilient infrastructure command center', 'CLOUD'],
];

const workflow = [
  ['01', 'Decode', 'Map the business system, constraints, data surfaces, and points of leverage.'],
  ['02', 'Architect', 'Define interfaces, model behavior, infrastructure, metrics, and ownership boundaries.'],
  ['03', 'Build', 'Ship working systems in focused cycles with tight feedback and visible progress.'],
  ['04', 'Harden', 'Instrument, test, secure, and optimize the system before it becomes operational gravity.'],
  ['05', 'Compound', 'Improve the product through live signals, automation expansion, and performance loops.'],
];

const faqs = [
  ['What does LOKI build?', 'AI-native software, cloud infrastructure, intelligent automation, agent systems, and digital products.'],
  ['Do you only work with startups?', 'No. LOKI is built for ambitious teams that need serious engineering, from founder-led products to established operators.'],
  ['How technical does a client need to be?', 'Not very. We translate strategy into architecture, product behavior, and working systems.'],
  ['Can you integrate with existing tools?', 'Yes. Most LOKI systems connect to existing CRMs, databases, cloud services, internal tools, and operational workflows.'],
];

function LokiLogo({ className = '' }) {
  return (
    <img src="/logo.png" alt="LOKI" className={`loki-logo ${className}`} style={{ height: '32px', width: 'auto' }} />
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return reduced;
}

function GalaxyIntro({ reducedMotion, mode = 'intro' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const isHero = mode === 'hero';

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.028);

    const camera = new THREE.PerspectiveCamera(62, mount.clientWidth / mount.clientHeight, 0.1, 120);
    camera.position.set(0, 0, 14);

    const particleCount = reducedMotion ? 1700 : 5200;
    const positions = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);

    const logoSlots = [
      [-2.9, 0.5], [-2.9, 0.04], [-2.9, -0.42], [-2.5, -0.42], [-2.1, -0.42],
      [-1.18, 0.46], [-0.82, 0.46], [-0.48, 0.28], [-0.48, -0.24], [-0.82, -0.42], [-1.18, -0.42], [-1.5, -0.24], [-1.5, 0.28],
      [0.42, 0.02], [0.78, 0.24], [1.16, 0.48], [0.78, -0.2], [1.18, -0.42],
      [2.26, 0.5], [2.26, 0.04], [2.26, -0.42],
    ];

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 0.22 + Math.pow(Math.random(), 0.62) * 8.4;
      const arm = i % 4;
      const spin = radius * 1.45 + arm * Math.PI * 0.5;
      const scatter = (Math.random() - 0.5) * 0.9;
      const z = (Math.random() - 0.5) * 4.8;

      positions[i * 3] = Math.cos(spin + scatter) * radius;
      positions[i * 3 + 1] = Math.sin(spin + scatter) * radius * 0.42;
      positions[i * 3 + 2] = z;

      const slot = logoSlots[i % logoSlots.length];
      targets[i * 3] = slot[0] + (Math.random() - 0.5) * 0.16;
      targets[i * 3 + 1] = slot[1] + (Math.random() - 0.5) * 0.18;
      targets[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

      const white = 0.72 + Math.random() * 0.28;
      colors[i * 3] = white;
      colors[i * 3 + 1] = white;
      colors[i * 3 + 2] = white + Math.random() * 0.08;
      randoms[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: reducedMotion ? 0.018 : 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxy = new THREE.Points(geometry, material);
    galaxy.rotation.x = -0.12;
    const orbitSystem = new THREE.Group();
    orbitSystem.position.y = isHero ? 1.25 : 0;
    orbitSystem.scale.setScalar(isHero ? 1.04 : 1);
    orbitSystem.add(galaxy);
    scene.add(orbitSystem);

    const orbitConfigs = [
      { radius: 3.1, tube: 0.008, position: [-0.55, -0.18, -0.08], scale: [1.08, 0.3, 1], tilt: [-0.02, 0, -0.42], speed: 0.12, opacity: 0.16 },
      { radius: 2.55, tube: 0.006, position: [-0.78, 0.12, -0.16], scale: [0.86, 0.24, 1], tilt: [0.16, 0.08, 0.5], speed: -0.16, opacity: 0.11 },
      { radius: 3.7, tube: 0.005, position: [-0.35, -0.36, -0.22], scale: [1.15, 0.2, 1], tilt: [-0.1, -0.05, 1.18], speed: 0.08, opacity: 0.09 },
    ];

    const rings = orbitConfigs.map((config) => {
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius, config.tube, 10, 180),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }),
      );
      orbit.position.set(...config.position);
      orbit.scale.set(...config.scale);
      orbit.rotation.set(...config.tilt);
      orbit.userData = config;
      orbitSystem.add(orbit);
      return orbit;
    });

    const light = new THREE.PointLight(0xffffff, 1.2, 24);
    light.position.set(0, 0, 4);
    scene.add(light);

    const state = { t: reducedMotion ? 1 : 0, warp: 0, solid: 0 };
    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    if (reducedMotion) {
      gsap.set(material, { opacity: 0.78 });
      rings.forEach((ring) => gsap.set(ring.material, { opacity: ring.userData.opacity }));
    } else {
      timeline
        .to(material, { opacity: 0.5, duration: 1.4 }, 0.25)
        .to(camera.position, { z: 8.8, duration: 2.2 }, 1.0)
        .to(state, { warp: 1, duration: 1.8, ease: 'power3.in' }, 2.2)
        .to(state, { warp: 0.15, t: 0.36, duration: 1.8, ease: 'power2.out' }, 4.0)
        .to(state, { t: 1, duration: 2.5, ease: 'power3.inOut' }, 5.6)
        .to(rings.map((ring) => ring.material), { opacity: 0.22, duration: 1.6, stagger: 0.16 }, 6.2)
        .to(state, { solid: 1, duration: 1.8 }, 7.4)
        .to(camera.position, { z: 11.5, duration: 1.8 }, 7.8)
        .to(material, { opacity: 0.9, duration: 1.2 }, 8.4);
    }

    let raf = 0;
    const startedAt = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const attr = geometry.getAttribute('position');

      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3;
        const sourceX = positions[ix];
        const sourceY = positions[ix + 1];
        const sourceZ = positions[ix + 2];
        const targetX = targets[ix];
        const targetY = targets[ix + 1];
        const targetZ = targets[ix + 2];
        const phase = elapsed * (0.24 + randoms[i] * 0.34) + randoms[i] * 8;
        const morph = THREE.MathUtils.smoothstep(state.t, 0, 1);
        const spiral = 1 + state.warp * (0.5 + randoms[i] * 2.8);

        attr.array[ix] = THREE.MathUtils.lerp(sourceX * spiral + Math.sin(phase) * 0.035, targetX, morph);
        attr.array[ix + 1] = THREE.MathUtils.lerp(sourceY * spiral + Math.cos(phase) * 0.022, targetY, morph);
        attr.array[ix + 2] = THREE.MathUtils.lerp(sourceZ - state.warp * (randoms[i] * 12), targetZ, morph);
      }

      attr.needsUpdate = true;
      const logoSettle = 1 - THREE.MathUtils.smoothstep(state.t, 0.55, 1);
      galaxy.rotation.z = (elapsed * 0.055 + state.warp * 0.8) * logoSettle;
      galaxy.rotation.y = Math.sin(elapsed * 0.2) * 0.08 * logoSettle;
      rings.forEach((ring) => {
        const [tiltX, tiltY, tiltZ] = ring.userData.tilt;
        ring.rotation.x = tiltX + Math.sin(elapsed * 0.18) * 0.025;
        ring.rotation.y = tiltY + Math.cos(elapsed * 0.14) * 0.02;
        ring.rotation.z = tiltZ + elapsed * ring.userData.speed;
        ring.material.opacity = Math.max(ring.material.opacity, state.solid * ring.userData.opacity);
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      timeline.kill();
      geometry.dispose();
      material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mode, reducedMotion]);

  return <div className="galaxy-canvas" ref={mountRef} aria-hidden="true" />;
}

function NetworkCanvas({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let pointer = { x: 0.5, y: 0.5 };
    const nodes = Array.from({ length: reducedMotion ? 34 : 72 }, (_, index) => ({
      x: (index * 0.618033 + Math.random() * 0.2) % 1,
      y: Math.random(),
      z: 0.55 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.00025;
      const projected = nodes.map((node) => {
        const px = node.x * width + Math.sin(t + node.phase) * 26 * node.z + (pointer.x - 0.5) * 22 * node.z;
        const py = node.y * height + Math.cos(t * 0.8 + node.phase) * 20 * node.z + (pointer.y - 0.5) * 16 * node.z;
        return { ...node, px, py };
      });

      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i];
          const b = projected[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d < 126) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 126) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
          }
        }
      }

      projected.forEach((node, index) => {
        ctx.fillStyle = index % 11 === 0 ? 'rgba(124,58,237,.9)' : 'rgba(255,255,255,.76)';
        ctx.beginPath();
        ctx.arc(node.px, node.py, index % 11 === 0 ? 2.6 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    resize();
    draw();
    canvas.addEventListener('pointermove', move);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return <canvas className="network-canvas" ref={canvasRef} aria-label="Interactive technology network" />;
}

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const over = (event) => {
      if (event.target.closest('a, button, .magnetic, .service-card, .study-card')) document.body.classList.add('cursor-hot');
    };
    const out = (event) => {
      if (event.target.closest('a, button, .magnetic, .service-card, .study-card')) document.body.classList.remove('cursor-hot');
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

function App() {
  const reducedMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.documentElement.classList.toggle('intro-complete', introDone);
  }, [introDone]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.85 });
    let raf = 0;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), reducedMotion ? 1200 : 9200);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = document.querySelector('.site-nav');
    const progress = document.querySelector('.scroll-progress');
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.setProperty('--progress', `${(window.scrollY / max) * 100}%`);
      nav.classList.toggle('is-compact', window.scrollY > 80);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <Cursor />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <div className="grid-layer" aria-hidden="true" />

      <div className={`intro-stage ${introDone ? 'is-exiting' : ''}`} aria-hidden={introDone}>
        <GalaxyIntro reducedMotion={reducedMotion} />
        <div className="intro-copy">
          <LokiLogo />
          <p>FROM PICTURE TO REALITY</p>
        </div>
      </div>

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="nav-brand magnetic" onClick={closeNav}>
          <LokiLogo />
        </a>
        <button className="nav-toggle" type="button" aria-label="Toggle navigation" onClick={() => setNavOpen((open) => !open)}>
          <Menu size={18} />
        </button>
        <div className={`nav-links ${navOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={closeNav}>About</a>
          <a href="#services-deep" onClick={closeNav}>Services</a>
          <a href="#tech" onClick={closeNav}>Tech</a>
          <a href="/landing.html#pricing" onClick={closeNav}>Pricing</a>
          <a href="#contact" onClick={closeNav}>Contact</a>
        </div>
      </nav>

      <main id="top" className={introDone ? 'site-ready' : ''}>
        <section className="hero section-frame">
          <GalaxyIntro reducedMotion={reducedMotion} mode="hero" />
          <div className="hero-hud hud-left">
            <span>00 - HOME</span>
            <i />
            <span>Scroll to explore</span>
          </div>
          <div className="hero-hud hud-right">
            <span>32.7157 N</span>
            <span>117.1611 W</span>
            <i />
          </div>
          <div className="hero-statement" data-reveal>
            <p className="mono">[ LOKI TECHNOLOGIES ]</p>
            <a href="#work" className="text-link magnetic">
              Explore our work <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-spec" data-reveal>
            <p>AI. SOFTWARE. CLOUD.</p>
            <p>ENGINEERED TO SCALE. DESIGNED TO DISRUPT.</p>
            <ArrowDown size={17} />
          </div>
        </section>

        <section className="service-strip" id="services" aria-label="Core services">
          {services.slice(0, 4).map(({ icon: Icon, index, title, body }) => (
            <a className="service-tile magnetic" key={title} data-reveal href="#services-deep" aria-label={`Learn more about ${title}`}>
              <div>
                <Icon size={25} />
                <span>{index}</span>
              </div>
              <h2>{title}</h2>
              <p>{body}</p>
              <ArrowRight size={16} />
            </a>
          ))}
        </section>

        <section className="about-grid section-frame" id="about">
          <div className="section-label">01 / ABOUT</div>
          <div data-reveal>
            <p className="mono">A SYSTEMS COMPANY FOR THE AI ERA</p>
            <h2>Systems that compound operational advantage.</h2>
          </div>
          <p data-reveal>
            LOKI partners with ambitious operators to design, build, and harden the software layer that turns AI from novelty into leverage. Strategy, interface, automation, data, infrastructure, and product engineering move as one discipline.
          </p>
          <div className="blueprint-panel" data-reveal>
            <Hexagon size={34} />
            <span>EXPERIMENT / ARCHITECT / SHIP / COMPOUND</span>
          </div>
        </section>

        <section className="services-deep" id="services-deep" aria-label="Detailed services">
          <div className="section-heading" data-reveal>
            <p className="mono">02 / SERVICES</p>
            <h2>Precision systems for intelligent companies.</h2>
          </div>
          <div className="deep-grid">
            {services.map(({ icon: Icon, index, title, body }) => (
              <a className="service-card magnetic" key={title} data-reveal href="#contact" aria-label={`Start a project — ${title}`}>
                <div className="card-top">
                  <Icon size={28} />
                  <span>{index}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </a>
            ))}
          </div>
        </section>

        {/* <section className="work-section section-frame" id="work">
          <div className="section-heading left" data-reveal>
            <p className="mono">03 / SELECTED WORK</p>
            <h2>Case studies from the edge of operational scale.</h2>
          </div>
          <div className="study-track">
            {studies.map(([name, body, tag], index) => (
              <a className="study-card magnetic" key={name} data-reveal href="#contact" aria-label={`Case study: ${name}`}>
                <div className={`study-visual study-${index + 1}`}>
                  <Orbit size={46} />
                </div>
                <p className="mono">{tag}</p>
                <h3>{name}</h3>
                <span>{body}</span>
              </a>
            ))}
          </div>
        </section> */}

        <section className="tech-section" id="tech">
          <div className="tech-copy" data-reveal>
            <p className="mono">04 / TECHNOLOGY</p>
            <h2>Models, data, tools, and cloud foundations connected into one operating layer.</h2>
            <p>
              The technology layer is intentionally modular: language models, retrieval systems, APIs, background workers, observability, and deployment infrastructure all stay visible, testable, and replaceable.
            </p>
          </div>
          <div className="network-wrap" data-reveal>
            <NetworkCanvas reducedMotion={reducedMotion} />
            <div className="network-labels">
              <span><Network size={16} /> AI ORCHESTRATION</span>
              <span><DatabaseZap size={16} /> DATA MEMORY</span>
              <span><ShieldCheck size={16} /> TRUST BOUNDARIES</span>
              <span><Zap size={16} /> REAL-TIME ACTIONS</span>
            </div>
          </div>
        </section>

        <section className="workflow section-frame">
          <div className="section-heading left" data-reveal>
            <p className="mono">05 / DEVELOPMENT ROADMAP</p>
            <h2>From signal to system without losing the plot.</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map(([index, title, body]) => (
              <article key={title} data-reveal>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats" aria-label="LOKI statistics">
          {[
            ['50+', 'products shipped'],
            ['200+', 'automation flows'],
            ['99.9%', 'uptime target'],
            ['24/7', 'systems designed'],
          ].map(([value, label]) => (
            <div key={label} data-reveal>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="testimonials section-frame" id="careers">
          <div className="section-heading left" data-reveal>
            <p className="mono">06 / TRUSTED BY OPERATORS</p>
            <h2>Built with the teams who cannot afford vague technology.</h2>
          </div>
          <div className="testimonial-grid">
            {[
              ['ZEALOOPS — WEBSITE DEVELOPMENT', 'LOKI turned a messy operational idea into an AI product our team could trust in production.'],
              ['SPACETIME COWORKING — COMPLETE TECHNICAL SUPPORT', 'They think like architects, designers, and operators at the same time. The result felt inevitable.'],
              ['CORPSOURCEONE — INTEGRATED SYSTEM DEVELOPMENT', 'The work was precise, fast, and unusually clear. We shipped more than a prototype.'],
            ].map(([name, quote]) => (
              <blockquote key={name} data-reveal>
                <p>{quote}</p>
                <cite>{name}</cite>
              </blockquote>
            ))}
          </div>
          <div className="careers-band" data-reveal>
            <span>CAREERS</span>
            <p>We are always interested in engineers, designers, and systems thinkers with extreme taste and calm execution.</p>
            <a className="text-link magnetic" href="mailto:careers@loki.tech">
              Signal interest <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="faq section-frame">
          <div className="section-heading left" data-reveal>
            <p className="mono">07 / QUESTIONS</p>
            <h2>Operational clarity before spectacle.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question} data-reveal>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="cta-galaxy" aria-hidden="true" />
          <div data-reveal>
            <p className="mono">LET'S BUILD TOGETHER</p>
            <h2>Bring the impossible system. We will make it operational.</h2>
            <a className="button magnetic" href="mailto:hello@loki.tech">
              Start a project <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" aria-label="Back to top">
          <LokiLogo />
        </a>
        <div>
          <p>AI-native software, cloud infrastructure, intelligent automation, and digital products. Built for operators who need serious engineering.</p>
          <span>© {year} LOKI TECHNOLOGIES — <a href="mailto:hello@loki.tech" style={{color:'inherit'}}>hello@loki.tech</a></span>
        </div>
        <div className="footer-links">
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#services-deep">Services</a>
          <a href="#tech">Tech</a>
          <a href="/landing.html#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
