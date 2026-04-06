import React from 'react';
import Image from 'next/image';
import {
  Phone,
  Camera,
  Briefcase,
  Target,
  Lightbulb,
  Rocket,
  Code,
  Bot,
  Smartphone,
  Plane,
  PenLine,
  Share2,
} from 'lucide-react';
import './About.css';
import fotoCostanza from '../assets/foto png.jpg';

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>Sobre o curso</h2>
          <p>Conheça quem está por trás desta iniciativa educacional</p>
        </div>

        <div className="about-content">
          <div className="about-profile">
            <div className="profile-image">
              <Image
                src={fotoCostanza}
                alt="Foto de Costanza"
                width={150}
                height={150}
                className="profile-photo"
                priority
              />
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
                <ul className="about-contact-list">
                  <li>
                    <a href="https://wa.me/5547988041237" target="_blank" rel="noopener noreferrer" className="about-contact-link">
                      <Phone size={16} strokeWidth={2} aria-hidden />
                      (47) 98804-1237
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/cos_assef" target="_blank" rel="noopener noreferrer" className="about-contact-link">
                      <Camera size={16} strokeWidth={2} aria-hidden />
                      @cos_assef
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/costanzaassef" target="_blank" rel="noopener noreferrer" className="about-contact-link">
                      <Briefcase size={16} strokeWidth={2} aria-hidden />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-story">
            <h3>Por que criei este curso?</h3>
            <div className="story-content">
              <div className="story-item">
                <div className="story-icon" aria-hidden>
                  <Target size={28} strokeWidth={1.75} />
                </div>
                <div className="story-text">
                  <h4>Missão</h4>
                  <p>
                    Combinar tecnologia e conhecimento aeronáutico para criar uma experiência de
                    aprendizado inovadora, utilizando minha expertise em desenvolvimento e IA para tornar
                    o conteúdo mais acessível e interativo.
                  </p>
                </div>
              </div>

              <div className="story-item">
                <div className="story-icon" aria-hidden>
                  <Lightbulb size={28} strokeWidth={1.75} />
                </div>
                <div className="story-text">
                  <h4>Visão</h4>
                  <p>
                    Criar uma plataforma educacional que integre tecnologia moderna com conteúdo
                    aeronáutico de qualidade, formando uma comunidade de aprendizes que valorizem tanto o
                    conhecimento técnico quanto a inovação.
                  </p>
                </div>
              </div>

              <div className="story-item">
                <div className="story-icon" aria-hidden>
                  <Rocket size={28} strokeWidth={1.75} />
                </div>
                <div className="story-text">
                  <h4>Objetivo</h4>
                  <p>
                    Desenvolver uma experiência de aprendizado única que utilize tecnologias modernas
                    para ensinar aeronáutica, criando um curso que seja tanto educacional quanto
                    tecnologicamente inovador.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-qualifications">
            <h3>Minhas qualificações</h3>
            <div className="qualifications-grid">
              <div className="qualification">
                <span className="qual-icon" aria-hidden>
                  <Code size={28} strokeWidth={1.75} />
                </span>
                <h4>Desenvolvimento</h4>
                <p>React.js, Python, JavaScript</p>
              </div>
              <div className="qualification">
                <span className="qual-icon" aria-hidden>
                  <Bot size={28} strokeWidth={1.75} />
                </span>
                <h4>Inteligência artificial</h4>
                <p>Especialização UFPR</p>
              </div>
              <div className="qualification">
                <span className="qual-icon" aria-hidden>
                  <Smartphone size={28} strokeWidth={1.75} />
                </span>
                <h4>Redes sociais</h4>
                <p>1.2k+ seguidores</p>
              </div>
              <div className="qualification">
                <span className="qual-icon" aria-hidden>
                  <Plane size={28} strokeWidth={1.75} />
                </span>
                <h4>Paixão pela aviação</h4>
                <p>Conhecimento técnico</p>
              </div>
            </div>
          </div>

          <div className="about-publications">
            <h3>Publicações e redes sociais</h3>
            <div className="publications-content">
              <div className="publication-item">
                <div className="pub-icon" aria-hidden>
                  <PenLine size={28} strokeWidth={1.75} />
                </div>
                <div className="pub-info">
                  <h4>Artigos no Medium</h4>
                  <p>
                    Autora de artigos sobre IA e métodos ágeis, incluindo «Os Estrangeiros da IA» e
                    análises sobre o impacto do Furacão Katrina sob a perspectiva da IA.
                  </p>
                </div>
              </div>

              <div className="publication-item">
                <div className="pub-icon" aria-hidden>
                  <Share2 size={28} strokeWidth={1.75} />
                </div>
                <div className="pub-info">
                  <h4>Redes sociais</h4>
                  <p>
                    Perfil @cos_assef no Instagram com mais de 1.2 mil seguidores, onde compartilho
                    projetos com IA e insights sobre tecnologia. Também ativo no LinkedIn compartilhando
                    conhecimento profissional.
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
