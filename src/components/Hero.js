import React from 'react';
import Image from 'next/image';
import './Hero.css';

const Hero = ({ onStartCourse }) => {
  return (
    <section className="hero">
      <div className="hero-grid-overlay" aria-hidden />
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-kicker">Curso online · Aeronáutica</p>
          <h1 className="hero-title">
            Domine os fundamentos do <span className="highlight">voo</span>
          </h1>
          <p className="hero-subtitle">
            Um percurso direto, com foco em prática: da aerodinâmica à navegação, com recursos que
            acompanham o ritmo do seu estudo.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-dot" />
              <span>Trilha modular</span>
            </div>
            <div className="feature">
              <span className="feature-dot" />
              <span>Exercícios e simuladores</span>
            </div>
            <div className="feature">
              <span className="feature-dot" />
              <span>Certificado ao concluir</span>
            </div>
          </div>
          <button type="button" className="cta-button" onClick={onStartCourse}>
            Entrar no curso
          </button>
        </div>
        <div className="hero-visual">
          <div className="hero-panel-3d">
            <div className="hero-panel">
              <div className="hero-image-wrap">
                <Image
                  src="/images/varig-hero.jpg"
                  alt="Aeronave da Varig em voo"
                  fill
                  sizes="(max-width: 768px) min(100vw, 320px), 380px"
                  priority
                  className="hero-image"
                />
                <div className="hero-image-overlay" aria-hidden />
                <div className="hero-image-gleam" aria-hidden />
              </div>
              <div className="hero-meta">
                <span className="hero-meta-label">Altitude de aprendizado</span>
                <span className="hero-meta-value">contínua</span>
              </div>
              <p className="hero-image-credit">
                Imagem: Shutterstock ·{' '}
                <a
                  href="https://www.seudinheiro.com/2019/empresas/varig-mexico-vai-a-leilao-em-junho-quase-12-anos-apos-empresa-area-deixar-de-voar/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Seu Dinheiro
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
