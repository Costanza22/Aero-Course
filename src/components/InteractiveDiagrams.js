import React, { useState } from 'react';
import './InteractiveDiagrams.css';
import {
  BarChart3,
  Wrench,
  ChevronLeft,
  ChevronRight,
  X,
  Target,
  Smartphone,
  RefreshCw,
} from 'lucide-react';

const InteractiveDiagrams = () => {
  const [selectedDiagram, setSelectedDiagram] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const diagrams = [
    {
      id: 1,
      title: "Sistema de Combustível",
      description: "Diagrama completo do sistema de combustível de uma aeronave comercial",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      parts: [
        {
          id: "fuel-tank-1",
          name: "Tanque Principal 1",
          x: 20,
          y: 30,
          description: "Tanque de combustível principal localizado na asa esquerda",
          capacity: "15,000 L",
          fuelType: "Jet A-1",
          status: "Operacional"
        },
        {
          id: "fuel-tank-2",
          name: "Tanque Principal 2",
          x: 80,
          y: 30,
          description: "Tanque de combustível principal localizado na asa direita",
          capacity: "15,000 L",
          fuelType: "Jet A-1",
          status: "Operacional"
        },
        {
          id: "fuel-pump-1",
          name: "Bomba de Combustível 1",
          x: 25,
          y: 50,
          description: "Bomba elétrica de alta pressão para alimentação do motor 1",
          flowRate: "2,000 L/h",
          pressure: "50 psi",
          status: "Operacional"
        },
        {
          id: "fuel-pump-2",
          name: "Bomba de Combustível 2",
          x: 75,
          y: 50,
          description: "Bomba elétrica de alta pressão para alimentação do motor 2",
          flowRate: "2,000 L/h",
          pressure: "50 psi",
          status: "Operacional"
        },
        {
          id: "fuel-filter",
          name: "Filtro de Combustível",
          x: 50,
          y: 70,
          description: "Filtro de alta eficiência para remoção de contaminantes",
          filterType: "Múltiplos estágios",
          efficiency: "99.9%",
          status: "Operacional"
        }
      ]
    },
    {
      id: 2,
      title: "Sistema Elétrico",
      description: "Diagrama do sistema de geração e distribuição elétrica",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      parts: [
        {
          id: "gen-1",
          name: "Gerador 1",
          x: 30,
          y: 25,
          description: "Gerador principal acionado pelo motor 1",
          output: "90 kVA",
          voltage: "115V AC",
          frequency: "400 Hz",
          status: "Operacional"
        },
        {
          id: "gen-2",
          name: "Gerador 2",
          x: 70,
          y: 25,
          description: "Gerador principal acionado pelo motor 2",
          output: "90 kVA",
          voltage: "115V AC",
          frequency: "400 Hz",
          status: "Operacional"
        },
        {
          id: "battery-1",
          name: "Bateria Principal",
          x: 20,
          y: 60,
          description: "Bateria de níquel-cádmio para emergências",
          capacity: "24V / 40 Ah",
          type: "Ni-Cd",
          status: "Carregada"
        },
        {
          id: "battery-2",
          name: "Bateria Auxiliar",
          x: 80,
          y: 60,
          description: "Bateria auxiliar para sistemas críticos",
          capacity: "24V / 20 Ah",
          type: "Ni-Cd",
          status: "Carregada"
        },
        {
          id: "bus-dc",
          name: "Barramento DC",
          x: 50,
          y: 80,
          description: "Barramento de distribuição de corrente contínua",
          voltage: "28V DC",
          capacity: "200A",
          status: "Operacional"
        }
      ]
    },
    {
      id: 3,
      title: "Sistema Hidráulico",
      description: "Diagrama do sistema hidráulico de controle de voo",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      parts: [
        {
          id: "pump-1",
          name: "Bomba Hidráulica 1",
          x: 25,
          y: 20,
          description: "Bomba hidráulica acionada pelo motor 1",
          flowRate: "37 L/min",
          pressure: "3,000 psi",
          status: "Operacional"
        },
        {
          id: "pump-2",
          name: "Bomba Hidráulica 2",
          x: 75,
          y: 20,
          description: "Bomba hidráulica acionada pelo motor 2",
          flowRate: "37 L/min",
          pressure: "3,000 psi",
          status: "Operacional"
        },
        {
          id: "reservoir",
          name: "Reservatório",
          x: 50,
          y: 50,
          description: "Reservatório principal de fluido hidráulico",
          capacity: "37.8 L",
          fluidType: "Skydrol LD-4",
          status: "Normal"
        },
        {
          id: "actuator-elevator",
          name: "Atuador do Elevador",
          x: 30,
          y: 80,
          description: "Atuador hidráulico do elevador",
          stroke: "150 mm",
          force: "15,000 N",
          status: "Operacional"
        },
        {
          id: "actuator-aileron",
          name: "Atuador do Aileron",
          x: 70,
          y: 80,
          description: "Atuador hidráulico do aileron",
          stroke: "100 mm",
          force: "12,000 N",
          status: "Operacional"
        }
      ]
    },
    {
      id: 4,
      title: "Sistema de Pouso",
      description: "Diagrama do sistema de trem de pouso e freios",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      parts: [
        {
          id: "main-gear-l",
          name: "Trem Principal Esquerdo",
          x: 25,
          y: 30,
          description: "Trem de pouso principal esquerdo",
          capacity: "39,000 kg",
          wheels: "4",
          status: "Operacional"
        },
        {
          id: "main-gear-r",
          name: "Trem Principal Direito",
          x: 75,
          y: 30,
          description: "Trem de pouso principal direito",
          capacity: "39,000 kg",
          wheels: "4",
          status: "Operacional"
        },
        {
          id: "nose-gear",
          name: "Trem do Nariz",
          x: 50,
          y: 60,
          description: "Trem de pouso dianteiro",
          capacity: "15,000 kg",
          wheels: "2",
          status: "Operacional"
        },
        {
          id: "brake-system",
          name: "Sistema de Freios",
          x: 50,
          y: 80,
          description: "Sistema de freios hidráulicos",
          type: "Disco múltiplo",
          pressure: "3,000 psi",
          status: "Operacional"
        }
      ]
    }
  ];

  const handlePartClick = (part) => {
    setSelectedPart(part);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedPart(null);
  };

  const currentDiagram = diagrams[selectedDiagram];

  return (
    <div className="interactive-diagrams">
      <div className="diagrams-header">
        <h2 className="diagrams-header-title">
          <BarChart3 size={28} strokeWidth={1.75} aria-hidden />
          Infográficos interativos
        </h2>
        <p>Explore sistemas de aeronaves através de diagramas clicáveis</p>
      </div>

      <div className="diagrams-container">
        <div className="diagram-selector">
          <h3>Diagramas Disponíveis</h3>
          <div className="diagram-tabs">
            {diagrams.map((diagram, index) => (
              <button
                key={diagram.id}
                className={`diagram-tab ${index === selectedDiagram ? 'active' : ''}`}
                onClick={() => setSelectedDiagram(index)}
              >
                <span className="tab-icon">
                  <Wrench size={18} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="tab-title">{diagram.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="diagram-viewer">
          <div className="diagram-header">
            <h3>{currentDiagram.title}</h3>
            <p>{currentDiagram.description}</p>
          </div>

          <div className="diagram-canvas">
            <div className="diagram-image-container">
              <img 
                src={currentDiagram.image} 
                alt={currentDiagram.title}
                className="diagram-image"
              />
              
              <div className="interactive-overlay">
                {currentDiagram.parts.map((part) => (
                  <div
                    key={part.id}
                    className="diagram-part"
                    style={{ left: `${part.x}%`, top: `${part.y}%` }}
                    onClick={() => handlePartClick(part)}
                    title={part.name}
                  >
                    <div className="part-marker">
                      <div className="marker-dot"></div>
                      <div className="marker-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="diagram-legend">
              <h4>Legenda</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-marker operational"></div>
                  <span>Operacional</span>
                </div>
                <div className="legend-item">
                  <div className="legend-marker warning"></div>
                  <span>Atenção</span>
                </div>
                <div className="legend-item">
                  <div className="legend-marker error"></div>
                  <span>Falha</span>
                </div>
              </div>
            </div>
          </div>

          <div className="diagram-controls">
            <button type="button" className="control-btn" onClick={() => setSelectedDiagram(prev => (prev - 1 + diagrams.length) % diagrams.length)}>
              <ChevronLeft size={20} aria-hidden /> Anterior
            </button>
            <span className="diagram-counter">
              {selectedDiagram + 1} de {diagrams.length}
            </span>
            <button type="button" className="control-btn" onClick={() => setSelectedDiagram(prev => (prev + 1) % diagrams.length)}>
              Próximo <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {showDetails && selectedPart && (
        <div className="part-details-modal">
          <div className="modal-overlay" onClick={closeDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedPart.name}</h3>
              <button type="button" className="close-btn" onClick={closeDetails} aria-label="Fechar">
                <X size={22} />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="part-description">{selectedPart.description}</p>
              
              <div className="part-specifications">
                <h4>Especificações Técnicas</h4>
                <div className="specs-grid">
                  {Object.entries(selectedPart).map(([key, value]) => {
                    if (key !== 'id' && key !== 'name' && key !== 'description' && key !== 'x' && key !== 'y') {
                      return (
                        <div key={key} className="spec-item">
                          <span className="spec-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="part-status">
                <h4>Status do Sistema</h4>
                <div className={`status-indicator ${selectedPart.status.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  <span className="status-text">{selectedPart.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="diagrams-features">
        <div className="feature-card">
          <h4 className="diagram-feature-title">
            <Target size={18} aria-hidden /> Clique para explorar
          </h4>
          <p>Clique nos marcadores para obter informações detalhadas sobre cada componente</p>
        </div>
        
        <div className="feature-card">
          <h4 className="diagram-feature-title">
            <Smartphone size={18} aria-hidden /> Responsivo
          </h4>
          <p>Diagramas otimizados para visualização em dispositivos móveis</p>
        </div>
        
        <div className="feature-card">
          <h4 className="diagram-feature-title">
            <RefreshCw size={18} aria-hidden /> Atualização em tempo real
          </h4>
          <p>Status dos sistemas atualizado em tempo real durante o voo</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDiagrams; 