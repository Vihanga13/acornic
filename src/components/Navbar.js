import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo1.png';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  {
    label: 'About',
    href: '#about',
  },
  { label: 'Platform', href: '#services' },
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

const ChevronIcon = () => (
  <svg
    className="nav-chevron"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 3.5l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <span className="cta-arrow" aria-hidden="true">
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path
        d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e) => {
      if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [mobileOpen]);

  return (
    <nav
      id="navbar"
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">

        {/* ── Logo ── */}
        <a href="#hero" className="nav-logo" aria-label="Acornic Ventures — home">
          <img src={logo} alt="Acornic Ventures" className="nav-logo-img" />
          
        </a>

        {/* ── Centre Capsule Links ── */}
        <div
          className={`nav-links${mobileOpen ? ' mobile-open' : ''}`}
          role="menubar"
        >
          {NAV_LINKS.map((link, i) => (
            <div key={i} className="nav-item-wrapper" role="none">
              <a
                href={link.href}
                className="nav-link"
                role="menuitem"
                aria-haspopup={link.submenu ? 'true' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.submenu && <ChevronIcon />}
              </a>

              {link.submenu && (
                <div className="submenu" role="menu" aria-label={`${link.label} submenu`}>
                  {link.submenu.map((sub, j) => (
                    <a
                      key={j}
                      href={sub.href}
                      className="submenu-link"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>

        {/* ── Right Actions ── */}
        <div className="nav-actions">
          <a href="#login" className="nav-btn-ghost">
            Sign in
          </a>
          <a href="#contact" className="nav-btn-cta">
            Get in Touch <ArrowIcon />
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;