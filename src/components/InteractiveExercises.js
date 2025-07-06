import React, { useState } from 'react';
import './InteractiveExercises.css';

const InteractiveExercises = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const exercises = [
    {
      id: 1,
      type: 'calculation',
      title: 'Cálculo de Peso e Balanceamento',
      description: 'Calcule o peso total e o centro de gravidade da aeronave',
      content: {
        fuel: 120, // galões
        passengers: 4,
        baggage: 200, // lbs
        emptyWeight: 2400, // lbs
        fuelWeight: 6.7, // lbs/galão
        passengerWeight: 170, // lbs por passageiro
        cgRange: { min: 32, max: 38 }, // polegadas
        arm: {
          fuel: 48,
          passengers: 35,
          baggage: 60,
          empty: 30
        }
      },
      question: 'Qual é o peso total da aeronave e o centro de gravidade está dentro dos limites?',
      solution: (data) => {
        const fuelWeight = data.fuel * data.fuelWeight;
        const totalPassengerWeight = data.passengers * data.passengerWeight;
        const totalWeight = data.emptyWeight + fuelWeight + totalPassengerWeight + data.baggage;
        
        const moment = (data.emptyWeight * data.arm.empty) + 
                      (fuelWeight * data.arm.fuel) + 
                      (totalPassengerWeight * data.arm.passengers) + 
                      (data.baggage * data.arm.baggage);
        
        const cg = moment / totalWeight;
        const isInRange = cg >= data.cgRange.min && cg <= data.cgRange.max;
        
        return {
          totalWeight: Math.round(totalWeight),
          cg: cg.toFixed(2),
          isInRange
        };
      }
    },
    {
      id: 2,
      type: 'identification',
      title: 'Identificação de Componentes',
      description: 'Identifique os componentes principais de uma aeronave',
      content: {
        components: [
          { name: 'Aileron', description: 'Superfície de controle para rolagem', location: 'Asa' },
          { name: 'Elevator', description: 'Superfície de controle para pitch', location: 'Cauda' },
          { name: 'Rudder', description: 'Superfície de controle para yaw', location: 'Cauda' },
          { name: 'Flap', description: 'Superfície de alta sustentação', location: 'Asa' },
          { name: 'Spoiler', description: 'Dispositivo de redução de sustentação', location: 'Asa' }
        ]
      },
      question: 'Arraste cada componente para sua localização correta na aeronave',
      solution: null
    },
    {
      id: 3,
      type: 'performance',
      title: 'Cálculo de Performance',
      description: 'Calcule a distância de decolagem necessária',
      content: {
        runwayLength: 3000, // pés
        temperature: 25, // °C
        pressure: 29.92, // inHg
        wind: 10, // nós (headwind)
        aircraftWeight: 2800, // lbs
        maxWeight: 3200 // lbs
      },
      question: 'A aeronave pode decolar com segurança nesta pista?',
      solution: (data) => {
        // Cálculo simplificado de performance
        const densityAltitude = data.temperature * 120 + (29.92 - data.pressure) * 1000;
        const takeoffDistance = 800 + (data.aircraftWeight / 100) * 50 + densityAltitude * 0.5;
        const windCorrection = data.wind * 20;
        const requiredDistance = takeoffDistance - windCorrection;
        
        const canTakeoff = requiredDistance <= data.runwayLength && data.aircraftWeight <= data.maxWeight;
        
        return {
          requiredDistance: Math.round(requiredDistance),
          canTakeoff,
          densityAltitude: Math.round(densityAltitude)
        };
      }
    },
    {
      id: 4,
      type: 'navigation',
      title: 'Cálculo de Navegação',
      description: 'Calcule o rumo magnético e distância entre dois pontos',
      content: {
        departure: { lat: -25.4284, lon: -49.2733 }, // Curitiba
        destination: { lat: -23.5505, lon: -46.6333 }, // São Paulo
        variation: 22 // graus oeste
      },
      question: 'Qual é o rumo magnético e a distância para voar de Curitiba para São Paulo?',
      solution: (data) => {
        // Cálculo simplificado de navegação
        const latDiff = data.destination.lat - data.departure.lat;
        const lonDiff = data.destination.lon - data.departure.lon;
        
        const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 60; // milhas náuticas
        const trueCourse = Math.atan2(lonDiff, latDiff) * 180 / Math.PI;
        const magneticCourse = (trueCourse + data.variation + 360) % 360;
        
        return {
          distance: Math.round(distance),
          trueCourse: Math.round(trueCourse),
          magneticCourse: Math.round(magneticCourse)
        };
      }
    }
  ];

  const handleAnswerChange = (exerciseId, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value
      }
    }));
  };

  const checkAnswer = (exercise) => {
    if (exercise.type === 'calculation' || exercise.type === 'performance' || exercise.type === 'navigation') {
      const solution = exercise.solution(exercise.content);
      const userAnswer = userAnswers[exercise.id];
      
      if (!userAnswer) return false;
      
      // Verificar se a resposta está próxima da solução (com tolerância)
      const tolerance = 0.1;
      return Object.keys(solution).every(key => {
        if (typeof solution[key] === 'number') {
          return Math.abs(userAnswer[key] - solution[key]) <= solution[key] * tolerance;
        }
        return userAnswer[key] === solution[key];
      });
    }
    
    return false;
  };

  const getExerciseContent = (exercise) => {
    switch (exercise.type) {
      case 'calculation':
        return (
          <div className="exercise-calculation">
            <div className="exercise-data">
              <h4>Dados da Aeronave:</h4>
              <ul>
                <li>Peso vazio: {exercise.content.emptyWeight} lbs</li>
                <li>Combustível: {exercise.content.fuel} galões</li>
                <li>Passageiros: {exercise.content.passengers}</li>
                <li>Bagagem: {exercise.content.baggage} lbs</li>
                <li>Peso do combustível: {exercise.content.fuelWeight} lbs/galão</li>
                <li>Peso por passageiro: {exercise.content.passengerWeight} lbs</li>
              </ul>
            </div>
            <div className="exercise-inputs">
              <div className="input-group">
                <label>Peso Total (lbs):</label>
                <input
                  type="number"
                  value={userAnswers[exercise.id]?.totalWeight || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'totalWeight', parseFloat(e.target.value))}
                  placeholder="Digite o peso total"
                />
              </div>
              <div className="input-group">
                <label>Centro de Gravidade (polegadas):</label>
                <input
                  type="number"
                  step="0.01"
                  value={userAnswers[exercise.id]?.cg || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'cg', parseFloat(e.target.value))}
                  placeholder="Digite o CG"
                />
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="exercise-performance">
            <div className="exercise-data">
              <h4>Condições de Voo:</h4>
              <ul>
                <li>Comprimento da pista: {exercise.content.runwayLength} pés</li>
                <li>Temperatura: {exercise.content.temperature}°C</li>
                <li>Pressão: {exercise.content.pressure} inHg</li>
                <li>Vento: {exercise.content.wind} nós (favorável)</li>
                <li>Peso da aeronave: {exercise.content.aircraftWeight} lbs</li>
                <li>Peso máximo: {exercise.content.maxWeight} lbs</li>
              </ul>
            </div>
            <div className="exercise-inputs">
              <div className="input-group">
                <label>Distância necessária (pés):</label>
                <input
                  type="number"
                  value={userAnswers[exercise.id]?.requiredDistance || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'requiredDistance', parseFloat(e.target.value))}
                  placeholder="Digite a distância"
                />
              </div>
              <div className="input-group">
                <label>Pode decolar?</label>
                <select
                  value={userAnswers[exercise.id]?.canTakeoff || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'canTakeoff', e.target.value === 'true')}
                >
                  <option value="">Selecione</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="exercise-navigation">
            <div className="exercise-data">
              <h4>Coordenadas:</h4>
              <ul>
                <li>Partida: Curitiba ({exercise.content.departure.lat}°, {exercise.content.departure.lon}°)</li>
                <li>Destino: São Paulo ({exercise.content.destination.lat}°, {exercise.content.destination.lon}°)</li>
                <li>Variação magnética: {exercise.content.variation}° Oeste</li>
              </ul>
            </div>
            <div className="exercise-inputs">
              <div className="input-group">
                <label>Distância (milhas náuticas):</label>
                <input
                  type="number"
                  value={userAnswers[exercise.id]?.distance || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'distance', parseFloat(e.target.value))}
                  placeholder="Digite a distância"
                />
              </div>
              <div className="input-group">
                <label>Rumo magnético (graus):</label>
                <input
                  type="number"
                  value={userAnswers[exercise.id]?.magneticCourse || ''}
                  onChange={(e) => handleAnswerChange(exercise.id, 'magneticCourse', parseFloat(e.target.value))}
                  placeholder="Digite o rumo"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Exercício não disponível</div>;
    }
  };

  const getSolution = (exercise) => {
    if (exercise.solution) {
      const solution = exercise.solution(exercise.content);
      return (
        <div className="exercise-solution">
          <h4>✅ Solução:</h4>
          {Object.entries(solution).map(([key, value]) => (
            <div key={key} className="solution-item">
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="interactive-exercises">
      <div className="exercises-header">
        <h2>🔧 Exercícios Práticos Interativos</h2>
        <p>Aplique seus conhecimentos em exercícios práticos de aeronáutica</p>
      </div>

      <div className="exercises-navigation">
        {exercises.map((exercise, index) => (
          <button
            key={exercise.id}
            className={`exercise-nav-btn ${currentExercise === index ? 'active' : ''}`}
            onClick={() => {
              setCurrentExercise(index);
              setShowResults(false);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="exercise-container">
        <div className="exercise-header">
          <h3>{currentExerciseData.title}</h3>
          <p>{currentExerciseData.description}</p>
        </div>

        <div className="exercise-content">
          {getExerciseContent(currentExerciseData)}
        </div>

        <div className="exercise-question">
          <h4>❓ Pergunta:</h4>
          <p>{currentExerciseData.question}</p>
        </div>

        <div className="exercise-controls">
          <button
            className="check-answer-btn"
            onClick={() => setShowResults(true)}
          >
            🔍 Verificar Resposta
          </button>
        </div>

        {showResults && (
          <div className="exercise-results">
            <div className={`result-message ${checkAnswer(currentExerciseData) ? 'correct' : 'incorrect'}`}>
              {checkAnswer(currentExerciseData) ? '✅ Correto!' : '❌ Incorreto. Tente novamente!'}
            </div>
            {getSolution(currentExerciseData)}
          </div>
        )}
      </div>

      <div className="exercises-info">
        <h4>📚 Sobre os Exercícios</h4>
        <ul>
          <li><strong>Cálculos:</strong> Aprenda a calcular peso, balanceamento e performance</li>
          <li><strong>Identificação:</strong> Familiarize-se com os componentes das aeronaves</li>
          <li><strong>Performance:</strong> Entenda os fatores que afetam a operação</li>
          <li><strong>Navegação:</strong> Pratique cálculos de rumo e distância</li>
        </ul>
      </div>
    </div>
  );
};

export default InteractiveExercises; 