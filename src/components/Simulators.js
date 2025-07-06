import React from 'react';
import './Simulators.css';

const simulators = [
  {
    icon: '🛫',
    name: 'GeoFS',
    url: 'https://www.geo-fs.com/',
    desc: 'Simulador de voo online, gratuito e fácil de usar.'
  },
  {
    icon: '🖥️',
    name: 'FlightGear',
    url: 'https://www.flightgear.org/',
    desc: 'Simulador open source com física realista e comunidade ativa.'
  },
  {
    icon: '✈️',
    name: 'X-Plane',
    url: 'https://www.x-plane.com/',
    desc: 'Simulador avançado, usado por entusiastas e profissionais.'
  },
  {
    icon: '🕹️',
    name: 'Microsoft Flight Simulator',
    url: 'https://www.microsoft.com/pt-br/p/microsoft-flight-simulator/9nxn8gf8n9ht',
    desc: 'Um dos simuladores mais famosos e realistas do mundo.'
  }
];

const Simulators = () => (
  <section className="simulators-section">
    <h2>Simuladores</h2>
    <p>Explore simuladores de voo e ferramentas interativas para praticar conceitos de aeronáutica.</p>
    <ul>
      {simulators.map((item, idx) => (
        <li key={idx} className="simulator-card">
          <span className="simulator-icon">{item.icon}</span>
          <div className="simulator-info">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="simulator-link">{item.name}</a>
            <div className="simulator-desc">{item.desc}</div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Simulators; 