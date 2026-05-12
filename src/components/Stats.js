import React, { useRef, useState, useEffect } from 'react';
import './Stats.css';

const STATS = [
  { value: '$280M',  label: 'Assets Under Management', icon: '💼', color: 'navy' },
  { value: '62+',    label: 'Portfolio Companies',       icon: '🚀', color: 'green' },
  { value: '3.8×',   label: 'Average Return Multiple',   icon: '📈', color: 'violet' },
  { value: '14',     label: 'Countries Represented',     icon: '🌍', color: 'gold' },
  { value: '12',     label: 'Successful Exits',          icon: '🏆', color: 'coral' },
  { value: '8 Yrs',  label: 'Track Record',              icon: '⏳', color: 'navy' },
];

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const [vis, setVis]   = useState(false);
  const [mx, setMx]     = useState({ x:0.5, y:0.5 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold:0.2 });
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
      className={`stat-card sc-${stat.color} ${vis?'stat--in':''}`}
      style={{ '--d':`${index*0.08}s` }}
      onMouseMove={onMove}
      onMouseLeave={() => setMx({x:0.5,y:0.5})}
    >
      <div
        className="stat-inner"
        style={{
          transform:`perspective(500px) rotateY(${(mx.x-0.5)*18}deg) rotateX(${(mx.y-0.5)*-14}deg)`,
        }}
      >
        <div className="stat-shine" />
        <div className="stat-icon">{stat.icon}</div>
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
        <div className="stat-underline" />
      </div>
    </div>
  );
};

const Stats = () => (
  <section id="stats" className="stats-section">
    <div className="stats-noise" />
    <div className="stats-container">
      <div className="stats-header">
        <div className="section-badge"><span className="badge-dot" />By the Numbers</div>
        <h2 className="section-title">
          A track record built on<br /><span className="accent-green">conviction & results</span>
        </h2>
      </div>
      <div className="stats-grid">
        {STATS.map((s,i) => <StatCard key={i} stat={s} index={i} />)}
      </div>
    </div>
  </section>
);

export default Stats;
