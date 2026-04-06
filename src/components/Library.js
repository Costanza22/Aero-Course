import React from 'react';
import './Library.css';
import { IconByName } from '@/components/ui/IconByName';

const resources = [
  {
    icon: 'bookOpen',
    name: 'Publicações ANAC',
    url: 'https://www.anac.gov.br/assuntos/setor-regulado/publicacoes',
    desc: 'Documentos oficiais e materiais da Agência Nacional de Aviação Civil.'
  },
  {
    icon: 'library',
    name: 'FAA Handbooks',
    url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation',
    desc: 'Manuais e guias da Federal Aviation Administration (EUA).'
  },
  {
    icon: 'globe',
    name: 'Wikipedia: Avião',
    url: 'https://pt.wikipedia.org/wiki/Avi%C3%A3o',
    desc: 'Artigo completo sobre aviões, história e funcionamento.'
  },
  {
    icon: 'world',
    name: 'Convenção de Chicago (ICAO)',
    url: 'https://www.icao.int/publications/pages/publication.aspx?docnum=7300',
    desc: 'Documento internacional que regula a aviação civil.'
  }
];

const Library = () => (
  <section className="library-section">
    <h2>Biblioteca Digital</h2>
    <p>Aqui você encontra materiais, livros, artigos e links úteis sobre aeronáutica para aprofundar seus estudos.</p>
    <ul>
      {resources.map((item, idx) => (
        <li key={idx} className="library-card">
          <span className="library-icon">
            <IconByName name={item.icon} size={26} strokeWidth={1.75} />
          </span>
          <div className="library-info">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="library-link">{item.name}</a>
            <div className="library-desc">{item.desc}</div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Library; 