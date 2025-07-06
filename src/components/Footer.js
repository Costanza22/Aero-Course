import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>✈️ AeroCourse</h3>
            <p>
              Plataforma educacional especializada em aeronáutica, 
              oferecendo conhecimento de qualidade para entusiastas 
              e profissionais da aviação.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Curso</h4>
            <ul>
              <li>Fundamentos da Aeronáutica</li>
              <li>Sistemas de Aeronaves</li>
              <li>Navegação Aérea</li>
              <li>Meteorologia Aeronáutica</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><button className="footer-link-btn" onClick={() => onNavigate && onNavigate('library')}>Biblioteca Digital</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate && onNavigate('simulators')}>Simuladores</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate && onNavigate('forum')}>Fórum de Discussão</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate && onNavigate('grades')}>📊 Sistema de Notas</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate && onNavigate('exercises')}>🔧 Exercícios Práticos</button></li>
              <li>Certificação</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🎓 Recursos Educacionais</h4>
            <ul>
              <li><button className="footer-link-btn" onClick={() => onNavigate('grades')}>Sistema de Notas</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('simulator')}>Simulador de Voo</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('exercises')}>Exercícios Interativos</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('certificate')}>Gerar Certificado</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('downloads')}>Centro de Downloads</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('analytics')}>Dashboard Analytics</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('content-library')}>Biblioteca de Conteúdo</button></li>
              <li><button className="footer-link-btn" onClick={() => onNavigate('interactive-content')}>🎯 Conteúdo Interativo</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contato</h4>
            <ul>
              <li>📧 contato@aerocourse.com</li>
              <li>📱 (47) 98804-1237</li>
              <li>📸 Instagram: <a href="https://instagram.com/cos_assef" target="_blank" rel="noopener noreferrer" className="footer-link">@cos_assef</a></li>
              <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/costanzaassef" target="_blank" rel="noopener noreferrer" className="footer-link">Costanza Assef</a></li>
              <li>📍 Curitiba, PR</li>
              <li>🕒 Seg-Sex: 9h-18h</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          {/* <p>&copy; 2024 AeroCourse. Todos os direitos reservados.</p> */}
          <div className="social-links">
            <button className="social-link">📘</button>
            <button className="social-link">📷</button>
            <button className="social-link">🐦</button>
            <button className="social-link">📺</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 