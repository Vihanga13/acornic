import React, { useRef, useEffect } from 'react';
import './MarqueeBar.css';

const ITEMS = [
  'Seed Funding', 'Series A', 'Series B', 'Series C',
  'Deep Tech', 'Clean Energy', 'AI Ventures', 'HealthTech',
  'FinTech', 'AgriTech', 'EdTech', 'SaaS Scale-up',
  'Impact Investing', 'Global Reach', 'Strategic Advisory', 'Portfolio Growth',
];

const MarqueeBar = () => {
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.4; // px per frame — cinematic slow

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Total width of ONE set (half of doubled list)
    const getHalfWidth = () => el.scrollWidth / 2;

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current -= SPEED;
        const half = getHalfWidth();
        if (Math.abs(posRef.current) >= half) {
          posRef.current = 0;
        }
        el.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  // Triple the items for seamless infinite feel
  const tripled = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="marquee-bar"
      aria-hidden="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Refined edge fades */}
      <div className="marquee-fade marquee-fade--l" />
      <div className="marquee-fade marquee-fade--r" />

      {/* Top / bottom hairline rules */}
      <div className="marquee-rule marquee-rule--top" />
      <div className="marquee-rule marquee-rule--bottom" />

      <div className="marquee-track">
        <div className="marquee-inner" ref={innerRef}>
          {tripled.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-sep" aria-hidden="true" />
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBar;