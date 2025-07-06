import React from 'react';
import './About.css';
import fotoCostanza from '../assets/foto png.jpg';

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>Sobre o Curso</h2>
          <p>Conheça quem está por trás desta iniciativa educacional</p>
        </div>
        
        <div className="about-content">
          <div className="about-profile">
            <div className="profile-image">
              <img src={fotoCostanza} alt="Foto de Costanza" className="profile-photo" />
            </div>
            <div className="profile-info">
              <h3>Costanza Pasquotto Assef</h3>
              <p className="title">Engenheira de Software & Especialista em IA</p>
              <p className="bio">
                Olá! Sou Costanza, Engenheira de Software com foco em desenvolvimento front-end (React.js), 
                Python, JavaScript e inteligência artificial. Atualmente cursando Especialização em IA 
                Aplicada pela UFPR, compartilho conhecimento sobre tecnologia e IA nas redes sociais 
                (@cos_assef) com mais de 1.2 mil seguidores. Apaixonada por aviação, criei este curso 
                para combinar minha expertise técnica com meu interesse pela aeronáutica.
              </p>
              <div className="profile-contact">
                <h4>Contato</h4>
                <ul>
                  <li>📱 <strong>Telefone:</strong> <a href="https://wa.me/5547988041237" target="_blank" rel="noopener noreferrer" className="about-link">(47) 98804-1237</a></li>
                  <li>📸 <strong>Instagram:</strong> <a href="https://instagram.com/cos_assef" target="_blank" rel="noopener noreferrer" className="about-link">@cos_assef</a></li>
                  <li>💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/costanzaassef" target="_blank" rel="noopener noreferrer" className="about-link">Costanza Assef</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="about-story">
            <h3>Por que criei este curso?</h3>
            <div className="story-content">
              <div className="story-item">
                <div className="story-icon">🎯</div>
                <div className="story-text">
                  <h4>Missão</h4>
                  <p>
                    Combinar tecnologia e conhecimento aeronáutico para criar 
                    uma experiência de aprendizado inovadora, utilizando minha 
                    expertise em desenvolvimento e IA para tornar o conteúdo 
                    mais acessível e interativo.
                  </p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="story-icon">💡</div>
                <div className="story-text">
                  <h4>Visão</h4>
                  <p>
                    Criar uma plataforma educacional que integre tecnologia 
                    moderna com conteúdo aeronáutico de qualidade, formando 
                    uma comunidade de aprendizes que valorizem tanto o 
                    conhecimento técnico quanto a inovação.
                  </p>
                </div>
              </div>
              
              <div className="story-item">
                <div className="story-icon">🚀</div>
                <div className="story-text">
                  <h4>Objetivo</h4>
                  <p>
                    Desenvolver uma experiência de aprendizado única que 
                    utilize tecnologias modernas para ensinar aeronáutica, 
                    criando um curso que seja tanto educacional quanto 
                    tecnologicamente inovador.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-qualifications">
            <h3>Minhas Qualificações</h3>
            <div className="qualifications-grid">
              <div className="qualification">
                <span className="qual-icon">💻</span>
                <h4>Desenvolvimento</h4>
                <p>React.js, Python, JavaScript</p>
              </div>
              <div className="qualification">
                <span className="qual-icon">🤖</span>
                <h4>Inteligência Artificial</h4>
                <p>Especialização UFPR</p>
              </div>
              <div className="qualification">
                <span className="qual-icon">📱</span>
                <h4>Redes Sociais</h4>
                <p>1.2k+ seguidores</p>
              </div>
              <div className="qualification">
                <span className="qual-icon">✈️</span>
                <h4>Paixão pela Aviação</h4>
                <p>Conhecimento Técnico</p>
              </div>
            </div>
          </div>
          
          <div className="about-publications">
            <h3>Publicações e Redes Sociais</h3>
            <div className="publications-content">
              <div className="publication-item">
                <div className="pub-icon">📝</div>
                <div className="pub-info">
                  <h4>Artigos no Medium</h4>
                  <p>
                    Autora de artigos sobre IA e métodos ágeis, incluindo 
                    "Os Estrangeiros da IA" e análises sobre o impacto 
                    do Furacão Katrina sob a perspectiva da IA.
                  </p>
                </div>
              </div>
              
              <div className="publication-item">
                <div className="pub-icon">📱</div>
                <div className="pub-info">
                  <h4>Redes Sociais</h4>
                  <p>
                    Perfil @cos_assef no Instagram com mais de 1.2 mil seguidores, 
                    onde compartilho projetos com IA e insights sobre tecnologia. 
                    Também ativo no LinkedIn compartilhando conhecimento profissional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 