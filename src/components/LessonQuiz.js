import React, { useState } from 'react';
import {
  Target,
  BookOpen,
  CheckCircle2,
  XCircle,
  PartyPopper,
  RefreshCw,
} from 'lucide-react';
import './LessonQuiz.css';

// Banco de questões por lição
const quizDatabase = {
  // Módulo 1 - Fundamentos da Aeronáutica
  '1-0': [ // História da Aviação
    {
      question: 'Quem é considerado o pai da aviação no Brasil?',
      options: ['Santos Dumont', 'Irmãos Wright', 'Alberto Santos', 'Alberto Dumont'],
      correct: 0,
      explanation: 'Santos Dumont é considerado o pai da aviação no Brasil, tendo realizado o primeiro voo público em Paris em 1906.'
    },
    {
      question: 'Em que ano ocorreu o primeiro voo dos Irmãos Wright?',
      options: ['1900', '1903', '1906', '1910'],
      correct: 1,
      explanation: 'Os Irmãos Wright realizaram o primeiro voo controlado e motorizado em 17 de dezembro de 1903.'
    },
    {
      question: 'Qual foi a primeira aeronave a realizar um voo público?',
      options: ['14-Bis', 'Flyer I', 'Demoiselle', 'Wright Flyer'],
      correct: 0,
      explanation: 'O 14-Bis, pilotado por Santos Dumont, foi a primeira aeronave a realizar um voo público em 1906.'
    }
  ],
  '1-1': [ // Princípios de Voo
    {
      question: 'Qual das seguintes forças atua verticalmente para baixo em uma aeronave?',
      options: ['Sustentação', 'Peso', 'Arrasto', 'Tração'],
      correct: 1,
      explanation: 'O peso é a força gravitacional que atua verticalmente para baixo, sempre em direção ao centro da Terra.'
    },
    {
      question: 'Qual força é responsável por manter a aeronave no ar?',
      options: ['Peso', 'Sustentação', 'Arrasto', 'Tração'],
      correct: 1,
      explanation: 'A sustentação é a força aerodinâmica que atua perpendicularmente ao vento relativo, mantendo a aeronave no ar.'
    },
    {
      question: 'Qual das forças atua na direção oposta ao movimento da aeronave?',
      options: ['Sustentação', 'Peso', 'Arrasto', 'Tração'],
      correct: 2,
      explanation: 'O arrasto é a força de resistência que atua na direção oposta ao movimento da aeronave.'
    }
  ],
  '1-2': [ // Aerodinâmica Básica
    {
      question: 'O que é o perfil aerodinâmico?',
      options: ['A forma da asa vista de frente', 'A forma da asa vista de lado', 'O comprimento da asa', 'A espessura da asa'],
      correct: 1,
      explanation: 'O perfil aerodinâmico é a forma da asa vista de lado, que determina as características de sustentação e arrasto.'
    },
    {
      question: 'O que acontece com a pressão do ar quando ele passa sobre uma asa?',
      options: ['Aumenta', 'Diminui', 'Permanece igual', 'Varia aleatoriamente'],
      correct: 1,
      explanation: 'Quando o ar passa sobre uma asa, a pressão diminui na superfície superior, criando sustentação.'
    },
    {
      question: 'Qual é o ângulo entre a corda da asa e o vento relativo?',
      options: ['Ângulo de ataque', 'Ângulo de incidência', 'Ângulo de diedro', 'Ângulo de enflechamento'],
      correct: 0,
      explanation: 'O ângulo de ataque é o ângulo entre a corda da asa e o vento relativo.'
    }
  ],
  '1-3': [ // Controles de Voo
    {
      question: 'Qual superfície de controle é responsável pelo movimento de rolagem?',
      options: ['Leme', 'Profundor', 'Ailerons', 'Flaps'],
      correct: 2,
      explanation: 'Os ailerons são superfícies de controle localizadas nas extremidades das asas, responsáveis pelo movimento de rolagem.'
    },
    {
      question: 'Qual superfície de controle é responsável pelo movimento de guinada?',
      options: ['Leme', 'Profundor', 'Ailerons', 'Flaps'],
      correct: 0,
      explanation: 'O leme é a superfície de controle vertical na cauda, responsável pelo movimento de guinada.'
    },
    {
      question: 'Qual superfície de controle é responsável pelo movimento de arfagem?',
      options: ['Leme', 'Profundor', 'Ailerons', 'Flaps'],
      correct: 1,
      explanation: 'O profundor é a superfície de controle horizontal na cauda, responsável pelo movimento de arfagem.'
    }
  ],
  // Módulo 2 - Sistemas de Aeronaves
  '2-0': [ // Sistema de Propulsão
    {
      question: 'Qual tipo de motor é mais comum em aeronaves pequenas?',
      options: ['Motor a jato', 'Motor a pistão', 'Motor turboprop', 'Motor elétrico'],
      correct: 1,
      explanation: 'Motores a pistão são mais comuns em aeronaves pequenas devido ao baixo custo e simplicidade.'
    },
    {
      question: 'O que é a hélice de passo variável?',
      options: ['Hélice que muda de tamanho', 'Hélice que muda de ângulo', 'Hélice que muda de velocidade', 'Hélice que muda de direção'],
      correct: 1,
      explanation: 'A hélice de passo variável permite ajustar o ângulo das pás para otimizar a eficiência em diferentes condições de voo.'
    },
    {
      question: 'Qual combustível é usado em motores a pistão de aeronaves?',
      options: ['Gasolina 100LL', 'Diesel', 'Querosene', 'Etanol'],
      correct: 0,
      explanation: 'A gasolina 100LL (Low Lead) é o combustível padrão para motores a pistão de aeronaves.'
    }
  ],
  '2-1': [ // Sistema Elétrico
    {
      question: 'Qual é a tensão padrão do sistema elétrico em aeronaves pequenas?',
      options: ['12V', '24V', '28V', '48V'],
      correct: 2,
      explanation: 'A tensão padrão do sistema elétrico em aeronaves pequenas é 28V DC.'
    },
    {
      question: 'O que é o alternador em uma aeronave?',
      options: ['Gerador de energia elétrica', 'Motor elétrico', 'Bateria', 'Inversor'],
      correct: 0,
      explanation: 'O alternador é o gerador de energia elétrica que recarrega a bateria e alimenta os sistemas elétricos.'
    },
    {
      question: 'Qual componente fornece energia de emergência?',
      options: ['Alternador', 'Bateria', 'Inversor', 'Regulador'],
      correct: 1,
      explanation: 'A bateria fornece energia de emergência quando o alternador falha.'
    }
  ],
  '2-2': [ // Sistema Hidráulico
    {
      question: 'Qual fluido é usado no sistema hidráulico?',
      options: ['Água', 'Óleo hidráulico', 'Freio líquido', 'Combustível'],
      correct: 1,
      explanation: 'O óleo hidráulico é o fluido usado no sistema hidráulico para transmitir força.'
    },
    {
      question: 'Qual sistema é acionado hidraulicamente?',
      options: ['Sistema elétrico', 'Trem de pouso', 'Sistema de combustível', 'Sistema de oxigênio'],
      correct: 1,
      explanation: 'O trem de pouso é um dos sistemas acionados hidraulicamente em muitas aeronaves.'
    },
    {
      question: 'O que é uma bomba hidráulica?',
      options: ['Reservatório de fluido', 'Gerador de pressão', 'Válvula de controle', 'Cilindro hidráulico'],
      correct: 1,
      explanation: 'A bomba hidráulica é o componente que gera pressão no sistema hidráulico.'
    }
  ],
  '2-3': [ // Sistema de Combustível
    {
      question: 'Qual é a função principal do sistema de combustível?',
      options: ['Armazenar combustível', 'Distribuir combustível', 'Filtrar combustível', 'Todas as anteriores'],
      correct: 3,
      explanation: 'O sistema de combustível tem múltiplas funções: armazenar, distribuir e filtrar o combustível.'
    },
    {
      question: 'O que é o seletor de tanques?',
      options: ['Válvula de drenagem', 'Válvula de seleção', 'Bomba de combustível', 'Filtro de combustível'],
      correct: 1,
      explanation: 'O seletor de tanques é uma válvula que permite escolher de qual tanque o combustível será consumido.'
    },
    {
      question: 'Por que é importante drenar o combustível antes do voo?',
      options: ['Para economizar', 'Para verificar contaminação', 'Para reduzir peso', 'Para limpar o sistema'],
      correct: 1,
      explanation: 'Drenar o combustível antes do voo é importante para verificar se há contaminação por água ou sedimentos.'
    }
  ]
};

