import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo1.png';

/* ════════════════════════════════════════
   3D SVG ICON COMPONENTS
   ════════════════════════════════════════ */

const HomeIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 10.5L12 4l9 6.5V21H5V10.5z" fill="rgba(0,0,0,0.55)" transform="translate(0.6,0.8)"/>
    <path d="M3 10.5L12 4l9 6.5V21H5V10.5z" fill="rgba(20,50,15,0.9)" stroke="rgba(30,80,20,0.6)" strokeWidth="0.4"/>
    <path d="M3 10.5L12 4l9 6.5V20H5V10.5z" fill="rgba(30,70,20,0.85)"/>
    <path d="M12 4L3 10.5h18L12 4z" fill={color} opacity="0.82" stroke={color} strokeWidth="0.25"/>
    <rect x="9.5" y="15" width="5" height="6" rx="0.5" fill="rgba(0,0,0,0.55)" stroke={color} strokeWidth="0.35" opacity="0.7"/>
    <path d="M5 10.5L12 5.2l3.5 2.4" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeLinecap="round"/>
  </svg>
);

const AboutIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12.6" cy="9.3" rx="3.5" ry="3.5" fill="rgba(0,0,0,0.5)" transform="translate(0,0.7)"/>
    <circle cx="12" cy="8.5" r="3.5" fill="rgba(20,50,15,0.9)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.4"/>
    <circle cx="12" cy="8.5" r="3.5" fill={color} opacity="0.75"/>
    <ellipse cx="10.8" cy="7.1" rx="1" ry="0.65" fill="rgba(255,255,255,0.22)" transform="rotate(-30,10.8,7.1)"/>
    <path d="M5.5 21v-1.5A6.5 6.5 0 0118.5 19.5V21" fill="rgba(0,0,0,0.45)" transform="translate(0.4,0.5)"/>
    <path d="M5.5 21v-1.5A6.5 6.5 0 0118.5 19.5V21z" fill="rgba(20,55,15,0.9)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.4"/>
    <path d="M5.5 21v-1.5A6.5 6.5 0 0118.5 19.5V21z" fill={color} opacity="0.65"/>
  </svg>
);

const FeaturesIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12.6" cy="12.6" r="4" fill="rgba(0,0,0,0.5)"/>
    {[0,45,90,135,180,225,270,315].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      const x1 = 12 + 5.5 * Math.cos(r), y1 = 12 + 5.5 * Math.sin(r);
      const x2 = 12 + 7   * Math.cos(r), y2 = 12 + 7   * Math.sin(r);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(20,55,15,0.9)" strokeWidth="2.6" strokeLinecap="round"/>;
    })}
    <circle cx="12" cy="12" r="5.5" fill="rgba(20,55,15,0.92)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.4"/>
    <circle cx="12" cy="12" r="5.5" fill={color} opacity="0.68"/>
    {[0,45,90,135,180,225,270,315].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      const x1 = 12 + 5.5 * Math.cos(r), y1 = 12 + 5.5 * Math.sin(r);
      const x2 = 12 + 6.8 * Math.cos(r), y2 = 12 + 6.8 * Math.sin(r);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>;
    })}
    <circle cx="12" cy="12" r="2.4" fill="rgba(5,12,5,0.95)" stroke={color} strokeWidth="0.4" opacity="0.9"/>
    <ellipse cx="10.4" cy="10.2" rx="1.2" ry="0.7" fill="rgba(255,255,255,0.18)" transform="rotate(-40,10.4,10.2)"/>
  </svg>
);

