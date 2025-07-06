# 🛩️ AeroCourse - Plataforma Educacional de Aeronáutica

Uma plataforma educacional moderna e interativa para o ensino de aeronáutica, desenvolvida em React com recursos avançados de realidade virtual, simulação de voo e conteúdo interativo.

## ✨ Características Principais

### 🎓 Sistema Educacional
- **Módulos de Curso**: Conteúdo estruturado por lições e módulos
- **Sistema de Quiz**: Avaliações interativas por lição
- **Progresso do Aluno**: Rastreamento detalhado do progresso
- **Sistema de Notas**: Avaliação automática e manual
- **Certificados PDF**: Geração automática de certificados

### 🎮 Simulador de Voo
- **Controles Realistas**: Joystick, pedais e instrumentos
- **Instrumentos de Voo**: PFD, ND, EICAS e mais
- **Física de Voo**: Simulação realista de aerodinâmica
- **Múltiplas Aeronaves**: Diferentes tipos de aeronaves disponíveis

### 🎥 Conteúdo Interativo
- **Tours Virtuais 360°**: Vídeos imersivos do YouTube
- **Componentes AR 3D**: Modelos 3D interativos
- **Podcasts Aeronáuticos**: Conteúdo em áudio
- **Infográficos Interativos**: Visualizações dinâmicas

### 📱 Interface Moderna
- **Design Responsivo**: Compatível com desktop e mobile
- **Modo Escuro/Claro**: Tema personalizável
- **Notificações Push**: Alertas em tempo real
- **Dashboard Analytics**: Métricas detalhadas de uso

### 🛠️ Recursos Técnicos
- **Chat em Tempo Real**: Comunicação entre usuários
- **Centro de Downloads**: Biblioteca de recursos
- **Biblioteca de Conteúdo**: Casos de estudo e notícias
- **Sistema de Usuários**: Login e perfis personalizados

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/aerocourse.git
cd aerocourse
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
aerocourse/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── CourseModule.js
│   │   ├── Quiz.js
│   │   ├── FlightSimulator.js
│   │   ├── VirtualTour.js
│   │   ├── InteractiveContent.js
│   │   ├── Analytics.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Courses.js
│   │   ├── Simulator.js
│   │   └── ...
│   ├── styles/
│   │   ├── components/
│   │   └── global.css
│   ├── utils/
│   │   ├── auth.js
│   │   ├── api.js
│   │   └── helpers.js
│   └── App.js
├── package.json
└── README.md
```

## 🎯 Como Usar

### Para Estudantes
1. **Cadastre-se** ou faça login na plataforma
2. **Navegue pelos cursos** disponíveis
3. **Assista às lições** e complete os quizzes
4. **Use o simulador** para praticar
5. **Explore o conteúdo interativo** (tours 360°, AR, podcasts)
6. **Acompanhe seu progresso** no dashboard

### Para Instrutores
1. **Acesse o painel administrativo**
2. **Crie e edite cursos** e lições
3. **Configure quizzes** e avaliações
4. **Monitore o progresso** dos alunos
5. **Gere relatórios** e certificados

## 🎮 Simulador de Voo

O simulador inclui:
- **Controles de Voo**: Joystick, pedais, manete de potência
- **Instrumentos Primários**: Altímetro, velocímetro, horizonte artificial
- **Instrumentos de Navegação**: GPS, VOR, ADF
- **Sistemas de Emergência**: Alertas e procedimentos

### Controles
- **Mouse**: Controle do joystick
- **Teclado**: Controles de potência e flaps
- **Touch**: Compatível com dispositivos móveis

## 🎥 Tours Virtuais 360°

Explore locais aeronáuticos em realidade virtual:
- **Cockpit Boeing 737**: Instrumentos e controles
- **Hangar de Manutenção**: Processos de manutenção
- **Torre de Controle**: Operações ATC
- **Sala de Simulação**: Treinamento de pilotos

### Recursos
- **Hotspots Interativos**: Clique para informações detalhadas
- **Navegação Intuitiva**: Controles touch-friendly
- **Compatibilidade Mobile**: Otimizado para smartphones

## 📱 Compatibilidade Mobile

A plataforma é totalmente responsiva e inclui:
- **Interface Adaptada**: Elementos redimensionados para touch
- **Controles Touch**: Gestos e toques otimizados
- **Carregamento Otimizado**: Performance melhorada em dispositivos móveis
- **Modo Paisagem**: Suporte para orientação horizontal

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js, CSS3, JavaScript ES6+
- **Estilização**: CSS Grid, Flexbox, Media Queries
- **Interatividade**: Event Listeners, Touch Events
- **Vídeos**: YouTube API, iframe embedding
- **PDF**: jsPDF para geração de certificados
- **Notificações**: Web Notifications API

## 📊 Recursos de Analytics

O dashboard inclui:
- **Progresso Individual**: Métricas por aluno
- **Estatísticas Gerais**: Uso da plataforma
- **Relatórios de Performance**: Análise de resultados
- **Gráficos Interativos**: Visualizações dinâmicas

### Personalização
- **Temas**: Modifique as cores no arquivo CSS
- **Conteúdo**: Adicione novos cursos e lições
- **Vídeos**: Substitua os IDs do YouTube
- **Simulador**: Configure novas aeronaves

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] Integração com VR headsets
- [ ] Multiplayer no simulador
- [ ] IA para avaliação automática
- [ ] App mobile nativo
- [ ] Integração com sistemas de aviação real

### Melhorias Planejadas
- [ ] Mais aeronaves no simulador
- [ ] Cenários de emergência
- [ ] Sistema de conquistas
- [ ] Comunidade de usuários
- [ ] API pública

---

**Desenvolvido com ❤️ para a comunidade aeronáutica**

*AeroCourse - Transformando o aprendizado de aeronáutica através da tecnologia*
