import React from 'react';
import './Hero.css';

const Hero = ({ onStartCourse }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Descubra o Mundo da <span className="highlight">Aeronáutica</span>
          </h1>
          <p className="hero-subtitle">
            Aprenda os fundamentos da aviação, desde os princípios básicos de voo 
            até as tecnologias mais avançadas da indústria aeronáutica.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">📚</span>
              <span>Conteúdo Completo</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Aprendizado Prático</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span>Certificado</span>
            </div>
          </div>
          <button className="cta-button" onClick={onStartCourse}>
            Começar o Curso
          </button>
        </div>
        <div className="hero-visual">
          <div className="airplane-animation">
            <div className="airplane">✈️</div>
            <div className="clouds">
              <div className="cloud cloud-1">☁️</div>
              <div className="cloud cloud-2">☁️</div>
              <div className="cloud cloud-3">☁️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 