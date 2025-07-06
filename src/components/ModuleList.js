import React from 'react';
import './ModuleList.css';

const modules = [
  {
    id: 1,
    title: 'Fundamentos da Aeronáutica',
    icon: '🛩️',
    description: 'Princípios básicos de voo e aerodinâmica.'
  },
  {
    id: 2,
    title: 'Sistemas de Aeronaves',
    icon: '⚙️',
    description: 'Componentes e sistemas essenciais das aeronaves.'
  },
  {
    id: 3,
    title: 'Navegação Aérea',
    icon: '🧭',
    description: 'Técnicas de navegação e instrumentos de voo.'
  },
  {
    id: 4,
    title: 'Meteorologia Aeronáutica',
    icon: '🌤️',
    description: 'Condições meteorológicas e sua influência no voo.'
  },
  {
    id: 5,
    title: 'Regulamentação Aeronáutica',
    icon: '📋',
    description: 'Normas e regulamentos da aviação civil.'
  },
  {
    id: 6,
    title: 'Manutenção de Aeronaves',
    icon: '🔧',
    description: 'Procedimentos de manutenção e inspeção.'
  }
];

const ModuleList = ({ onSelectModule }) => {
  return (
    <section className="module-list-section">
      <h2 className="module-list-title">Módulos do Curso</h2>
      <div className="module-list-grid">
        {modules.map((mod) => (
          <div className="module-card" key={mod.id}>
            <div className="module-icon">{mod.icon}</div>
            <h3>{mod.title}</h3>
            <p>{mod.description}</p>
            <button className="module-btn" onClick={() => onSelectModule(mod.id)}>
              Acessar Módulo
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModuleList; 