import React, { useEffect, useRef, useState } from 'react';
import './Features.css';

const FEATURES = [
  {
    icon: '⬡',
    title: 'Neural Design Engine',
    desc: 'Harness transformer-based models to auto-generate coherent, on-brand visual systems at scale — from tokens to components.',
    tag: 'Core AI',
    color: '#7c5cfc',
  },
  {
    icon: '◈',
    title: 'Adaptive Token System',
    desc: 'Dynamic design tokens that self-adjust based on context, platform, and user preference — living variables, not static values.',
    tag: 'Tokens',
    color: '#00d4ff',
  },
  {
    icon: '✦',
    title: 'Zero-Shot Branding',
    desc: 'Describe your brand in plain language. The system extracts personality, palette, typography, and motion DNA instantly.',
    tag: 'Generative',
    color: '#ff6af0',
  },
  {
    icon: '⬟',
    title: 'Multi-modal Output',
    desc: 'From Figma to production CSS, from print specs to AR overlays — one unified system, infinite output targets.',
    tag: 'Export',
    color: '#f5c842',
  },
  {
    icon: '⬡',
    title: 'Accessibility Engine',
    desc: 'Automated WCAG compliance checks, contrast ratio optimization, and cognitive-load scoring baked into every generation pass.',
    tag: 'A11y',
    color: '#00d4ff',
  },
  {
    icon: '◈',
    title: 'Version Intelligence',
    desc: 'Semantic diffs across design versions. Understand what changed, why it changed, and how it impacts downstream components.',
    tag: 'Control',
    color: '#7c5cfc',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      ref={ref}
      className={`feature-card ${visible ? 'feature-card--visible' : ''}`}
      style={{ '--color': feature.color, '--delay': `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0.5, y: 0.5 })}
    >
      <div
        className="feature-card-inner"
        style={{
          transform: `
            perspective(600px)
            rotateY(${(mouse.x - 0.5) * 14}deg)
            rotateX(${(mouse.y - 0.5) * -10}deg)
          `,
        }}
      >
        <div className="feature-glow" />
        <div className="feature-icon">{feature.icon}</div>
        <div className="feature-tag">{feature.tag}</div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.desc}</p>
        <div className="feature-line" />
      </div>
    </div>
  );
};

const Features = () => (
  <section id="platform" className="features-section">
    <div className="features-container">
      <div className="section-header">
        <span className="section-badge">Capabilities</span>
        <h2 className="section-title">
          The full stack of<br />
          <span className="text-gradient">intelligent design</span>
        </h2>
        <p className="section-subtitle">
          Every capability you need to build living, adaptive brand systems — powered end-to-end by machine intelligence.
        </p>
      </div>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
