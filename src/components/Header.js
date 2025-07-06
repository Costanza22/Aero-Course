import React from 'react';
import './Header.css';

const Header = ({ setCurrentSection, currentSection }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>✈️ AeroCourse</h1>
        </div>
        <nav className="nav">
          <button 
            className={`nav-button ${currentSection === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentSection('home')}
          >
            Início
          </button>
          <button 
            className={`nav-button ${currentSection === 'modules' ? 'active' : ''}`}
            onClick={() => setCurrentSection('modules')}
          >
            Curso
          </button>
          <button 
            className={`nav-button ${currentSection === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentSection('about')}
          >
            Sobre
          </button>
          <button 
            className={`nav-button ${currentSection === 'exercises' ? 'active' : ''}`}
            onClick={() => setCurrentSection('exercises')}
          >
            🎯 Exercícios Interativos
          </button>
          <button 
            className={`nav-button ${currentSection === 'certificate' ? 'active' : ''}`}
            onClick={() => setCurrentSection('certificate')}
          >
            🏆 Certificado
          </button>
          <button 
            className={`nav-button ${currentSection === 'downloads' ? 'active' : ''}`}
            onClick={() => setCurrentSection('downloads')}
          >
            📥 Downloads
          </button>
          <button 
            className={`nav-button ${currentSection === 'analytics' ? 'active' : ''}`}
            onClick={() => setCurrentSection('analytics')}
          >
            📊 Analytics
          </button>
          <button 
            className={`nav-button ${currentSection === 'content-library' ? 'active' : ''}`}
            onClick={() => setCurrentSection('content-library')}
          >
            📚 Biblioteca
          </button>
          <button 
            className={`nav-button ${currentSection === 'interactive-content' ? 'active' : ''}`}
            onClick={() => setCurrentSection('interactive-content')}
          >
            🎯 Conteúdo Interativo
          </button>
          {/* <button className="nav-button">
            Contato
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Header; 