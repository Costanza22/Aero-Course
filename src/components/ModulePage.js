import React, { useState } from 'react';
import { ClipboardCheck, ArrowLeft } from 'lucide-react';
import { ModuleIcon } from './ui/ModuleIcon';
import './ModulePage.css';
import LessonQuiz from './LessonQuiz';

const moduleContents = {
  1: {
    title: 'Fundamentos da Aeronáutica',
    lessons: [
      {
        title: 'História da Aviação',
        content: 'A história da aviação começa com os primeiros experimentos de voo, passando por Santos Dumont, Irmãos Wright e a evolução até os dias atuais.'
      },
      {
        title: 'Princípios de Voo',
        content: 'Os princípios de voo envolvem sustentação, arrasto, peso e tração. Entenda como as forças atuam sobre uma aeronave.'
      },
      {
        title: 'Aerodinâmica Básica',
        content: 'Aerodinâmica é o estudo do movimento do ar e como ele interage com superfícies sólidas, como asas de aviões.'
      },
      {
        title: 'Controles de Voo',
        content: 'Os controles de voo permitem ao piloto comandar a aeronave: ailerons, leme, profundor e superfícies secundárias.'
      }
    ]
  },
  2: {
    title: 'Sistemas de Aeronaves',
    lessons: [
      {
        title: 'Sistema de Propulsão',
        content: 'O sistema de propulsão inclui motores, hélices e turbinas responsáveis pelo movimento da aeronave.'
      },
      {
        title: 'Sistema Elétrico',
        content: 'O sistema elétrico fornece energia para instrumentos, luzes e sistemas de comunicação.'
      },
      {
        title: 'Sistema Hidráulico',
        content: 'O sistema hidráulico aciona superfícies de controle, trens de pouso e freios.'
      },
      {
        title: 'Sistema de Combustível',
        content: 'Armazena e distribui combustível para os motores de forma segura e eficiente.'
      }
    ]
  },
  3: {
    title: 'Navegação Aérea',
    lessons: [
      {
        title: 'Navegação Visual',
        content: 'A navegação visual utiliza pontos de referência no solo e mapas para orientar o voo.'
      },
      {
        title: 'Navegação por Instrumentos',
        content: 'Utiliza instrumentos de bordo e sistemas eletrônicos para navegação em condições adversas.'
      },
      {
        title: 'Sistemas GPS',
        content: 'O GPS revolucionou a navegação aérea, permitindo precisão global e segurança.'
      },
      {
        title: 'Cartas Aeronáuticas',
        content: 'Cartas aeronáuticas trazem informações essenciais para o planejamento e execução do voo.'
      }
    ]
  },
  4: {
    title: 'Meteorologia Aeronáutica',
    lessons: [
      {
        title: 'Atmosfera Terrestre',
        content: 'A atmosfera é composta por camadas que influenciam o clima e o voo das aeronaves.'
      },
      {
        title: 'Massas de Ar',
        content: 'Massas de ar são grandes volumes de ar com características semelhantes de temperatura e umidade.'
      },
      {
        title: 'Frentes Meteorológicas',
        content: 'Frentes são zonas de transição entre diferentes massas de ar, influenciando o clima.'
      },
      {
        title: 'Turbulência',
        content: 'Turbulência é causada por variações no fluxo de ar e pode afetar o conforto e a segurança do voo.'
      }
    ]
  },
  5: {
    title: 'Regulamentação Aeronáutica',
    lessons: [
      {
        title: 'Órgãos Reguladores',
        content: 'Órgãos como ANAC, FAA e ICAO regulam a aviação civil no Brasil e no mundo.'
      },
      {
        title: 'Licenças e Certificações',
        content: 'Pilotos e profissionais precisam de licenças e certificações específicas para atuar.'
      },
      {
        title: 'Regras de Voo',
        content: 'Regras de voo determinam como as aeronaves devem operar em diferentes espaços aéreos.'
      },
      {
        title: 'Segurança Operacional',
        content: 'A segurança operacional envolve práticas e normas para prevenir acidentes e incidentes.'
      }
    ]
  },
  6: {
    title: 'Manutenção de Aeronaves',
    lessons: [
      {
        title: 'Tipos de Manutenção',
        content: 'Existem manutenções preventivas, corretivas e programadas para garantir a segurança.'
      },
      {
        title: 'Inspeções Periódicas',
        content: 'Inspeções regulares são obrigatórias para manter a aeronavegabilidade.'
      },
      {
        title: 'Documentação Técnica',
        content: 'Toda manutenção deve ser registrada em documentação técnica específica.'
      },
      {
        title: 'Controle de Qualidade',
        content: 'Controle de qualidade assegura que todos os procedimentos sigam padrões rigorosos.'
      }
    ]
  }
};

