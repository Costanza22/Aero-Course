'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

function applyThemeClass(isDark) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}

const ThemeToggle = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aerocourse_theme');
    setIsDark(saved === 'dark');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('aerocourse_theme', isDark ? 'dark' : 'light');
    applyThemeClass(isDark);
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((d) => !d);
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'dark' : 'light'} ${className}`.trim()}
      onClick={toggleTheme}
      title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      <span className="toggle-icon">{isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}</span>
      <div className="toggle-slider">
        <div className="slider-track">
          <div className="slider-thumb" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