const OpticoreIcon3D = ({ size = 30, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="14.6" cy="14.5" r="4.5" fill="rgba(0,0,0,0.55)"/>
    <circle cx="14" cy="14" r="4.5" fill="rgba(25,70,15,0.9)" stroke="rgba(40,100,20,0.5)" strokeWidth="0.4"/>
    <circle cx="14" cy="14" r="4.5" fill={color} opacity="0.82"/>
    {[[14,14,5,14],[14,14,23,14],[14,14,14,5],[14,14,14,23],
      [14,14,7.5,7.5],[14,14,20.5,7.5],[14,14,7.5,20.5],[14,14,20.5,20.5]
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.9" opacity="0.55"/>
    ))}
    {[[5,14],[23,14],[14,5],[14,23],[7.5,7.5],[20.5,7.5],[7.5,20.5],[20.5,20.5]].map(([cx,cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="1.1" fill={color} opacity="0.75" stroke={color} strokeWidth="0.2"/>
    ))}
    <circle cx="14" cy="14" r="2.2" fill="rgba(5,12,5,0.9)" stroke={color} strokeWidth="0.5"/>
    <circle cx="14" cy="14" r="1.1" fill={color} opacity="0.9"/>
    <ellipse cx="12" cy="11.5" rx="1.4" ry="0.8" fill="rgba(255,255,255,0.22)" transform="rotate(-35,12,11.5)"/>
  </svg>
);

const HowWorksIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12.5" cy="12.5" r="3" fill="rgba(0,0,0,0.5)"/>
    {[[[12,5],[12,9]],[[12,15],[12,19]],[[5,12],[9,12]],[[15,12],[19,12]]].map(([[x1,y1],[x2,y2]],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(20,55,15,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
    ))}
    {[[[12,5],[12,9]],[[12,15],[12,19]],[[5,12],[9,12]],[[15,12],[19,12]]].map(([[x1,y1],[x2,y2]],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    ))}
    {[[12,4],[12,20],[4,12],[20,12]].map(([cx,cy],i)=>(
      <circle key={i} cx={cx} cy={cy} r="1.6" fill="rgba(20,55,15,0.9)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.3"/>
    ))}
    {[[12,4],[12,20],[4,12],[20,12]].map(([cx,cy],i)=>(
      <circle key={i} cx={cx} cy={cy} r="1.6" fill={color} opacity="0.75"/>
    ))}
    <circle cx="12" cy="12" r="3" fill="rgba(20,55,15,0.92)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.4"/>
    <circle cx="12" cy="12" r="3" fill={color} opacity="0.78"/>
    <ellipse cx="10.8" cy="10.8" rx="1" ry="0.6" fill="rgba(255,255,255,0.2)" transform="rotate(-35,10.8,10.8)"/>
  </svg>
);

const PricingIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12.6 3.6l5.7 5.7-5.7 11.4-5.7-11.4z" fill="rgba(0,0,0,0.5)" transform="translate(0,0.6)"/>
    <path d="M12 3l5.5 5.5L12 21 6.5 8.5z" fill="rgba(20,55,15,0.9)" stroke="rgba(30,80,20,0.5)" strokeWidth="0.4"/>
    <path d="M12 3l5.5 5.5L12 21 6.5 8.5z" fill={color} opacity="0.72"/>
    <path d="M6.5 8.5h11L12 3z" fill={color} opacity="0.92" stroke={color} strokeWidth="0.2"/>
    <path d="M6.5 8.5L12 21l-5.5-12.5z" fill="rgba(0,0,0,0.25)"/>
    <line x1="12" y1="3" x2="12" y2="21" stroke="rgba(0,0,0,0.2)" strokeWidth="0.4"/>
    <path d="M10.5 5.5l2 1.8 2-1.8" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const ContactIcon3D = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2.5 3.5a17 17 0 0119 19" stroke="rgba(0,0,0,0.45)" strokeWidth="2.5" strokeLinecap="round" transform="translate(0.4,0.4)"/>
    <path d="M6.5 7a11 11 0 0111 11"   stroke="rgba(0,0,0,0.4)"  strokeWidth="2.2" strokeLinecap="round" transform="translate(0.3,0.3)"/>
    <path d="M10.5 10.5a6 6 0 016 6"   stroke="rgba(0,0,0,0.38)" strokeWidth="2"   strokeLinecap="round" transform="translate(0.2,0.2)"/>
    <path d="M2.5 3.5a17 17 0 0119 19" stroke="rgba(20,55,15,0.85)" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M6.5 7a11 11 0 0111 11"   stroke="rgba(25,65,15,0.85)" strokeWidth="2"   strokeLinecap="round"/>
    <path d="M10.5 10.5a6 6 0 016 6"   stroke="rgba(30,75,15,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M2.5 3.5a17 17 0 0119 19" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.75"/>
    <path d="M6.5 7a11 11 0 0111 11"   stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.82"/>
    <path d="M10.5 10.5a6 6 0 016 6"   stroke={color} strokeWidth="1"   strokeLinecap="round" opacity="0.9"/>
    <circle cx="14" cy="14" r="1.5" fill="rgba(15,45,10,0.95)" stroke="rgba(30,80,20,0.4)" strokeWidth="0.3"/>
    <circle cx="14" cy="14" r="1.5" fill={color} opacity="0.95"/>
    <circle cx="13.3" cy="13.3" r="0.45" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

/* ════════════════════════════════════════
   ARC OFFSETS — parabola, center = highest
   Positive value = upward (into arc peak)
   ════════════════════════════════════════ */
const ARC_OFFSETS  = [38, 18, 6, 0, 6, 18, 38]; // px lift upward from base
const CIRCLE_SIZES = [52, 58, 62, 80, 62, 58, 52]; // px diameter

/* ════════════════════════════════════════
   NAV CONFIG
   ════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Home',      href: '#hero',       icon: (sz, c) => <HomeIcon3D     size={sz} color={c}/> },
  { label: 'About',     href: '#about',      icon: (sz, c) => <AboutIcon3D    size={sz} color={c}/>,
    submenu: [
      { label: 'Our Insights & Vision', href: '#vision' },
      { label: 'Our Philosophy',        href: '#philosophy' },
      { label: 'Our Team',              href: '#team' },
      { label: 'Our Partners',          href: '#partners' },
    ],
  },
  { label: 'Features',  href: '#services',   icon: (sz, c) => <FeaturesIcon3D size={sz} color={c}/> },
  { label: 'Opticore',  href: '#portfolio',  icon: (sz, c) => <OpticoreIcon3D size={sz} color={c}/>, defaultActive: true },
  { label: 'How Works', href: '#how-works',  icon: (sz, c) => <HowWorksIcon3D size={sz} color={c}/> },
  { label: 'Pricing',   href: '#pricing',    icon: (sz, c) => <PricingIcon3D  size={sz} color={c}/> },
  { label: 'Contact',   href: '#contact',    icon: (sz, c) => <ContactIcon3D  size={sz} color={c}/>, contactHighlight: true },
];

/* ════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled,    setScrolled]  = useState(false);
  const [mobileOpen,  setMobile]    = useState(false);
  const [activeIdx,   setActive]    = useState(3); // default Opticore

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const GREEN = '#39ff14';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Arc surface */}
      <div className="nav-arc-bg" />

      <div className="nav-container">

        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <img src={logo} alt="Logo" className="nav-logo-img" />
          <span className="nav-logo-text">
            Acornic<span> Ventures</span>
          </span>
        </a>

        {/* Arc nav links */}
        <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {NAV_LINKS.map((link, i) => {
            const isActive   = activeIdx === i;
            const isContact  = !!link.contactHighlight;
            const arcLift    = ARC_OFFSETS[i]  ?? 0;
            const circleSize = CIRCLE_SIZES[i] ?? 58;
            const iconSize   = isActive
              ? Math.round(circleSize * 0.42)
              : Math.round(circleSize * 0.38);
            const iconColor  = (isActive || isContact) ? GREEN : 'rgba(57,255,20,0.52)';

            return (
              <div
                key={i}
                className={`nav-item-wrapper ${isActive ? 'active-item' : ''} ${isContact ? 'contact-item' : ''}`}
                style={{ transform: `translateY(-${arcLift}px)`, padding: '0 6px' }}
              >
                <a
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''} ${isContact && !isActive ? 'contact-active' : ''}`}
                  style={{ width: circleSize, height: circleSize }}
                  onClick={() => setActive(i)}
                  title={link.label}
                >
                  <span className="nav-icon-3d">
                    {link.icon(iconSize, iconColor)}
                  </span>
                  {link.submenu && (
                    <svg style={{ position:'absolute', bottom:5, width:5, height:5 }} viewBox="0 0 5 5">
                      <circle cx="2.5" cy="2.5" r="2" fill={iconColor} opacity="0.55"/>
                    </svg>
                  )}
                </a>

                <span className="nav-label">{link.label}</span>

                {link.submenu && (
                  <div className="submenu">
                    {link.submenu.map((sub, j) => (
                      <React.Fragment key={j}>
                        {j > 0 && <div className="submenu-divider" />}
                        <a href={sub.href} className="submenu-link">{sub.label}</a>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobile(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* CTA */}
        <div className="nav-actions">
          <a href="#contact" className="nav-btn-cta">
            Get in Touch
            <svg viewBox="0 0 16 16" fill="none" width="10" height="10"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"/>
            </svg>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;