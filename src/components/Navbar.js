import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo1.png';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  {
    label: 'About us',
    href: '#about',
    submenu: [
      { label: 'Our Insights and vision', href: '#vision' },
      { label: 'Our Philosophy', href: '#philosophy' },
      { label: 'Our Team', href: '#team' },
      { label: 'Our partners', href: '#partners' },
    ],
  },
  { label: 'Our Platform', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  {
    label: 'Opportunities',
    href: '#opportunities',
    submenu: [
      { label: 'For Investors', href: '#investors' },
      { label: 'For Founders', href: '#founders' },
    ],
  },
  { label: 'Governance', href: '#governance' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <img src={logo} alt="Acornic Ventures Logo" className="nav-logo-img" />
        </a>

        {/* Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {NAV_LINKS.map((link, i) => (
            <div key={i} className="nav-item-wrapper">
              <a href={link.href} className="nav-link">
                {link.label}
                {link.submenu && (
                  <svg className="nav-chevron" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
              {link.submenu && (
                <div className="submenu">
                  {link.submenu.map((sub, j) => (
                    <a key={j} href={sub.href} className="submenu-link">{sub.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Actions */}
        <div className="nav-actions">
          <a href="#contact" className="nav-btn-cta">
            Get in Touch
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
              <path d="M3.5 8h9m-4-4.5L12.5 8l-4 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
