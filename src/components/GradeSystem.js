import React, { useState, useEffect } from 'react';
import { BarChart3, Target, BookOpen, FileText, ListChecks } from 'lucide-react';
import { ModuleIcon } from './ui/ModuleIcon';
import './GradeSystem.css';

const GRADE_KEY = 'aerocourse_grades';

const GradeSystem = ({ user }) => {
  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem(GRADE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    localStorage.setItem(GRADE_KEY, JSON.stringify(grades));
  }, [grades]);

  const modules = [
    { id: 1, title: 'Fundamentos da Aeronáutica' },
    { id: 2, title: 'Sistemas de Aeronaves' },
    { id: 3, title: 'Navegação Aérea' },
    { id: 4, title: 'Meteorologia Aeronáutica' },
    { id: 5, title: 'Regulamentação Aeronáutica' },
    { id: 6, title: 'Manutenção de Aeronaves' },
  ];

  const lessons = {
    1: ['História da Aviação', 'Princípios de Voo', 'Aerodinâmica Básica', 'Controles de Voo'],
    2: ['Sistema de Propulsão', 'Sistema Elétrico', 'Sistema Hidráulico', 'Sistema de Combustível'],
    3: ['Navegação Visual', 'Navegação por Instrumentos', 'Sistemas GPS', 'Cartas Aeronáuticas'],
    4: ['Atmosfera Terrestre', 'Massas de Ar', 'Frentes Meteorológicas', 'Turbulência'],
    5: ['Órgãos Reguladores', 'Licenças e Certificações', 'Regras de Voo', 'Segurança Operacional'],
    6: ['Tipos de Manutenção', 'Inspeções Periódicas', 'Documentação Técnica', 'Controle de Qualidade']
  };

  const getModuleGrade = (moduleId) => {
    const moduleGrades = grades[moduleId] || {};
    const lessonScores = Object.values(moduleGrades);
    
    if (lessonScores.length === 0) return null;
    
    const totalScore = lessonScores.reduce((sum, score) => sum + score, 0);
    const average = totalScore / lessonScores.length;
    
    return {
      average: Math.round(average),
      completed: lessonScores.length,
      total: lessons[moduleId].length
    };
  };

  const getOverallGrade = () => {
    const moduleGrades = modules.map(module => getModuleGrade(module.id)).filter(Boolean);
    
    if (moduleGrades.length === 0) return null;
    
    const totalAverage = moduleGrades.reduce((sum, grade) => sum + grade.average, 0);
    const overallAverage = totalAverage / moduleGrades.length;
    
    return {
      average: Math.round(overallAverage),
      completed: moduleGrades.length,
      total: modules.length
    };
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return '#28a745'; // Verde
    if (percentage >= 80) return '#17a2b8'; // Azul
    if (percentage >= 70) return '#ffc107'; // Amarelo
    if (percentage >= 60) return '#fd7e14'; // Laranja
    return '#dc3545'; // Vermelho
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const overallGrade = getOverallGrade();

  return (
    <div className="grade-system">
      <div className="grade-header">
        <h2 className="grade-heading-with-icon">
          <BarChart3 size={26} strokeWidth={2} aria-hidden />
          Sistema de avaliação
        </h2>
        <p>Rastreie seu progresso e desempenho em cada módulo</p>
      </div>

      {overallGrade && (
        <div className="overall-grade">
          <h3 className="grade-subheading-with-icon">
            <Target size={22} strokeWidth={2} aria-hidden />
            Nota geral do curso
          </h3>
          <div className="grade-summary">
            <div className="grade-circle" style={{ borderColor: getGradeColor(overallGrade.average) }}>
              <div className="grade-percentage" style={{ color: getGradeColor(overallGrade.average) }}>
                {overallGrade.average}%
              </div>
              <div className="grade-letter" style={{ color: getGradeColor(overallGrade.average) }}>
                {getGradeLetter(overallGrade.average)}
              </div>
            </div>
            <div className="grade-details">
              <div className="grade-stat">
                <span className="stat-label">Módulos Concluídos:</span>
                <span className="stat-value">{overallGrade.completed}/{overallGrade.total}</span>
              </div>
              <div className="grade-stat">
                <span className="stat-label">Progresso Geral:</span>
                <span className="stat-value">{Math.round((overallGrade.completed / overallGrade.total) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modules-grades">
        <h3 className="grade-subheading-with-icon">
          <BookOpen size={22} strokeWidth={2} aria-hidden />
          Notas por módulo
        </h3>
        <div className="modules-grid">
          {modules.map(module => {
            const moduleGrade = getModuleGrade(module.id);
            const isSelected = selectedModule === module.id;
            
            return (
              <div 
                key={module.id} 
                className={`module-grade-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedModule(isSelected ? null : module.id)}
              >
                <div className="module-grade-header">
                  <span className="module-icon">
                    <ModuleIcon id={module.id} size={24} />
                  </span>
                  <h4>{module.title}</h4>
                </div>
                
                {moduleGrade ? (
                  <div className="module-grade-content">
                    <div className="module-score" style={{ color: getGradeColor(moduleGrade.average) }}>
                      {moduleGrade.average}%
                    </div>
                    <div className="module-progress">
                      {moduleGrade.completed}/{moduleGrade.total} lições
                    </div>
                    <div className="module-letter" style={{ color: getGradeColor(moduleGrade.average) }}>
                      {getGradeLetter(moduleGrade.average)}
                    </div>
                  </div>
                ) : (
                  <div className="module-grade-empty">
                    <span>Nenhuma nota registrada</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedModule && (
        <div className="lesson-grades">
          <h3 className="grade-subheading-with-icon">
            <FileText size={20} strokeWidth={2} aria-hidden />
            Notas por lição — {modules.find((m) => m.id === selectedModule)?.title}
          </h3>
          <div className="lessons-list">
            {lessons[selectedModule].map((lesson, index) => {
              const lessonGrade = grades[selectedModule]?.[index];
              
              return (
                <div key={index} className="lesson-grade-item">
                  <div className="lesson-info">
                    <span className="lesson-number">{index + 1}</span>
                    <span className="lesson-title">{lesson}</span>
                  </div>
                  <div className="lesson-score">
                    {lessonGrade ? (
                      <span 
                        className="score-badge"
                        style={{ backgroundColor: getGradeColor(lessonGrade) }}
                      >
                        {lessonGrade}%
                      </span>
                    ) : (
                      <span className="no-score">Não avaliado</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grade-legend">
        <h4 className="grade-subheading-with-icon grade-legend-title">
          <ListChecks size={18} strokeWidth={2} aria-hidden />
          Legenda das notas
        </h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#28a745' }}></span>
            <span>A (90-100%) - Excelente</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#17a2b8' }}></span>
            <span>B (80-89%) - Muito Bom</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffc107' }}></span>
            <span>C (70-79%) - Bom</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#fd7e14' }}></span>
            <span>D (60-69%) - Regular</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#dc3545' }}></span>
            <span>F (0-59%) - Insuficiente</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSystem; 