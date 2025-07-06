import React from 'react';
import './Forum.css';

const topics = [
  {
    icon: '❓',
    title: 'Dúvidas sobre Aerodinâmica',
    desc: 'Pergunte e responda sobre princípios de voo, sustentação, arrasto e mais.'
  },
  {
    icon: '🛠️',
    title: 'Manutenção e Engenharia',
    desc: 'Discussão sobre manutenção, inspeções e engenharia de aeronaves.'
  },
  {
    icon: '🗺️',
    title: 'Navegação e Meteorologia',
    desc: 'Compartilhe dicas e tire dúvidas sobre navegação aérea e clima.'
  },
  {
    icon: '💬',
    title: 'Geral e Carreira',
    desc: 'Fale sobre carreira, mercado, experiências e curiosidades da aviação.'
  }
];

const Forum = () => (
  <section className="forum-section">
    <h2>Fórum de Discussão</h2>
    <p>Participe do fórum, tire dúvidas, compartilhe experiências e interaja com outros alunos e entusiastas da aviação!</p>
    <ul>
      {topics.map((item, idx) => (
        <li key={idx} className="forum-card">
          <span className="forum-icon">{item.icon}</span>
          <div className="forum-info">
            <span className="forum-title">{item.title}</span>
            <div className="forum-desc">{item.desc}</div>
          </div>
        </li>
      ))}
    </ul>
    <div style={{marginTop: '2rem', color: '#888'}}>Em breve: Espaço interativo para perguntas e respostas.</div>
  </section>
);

export default Forum; 