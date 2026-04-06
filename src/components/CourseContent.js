import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { ModuleIcon } from './ui/ModuleIcon';
import './CourseContent.css';

const PROGRESS_KEY = 'aerocourse_progress';

const CourseContent = ({ onSelectModule }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
  }, [completed]);

  const modules = [
    {
      id: 1,
      title: "Fundamentos da Aeronáutica",
      description: "Princípios básicos de voo e aerodinâmica",
      lessons: [
        "História da Aviação",
        "Princípios de Voo",
        "Aerodinâmica Básica",
        "Controles de Voo"
      ],
      duration: "4 horas",
      level: "Iniciante"
    },
    {
      id: 2,
      title: "Sistemas de Aeronaves",
      description: "Componentes e sistemas essenciais das aeronaves",
      lessons: [
        "Sistema de Propulsão",
        "Sistema Elétrico",
        "Sistema Hidráulico",
        "Sistema de Combustível"
      ],
      duration: "6 horas",
      level: "Intermediário"
    },
    {
      id: 3,
      title: "Navegação Aérea",
      description: "Técnicas de navegação e instrumentos de voo",
      lessons: [
        "Navegação Visual",
        "Navegação por Instrumentos",
        "Sistemas GPS",
        "Cartas Aeronáuticas"
      ],
      duration: "5 horas",
      level: "Intermediário"
    },
    {
      id: 4,
      title: "Meteorologia Aeronáutica",
      description: "Condições meteorológicas e sua influência no voo",
      lessons: [
        "Atmosfera Terrestre",
        "Massas de Ar",
        "Frentes Meteorológicas",
        "Turbulência"
      ],
      duration: "4 horas",
      level: "Intermediário"
    },
    {
      id: 5,
      title: "Regulamentação Aeronáutica",
      description: "Normas e regulamentos da aviação civil",
      lessons: [
        "Órgãos Reguladores",
        "Licenças e Certificações",
        "Regras de Voo",
        "Segurança Operacional"
      ],
      duration: "3 horas",
      level: "Avançado"
    },
    {
      id: 6,
      title: "Manutenção de Aeronaves",
      description: "Procedimentos de manutenção e inspeção",
      lessons: [
        "Tipos de Manutenção",
        "Inspeções Periódicas",
        "Documentação Técnica",
        "Controle de Qualidade"
      ],
      duration: "5 horas",
      level: "Avançado"
    }
  ];

  const total = modules.length;
  const done = completed.length;
  const percent = Math.round((done / total) * 100);

  const toggleComplete = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <section className="course-content">
      <div className="progress-bar-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: percent + '%' }} />
        </div>
        <span className="progress-bar-label">Progresso: {done} de {total} módulos ({percent}%)</span>
      </div>
      <div className="content-container">
        <div className="content-header">
          <h2>Módulos do Curso</h2>
          <p>Explore os tópicos fundamentais da aeronáutica</p>
        </div>
        <div className="modules-grid">
          {modules.map((module) => (
            <div 
              key={module.id}
              className={`module-card ${selectedModule === module.id ? 'expanded' : ''}`}
              onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <div className="module-header">
                <div className="module-icon">
                  <ModuleIcon id={module.id} size={32} />
                </div>
                <div className="module-info">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
                <div className="module-meta">
                  <span className="duration">{module.duration}</span>
                  <span className="level">{module.level}</span>
                </div>
              </div>
              {selectedModule === module.id && (
                <div className="module-details">
                  <h4>Lições Incluídas:</h4>
                  <ul className="lessons-list">
                    {module.lessons.map((lesson, index) => (
                      <li key={index}>
                        <span className="lesson-number">{index + 1}</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                  <div className="module-actions">
                    <button className="start-module-btn" onClick={e => { e.stopPropagation(); onSelectModule && onSelectModule(module.id); }}>
                      Iniciar Módulo
                    </button>
                    <button className={`complete-module-btn${completed.includes(module.id) ? ' completed' : ''}`} onClick={e => { e.stopPropagation(); toggleComplete(module.id); }}>
                      {completed.includes(module.id) ? (
                        <>
                          <Check size={14} strokeWidth={3} aria-hidden /> Concluído
                        </>
                      ) : (
                        'Marcar como concluído'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseContent; 