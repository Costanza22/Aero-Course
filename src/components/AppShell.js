'use client';

import React, { useState, useEffect } from 'react';
import './AppShell.css';
import Header from './Header';
import Hero from './Hero';
import CourseContent from './CourseContent';
import About from './About';
import Footer from './Footer';
import Login from './Login';
import ModulePage from './ModulePage';
import Library from './Library';
import Simulators from './Simulators';
import Forum from './Forum';
import Chat from './Chat';
import GradeSystem from './GradeSystem';
import FlightSimulator from './FlightSimulator';
import InteractiveExercises from './InteractiveExercises';
import { GraduationCap } from 'lucide-react';
import CertificateGenerator from './CertificateGenerator';
import DownloadCenter from './DownloadCenter';
import AnalyticsDashboard from './AnalyticsDashboard';
import ContentLibrary from './ContentLibrary';
import InteractiveContent from './InteractiveContent';
import '../styles/dark-theme.css';

const PROGRESS_KEY = 'aerocourse_progress';

function Certificate() {
  return (
    <section className="certificate-section">
      <div className="certificate-card">
        <h2 className="certificate-heading">
          <GraduationCap size={28} strokeWidth={2} aria-hidden />
          Certificado de conclusão
        </h2>
        <p>Parabéns! Você concluiu todos os módulos do curso AeroCourse.</p>
        <div className="certificate-paper">
          <h3>Certificado</h3>
          <p>Este certificado reconhece que você completou com sucesso o curso de Aeronáutica.</p>
          <div className="certificate-sign">Costanza Pasquotto Assef</div>
          <div className="certificate-date">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </section>
  );
}

export default function AppShell() {
  const [currentSection, setCurrentSection] = useState('home');
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('loggedUser');
    if (saved) setUser(JSON.parse(saved));
    setHydrated(true);
  }, []);

  const completed = (() => {
    if (!hydrated || typeof window === 'undefined') return [];
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  })();
  const totalModules = 6;
  const isCourseComplete = completed.length === totalModules;

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  const navigate = (section) => {
    setSelectedModule(null);
    setCurrentSection(section);
  };

  let mainContent;
  if (currentSection === 'home') {
    mainContent = <Hero onStartCourse={() => setCurrentSection('modules')} />;
  } else if (currentSection === 'modules') {
    mainContent = <CourseContent onSelectModule={setSelectedModule} />;
  } else if (selectedModule) {
    mainContent = <ModulePage moduleId={selectedModule} onBack={() => setSelectedModule(null)} />;
  } else if (currentSection === 'about') {
    mainContent = <About />;
  } else if (currentSection === 'library') {
    mainContent = <Library />;
  } else if (currentSection === 'simulators') {
    mainContent = <Simulators />;
  } else if (currentSection === 'forum') {
    mainContent = <Forum />;
  } else if (currentSection === 'chat') {
    mainContent = <Chat user={user} />;
  } else if (currentSection === 'grades') {
    mainContent = <GradeSystem user={user} />;
  } else if (currentSection === 'simulator') {
    mainContent = <FlightSimulator />;
  } else if (currentSection === 'exercises') {
    mainContent = <InteractiveExercises />;
  } else if (currentSection === 'certificate') {
    mainContent = (
      <CertificateGenerator
        user={user}
        completionDate={new Date().toLocaleDateString('pt-BR')}
        grade={85}
      />
    );
  } else if (currentSection === 'downloads') {
    mainContent = <DownloadCenter />;
  } else if (currentSection === 'analytics') {
    mainContent = <AnalyticsDashboard user={user} />;
  } else if (currentSection === 'content-library') {
    mainContent = <ContentLibrary />;
  } else if (currentSection === 'interactive-content') {
    mainContent = <InteractiveContent />;
  }

  if (!hydrated) {
    return <div className="ac-boot" aria-hidden />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header navigate={navigate} currentSection={currentSection} user={user} onLogout={handleLogout} />
      <main>
        {mainContent}
        {isCourseComplete && <Certificate />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
