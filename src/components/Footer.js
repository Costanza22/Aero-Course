import React from 'react';
import { Plane, Mail, Phone, Globe, Camera, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand-block">
            <h3 className="footer-brand-title">
              <Plane className="footer-brand-icon" size={22} strokeWidth={2} aria-hidden />
              AeroCourse
            </h3>
            <p className="footer-brand-tagline">
              Curso 100% online em aeronáutica — estude no seu ritmo, de qualquer lugar, com o mesmo
              conteúdo pensado para entusiastas e para quem quer evoluir na aviação.
            </p>
          </div>

          <div className="footer-section footer-section--course">
            <h4>Curso</h4>
            <ul>
              <li>Fundamentos da Aeronáutica</li>
              <li>Sistemas de Aeronaves</li>
              <li>Navegação Aérea</li>
              <li>Meteorologia Aeronáutica</li>
            </ul>
          </div>

          <div className="footer-section footer-section--resources">
            <h4>Recursos</h4>
            <ul className="footer-resources-list">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('library')}>
                  Biblioteca digital
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('simulators')}>
                  Simuladores
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('forum')}>
                  Fórum
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('grades')}>
                  Notas
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('exercises')}>
                  Exercícios
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('certificate')}>
                  Certificado
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('downloads')}>
                  Downloads
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('analytics')}>
                  Analytics
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('content-library')}>
                  Biblioteca de conteúdo
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate?.('interactive-content')}>
                  Conteúdo interativo
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-contact">
            <h4>Contato</h4>
            <div className="footer-contact-card">
              <p className="footer-contact-intro">Dúvidas sobre matrícula ou acesso? Fale com a gente.</p>
              <ul className="footer-contact-list">
                <li>
                  <a href="mailto:contato@aerocourse.com" className="footer-contact-line">
                    <Mail size={16} aria-hidden />
                    contato@aerocourse.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5547988041237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-line"
                  >
                    <Phone size={16} aria-hidden />
                    WhatsApp · (47) 98804-1237
                  </a>
                </li>
                <li className="footer-contact-line footer-contact-line--muted">
                  <Globe size={16} aria-hidden />
                  Curso remoto · acesse de onde estiver
                </li>
              </ul>
              <div className="footer-social">
                <a
                  href="https://instagram.com/cos_assef"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <Camera size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/costanzaassef"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="LinkedIn"
                >
                  <Briefcase size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} AeroCourse · curso online</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
