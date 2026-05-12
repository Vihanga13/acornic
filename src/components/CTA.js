import React, { useRef, useState, useEffect } from 'react';
import './CTA.css';

const CTA = () => {
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
    <section id="contact" className={`cta-section ${vis?'cta--in':''}`} ref={ref}>
      {/* 3D Tilt container */}
      <div
        className="cta-card"
        onMouseMove={onMove}
        onMouseLeave={() => setMx({x:0.5,y:0.5})}
        style={{
          transform:`perspective(1000px) rotateY(${(mx.x-0.5)*10}deg) rotateX(${(mx.y-0.5)*-7}deg)`,
        }}
      >
        <div className="cta-glow-tl" />
        <div className="cta-glow-br" />

        {/* Left */}
        <div className="cta-left">
          <div className="section-badge" style={{marginBottom:'1.2rem'}}>
            <span className="badge-dot" />Ready to grow?
          </div>
          <h2 className="cta-title">
            Have a bold idea?<br />
            <span className="cta-highlight">Let's build it together.</span>
          </h2>
          <p className="cta-body">
            We review every application personally. If your vision aligns with our thesis,
            you'll hear from our team within 5 business days — no automated rejections.
          </p>

          <div className="cta-actions">
            <a href="#!" className="btn btn-primary">
              Submit Your Pitch
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="mailto:hello@acornicventures.com" className="btn btn-outline">
              hello@acornicventures.com
            </a>
          </div>

          <div className="cta-trust">
            {['No term sheet lock-in', '5-day response SLA', 'Global investment scope'].map((t,i)=>(
              <div key={i} className="cta-trust-item">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M2 8l4 4 8-8" stroke="var(--green-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div className="cta-right">
          <div className="cta-form-card">
            <h3 className="cta-form-title">Quick Intro</h3>
            <div className="cta-form-fields">
              {[
                { label:'Your Name',       id:'cta-name',    type:'text',  ph:'Arjun Mehta' },
                { label:'Company / Idea',  id:'cta-company', type:'text',  ph:'e.g. ClimateOS' },
                { label:'Email',           id:'cta-email',   type:'email', ph:'you@startup.com' },
              ].map(f=>(
                <div key={f.id} className="cta-field">
                  <label htmlFor={f.id}>{f.label}</label>
                  <input id={f.id} type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div className="cta-field">
                <label htmlFor="cta-stage">Funding Stage</label>
                <select id="cta-stage">
                  <option>Pre-Seed / Idea Stage</option>
                  <option>Seed</option>
                  <option>Series A</option>
                  <option>Series B+</option>
                </select>
              </div>
              <div className="cta-field">
                <label htmlFor="cta-msg">One-liner pitch</label>
                <textarea id="cta-msg" rows="3" placeholder="We are building X for Y because Z..." />
              </div>
            </div>
            <button id="cta-submit" className="btn btn-green" style={{width:'100%',justifyContent:'center'}}>
              Send to Acornic →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
