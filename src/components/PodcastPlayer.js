import React, { useState, useRef, useEffect } from 'react';
import './PodcastPlayer.css';
import {
  Headphones,
  Mic,
  Clock,
  Folder,
  Star,
  Rewind,
  Play,
  Pause,
  FastForward,
  Volume2,
  Zap,
  FileText,
  Smartphone,
  Target,
} from 'lucide-react';

const PodcastPlayer = () => {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef(null);

  const podcasts = [
    {
      id: 1,
      title: "História da Aviação Comercial",
      host: "Cpt. Maria Silva",
      duration: "45:30",
      category: "História",
      description: "Uma jornada pelos marcos históricos da aviação comercial, desde os primeiros voos até a era dos jatos modernos.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript: [
        { time: "00:00", text: "Bem-vindos ao AeroCast, o podcast oficial do AeroCourse." },
        { time: "00:15", text: "Hoje vamos explorar a fascinante história da aviação comercial." },
        { time: "00:30", text: "Tudo começou em 1903, quando os irmãos Wright realizaram o primeiro voo motorizado." },
        { time: "01:00", text: "A primeira companhia aérea comercial foi fundada em 1914 na Flórida." },
        { time: "01:30", text: "O Boeing 707 revolucionou a aviação em 1958, inaugurando a era dos jatos." }
      ],
      topics: ["História", "Tecnologia", "Inovação"],
      rating: 4.8
    },
    {
      id: 2,
      title: "Meteorologia para Pilotos",
      host: "Meteorologista João Santos",
      duration: "38:15",
      category: "Meteorologia",
      description: "Entenda os fenômenos meteorológicos que afetam o voo e como interpretar as informações meteorológicas.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript: [
        { time: "00:00", text: "Olá pilotos! Hoje vamos falar sobre meteorologia aplicada à aviação." },
        { time: "00:20", text: "A meteorologia é fundamental para a segurança do voo." },
        { time: "00:40", text: "Vamos começar com os tipos de nuvens e suas implicações." },
        { time: "01:00", text: "As nuvens cumulonimbus são as mais perigosas para a aviação." },
        { time: "01:30", text: "Sempre verifique o METAR e TAF antes de cada voo." }
      ],
      topics: ["Meteorologia", "Segurança", "Navegação"],
      rating: 4.9
    },
    {
      id: 3,
      title: "Emergências em Voo",
      host: "Instrutor Carlos Mendes",
      duration: "52:20",
      category: "Segurança",
      description: "Procedimentos essenciais para lidar com situações de emergência durante o voo.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript: [
        { time: "00:00", text: "Emergências em voo são situações que todo piloto deve estar preparado." },
        { time: "00:25", text: "A primeira regra é manter a calma e seguir os procedimentos." },
        { time: "00:50", text: "Vamos revisar o checklist de emergência: Aviate, Navigate, Communicate." },
        { time: "01:15", text: "Falha de motor em voo único requer decisões rápidas e precisas." },
        { time: "01:45", text: "Sempre tenha um plano de contingência para pouso de emergência." }
      ],
      topics: ["Segurança", "Emergências", "Procedimentos"],
      rating: 4.7
    },
    {
      id: 4,
      title: "Navegação IFR",
      host: "Cpt. Ana Costa",
      duration: "41:45",
      category: "Navegação",
      description: "Técnicas avançadas de navegação por instrumentos para voos IFR.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript: [
        { time: "00:00", text: "Navegação IFR é essencial para voos em condições meteorológicas adversas." },
        { time: "00:20", text: "Os instrumentos de voo são seus olhos quando não há referência visual." },
        { time: "00:45", text: "Vamos falar sobre VOR, DME e GPS na navegação moderna." },
        { time: "01:10", text: "A precisão na navegação IFR pode salvar vidas." },
        { time: "01:35", text: "Sempre mantenha backup para seus sistemas de navegação." }
      ],
      topics: ["Navegação", "IFR", "Instrumentos"],
      rating: 4.6
    },
    {
      id: 5,
      title: "Manutenção Preventiva",
      host: "Técnico Pedro Lima",
      duration: "35:10",
      category: "Manutenção",
      description: "Importância da manutenção preventiva e inspeções pré-voo.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      transcript: [
        { time: "00:00", text: "A manutenção preventiva é a base da segurança aeronáutica." },
        { time: "00:20", text: "Inspeções pré-voo devem ser feitas com atenção aos detalhes." },
        { time: "00:45", text: "Vamos revisar os pontos críticos da inspeção visual." },
        { time: "01:10", text: "Documentação da manutenção é obrigatória e essencial." },
        { time: "01:35", text: "Quando em dúvida, sempre consulte um técnico qualificado." }
      ],
      topics: ["Manutenção", "Segurança", "Inspeções"],
      rating: 4.8
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const changeEpisode = (index) => {
    setCurrentEpisode(index);
    setIsPlaying(false);
    setCurrentTime(0);
    setShowTranscript(false);
  };

  const currentPodcast = podcasts[currentEpisode];

  return (
    <div className="podcast-player">
      <div className="podcast-header">
        <h2 className="podcast-header-title">
          <Headphones size={28} strokeWidth={1.75} aria-hidden />
          Podcasts aeronáuticos
        </h2>
        <p>Conteúdo em áudio para estudo offline e aprofundamento</p>
      </div>

      <div className="podcast-container">
        <div className="player-section">
          <div className="current-episode">
            <div className="episode-cover">
              <div className="cover-placeholder">
                <Mic size={48} strokeWidth={1.5} aria-hidden />
              </div>
            </div>
            
            <div className="episode-info">
              <h3>{currentPodcast.title}</h3>
              <p className="episode-host">Apresentado por {currentPodcast.host}</p>
              <p className="episode-description">{currentPodcast.description}</p>
              
              <div className="episode-meta">
                <span className="episode-meta-item">
                  <Clock size={16} aria-hidden /> {currentPodcast.duration}
                </span>
                <span className="episode-meta-item">
                  <Folder size={16} aria-hidden /> {currentPodcast.category}
                </span>
                <span className="episode-meta-item">
                  <Star size={16} aria-hidden /> {currentPodcast.rating}
                </span>
              </div>

              <div className="episode-topics">
                {currentPodcast.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="audio-player">
            <audio ref={audioRef} src={currentPodcast.audioUrl} />
            
            <div className="player-controls">
              <button type="button" className="control-btn" onClick={() => skipTime(-10)}>
                <Rewind size={20} aria-hidden /> 10s
              </button>
              
              <button type="button" className="play-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              
              <button type="button" className="control-btn" onClick={() => skipTime(30)}>
                30s <FastForward size={20} aria-hidden />
              </button>
            </div>

            <div className="progress-section">
              <div className="progress-bar" onClick={handleSeek}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player-settings">
              <div className="volume-control">
                <span className="volume-icon-wrap" aria-hidden>
                  <Volume2 size={20} />
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="speed-control">
                <span className="speed-icon-wrap" aria-hidden>
                  <Zap size={20} />
                </span>
                <div className="speed-buttons">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      className={`speed-btn ${playbackRate === rate ? 'active' : ''}`}
                      onClick={() => handlePlaybackRateChange(rate)}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="transcript-section">
            <button 
              type="button"
              className="transcript-toggle"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              <FileText size={18} aria-hidden />
              {showTranscript ? 'Ocultar' : 'Mostrar'} transcrição
            </button>
            
            {showTranscript && (
              <div className="transcript">
                {currentPodcast.transcript.map((entry, index) => (
                  <div key={index} className="transcript-entry">
                    <span className="transcript-time">{entry.time}</span>
                    <span className="transcript-text">{entry.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="episodes-list">
          <h3>Episódios Disponíveis</h3>
          <div className="episodes-grid">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast.id}
                className={`episode-card ${index === currentEpisode ? 'active' : ''}`}
                onClick={() => changeEpisode(index)}
              >
                <div className="episode-icon">
                  <Mic size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <div className="episode-details">
                  <h4>{podcast.title}</h4>
                  <p className="episode-host-small">{podcast.host}</p>
                  <div className="episode-meta-small">
                    <span>{podcast.duration}</span>
                    <span>{podcast.category}</span>
                  </div>
                </div>
                <div className="episode-rating">
                  <Star size={14} aria-hidden /> {podcast.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="podcast-features">
        <div className="feature-card">
          <h4 className="podcast-feature-title">
            <Smartphone size={18} aria-hidden /> Download offline
          </h4>
          <p>Baixe episódios para ouvir sem conexão com a internet</p>
        </div>
        
        <div className="feature-card">
          <h4 className="podcast-feature-title">
            <Target size={18} aria-hidden /> Velocidade ajustável
          </h4>
          <p>Controle a velocidade de reprodução para seu ritmo de estudo</p>
        </div>
        
        <div className="feature-card">
          <h4 className="podcast-feature-title">
            <FileText size={18} aria-hidden /> Transcrições
          </h4>
          <p>Acesse transcrições completas para revisão e estudo</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer; 