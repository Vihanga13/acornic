import React, { useRef, useState, useEffect } from 'react';
import './Portfolio.css';

const COMPANIES = [
  {
    name: 'Solaris Grid',
    sector: 'Clean Energy',
    stage: 'Series B',
    raise: '$18M',
    flag: '🇸🇬',
    desc: 'AI-orchestrated distributed energy grids enabling real-time renewable load balancing across Southeast Asia.',
    growth: '+340%',
    color: 'gold',
  },
  {
    name: 'MedCore AI',
    sector: 'HealthTech',
    stage: 'Series A',
    raise: '$9M',
    flag: '🇮🇳',
    desc: 'Diagnostic intelligence platform reducing radiology turnaround from 48 hours to under 8 minutes across tier-2 hospitals.',
    growth: '+210%',
    color: 'coral',
  },
  {
    name: 'NeuralHire',
    sector: 'HR Tech / AI',
    stage: 'Series B',
    raise: '$24M',
    flag: '🇬🇧',
    desc: 'Bias-free recruitment intelligence that has placed 40,000+ candidates globally with a 94% retention rate at 12 months.',
    growth: '+480%',
    color: 'violet',
  },
  {
    name: 'AgroMind',
    sector: 'AgriTech',
    stage: 'Seed',
    raise: '$3.5M',
    flag: '🇰🇪',
    desc: 'Satellite + IoT platform empowering 200,000 smallholder farmers in Sub-Saharan Africa with precision agriculture.',
    growth: '+190%',
    color: 'green',
  },
  {
    name: 'PayStream',
    sector: 'FinTech',
    stage: 'Series A',
    raise: '$12M',
    flag: '🇦🇪',
    desc: 'Cross-border payment infrastructure settling transactions in 3 seconds at 0.4% FX spread for emerging-market SMEs.',
    growth: '+290%',
    color: 'navy',
  },
  {
    name: 'EduVerse',
    sector: 'EdTech',
    stage: 'Series A',
    raise: '$8M',
    flag: '🇱🇰',
    desc: 'Immersive VR/AR learning environments supporting 1.2M learners across 22 languages with adaptive AI curricula.',
    growth: '+520%',
    color: 'violet',
  },
];

const PortfolioCard = ({ company, index }) => {
  const ref = useRef(null);
  const [vis, setVis]   = useState(false);
  const [mx, setMx]     = useState({ x:0.5, y:0.5 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold:0.15 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMx({ x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height });
  };

  return (
    <div
      ref={ref}
      className={`pf-card pf-${company.color} ${vis?'pf--in':''}`}
      style={{ '--d':`${index*0.09}s` }}
      onMouseMove={onMove}
      onMouseLeave={() => setMx({x:0.5,y:0.5})}
    >
      <div
        className="pf-inner"
        style={{
          transform:`perspective(700px) rotateY(${(mx.x-0.5)*16}deg) rotateX(${(mx.y-0.5)*-12}deg)`,
        }}
      >
        <div className="pf-shine" />

        {/* Header */}
        <div className="pf-head">
          <div className="pf-flag-name">
            <span className="pf-flag">{company.flag}</span>
            <div>
              <div className="pf-name">{company.name}</div>
              <div className="pf-sector">{company.sector}</div>
            </div>
          </div>
          <div className="pf-growth">{company.growth}</div>
        </div>

        {/* Desc */}
        <p className="pf-desc">{company.desc}</p>

        {/* Footer tags */}
        <div className="pf-foot">
          <span className="pf-tag pf-tag--stage">{company.stage}</span>
          <span className="pf-tag pf-tag--raise">{company.raise} raised</span>
        </div>

        {/* Color bar */}
        <div className="pf-bar" />
      </div>
    </div>
  );
};

const Portfolio = () => (
  <section id="portfolio" className="portfolio-section">
    <div className="portfolio-container">
      <div className="portfolio-header">
        <div>
          <div className="section-badge"><span className="badge-dot" />Our Portfolio</div>
          <h2 className="section-title" style={{marginTop:'0.5rem'}}>
            Success in action,<br /><span className="accent-green">and new concepts being developed.</span>
          </h2>
        </div>
        <a href="#opportunities" className="btn btn-outline">
          See All 62+ Companies
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="portfolio-grid">
        {COMPANIES.map((c, i) => <PortfolioCard key={i} company={c} index={i} />)}
      </div>
    </div>
  </section>
);

export default Portfolio;
