import React, { useRef, useState, useEffect } from 'react';
import './Team.css';

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'Managing Partner & Co-Founder',
    bg: 'linear-gradient(135deg,#0E1F3D,#5B3FC8)',
    initials: 'AM',
    linkedin: '#!',
    bio: 'Former CTO of two unicorns. 20+ years in venture and operator roles across South Asia and the Bay Area.',
    tags: ['Deep Tech', 'Strategy', 'AI/ML'],
  },
  {
    name: 'Priya Ramasamy',
    role: 'Partner — Climate & Impact',
    bg: 'linear-gradient(135deg,#1A6B45,#2A9D6F)',
    initials: 'PR',
    linkedin: '#!',
    bio: 'Ex-Goldman climate fund lead. Built renewable energy projects across 8 APAC countries worth $400M.',
    tags: ['Clean Energy', 'ESG', 'Impact'],
  },
  {
    name: 'Karim Elshafei',
    role: 'Partner — FinTech & MENA',
    bg: 'linear-gradient(135deg,#C9860A,#F4B942)',
    initials: 'KE',
    linkedin: '#!',
    bio: 'Co-founded two acquired FinTech companies in Dubai and Cairo. Fluent in market dynamics across MENA and Africa.',
    tags: ['FinTech', 'MENA', 'Payments'],
  },
  {
    name: 'Suki Tanaka',
    role: 'Principal — HealthTech & SEA',
    bg: 'linear-gradient(135deg,#D4503A,#F4796A)',
    initials: 'ST',
    linkedin: '#!',
    bio: 'MD turned investor. Guided 14 HealthTech companies through regulatory pathways in Singapore, Japan and India.',
    tags: ['HealthTech', 'Regulatory', 'SEA'],
  },
];

const TeamCard = ({ member, index }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [mx, setMx]   = useState({ x:0.5, y:0.5 });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold:0.15 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMove = (e) => {
    if(flipped) return;
    const r = ref.current.getBoundingClientRect();
    setMx({ x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height });
  };

  return (
    <div
      ref={ref}
      className={`team-card ${vis?'team--in':''} ${flipped?'team-card--flipped':''}`}
      style={{ '--d':`${index*0.1}s` }}
      onMouseMove={onMove}
      onMouseLeave={() => setMx({x:0.5,y:0.5})}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="team-inner"
        style={{
          transform: flipped
            ? 'perspective(800px) rotateY(180deg)'
            : `perspective(800px) rotateY(${(mx.x-0.5)*16}deg) rotateX(${(mx.y-0.5)*-12}deg)`,
        }}
      >
        {/* Front */}
        <div className="team-front">
          <div className="team-avatar" style={{background:member.bg}}>
            {member.initials}
          </div>
          <div className="team-info">
            <div className="team-name">{member.name}</div>
            <div className="team-role">{member.role}</div>
            <div className="team-tags">
              {member.tags.map((t,i) => <span key={i} className="team-tag">{t}</span>)}
            </div>
          </div>
          <div className="team-flip-hint">Click to learn more →</div>
        </div>

        {/* Back */}
        <div className="team-back">
          <div className="team-back-name">{member.name}</div>
          <p className="team-bio">{member.bio}</p>
          <a href={member.linkedin} className="team-linkedin" onClick={e=>e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn Profile
          </a>
          <div className="team-back-hint">Click to flip back</div>
        </div>
      </div>
    </div>
  );
};

const Team = () => (
  <section id="team" className="team-section">
    <div className="team-container">
      <div className="team-header">
        <div className="section-badge"><span className="badge-dot" />Our Team</div>
        <h2 className="section-title" style={{marginTop:'0.5rem'}}>
          The people behind<br /><span className="accent-green">every great outcome</span>
        </h2>
        <p className="section-subtitle" style={{marginTop:'1rem'}}>
          Operators, founders, and investors with deep domain expertise — aligned with your success, not just your cap table.
        </p>
      </div>
      <div className="team-grid">
        {TEAM.map((m,i) => <TeamCard key={i} member={m} index={i} />)}
      </div>
      <p className="team-note">Click any card to flip and read their story</p>
    </div>
  </section>
);

export default Team;
