'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plane } from 'lucide-react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import NotificationSystem from './NotificationSystem';

const RESOURCE_KEYS = [
  { id: 'exercises', label: 'Exercícios' },
  { id: 'certificate', label: 'Certificado' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'content-library', label: 'Biblioteca' },
  { id: 'interactive-content', label: 'Conteúdo interativo' },
];

const Header = ({ navigate, currentSection, user, onLogout }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  const resourceActive = RESOURCE_KEYS.some((r) => r.id === currentSection);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const go = (section) => {
    navigate(section);
    setMoreOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-mark" aria-hidden>
            <Plane size={18} strokeWidth={2.2} />
          </span>
          <div className="header-titles">
            <span className="header-name">AeroCourse</span>
            <span className="header-tagline">Aeronáutica</span>
          </div>
        </div>

        <nav className="header-nav" aria-label="Principal">
          <button
            type="button"
            className={`nav-link ${currentSection === 'home' ? 'is-active' : ''}`}
            onClick={() => go('home')}
          >
            Início
          </button>
          <button
            type="button"
            className={`nav-link ${currentSection === 'modules' ? 'is-active' : ''}`}
            onClick={() => go('modules')}
          >
            Curso
          </button>
          <button
            type="button"
            className={`nav-link ${currentSection === 'about' ? 'is-active' : ''}`}
            onClick={() => go('about')}
          >
            Sobre
          </button>

          <div className={`nav-more ${moreOpen ? 'is-open' : ''}`} ref={moreRef}>
            <button
              type="button"
              className={`nav-more-trigger ${resourceActive ? 'is-active' : ''}`}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((o) => !o)}
            >
              Mais
              <span className="nav-more-chevron" aria-hidden />
            </button>
            {moreOpen && (
              <div className="nav-more-panel" role="menu">
                {RESOURCE_KEYS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitem"
                    className={`nav-more-item ${currentSection === id ? 'is-active' : ''}`}
                    onClick={() => go(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <ThemeToggle className="theme-toggle--toolbar" />
          <NotificationSystem user={user} className="notification-system--toolbar" />
          <button type="button" className="header-logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
