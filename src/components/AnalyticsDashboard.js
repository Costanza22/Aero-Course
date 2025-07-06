import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    studyTime: [],
    quizScores: [],
    moduleProgress: [],
    streakDays: 0,
    totalTime: 0,
    averageScore: 0,
    completedModules: 0,
    certificates: 0
  });

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = () => {
    // Carregar dados do localStorage
    const progress = JSON.parse(localStorage.getItem('aerocourse_progress') || '[]');
    const grades = JSON.parse(localStorage.getItem('aerocourse_grades') || '{}');
    const studyLog = JSON.parse(localStorage.getItem('aerocourse_study_log') || '[]');

    // Simular dados de tempo de estudo
    const studyTimeData = generateStudyTimeData(selectedPeriod);
    
    // Calcular scores dos quizzes
    const quizScoresData = calculateQuizScores(grades);
    
    // Progresso dos módulos
    const moduleProgressData = calculateModuleProgress(progress);
    
    // Calcular estatísticas
    const stats = calculateStats(progress, grades, studyLog);

    setAnalyticsData({
      studyTime: studyTimeData,
      quizScores: quizScoresData,
      moduleProgress: moduleProgressData,
      ...stats
    });
  };

  const generateStudyTimeData = (period) => {
    const data = [];
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
        time: Math.floor(Math.random() * 120) + 30, // 30-150 minutos
        modules: Math.floor(Math.random() * 3) + 1
      });
    }
    return data;
  };

  const calculateQuizScores = (grades) => {
    const scores = [];
    Object.values(grades).forEach(moduleGrades => {
      Object.values(moduleGrades).forEach(lessonGrade => {
        if (lessonGrade.score !== undefined) {
          scores.push(lessonGrade.score);
        }
      });
    });
    return scores;
  };

  const calculateModuleProgress = (progress) => {
    const modules = [
      'Fundamentos da Aviação',
      'Sistemas de Aeronaves',
      'Navegação Aérea',
      'Meteorologia Aeronáutica',
      'Regulamentação Aeronáutica',
      'Manutenção de Aeronaves'
    ];

    return modules.map((module, index) => ({
      name: module,
      progress: progress.includes(index + 1) ? 100 : Math.floor(Math.random() * 80),
      lessons: progress.includes(index + 1) ? 5 : Math.floor(Math.random() * 5),
      quizzes: progress.includes(index + 1) ? 5 : Math.floor(Math.random() * 5)
    }));
  };

  const calculateStats = (progress, grades, studyLog) => {
    const totalModules = 6;
    const completedModules = progress.length;
    const totalTime = studyLog.reduce((sum, log) => sum + (log.duration || 0), 0);
    
    // Calcular média dos scores
    const allScores = [];
    Object.values(grades).forEach(moduleGrades => {
      Object.values(moduleGrades).forEach(lessonGrade => {
        if (lessonGrade.score !== undefined) {
          allScores.push(lessonGrade.score);
        }
      });
    });
    const averageScore = allScores.length > 0 ? 
      Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length) : 0;

    // Calcular streak de dias
    const streakDays = calculateStreak(studyLog);

    return {
      streakDays,
      totalTime,
      averageScore,
      completedModules,
      certificates: completedModules === totalModules ? 1 : 0
    };
  };

  const calculateStreak = (studyLog) => {
    if (studyLog.length === 0) return 0;
    
    let streak = 0;
    const today = new Date().toDateString();
    const sortedLog = studyLog.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedLog.length; i++) {
      const logDate = new Date(sortedLog[i].date).toDateString();
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (logDate === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return '#4ade80';
    if (score >= 80) return '#fbbf24';
    if (score >= 70) return '#f97316';
    return '#f87171';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard de Analytics</h2>
        <p>Monitore seu progresso e performance no curso</p>
        
        <div className="period-selector">
          <button 
            className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Semana
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Mês
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'quarter' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('quarter')}
          >
            Trimestre
          </button>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-number">{analyticsData.streakDays}</div>
            <div className="stat-label">Dias Consecutivos</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-number">{formatTime(analyticsData.totalTime)}</div>
            <div className="stat-label">Tempo Total</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{analyticsData.averageScore}%</div>
            <div className="stat-label">Média Geral</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <div className="stat-number">{analyticsData.completedModules}/6</div>
            <div className="stat-label">Módulos Concluídos</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>📚 Tempo de Estudo Diário</h3>
          <div className="study-time-chart">
            {analyticsData.studyTime.map((day, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(day.time / 150) * 100}%`,
                    backgroundColor: day.time > 100 ? '#4ade80' : '#fbbf24'
                  }}
                ></div>
                <div className="bar-label">{day.date}</div>
                <div className="bar-value">{day.time}min</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>🎯 Performance nos Quizzes</h3>
          <div className="quiz-scores-chart">
            {analyticsData.quizScores.length > 0 ? (
              analyticsData.quizScores.map((score, index) => (
                <div key={index} className="score-dot" style={{ backgroundColor: getPerformanceColor(score) }}>
                  <span className="score-value">{score}%</span>
                </div>
              ))
            ) : (
              <div className="no-data">Nenhum quiz realizado ainda</div>
            )}
          </div>
        </div>
      </div>

      <div className="module-progress-section">
        <h3>📖 Progresso por Módulo</h3>
        <div className="module-progress-grid">
          {analyticsData.moduleProgress.map((module, index) => (
            <div key={index} className="module-progress-card">
              <div className="module-header">
                <h4>{module.name}</h4>
                <div className="progress-percentage">{module.progress}%</div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${module.progress}%`,
                    backgroundColor: module.progress === 100 ? '#4ade80' : '#fbbf24'
                  }}
                ></div>
              </div>
              
              <div className="module-stats">
                <span>📝 {module.lessons} lições</span>
                <span>✅ {module.quizzes} quizzes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-section">
        <h3>🏆 Conquistas</h3>
        <div className="achievements-grid">
          <div className={`achievement ${analyticsData.streakDays >= 7 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔥</div>
            <div className="achievement-info">
              <h4>Estudioso Dedicado</h4>
              <p>7 dias consecutivos de estudo</p>
            </div>
          </div>
          
          <div className={`achievement ${analyticsData.averageScore >= 90 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⭐</div>
            <div className="achievement-info">
              <h4>Excelência Acadêmica</h4>
              <p>Média geral acima de 90%</p>
            </div>
          </div>
          
          <div className={`achievement ${analyticsData.completedModules >= 3 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">📚</div>
            <div className="achievement-info">
              <h4>Metade do Caminho</h4>
              <p>Concluir 3 módulos</p>
            </div>
          </div>
          
          <div className={`achievement ${analyticsData.certificates > 0 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎓</div>
            <div className="achievement-info">
              <h4>Piloto Certificado</h4>
              <p>Concluir todo o curso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 