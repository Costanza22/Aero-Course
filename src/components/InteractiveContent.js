import React, { useState } from 'react';
import './InteractiveContent.css';
import VirtualTour from './VirtualTour';
import AugmentedReality from './AugmentedReality';
import PodcastPlayer from './PodcastPlayer';
import InteractiveDiagrams from './InteractiveDiagrams';

const InteractiveContent = () => {
  const [activeTab, setActiveTab] = useState('virtual-tour');

  const tabs = [
    { id: 'virtual-tour', name: 'Tours Virtuais 360°', icon: '🎥' },
    { id: 'ar', name: 'Realidade Aumentada', icon: '🥽' },
    { id: 'podcasts', name: 'Podcasts Aeronáuticos', icon: '🎧' },
    { id: 'diagrams', name: 'Infográficos Interativos', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'virtual-tour':
        return <VirtualTour />;
      case 'ar':
        return <AugmentedReality />;
      case 'podcasts':
        return <PodcastPlayer />;
      case 'diagrams':
        return <InteractiveDiagrams />;
      default:
        return <VirtualTour />;
    }
  };

  return (
    <div className="interactive-content">
      <div className="content-header">
        <h1>🎯 Conteúdo Interativo Expandido</h1>
        <p>Explore a aviação através de experiências imersivas e interativas</p>
      </div>

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default InteractiveContent; 