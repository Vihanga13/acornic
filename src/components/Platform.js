import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Building2, Layers, Zap, Lightbulb } from 'lucide-react';
import './Platform.css';

const PLATFORM_FEATURES = [
  { 
    id: '01', 
    title: 'Strategic Advisory', 
    icon: <MessageSquare size={24} />,
    desc: 'Deep industry expertise to guide your most critical strategic decisions.' 
  },
  { 
    id: '02', 
    title: 'World-Class Facilities', 
    icon: <Building2 size={24} />,
    desc: 'State-of-the-art labs and production facilities to accelerate development.' 
  },
  { 
    id: '03', 
    title: 'Comprehensive Services', 
    icon: <Layers size={24} />,
    desc: 'Full-stack operational support from legal to logistics and HR.' 
  },
  { 
    id: '04', 
    title: 'Value Additions', 
    icon: <Zap size={24} />,
    desc: 'Exclusive access to our global network of experts and partners.' 
  },
  { 
    id: '05', 
    title: 'Continuous Innovation', 
    icon: <Lightbulb size={24} />,
    desc: 'Stay ahead with our dedicated R&D and future-proofing programs.' 
  },
];

const Platform = () => {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Left Content */}
        <div className="services-left">
          <motion.h2 
            className="services-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Our Platform.
          </motion.h2>

          <motion.p 
            className="services-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A cohesive ecosystem designed to provide the advisory, facilities, services, and value additions needed to drive groundbreaking innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#contact" className="btn btn-primary">
              Learn More About Our Platform
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right Cards */}
        <div className="services-right">
          <div className="services-list">
            {PLATFORM_FEATURES.map((feature, i) => (
              <motion.div 
                key={feature.id} 
                className="service-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="service-id">{feature.icon}</div>
                <div className="service-content">
                  <h3 className="service-title">{feature.title}</h3>
                  <p className="service-desc-small">{feature.desc}</p>
                </div>
                <div className="service-arrow">
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
