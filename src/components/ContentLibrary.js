import React, { useState } from 'react';
import './ContentLibrary.css';

const ContentLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const contentItems = [
    // Casos Reais
    {
      id: 1,
      title: 'Caso: Pouso de Emergência no Rio Hudson',
      category: 'casos-reais',
      type: 'Caso Real',
      description: 'Análise detalhada do famoso pouso de emergência do Capitão Sully no Rio Hudson em 2009.',
      content: `
        <h3>O Incidente</h3>
        <p>Em 15 de janeiro de 2009, o voo US Airways 1549 decolou do Aeroporto LaGuardia em Nova York com destino a Charlotte, Carolina do Norte. Apenas 90 segundos após a decolagem, a aeronave Airbus A320 colidiu com um bando de gansos canadenses, causando falha total em ambos os motores.</p>
        
        <h3>Decisão Crítica</h3>
        <p>O Capitão Chesley "Sully" Sullenberger, com 40 anos de experiência de voo, tomou a decisão de pousar no Rio Hudson em vez de tentar retornar ao aeroporto ou pousar em Teterboro. Esta decisão salvou todas as 155 pessoas a bordo.</p>
        
        <h3>Lições Aprendidas</h3>
        <ul>
          <li>Importância do treinamento de emergência</li>
          <li>Valor da experiência do piloto</li>
          <li>Necessidade de procedimentos claros</li>
          <li>Cooperação entre tripulação e passageiros</li>
        </ul>
      `,
      date: '2009-01-15',
      author: 'Capitão Chesley Sullenberger',
      tags: ['emergência', 'pouso', 'falha de motor', 'decisão'],
      image: '🛬'
    },
    {
      id: 2,
      title: 'Caso: Voo 447 Air France - Lições sobre Turbulência',
      category: 'casos-reais',
      type: 'Caso Real',
      description: 'Análise do acidente do voo AF447 e as lições sobre navegação em condições meteorológicas adversas.',
      content: `
        <h3>O Incidente</h3>
        <p>O voo Air France 447, um Airbus A330, desapareceu sobre o Oceano Atlântico em 1º de junho de 2009, durante um voo do Rio de Janeiro para Paris. Todas as 228 pessoas a bordo faleceram.</p>
        
        <h3>Causas Identificadas</h3>
        <p>O acidente foi causado por uma combinação de fatores:</p>
        <ul>
          <li>Congelamento dos tubos de Pitot</li>
          <li>Perda de velocidade de voo</li>
          <li>Erro de interpretação dos instrumentos</li>
          <li>Falta de treinamento para situações de emergência</li>
        </ul>
        
        <h3>Mudanças na Aviação</h3>
        <p>Este acidente levou a mudanças significativas nos procedimentos de treinamento e na tecnologia de instrumentos de voo.</p>
      `,
      date: '2009-06-01',
      author: 'BEA (Bureau d\'Enquêtes et d\'Analyses)',
      tags: ['turbulência', 'instrumentos', 'treinamento', 'segurança'],
      image: '🌊'
    },

    // Histórias de Pilotos
    {
      id: 3,
      title: 'História: Amelia Earhart - Pioneira da Aviação',
      category: 'historias-pilotos',
      type: 'História',
      description: 'A vida e legado de Amelia Earhart, uma das primeiras mulheres pilotos da história.',
      content: `
        <h3>Primeiros Anos</h3>
        <p>Amelia Earhart nasceu em 1897 no Kansas, Estados Unidos. Sua primeira experiência com aviação foi em 1920, quando fez um voo de 10 minutos que mudou sua vida para sempre.</p>
        
        <h3>Conquistas Históricas</h3>
        <ul>
          <li>Primeira mulher a voar sozinha sobre o Oceano Atlântico (1932)</li>
          <li>Primeira pessoa a voar sozinha do Havaí para a Califórnia (1935)</li>
          <li>Estabeleceu vários recordes de altitude e velocidade</li>
        </ul>
        
        <h3>Legado</h3>
        <p>Amelia Earhart inspirou gerações de mulheres a seguir carreiras na aviação e continua sendo um símbolo de coragem e determinação.</p>
      `,
      date: '1897-07-24',
      author: 'Amelia Earhart',
      tags: ['pioneira', 'mulheres', 'história', 'inspiração'],
      image: '✈️'
    },
    {
      id: 4,
      title: 'História: Santos Dumont - O Pai da Aviação',
      category: 'historias-pilotos',
      type: 'História',
      description: 'A vida de Alberto Santos Dumont e suas contribuições para o desenvolvimento da aviação.',
      content: `
        <h3>O Visionário Brasileiro</h3>
        <p>Alberto Santos Dumont nasceu em 1873 em Minas Gerais, Brasil. Desde criança, demonstrou fascínio por máquinas e voo.</p>
        
        <h3>Conquistas Principais</h3>
        <ul>
          <li>Primeiro voo oficial de um avião mais pesado que o ar (1906)</li>
          <li>Desenvolvimento do 14-Bis</li>
          <li>Invenção do relógio de pulso para pilotos</li>
          <li>Contribuições para dirigíveis</li>
        </ul>
        
        <h3>Impacto na Aviação</h3>
        <p>Santos Dumont é considerado o pai da aviação moderna, tendo desenvolvido conceitos fundamentais que ainda são usados hoje.</p>
      `,
      date: '1873-07-20',
      author: 'Alberto Santos Dumont',
      tags: ['brasil', 'pioneiro', 'invenção', 'história'],
      image: '🇧🇷'
    },

    // Notícias da Aviação
    {
      id: 5,
      title: 'Novas Tecnologias em Aviação Sustentável',
      category: 'noticias',
      type: 'Notícia',
      description: 'Descobertas recentes em combustíveis sustentáveis e tecnologias de redução de emissões.',
      content: `
        <h3>Combustíveis Sustentáveis</h3>
        <p>A indústria da aviação está investindo pesadamente em combustíveis sustentáveis de aviação (SAF) para reduzir as emissões de carbono.</p>
        
        <h3>Novas Tecnologias</h3>
        <ul>
          <li>Motores elétricos híbridos</li>
          <li>Materiais mais leves e resistentes</li>
          <li>Aerodinâmica aprimorada</li>
          <li>Sistemas de navegação mais eficientes</li>
        </ul>
        
        <h3>Impacto Ambiental</h3>
        <p>Essas inovações podem reduzir as emissões de carbono da aviação em até 80% até 2050.</p>
      `,
      date: '2024-01-15',
      author: 'Revista Aviation Today',
      tags: ['sustentabilidade', 'tecnologia', 'meio ambiente', 'inovação'],
      image: '🌱'
    },
    {
      id: 6,
      title: 'Novos Regulamentos de Segurança da ANAC',
      category: 'noticias',
      type: 'Notícia',
      description: 'Atualizações nas regulamentações brasileiras para aumentar a segurança operacional.',
      content: `
        <h3>Mudanças Principais</h3>
        <p>A ANAC anunciou novas regulamentações que entrarão em vigor em 2024, focando em:</p>
        <ul>
          <li>Treinamento de pilotos mais rigoroso</li>
          <li>Inspeções de manutenção mais frequentes</li>
          <li>Novos padrões de equipamentos de segurança</li>
          <li>Procedimentos de emergência atualizados</li>
        </ul>
        
        <h3>Impacto na Indústria</h3>
        <p>Essas mudanças visam aumentar ainda mais os já altos padrões de segurança da aviação brasileira.</p>
      `,
      date: '2024-01-10',
      author: 'ANAC - Agência Nacional de Aviação Civil',
      tags: ['regulamentação', 'segurança', 'anac', 'brasil'],
      image: '📋'
    },

    // Eventos Aeronáuticos
    {
      id: 7,
      title: 'AirVenture 2024 - Maior Feira de Aviação do Mundo',
      category: 'eventos',
      type: 'Evento',
      description: 'A maior feira de aviação experimental e recreativa do mundo acontece em Oshkosh, Wisconsin.',
      content: `
        <h3>Sobre o Evento</h3>
        <p>O AirVenture é realizado anualmente pela Experimental Aircraft Association (EAA) e atrai mais de 600.000 visitantes e 10.000 aeronaves.</p>
        
        <h3>Atrações Principais</h3>
        <ul>
          <li>Exposição de aeronaves experimentais</li>
          <li>Demonstrações de voo</li>
          <li>Workshops e seminários</li>
          <li>Networking com profissionais da indústria</li>
        </ul>
        
        <h3>Data e Local</h3>
        <p>22-28 de julho de 2024<br>Wittman Regional Airport, Oshkosh, Wisconsin, EUA</p>
      `,
      date: '2024-07-22',
      author: 'EAA - Experimental Aircraft Association',
      tags: ['feira', 'experimental', 'networking', 'demonstrações'],
      image: '🎪'
    },
    {
      id: 8,
      title: 'FIDAE 2024 - Feira Internacional do Ar e do Espaço',
      category: 'eventos',
      type: 'Evento',
      description: 'A principal feira de aviação da América Latina acontece no Chile.',
      content: `
        <h3>Sobre o FIDAE</h3>
        <p>O FIDAE é a maior feira aeroespacial da América Latina, realizada a cada dois anos em Santiago, Chile.</p>
        
        <h3>Foco do Evento</h3>
        <ul>
          <li>Aviação comercial e militar</li>
          <li>Tecnologia espacial</li>
          <li>Defesa e segurança</li>
          <li>Inovação tecnológica</li>
        </ul>
        
        <h3>Data e Local</h3>
        <p>2-6 de abril de 2024<br>Arturo Merino Benítez International Airport, Santiago, Chile</p>
      `,
      date: '2024-04-02',
      author: 'FIDAE - Feira Internacional del Aire y del Espacio',
      tags: ['feira', 'latino-america', 'tecnologia', 'defesa'],
      image: '🇨🇱'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'casos-reais', name: 'Casos Reais', icon: '📋' },
    { id: 'historias-pilotos', name: 'Histórias de Pilotos', icon: '👨‍✈️' },
    { id: 'noticias', name: 'Notícias', icon: '📰' },
    { id: 'eventos', name: 'Eventos', icon: '📅' }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const openContent = (item) => {
    setSelectedItem(item);
  };

  const closeContent = () => {
    setSelectedItem(null);
  };

  return (
    <div className="content-library">
      <div className="library-header">
        <h2>📚 Biblioteca de Conteúdo</h2>
        <p>Explore casos reais, histórias inspiradoras e as últimas notícias da aviação</p>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar conteúdo..."
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
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="content-grid">
        {filteredContent.map(item => (
          <div key={item.id} className="content-card" onClick={() => openContent(item)}>
            <div className="content-header">
              <div className="content-icon">{item.image}</div>
              <div className="content-type">{item.type}</div>
            </div>
            
            <div className="content-info">
              <h3 className="content-title">{item.title}</h3>
              <p className="content-description">{item.description}</p>
              
              <div className="content-meta">
                <span className="content-date">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                <span className="content-author">{item.author}</span>
              </div>
              
              <div className="content-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="content-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="content-modal">
          <div className="modal-overlay" onClick={closeContent}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedItem.title}</h2>
              <button className="close-btn" onClick={closeContent}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-meta">
                <span className="modal-type">{selectedItem.type}</span>
                <span className="modal-date">{new Date(selectedItem.date).toLocaleDateString('pt-BR')}</span>
                <span className="modal-author">{selectedItem.author}</span>
              </div>
              
              <div 
                className="modal-text"
                dangerouslySetInnerHTML={{ __html: selectedItem.content }}
              ></div>
              
              <div className="modal-tags">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="modal-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="library-info">
        <h4>ℹ️ Sobre a Biblioteca</h4>
        <ul>
          <li>✅ Conteúdo atualizado regularmente</li>
          <li>✅ Casos reais com lições aprendidas</li>
          <li>✅ Histórias inspiradoras de pilotos</li>
          <li>✅ Notícias da indústria aeronáutica</li>
          <li>✅ Calendário de eventos importantes</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentLibrary; 