import React, { useState } from 'react';
import './InteractiveContent.css';
import VirtualTour from './VirtualTour';
import AugmentedReality from './AugmentedReality';
import PodcastPlayer from './PodcastPlayer';
import InteractiveDiagrams from './InteractiveDiagrams';
import { IconByName } from '@/components/ui/IconByName';

const InteractiveContent = () => {
  const [activeTab, setActiveTab] = useState('virtual-tour');

  const tabs = [
    { id: 'virtual-tour', name: 'Tours Virtuais 360°', icon: 'video' },
    { id: 'ar', name: 'Realidade Aumentada', icon: 'glasses' },
    { id: 'podcasts', name: 'Podcasts Aeronáuticos', icon: 'headphones' },
    { id: 'diagrams', name: 'Infográficos Interativos', icon: 'barChart3' }
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
        <h1 className="interactive-content-title">
          <IconByName name="target" size={32} strokeWidth={1.75} className="interactive-content-title-icon" />
          Conteúdo interativo expandido
        </h1>
        <p>Explore a aviação através de experiências imersivas e interativas</p>
      </div>

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">
              <IconByName name={tab.icon} size={20} strokeWidth={1.75} />
            </span>
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