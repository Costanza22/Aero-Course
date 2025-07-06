import React, { useState, useEffect } from 'react';
import './VirtualTour.css';

const VirtualTour = () => {
  const [currentTour, setCurrentTour] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tours = [
    {
      id: 1,
      title: "Cockpit Boeing 737",
      description: "Explore o cockpit de um Boeing 737-800 com todos os instrumentos e controles.",
      duration: "5:30",
      thumbnail: "https://img.youtube.com/vi/cAINRE1JpLo/hqdefault.jpg",
      youtubeId: "cAINRE1JpLo",
      hotspots: [
        { x: 20, y: 30, label: "PFD - Primary Flight Display", description: "Mostra altitude, velocidade e atitude" },
        { x: 70, y: 30, label: "ND - Navigation Display", description: "Exibe informações de navegação" },
        { x: 45, y: 60, label: "MCP - Mode Control Panel", description: "Controles de autopilot" }
      ]
    },
    {
      id: 2,
      title: "Hangar de Manutenção",
      description: "Visite um hangar moderno onde aeronaves recebem manutenção preventiva.",
      duration: "4:15",
      thumbnail: "https://img.youtube.com/vi/wtqqa_0DfDM/hqdefault.jpg",
      youtubeId: "wtqqa_0DfDM",
      hotspots: [
        { x: 30, y: 40, label: "Área de Inspeção", description: "Local para inspeção detalhada da fuselagem" },
        { x: 60, y: 50, label: "Ferramentas Especializadas", description: "Equipamentos para manutenção" },
        { x: 80, y: 30, label: "Sistema de Iluminação", description: "Iluminação especial para inspeções" }
      ]
    },
    {
      id: 3,
      title: "Torre de Controle",
      description: "Experimente a visão de um controlador de tráfego aéreo.",
      duration: "6:20",
      thumbnail: "https://img.youtube.com/vi/KHfbzGNXfSo/hqdefault.jpg",
      youtubeId: "KHfbzGNXfSo",
      hotspots: [
        { x: 25, y: 35, label: "Radar Primário", description: "Detecta posição das aeronaves" },
        { x: 65, y: 35, label: "Radar Secundário", description: "Identifica aeronaves e altitude" },
        { x: 45, y: 70, label: "Sistema de Comunicação", description: "Rádios para contato com pilotos" }
      ]
    },
    {
      id: 4,
      title: "Sala de Simulação",
      description: "Conheça os simuladores de voo usados para treinamento de pilotos.",
      duration: "7:45",
      thumbnail: "https://img.youtube.com/vi/vfnsA3gihQQ/hqdefault.jpg",
      youtubeId: "vfnsA3gihQQ",
      hotspots: [
        { x: 40, y: 25, label: "Sistema de Movimento", description: "Plataforma que simula movimentos da aeronave" },
        { x: 60, y: 45, label: "Projetores", description: "Criam o ambiente visual externo" },
        { x: 20, y: 60, label: "Computador Principal", description: "Controla toda a simulação" }
      ]
    }
  ];

  const nextTour = () => {
    setCurrentTour((prev) => (prev + 1) % tours.length);
  };

  const prevTour = () => {
    setCurrentTour((prev) => (prev - 1 + tours.length) % tours.length);
  };

  return (
    <div className="virtual-tour">
      <div className="tour-header">
        <h2>🎥 Tours Virtuais 360°</h2>
        <p>Explore locais aeronáuticos em realidade virtual</p>
      </div>

      <div className="tour-container">
        <div className="video-section">
          <div className="video-player">
            <div className="youtube-iframe-wrapper">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${tours[currentTour].youtubeId}?rel=0&showinfo=0`}
                title={tours[currentTour].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-overlay">
              <div className="hotspots">
                {tours[currentTour].hotspots.map((hotspot, index) => (
                  <div
                    key={index}
                    className="hotspot"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    title={hotspot.label}
                  >
                    <div className="hotspot-marker">📍</div>
                    <div className="hotspot-tooltip">
                      <h4>{hotspot.label}</h4>
                      <p>{hotspot.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tour-info">
            <h3>{tours[currentTour].title}</h3>
            <p>{tours[currentTour].description}</p>
            <div className="tour-meta">
              <span>⏱️ Duração: {tours[currentTour].duration}</span>
              <span>📍 Hotspots: {tours[currentTour].hotspots.length}</span>
            </div>
          </div>
        </div>

        <div className="tour-navigation">
          <button className="nav-btn" onClick={prevTour}>
            ⬅️ Anterior
          </button>
          
          <div className="tour-thumbnails">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className={`thumbnail ${index === currentTour ? 'active' : ''}`}
                onClick={() => setCurrentTour(index)}
              >
                <img src={tour.thumbnail} alt={tour.title} />
                <span>{tour.title}</span>
              </div>
            ))}
          </div>
          
          <button className="nav-btn" onClick={nextTour}>
            Próximo ➡️
          </button>
        </div>
      </div>

      <div className="tour-features">
        <div className="feature-card">
          <h4>🎯 Hotspots Interativos</h4>
          <p>Clique nos marcadores para obter informações detalhadas sobre cada componente</p>
        </div>
        
        <div className="feature-card">
          <h4>🔄 Controles 360°</h4>
          <p>{isMobile ? 'Toque e arraste para explorar o ambiente em todas as direções' : 'Arraste o mouse para explorar o ambiente em todas as direções'}</p>
        </div>
        
        <div className="feature-card">
          <h4>📱 Compatível com VR</h4>
          <p>Use óculos de realidade virtual para uma experiência imersiva completa</p>
        </div>
        
        {isMobile && (
          <div className="feature-card">
            <h4>📱 Otimizado para Mobile</h4>
            <p>Interface adaptada para touch, controles intuitivos e carregamento otimizado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTour; 