import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, TrendingUp } from 'lucide-react';
import './Opportunities.css';

const Opportunities = () => {
  return (
    <section id="opportunities" className="opportunities-section">
      <div className="opportunities-container">
        <div className="opportunities-header">
          <div className="section-badge"><span className="badge-dot" />Opportunities</div>
          <h2 className="section-title">
            Join the <span className="accent-green">Acornic ecosystem</span>
          </h2>
          <p className="section-subtitle">
            Whether you are a visionary founder or an ambitious investor, we have the platform to help you scale your impact.
          </p>
        </div>

        <div className="opportunities-grid">
          {/* For Investors */}
          <motion.div 
            className="opportunity-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="opportunity-icon">
              <TrendingUp size={32} />
            </div>
            <h3 className="opportunity-title">For Investors</h3>
            <p className="opportunity-desc">
              Gain access to high-growth, early-stage ventures that are redefining their industries. Join our network of strategic LPs.
            </p>
            <a href="#contact" className="btn btn-primary">
              Investment Inquiry
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* For Founders */}
          <motion.div 
            className="opportunity-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="opportunity-icon">
              <UserPlus size={32} />
            </div>
            <h3 className="opportunity-title">For Founders</h3>
            <p className="opportunity-desc">
              Looking for more than just capital? Get the strategic guidance and operational support you need to build a global enterprise.
            </p>
            <a href="#contact" className="btn btn-outline">
              Pitch Your Idea
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