const ModulePage = ({ moduleId, onBack }) => {
  const mod = moduleContents[moduleId];
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonScores, setLessonScores] = useState({});
  
  if (!mod) return <div>Módulo não encontrado.</div>;
  const total = mod.lessons.length;

  const handleQuizComplete = (percentage, score, totalQuestions) => {
    setLessonScores(prev => ({
      ...prev,
      [currentLesson]: { percentage, score, totalQuestions }
    }));
    
    // Salvar nota no sistema de notas
    const grades = JSON.parse(localStorage.getItem('aerocourse_grades') || '{}');
    if (!grades[moduleId]) {
      grades[moduleId] = {};
    }
    grades[moduleId][currentLesson] = percentage;
    localStorage.setItem('aerocourse_grades', JSON.stringify(grades));
  };

  const getScoreDisplay = (lessonIndex) => {
    const score = lessonScores[lessonIndex];
    if (!score) return null;
    
    const passed = score.percentage >= 70;
    return (
      <div className={`lesson-score ${passed ? 'passed' : 'failed'}`}>
        {score.percentage}%
      </div>
    );
  };

  return (
    <section className="module-page-section">
      <button type="button" className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} aria-hidden /> Voltar para módulos
      </button>
      <div className="module-page-content">
        <div className="module-page-icon">
          <ModuleIcon id={moduleId} size={52} />
        </div>
        <h2>{mod.title}</h2>
        <div className="mini-course-nav">
          {mod.lessons.map((lesson, idx) => (
            <div key={idx} className="lesson-nav-item">
              <button
                className={`mini-course-step${currentLesson === idx ? ' active' : ''}`}
                onClick={() => {
                  setCurrentLesson(idx);
                  setShowQuiz(false);
                }}
              >
                {idx + 1}
              </button>
              {getScoreDisplay(idx)}
            </div>
          ))}
        </div>
        
        {!showQuiz ? (
          <>
            <div className="mini-course-lesson">
              <h3>{mod.lessons[currentLesson].title}</h3>
              <p>{mod.lessons[currentLesson].content}</p>
              <button type="button" className="quiz-btn" onClick={() => setShowQuiz(true)}>
                <ClipboardCheck size={18} strokeWidth={2} aria-hidden />
                Fazer quiz desta lição
              </button>
            </div>
            <div className="mini-course-controls">
              <button
                onClick={() => {
                  setCurrentLesson((l) => Math.max(0, l - 1));
                  setShowQuiz(false);
                }}
                disabled={currentLesson === 0}
              >
                Anterior
              </button>
              <button
                onClick={() => {
                  setCurrentLesson((l) => Math.min(total - 1, l + 1));
                  setShowQuiz(false);
                }}
                disabled={currentLesson === total - 1}
              >
                Próxima
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-container">
            <button 
              type="button"
              className="back-to-lesson-btn"
              onClick={() => setShowQuiz(false)}
            >
              <ArrowLeft size={18} aria-hidden /> Voltar à lição
            </button>
            <LessonQuiz 
              moduleId={moduleId}
              lessonIndex={currentLesson}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ModulePage; 