const LessonQuiz = ({ moduleId, lessonIndex, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizKey = `${moduleId}-${lessonIndex}`;
  const questions = quizDatabase[quizKey] || [];

  if (questions.length === 0) {
    return (
      <div className="lesson-quiz">
        <div className="quiz-header">
          <h3>Quiz da Lição</h3>
          <p>Nenhum quiz disponível para esta lição.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQ.correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completo
      const finalScore = selectedAnswer === currentQ.correct ? score + 1 : score;
      const percentage = (finalScore / questions.length) * 100;
      setQuizCompleted(true);
      onComplete && onComplete(percentage, finalScore, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const finalScore = selectedAnswer === currentQ.correct ? score + 1 : score;
    const percentage = (finalScore / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="lesson-quiz">
        <div className="quiz-results">
          <h3 className="quiz-title-with-icon">
            <Target size={22} strokeWidth={2} aria-hidden />
            Resultado do quiz
          </h3>
          <div className={`score-display ${passed ? 'passed' : 'failed'}`}>
            <div className="score-percentage">{percentage.toFixed(0)}%</div>
            <div className="score-text">
              {finalScore} de {questions.length} acertos
            </div>
            <div className="score-status">
              {passed ? (
                <>
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden /> Aprovado
                </>
              ) : (
                <>
                  <XCircle size={18} strokeWidth={2} aria-hidden /> Reprovado
                </>
              )}
            </div>
          </div>
          {passed && (
            <div className="congratulations">
              <p className="quiz-line-with-icon">
                <PartyPopper size={18} strokeWidth={2} aria-hidden />
                Parabéns — você demonstrou conhecimento nesta lição.
              </p>
            </div>
          )}
          {!passed && (
            <div className="retry-message">
              <p className="quiz-line-with-icon">
                <BookOpen size={18} strokeWidth={2} aria-hidden />
                Continue estudando e tente novamente.
              </p>
            </div>
          )}
          <button type="button" className="retry-btn" onClick={handleRetry}>
            <RefreshCw size={16} strokeWidth={2} aria-hidden />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-quiz">
      <div className="quiz-header">
        <h3 className="quiz-title-with-icon">
          <Target size={22} strokeWidth={2} aria-hidden />
          Quiz da lição
        </h3>
        <div className="quiz-progress">
          Questão {currentQuestion + 1} de {questions.length}
        </div>
      </div>
      
      <div className="quiz-question">
        <h4>{currentQ.question}</h4>
        <div className="quiz-options">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showResult
                  ? index === currentQ.correct
                    ? 'correct'
                    : selectedAnswer === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="quiz-feedback">
          <div className={`feedback-message ${selectedAnswer === currentQ.correct ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentQ.correct ? (
              <>
                <CheckCircle2 size={22} className="feedback-icon" aria-hidden /> Correto!
              </>
            ) : (
              <>
                <XCircle size={22} className="feedback-icon" aria-hidden /> Incorreto!
              </>
            )}
          </div>
          <div className="explanation">
            <strong>Explicação:</strong> {currentQ.explanation}
          </div>
        </div>
      )}

      <div className="quiz-controls">
        {!showResult ? (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Responder
          </button>
        ) : (
          <button className="next-btn" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonQuiz; 