import React, { useState, useRef, useEffect } from 'react';
import './AugmentedReality.css';
import { Glasses, Target, RotateCw, RotateCcw, RefreshCw, Wrench, Smartphone, Ruler } from 'lucide-react';

const AugmentedReality = () => {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [isARActive, setIsARActive] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const components = [
    {
      id: 1,
      name: "Motor Turbofan",
      category: "Propulsão",
      description: "Motor a jato de alta eficiência com bypass",
      model: "CFM56-7B",
      specifications: {
        "Empuxo": "27,300 lbf",
        "Consumo": "0.312 lb/lbf/hr",
        "Peso": "2,360 kg",
        "Diâmetro": "1.55 m"
      },
      parts: [
        { name: "Fan", description: "Ventilador de entrada de ar" },
        { name: "Compressor", description: "Compressor de alta pressão" },
        { name: "Câmara de Combustão", description: "Local onde ocorre a combustão" },
        { name: "Turbina", description: "Turbina de alta e baixa pressão" }
      ]
    },
    {
      id: 2,
      name: "Sistema de Pouso",
      category: "Estrutura",
      description: "Trem de pouso principal e auxiliar",
      model: "Landing Gear System",
      specifications: {
        "Capacidade": "78,000 kg",
        "Altura": "2.8 m",
        "Peso": "1,200 kg",
        "Pressão": "200 bar"
      },
      parts: [
        { name: "Pernas Principais", description: "Suporte principal do trem de pouso" },
        { name: "Perna do Nariz", description: "Trem de pouso dianteiro" },
        { name: "Amortecedores", description: "Sistema de amortecimento" },
        { name: "Freios", description: "Sistema de frenagem" }
      ]
    },
    {
      id: 3,
      name: "Sistema Hidráulico",
      category: "Sistemas",
      description: "Sistema de controle hidráulico da aeronave",
      model: "Hydraulic System",
      specifications: {
        "Pressão": "3,000 psi",
        "Capacidade": "37.8 L",
        "Bombas": "3 independentes",
        "Temperatura": "-40°C a +85°C"
      },
      parts: [
        { name: "Bombas Hidráulicas", description: "Geram pressão hidráulica" },
        { name: "Reservatórios", description: "Armazenam fluido hidráulico" },
        { name: "Atuadores", description: "Convertem pressão em movimento" },
        { name: "Válvulas", description: "Controlam fluxo de fluido" }
      ]
    },
    {
      id: 4,
      name: "Sistema Elétrico",
      category: "Sistemas",
      description: "Sistema de geração e distribuição elétrica",
      model: "Electrical System",
      specifications: {
        "Voltagem": "115V AC / 28V DC",
        "Frequência": "400 Hz",
        "Geradores": "2 x 90 kVA",
        "Baterias": "2 x 24V"
      },
      parts: [
        { name: "Geradores", description: "Geram energia elétrica" },
        { name: "Baterias", description: "Fornecem energia de emergência" },
        { name: "Inversores", description: "Convertem DC para AC" },
        { name: "Distribuição", description: "Painéis de distribuição" }
      ]
    }
  ];

  useEffect(() => {
    if (isARActive) {
      animate3DModel();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isARActive, selectedComponent]);

  const animate3DModel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Simular renderização 3D
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar componente 3D simulado
    draw3DComponent(ctx, centerX, centerY);
    
    // Atualizar rotação
    setRotation(prev => ({
      x: prev.x + 0.5,
      y: prev.y + 0.3,
      z: prev.z + 0.1
    }));

    animationRef.current = requestAnimationFrame(animate3DModel);
  };

  const draw3DComponent = (ctx, centerX, centerY) => {
    const component = components[selectedComponent];
    
    // Aplicar transformações de rotação
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation.x + rotation.y) * Math.PI / 180);
    
    // Desenhar base do componente com efeito 3D
    const depth = Math.sin(rotation.z * Math.PI / 180) * 20;
    
    // Sombra/backface
    ctx.fillStyle = '#1a3a6b';
    ctx.fillRect(-100 + depth, -50 + depth, 200, 100);
    
    // Base do componente
    ctx.fillStyle = '#2a5298';
    ctx.fillRect(-100, -50, 200, 100);
    
    // Desenhar detalhes
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-80, -30, 160, 60);
    
    // Adicionar texto
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(component.name, 0, 10);
    
    // Adicionar efeitos 3D
    ctx.strokeStyle = '#1a3a6b';
    ctx.lineWidth = 2;
    ctx.strokeRect(-100, -50, 200, 100);
    
    // Restaurar contexto
    ctx.restore();
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsARActive(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.log('Permissão de câmera negada');
      setIsARActive(true); // Simular AR sem câmera
    }
  };

  const toggleAR = () => {
    if (!isARActive) {
      requestCameraPermission();
    } else {
      setIsARActive(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const rotateComponent = (axis, direction) => {
    setRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + (direction * 10)
    }));
  };

  return (
    <div className="augmented-reality">
      <div className="ar-header">
        <h2 className="ar-title-with-icon">
          <Glasses size={28} strokeWidth={1.75} aria-hidden />
          Realidade aumentada
        </h2>
        <p>Visualize componentes de aeronaves em 3D</p>
      </div>

      <div className="ar-container">
        <div className="ar-viewport">
          <div className="ar-canvas-container">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="ar-canvas"
            />
            
            {!isARActive && (
              <div className="ar-overlay">
                <div className="ar-placeholder">
                  <h3 className="ar-placeholder-title">
                    <Target size={22} aria-hidden />
                    Visualização 3D
                  </h3>
                  <p>Clique em «Ativar AR» para visualizar o componente em 3D</p>
                  <button type="button" className="ar-activate-btn" onClick={toggleAR}>
                    <Glasses size={20} aria-hidden />
                    Ativar realidade aumentada
                  </button>
                </div>
              </div>
            )}

            {isARActive && (
              <div className="ar-controls">
                <div className="rotation-display">
                  <span>X: {Math.round(rotation.x)}°</span>
                  <span>Y: {Math.round(rotation.y)}°</span>
                  <span>Z: {Math.round(rotation.z)}°</span>
                </div>
                <div className="control-group">
                  <button type="button" onClick={() => rotateComponent('x', 1)}>
                    <RotateCw size={16} aria-hidden /> X+
                  </button>
                  <button type="button" onClick={() => rotateComponent('x', -1)}>
                    <RotateCcw size={16} aria-hidden /> X−
                  </button>
                </div>
                <div className="control-group">
                  <button type="button" onClick={() => rotateComponent('y', 1)}>
                    <RotateCw size={16} aria-hidden /> Y+
                  </button>
                  <button type="button" onClick={() => rotateComponent('y', -1)}>
                    <RotateCcw size={16} aria-hidden /> Y−
                  </button>
                </div>
                <div className="control-group">
                  <button type="button" onClick={() => rotateComponent('z', 1)}>
                    <RotateCw size={16} aria-hidden /> Z+
                  </button>
                  <button type="button" onClick={() => rotateComponent('z', -1)}>
                    <RotateCcw size={16} aria-hidden /> Z−
                  </button>
                </div>
                <button type="button" className="reset-btn" onClick={resetView}>
                  <RefreshCw size={16} aria-hidden /> Reset
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="ar-sidebar">
          <div className="component-selector">
            <h3>Componentes Disponíveis</h3>
            <div className="component-list">
              {components.map((component, index) => (
                <div
                  key={component.id}
                  className={`component-item ${index === selectedComponent ? 'active' : ''}`}
                  onClick={() => setSelectedComponent(index)}
                >
                  <div className="component-icon">
                    <Wrench size={22} strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="component-info">
                    <h4>{component.name}</h4>
                    <span className="component-category">{component.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {components[selectedComponent] && (
            <div className="component-details">
              <h3>{components[selectedComponent].name}</h3>
              <p>{components[selectedComponent].description}</p>
              
              <div className="specifications">
                <h4>Especificações Técnicas</h4>
                <div className="spec-grid">
                  {Object.entries(components[selectedComponent].specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="parts-list">
                <h4>Partes Principais</h4>
                <ul>
                  {components[selectedComponent].parts.map((part, index) => (
                    <li key={index}>
                      <strong>{part.name}:</strong> {part.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ar-features">
        <div className="feature-card">
          <h4 className="ar-feature-title">
            <Smartphone size={18} aria-hidden /> Compatível com mobile
          </h4>
          <p>Use a câmera do seu dispositivo para visualização AR completa</p>
        </div>
        
        <div className="feature-card">
          <h4 className="ar-feature-title">
            <Target size={18} aria-hidden /> Interação gestual
          </h4>
          <p>Toque e arraste para rotacionar e examinar os componentes</p>
        </div>
        
        <div className="feature-card">
          <h4 className="ar-feature-title">
            <Ruler size={18} aria-hidden /> Medições precisas
          </h4>
          <p>Obtenha medidas reais dos componentes em escala</p>
        </div>
      </div>
    </div>
  );
};

export default AugmentedReality; 