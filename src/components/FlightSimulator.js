import React, { useState, useRef, useEffect } from 'react';
import './FlightSimulator.css';

const FlightSimulator = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [aircraft, setAircraft] = useState({
    x: 400,
    y: 300,
    speed: 0,
    altitude: 1000,
    heading: 0,
    pitch: 0,
    roll: 0
  });
  const [controls, setControls] = useState({
    throttle: 0,
    elevator: 0,
    aileron: 0,
    rudder: 0
  });
  const [instruments, setInstruments] = useState({
    airspeed: 0,
    altitude: 1000,
    heading: 0,
    verticalSpeed: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!isRunning) return;

    const gameLoop = () => {
      // Atualizar física da aeronave
      updateAircraft();
      
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar cenário
      drawBackground(ctx);
      
      // Desenhar aeronave
      drawAircraft(ctx);
      
      // Desenhar instrumentos
      drawInstruments(ctx);
      
      // Continuar loop
      if (isRunning) {
        requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
  }, [isRunning, aircraft, controls]);

  const updateAircraft = () => {
    setAircraft(prev => {
      // Atualizar velocidade baseada no throttle
      const newSpeed = Math.max(0, prev.speed + (controls.throttle - 0.5) * 0.5);
      
      // Atualizar posição
      const newX = prev.x + Math.cos(prev.heading * Math.PI / 180) * newSpeed;
      const newY = prev.y - Math.sin(prev.heading * Math.PI / 180) * newSpeed;
      
      // Atualizar altitude baseada no pitch
      const newAltitude = Math.max(0, prev.altitude + Math.sin(prev.pitch * Math.PI / 180) * newSpeed * 10);
      
      // Atualizar heading baseado no rudder
      const newHeading = (prev.heading + controls.rudder * 2) % 360;
      
      // Atualizar pitch baseado no elevator
      const newPitch = Math.max(-30, Math.min(30, prev.pitch + controls.elevator * 2));
      
      // Atualizar roll baseado no aileron
      const newRoll = Math.max(-45, Math.min(45, prev.roll + controls.aileron * 3));
      
      return {
        x: newX,
        y: newY,
        speed: newSpeed,
        altitude: newAltitude,
        heading: newHeading,
        pitch: newPitch,
        roll: newRoll
      };
    });

    // Atualizar instrumentos
    setInstruments({
      airspeed: Math.round(aircraft.speed * 100),
      altitude: Math.round(aircraft.altitude),
      heading: Math.round(aircraft.heading),
      verticalSpeed: Math.round(Math.sin(aircraft.pitch * Math.PI / 180) * aircraft.speed * 100)
    });
  };

  const drawBackground = (ctx) => {
    // Céu gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Nuvens
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 5; i++) {
      const x = (i * 200 + Date.now() * 0.01) % 800;
      const y = 100 + Math.sin(i) * 50;
      drawCloud(ctx, x, y);
    }

    // Terra
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 500, 800, 100);

    // Horizonte
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(800, 500);
    ctx.stroke();
  };

  const drawCloud = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 15, 15, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawAircraft = (ctx) => {
    ctx.save();
    ctx.translate(aircraft.x, aircraft.y);
    ctx.rotate((aircraft.heading + aircraft.roll) * Math.PI / 180);
    
    // Corpo da aeronave
    ctx.fillStyle = '#2a5298';
    ctx.fillRect(-30, -5, 60, 10);
    
    // Asas
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-40, -25, 80, 50);
    
    // Cauda
    ctx.fillStyle = '#2a5298';
    ctx.fillRect(20, -15, 10, 30);
    
    // Hélice
    ctx.fillStyle = '#333';
    ctx.fillRect(-35, -2, 5, 4);
    
    // Cockpit
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.ellipse(-10, -8, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawInstruments = (ctx) => {
    // Painel de instrumentos
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(10, 10, 200, 150);
    
    // Velocímetro
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(`Velocidade: ${instruments.airspeed} kt`, 20, 30);
    
    // Altímetro
    ctx.fillText(`Altitude: ${instruments.altitude} ft`, 20, 50);
    
    // Bússola
    ctx.fillText(`Rumo: ${instruments.heading}°`, 20, 70);
    
    // Velocidade vertical
    ctx.fillText(`V/S: ${instruments.verticalSpeed} ft/min`, 20, 90);
    
    // Controles
    ctx.fillText(`Throttle: ${Math.round(controls.throttle * 100)}%`, 20, 110);
    ctx.fillText(`Pitch: ${Math.round(aircraft.pitch)}°`, 20, 130);
    ctx.fillText(`Roll: ${Math.round(aircraft.roll)}°`, 20, 150);
  };

  const handleControlChange = (control, value) => {
    setControls(prev => ({
      ...prev,
      [control]: value
    }));
  };

  const resetSimulator = () => {
    setAircraft({
      x: 400,
      y: 300,
      speed: 0,
      altitude: 1000,
      heading: 0,
      pitch: 0,
      roll: 0
    });
    setControls({
      throttle: 0,
      elevator: 0,
      aileron: 0,
      rudder: 0
    });
  };

  return (
    <div className="flight-simulator">
      <div className="simulator-header">
        <h2>🛩️ Simulador de Voo Básico</h2>
        <p>Experimente os controles básicos de uma aeronave</p>
      </div>

      <div className="simulator-container">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="simulator-canvas"
          />
          
          <div className="simulator-controls">
            <button 
              className={`simulator-btn ${isRunning ? 'stop' : 'start'}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
            </button>
            <button 
              className="simulator-btn reset"
              onClick={resetSimulator}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <div className="control-panel">
          <h3>🎮 Controles de Voo</h3>
          
          <div className="control-group">
            <label>Throttle (Potência)</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={controls.throttle}
              onChange={(e) => handleControlChange('throttle', parseFloat(e.target.value))}
              className="control-slider"
            />
            <span>{Math.round(controls.throttle * 100)}%</span>
          </div>

          <div className="control-group">
            <label>Elevator (Profundor)</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={controls.elevator}
              onChange={(e) => handleControlChange('elevator', parseFloat(e.target.value))}
              className="control-slider"
            />
            <span>{controls.elevator.toFixed(1)}</span>
          </div>

          <div className="control-group">
            <label>Aileron (Ailerons)</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={controls.aileron}
              onChange={(e) => handleControlChange('aileron', parseFloat(e.target.value))}
              className="control-slider"
            />
            <span>{controls.aileron.toFixed(1)}</span>
          </div>

          <div className="control-group">
            <label>Rudder (Leme)</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={controls.rudder}
              onChange={(e) => handleControlChange('rudder', parseFloat(e.target.value))}
              className="control-slider"
            />
            <span>{controls.rudder.toFixed(1)}</span>
          </div>

          <div className="control-instructions">
            <h4>📋 Instruções</h4>
            <ul>
              <li><strong>Throttle:</strong> Controla a potência do motor</li>
              <li><strong>Elevator:</strong> Controla o pitch (subida/descida)</li>
              <li><strong>Aileron:</strong> Controla o roll (inclinação lateral)</li>
              <li><strong>Rudder:</strong> Controla o yaw (direção)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSimulator; 