import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseContent from './components/CourseContent';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import ModulePage from './components/ModulePage';
import Library from './components/Library';
import Simulators from './components/Simulators';
import Forum from './components/Forum';
import Chat from './components/Chat';
import GradeSystem from './components/GradeSystem';
import FlightSimulator from './components/FlightSimulator';
import InteractiveExercises from './components/InteractiveExercises';
import ThemeToggle from './components/ThemeToggle';
import NotificationSystem from './components/NotificationSystem';
import CertificateGenerator from './components/CertificateGenerator';
import DownloadCenter from './components/DownloadCenter';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ContentLibrary from './components/ContentLibrary';
import InteractiveContent from './components/InteractiveContent';
import './styles/dark-theme.css';

const PROGRESS_KEY = 'aerocourse_progress';

function Certificate() {
  return (
    <section className="certificate-section">
      <div className="certificate-card">
        <h2>🎓 Certificado de Conclusão</h2>
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

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('loggedUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedModule, setSelectedModule] = useState(null);

  // Verificar progresso do curso
  const completed = (() => {
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
    mainContent = <CertificateGenerator user={user} completionDate={new Date().toLocaleDateString('pt-BR')} grade={85} />;
  } else if (currentSection === 'downloads') {
    mainContent = <DownloadCenter />;
  } else if (currentSection === 'analytics') {
    mainContent = <AnalyticsDashboard user={user} />;
  } else if (currentSection === 'content-library') {
    mainContent = <ContentLibrary />;
  } else if (currentSection === 'interactive-content') {
    mainContent = <InteractiveContent />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <ThemeToggle />
      <NotificationSystem user={user} />
      <Header setCurrentSection={setCurrentSection} currentSection={currentSection} />
      <main>
        {mainContent}
        {isCourseComplete && <Certificate />}
      </main>
      <Footer onNavigate={setCurrentSection} />
      <button className="logout-btn" onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default App;
