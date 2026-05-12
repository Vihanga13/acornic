import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroBg = `${process.env.PUBLIC_URL}/Hero.png`;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const rafRef = useRef(null);

  /* ── Custom Cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mx = -200, my = -200, cx = -200, cy = -200;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, mx, 0.1);
      cy = lerp(cy, my, 0.1);
      cursor.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    const links = document.querySelectorAll('a, button');
    const grow = () => cursor.classList.add('cursor--hover');
    const shrink = () => cursor.classList.remove('cursor--hover');
    links.forEach(l => { l.addEventListener('mouseenter', grow); l.addEventListener('mouseleave', shrink); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach(l => { l.removeEventListener('mouseenter', grow); l.removeEventListener('mouseleave', shrink); });
    };
  }, []);

  /* ── Three.js Particle Field ── */
  useEffect(() => {
    let THREE, scene, camera, renderer, particles, animId;

    const initThree = async () => {
      try {
        THREE = await import('three');

        const canvas = canvasRef.current;
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particle geometry
        const count = 1800;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          positions[i * 3]     = (Math.random() - 0.5) * 20;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
          sizes[i]  = Math.random() * 2.5 + 0.5;
          speeds[i] = Math.random() * 0.003 + 0.001;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.04,
          transparent: true,
          opacity: 0.55,
          sizeAttenuation: true,
        });

        particles = new THREE.Points(geo, mat);
        scene.add(particles);

        let mouse = { x: 0, y: 0 };
        window.addEventListener('mousemove', e => {
          mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
          mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
        });

        const clock = new THREE.Clock();
        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          const pos = particles.geometry.attributes.position.array;
          for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += speeds[i];
            if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
          }
          particles.geometry.attributes.position.needsUpdate = true;

          particles.rotation.y = t * 0.015 + mouse.x;
          particles.rotation.x = mouse.y * 0.5;

          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          if (!canvas) return;
          camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        };
        window.addEventListener('resize', onResize);
      } catch (e) {
        console.warn('Three.js not available, skipping particles');
      }
    };

    initThree();

    return () => {
      cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);

  /* ── GSAP Scroll + Entrance Animations ── */
  useEffect(() => {
    let gsapCleanup = [];

    const initGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Staggered entrance
        tl.fromTo('.hero-slash-layout', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0)
          .fromTo('.hero-line-top', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
          .fromTo('.hero-line-bottom', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.5)
          .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.8)
          .fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
          .fromTo('.hero-counter-block', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, 1.1)
          .fromTo('.hero-vertical-tag', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);

        // Parallax on scroll
        const st1 = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (sectionRef.current) {
              gsap.to('.hero-slash-layout::before', { y: p * 60, duration: 0 }, 0);
            }
          },
        });

        gsapCleanup.push(() => st1.kill());
      } catch (e) {
        // GSAP not available, fallback: just show elements
        const els = document.querySelectorAll('.hero-slash-img,.hero-line-top,.hero-line-bottom,.hero-sub,.hero-actions,.hero-counter-block,.hero-vertical-tag');
        els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
        console.warn('GSAP not available, using CSS fallback');
      }
    };

    initGSAP();
    return () => gsapCleanup.forEach(fn => fn());
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div className="hero-cursor" ref={cursorRef}></div>
      <div className="hero-cursor-dot" ref={cursorDotRef}></div>

      <section id="hero" className="hero" ref={sectionRef} style={{ '--hero-bg-image': `url(${heroBg})` }}>

        {/* Three.js Particle Canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* ── DIAGONAL SLASH LAYOUT ── */}
        <div className="hero-slash-layout">

          {/* Left Dark Plane */}
          <div className="hero-left-plane">

            {/* Vertical rotated tag */}
            <div className="hero-vertical-tag">
              <span className="vtag-line"></span>
              <span className="vtag-text">EST. 2024 · COLOMBO</span>
            </div>

            {/* Main headline — split lines */}
            <div className="hero-headline-block" ref={headlineRef}>
              <h1>
                <span className="hero-line-top">Nurturing Bold</span>
                <span className="hero-line-bottom">
                  Ideas into <em>Global</em>
                </span>
                <span className="hero-line-accent">Enterprises.</span>
              </h1>
            </div>

            {/* Sub copy */}
            <p className="hero-sub" ref={subRef}>
              We partner with visionary founders at the earliest stages, providing not just capital but the strategic guidance, network, and operational support to grow from seed to scale.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions" ref={actionsRef}>
              <a href="#pitch" className="btn btn-primary">
                Pitch Your Idea
                <ArrowRight size={16} />
              </a>
              <a href="#portfolio" className="btn btn-outline">
                View Portfolio
              </a>
            </div>

            {/* Stat counters */}
            <div className="hero-counters">
              <div className="hero-counter-block">
                <span className="counter-num">42+</span>
                <span className="counter-label">Portfolio Cos.</span>
              </div>
              <div className="hero-counter-divider"></div>
              <div className="hero-counter-block">
                <span className="counter-num">$380M</span>
                <span className="counter-label">Capital Deployed</span>
              </div>
              <div className="hero-counter-divider"></div>
              <div className="hero-counter-block">
                <span className="counter-num">12</span>
                <span className="counter-label">Exits</span>
              </div>
            </div>
          </div>

          {/* Diagonal Slash Divider (CSS clip) */}
          <div className="hero-slash-divider"></div>

          {/* Right Image Plane */}
          <div className="hero-right-plane">
            <div className="hero-slash-img-wrap">
              {/* Full background image handled via CSS */}
              {/* Grain overlay */}
              <div className="hero-grain"></div>
              {/* Corner label */}
              <div className="hero-img-label">
                <span>Colombo · LK</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue">
          <div className="scroll-track">
            <div className="scroll-thumb"></div>
          </div>
          <span>Scroll</span>
        </div>

      </section>
    </>
  );
};

export default Hero;