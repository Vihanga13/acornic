import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, ScrollText } from 'lucide-react';
import './Governance.css';

const Governance = () => {
  return (
    <section id="governance" className="governance-section">
      <div className="governance-container">
        <div className="governance-header">
          <div className="section-badge"><span className="badge-dot" />Governance</div>
          <h2 className="section-title">
            Built on <span className="accent-green">Trust & Integrity</span>
          </h2>
          <p className="section-subtitle">
            Our governance framework ensures transparency, accountability, and ethical excellence across all operations.
          </p>
        </div>

        <div className="governance-grid">
          <motion.div 
            className="governance-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="governance-icon">
              <ShieldCheck size={28} />
            </div>
            <div className="governance-content">
              <h3>Ethical Excellence</h3>
              <p>Adhering to the highest standards of ethics and professionalism in every partnership.</p>
            </div>
          </motion.div>

          <motion.div 
            className="governance-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="governance-icon">
              <Scale size={28} />
            </div>
            <div className="governance-content">
              <h3>Transparent Reporting</h3>
              <p>Ensuring all stakeholders have clear visibility into performance and decision-making.</p>
            </div>
          </motion.div>

          <motion.div 
            className="governance-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="governance-icon">
              <ScrollText size={28} />
            </div>
            <div className="governance-content">
              <h3>Regulatory Compliance</h3>
              <p>Full compliance with global regulatory standards across all our investment regions.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Governance;
