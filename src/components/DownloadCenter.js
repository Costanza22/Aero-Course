import React, { useState } from 'react';
import './DownloadCenter.css';
import { IconByName } from '@/components/ui/IconByName';
import { Check, Download, Eye, Info } from 'lucide-react';

const DownloadCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const downloadFiles = [
    {
      id: 1,
      name: 'Manual do Piloto Privado',
      category: 'manuais',
      description: 'Manual completo com procedimentos, regulamentações e informações essenciais para pilotos privados.',
      fileType: 'PDF',
      size: '2.5 MB',
      icon: 'bookOpen',
      downloadUrl: '#',
      tags: ['piloto', 'privado', 'procedimentos']
    },
    {
      id: 2,
      name: 'Checklist Pré-Voo',
      category: 'checklists',
      description: 'Checklist detalhado para inspeção pré-voo de aeronaves.',
      fileType: 'PDF',
      size: '0.8 MB',
      icon: 'checkSquare',
      downloadUrl: '#',
      tags: ['checklist', 'pré-voo', 'inspeção']
    },
    {
      id: 3,
      name: 'Manual de Navegação Aérea',
      category: 'manuais',
      description: 'Guia completo sobre navegação aérea, cartas aeronáuticas e procedimentos.',
      fileType: 'PDF',
      size: '3.2 MB',
      icon: 'compass',
      downloadUrl: '#',
      tags: ['navegação', 'cartas', 'procedimentos']
    },
    {
      id: 4,
      name: 'Checklist de Emergência',
      category: 'checklists',
      description: 'Procedimentos de emergência e checklists para situações críticas.',
      fileType: 'PDF',
      size: '1.1 MB',
      icon: 'alertTriangle',
      downloadUrl: '#',
      tags: ['emergência', 'procedimentos', 'segurança']
    },
    {
      id: 5,
      name: 'Manual de Meteorologia Aeronáutica',
      category: 'manuais',
      description: 'Guia sobre meteorologia aplicada à aviação e interpretação de condições climáticas.',
      fileType: 'PDF',
      size: '4.1 MB',
      icon: 'cloudSun',
      downloadUrl: '#',
      tags: ['meteorologia', 'clima', 'condições']
    },
    {
      id: 6,
      name: 'Checklist de Pouso',
      category: 'checklists',
      description: 'Checklist completo para procedimentos de pouso e aproximação.',
      fileType: 'PDF',
      size: '0.9 MB',
      icon: 'planeLanding',
      downloadUrl: '#',
      tags: ['pouso', 'aproximação', 'procedimentos']
    },
    {
      id: 7,
      name: 'Manual de Sistemas de Aeronaves',
      category: 'manuais',
      description: 'Documentação técnica sobre sistemas elétricos, hidráulicos e de combustível.',
      fileType: 'PDF',
      size: '5.2 MB',
      icon: 'settings',
      downloadUrl: '#',
      tags: ['sistemas', 'técnico', 'elétrico']
    },
    {
      id: 8,
      name: 'Checklist de Decolagem',
      category: 'checklists',
      description: 'Checklist para procedimentos de decolagem e checklist de segurança.',
      fileType: 'PDF',
      size: '0.7 MB',
      icon: 'planeTakeoff',
      downloadUrl: '#',
      tags: ['decolagem', 'segurança', 'procedimentos']
    },
    {
      id: 9,
      name: 'Regulamentação ANAC',
      category: 'regulamentacoes',
      description: 'Compilação das principais regulamentações da ANAC para aviação civil.',
      fileType: 'PDF',
      size: '6.8 MB',
      icon: 'clipboardList',
      downloadUrl: '#',
      tags: ['anac', 'regulamentação', 'civil']
    },
    {
      id: 10,
      name: 'Manual de Manutenção Preventiva',
      category: 'manuais',
      description: 'Guia para manutenção preventiva e inspeções periódicas de aeronaves.',
      fileType: 'PDF',
      size: '3.9 MB',
      icon: 'wrench',
      downloadUrl: '#',
      tags: ['manutenção', 'preventiva', 'inspeção']
    },
    {
      id: 11,
      name: 'Checklist de Comunicação Rádio',
      category: 'checklists',
      description: 'Frases padrão e procedimentos de comunicação rádio para pilotos.',
      fileType: 'PDF',
      size: '0.6 MB',
      icon: 'radio',
      downloadUrl: '#',
      tags: ['rádio', 'comunicação', 'frases']
    },
    {
      id: 12,
      name: 'Manual de Aeródromos Brasileiros',
      category: 'manuais',
      description: 'Informações sobre aeródromos, pistas e procedimentos específicos do Brasil.',
      fileType: 'PDF',
      size: '7.5 MB',
      icon: 'building2',
      downloadUrl: '#',
      tags: ['aeródromos', 'brasil', 'pistas']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: 'folder' },
    { id: 'manuais', name: 'Manuais', icon: 'bookOpen' },
    { id: 'checklists', name: 'Checklists', icon: 'checkSquare' },
    { id: 'regulamentacoes', name: 'Regulamentações', icon: 'clipboardList' }
  ];

  const handleDownload = (file) => {
    // Simular download
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = `${file.name}.${file.fileType.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar feedback
    alert(`Download iniciado: ${file.name}`);
  };

  const filteredFiles = downloadFiles.filter(file => {
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryStats = () => {
    const stats = {};
    downloadFiles.forEach(file => {
      stats[file.category] = (stats[file.category] || 0) + 1;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="download-center">
      <div className="download-header">
        <h2 className="download-header-title">
          <IconByName name="download" size={28} strokeWidth={1.75} />
          Centro de Downloads
        </h2>
        <p>Acesse manuais, checklists e materiais de referência para seus estudos</p>
      </div>

      <div className="download-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">
                <IconByName name={category.icon} size={18} strokeWidth={1.75} />
              </span>
              <span className="category-name">{category.name}</span>
              {category.id !== 'all' && (
                <span className="category-count">({categoryStats[category.id] || 0})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="download-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <IconByName name="folder" size={26} strokeWidth={1.75} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{downloadFiles.length}</div>
            <div className="stat-label">Total de Arquivos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IconByName name="bookOpen" size={26} strokeWidth={1.75} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{categoryStats.manuais || 0}</div>
            <div className="stat-label">Manuais</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IconByName name="checkSquare" size={26} strokeWidth={1.75} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{categoryStats.checklists || 0}</div>
            <div className="stat-label">Checklists</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IconByName name="clipboardList" size={26} strokeWidth={1.75} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{categoryStats.regulamentacoes || 0}</div>
            <div className="stat-label">Regulamentações</div>
          </div>
        </div>
      </div>

      <div className="files-grid">
        {filteredFiles.length === 0 ? (
          <div className="no-files">
            <div className="no-files-icon">
              <IconByName name="search" size={40} strokeWidth={1.5} />
            </div>
            <h3>Nenhum arquivo encontrado</h3>
            <p>Tente ajustar os filtros ou termos de busca</p>
          </div>
        ) : (
          filteredFiles.map(file => (
            <div key={file.id} className="file-card">
              <div className="file-header">
                <div className="file-icon">
                  <IconByName name={file.icon} size={28} strokeWidth={1.75} />
                </div>
                <div className="file-info">
                  <h3 className="file-name">{file.name}</h3>
                  <div className="file-meta">
                    <span className="file-type">{file.fileType}</span>
                    <span className="file-size">{file.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="file-description">
                {file.description}
              </div>
              
              <div className="file-tags">
                {file.tags.map(tag => (
                  <span key={tag} className="file-tag">{tag}</span>
                ))}
              </div>
              
              <div className="file-actions">
                <button 
                  className="download-btn"
                  onClick={() => handleDownload(file)}
                >
                  <Download size={18} aria-hidden />
                  Download
                </button>
                <button type="button" className="preview-btn">
                  <Eye size={18} aria-hidden />
                  Visualizar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="download-info">
        <h4 className="download-info-heading">
          <Info size={18} aria-hidden />
          Informações sobre Downloads
        </h4>
        <ul>
          <li><Check size={16} className="download-info-check" aria-hidden /> Todos os arquivos são gratuitos e oficiais</li>
          <li><Check size={16} className="download-info-check" aria-hidden /> Atualizados conforme regulamentações vigentes</li>
          <li><Check size={16} className="download-info-check" aria-hidden /> Compatíveis com dispositivos móveis</li>
          <li><Check size={16} className="download-info-check" aria-hidden /> Formato PDF para fácil visualização</li>
          <li><Check size={16} className="download-info-check" aria-hidden /> Recomendados pela instrutora Costanza Pasquotto Assef</li>
        </ul>
      </div>
    </div>
  );
};

export default DownloadCenter; 