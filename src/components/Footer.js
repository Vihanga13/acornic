import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer id="governance" className="footer">
    <div className="footer-top-glow" />
    <div className="footer-container">

      {/* Brand */}
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="footer-logo-mark">A</div>
          <span className="footer-logo-text">Acornic<span> Ventures</span></span>
        </div>
        <p className="footer-tagline">
          Nurturing bold ideas into global enterprises. Partners in your journey from seed to scale.
        </p>
        <div className="footer-contact-info">
          <div className="fci-row">
            <span className="fci-icon">📍</span>
            <span>Level 12, World Trade Centre, Colombo 01, Sri Lanka</span>
          </div>
          <div className="fci-row">
            <span className="fci-icon">📧</span>
            <a href="mailto:hello@acornicventures.com">hello@acornicventures.com</a>
          </div>
          <div className="fci-row">
            <span className="fci-icon">📞</span>
            <span>+94 11 234 5678</span>
          </div>
        </div>
        <div className="footer-socials">
          {[
            { label:'LI', href:'#!', title:'LinkedIn' },
            { label:'𝕏',  href:'#!', title:'X / Twitter' },
            { label:'YT', href:'#!', title:'YouTube' },
            { label:'GH', href:'#!', title:'GitHub' },
          ].map((s,i)=>(
            <a key={i} href={s.href} title={s.title} className="footer-social">{s.label}</a>
          ))}
        </div>
      </div>

      {/* Link columns */}
      {[
        {
          heading:'Company',
          links:[
            { label:'About Us',      href:'#about' },
            { label:'Our Story',     href:'#story' },
            { label:'Leadership',    href:'#team' },
            { label:'Governance',    href:'#governance' },
            { label:'Press & Media', href:'#!' },
            { label:'Careers',       href:'#!' },
          ],
        },
        {
          heading:'Investments',
          links:[
            { label:'Portfolio',       href:'#portfolio' },
            { label:'Active Startups', href:'#!' },
            { label:'Success Stories', href:'#!' },
            { label:'Fund I',          href:'#!' },
            { label:'Fund II',         href:'#!' },
            { label:'Fund III',        href:'#!' },
          ],
        },
        {
          heading:'Opportunities',
          links:[
            { label:'For Founders',   href:'#founders' },
            { label:'For Investors',  href:'#investors' },
            { label:'Submit a Pitch', href:'#contact' },
            { label:'Accelerator',    href:'#!' },
            { label:'LP Relations',   href:'#!' },
            { label:'Co-Investment',  href:'#!' },
          ],
        },
        {
          heading:'Resources',
          links:[
            { label:'Insights Blog',  href:'#insights' },
            { label:'Market Reports', href:'#!' },
            { label:'Podcast',        href:'#!' },
            { label:'Founder Toolkit',href:'#!' },
            { label:'FAQs',           href:'#!' },
            { label:'Contact',        href:'#contact' },
          ],
        },
      ].map((col,i)=>(
        <div key={i} className="footer-col">
          <span className="footer-col-heading">{col.heading}</span>
          <ul>
            {col.links.map((l,j)=>(
              <li key={j}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom */}
    <div className="footer-bottom-wrap">
      <div className="footer-bottom">
        <span>© 2026 Acornic Ventures (Pvt) Ltd. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Use</a>
          <a href="#!">Cookie Policy</a>
          <a href="#!">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
