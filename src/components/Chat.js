import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import './Chat.css';

// Respostas automáticas do instrutor
const autoResponses = {
  oi: 'Olá! Como posso ajudar você hoje?',
  olá: 'Oi! Tudo bem? Precisa de ajuda com algum módulo do curso?',
  'oi!': 'Oi! Bem-vindo(a) ao chat do AeroCourse.',
  ajuda: 'Claro! Posso ajudar com dúvidas sobre aeronáutica, navegação, sistemas de aeronaves e muito mais. Qual módulo você está estudando?',
  duvida: 'Fique à vontade para perguntar! Estou aqui para ajudar com suas dúvidas sobre aeronáutica.',
  obrigado: 'Por nada! Fico feliz em ajudar!',
  obrigada: 'Por nada! Fico feliz em ajudar!',
  valeu: 'Disponha! Se precisar de mais alguma coisa, é só perguntar!',
  tchau: 'Até logo! Continue estudando!',
  bye: 'Até a próxima! Boa sorte nos estudos!',
};

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAutoResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Verificar respostas exatas
    if (autoResponses[lowerMessage]) {
      return autoResponses[lowerMessage];
    }
    
    // Verificar palavras-chave
    if (lowerMessage.includes('aeronáutica') || lowerMessage.includes('aeronautica')) {
      return 'Aeronáutica é fascinante! Qual aspecto específico te interessa mais?';
    }
    
    if (lowerMessage.includes('navegação') || lowerMessage.includes('navegacao')) {
      return 'Navegação aérea é um tema muito importante! Já estudou o módulo de Navegação Aérea?';
    }
    
    if (lowerMessage.includes('sistema') || lowerMessage.includes('sistemas')) {
      return 'Os sistemas de aeronaves são fundamentais! Recomendo estudar o módulo "Sistemas de Aeronaves" para entender melhor.';
    }
    
    if (lowerMessage.includes('voo') || lowerMessage.includes('voar')) {
      return 'Os princípios de voo são incríveis! Comece pelo módulo "Fundamentos da Aeronáutica" para entender os conceitos básicos.';
    }
    
    if (lowerMessage.includes('módulo') || lowerMessage.includes('modulo')) {
      return 'Temos 6 módulos no curso! Qual você gostaria de conhecer melhor? Posso te dar uma visão geral de qualquer um deles.';
    }
    
    if (lowerMessage.includes('certificado')) {
      return 'Para obter o certificado, você precisa completar todos os 6 módulos do curso. Continue estudando!';
    }
    
    // Resposta padrão para mensagens não reconhecidas
    return 'Interessante! Se tiver dúvidas específicas sobre aeronáutica, navegação, sistemas de aeronaves ou qualquer outro tema do curso, é só perguntar.';
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    
    // Adicionar mensagem do usuário
    setMessages((msgs) => [
      ...msgs,
      {
        user: user?.name || 'Anônimo',
        text: userMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    setInput('');
    
    // Adicionar resposta automática após 1 segundo
    setTimeout(() => {
      const autoResponse = getAutoResponse(userMessage);
      setMessages((msgs) => [
        ...msgs,
        {
          user: 'Costanza (Instrutora)',
          text: autoResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageCircle size={20} strokeWidth={2} aria-hidden />
        Chat com instrutora
      </div>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>Olá! Sou a Costanza, sua instrutora.</p>
            <p>Como posso ajudar você hoje?</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.user === 'Costanza (Instrutora)' ? 'instructor' : ''}`}>
            <span className="chat-user">{msg.user}</span>
            <span className="chat-time">{msg.time}</span>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat; 