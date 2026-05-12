import React from 'react';
import './App.css';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import MarqueeBar from './components/MarqueeBar';
import About     from './components/About';
import Platform  from './components/Platform';
import Portfolio from './components/Portfolio';
import Team      from './components/Team';
import Opportunities from './components/Opportunities';
import Governance    from './components/Governance';
import CTA       from './components/CTA';
import Footer    from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <Platform />
      <Portfolio />
      <Team />
      <Opportunities />
      <Governance />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
