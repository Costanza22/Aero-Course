import React, { useState } from 'react';
import { Plane, Loader2, FileDown, FileText, ClipboardList, Check } from 'lucide-react';
import './CertificateGenerator.css';

const CertificateGenerator = ({ user, completionDate, grade }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Criar conteúdo do certificado
      const certificateContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Certificado AeroCourse</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              min-height: 100vh;
            }
            .certificate {
              background: #fff;
              border-radius: 20px;
              padding: 60px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 800px;
              margin: 0 auto;
              border: 8px solid #ffd700;
            }
            .header {
              margin-bottom: 40px;
            }
            .logo {
              font-size: 3rem;
              margin-bottom: 10px;
            }
            .title {
              font-size: 2.5rem;
              color: #2a5298;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 1.2rem;
              color: #666;
              margin-bottom: 50px;
            }
            .content {
              margin-bottom: 50px;
            }
            .student-name {
              font-size: 2rem;
              color: #2a5298;
              font-weight: bold;
              margin-bottom: 30px;
              text-decoration: underline;
            }
            .description {
              font-size: 1.1rem;
              line-height: 1.6;
              color: #333;
              margin-bottom: 40px;
            }
            .grade {
              font-size: 1.3rem;
              color: #2a5298;
              font-weight: bold;
              margin-bottom: 40px;
            }
            .signature-section {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
            }
            .signature {
              text-align: center;
              flex: 1;
            }
            .signature-line {
              border-top: 2px solid #333;
              width: 200px;
              margin: 20px auto;
            }
            .signature-name {
              font-weight: bold;
              color: #2a5298;
            }
            .signature-title {
              font-size: 0.9rem;
              color: #666;
            }
            .date {
              font-size: 1rem;
              color: #666;
              margin-top: 40px;
            }
            .certificate-number {
              font-size: 0.9rem;
              color: #999;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="title">AeroCourse</div>
              <div class="subtitle">Plataforma de ensino em aeronáutica</div>
            </div>
            
            <div class="content">
              <div class="student-name">${user?.name || 'Estudante'}</div>
              <div class="description">
                Certificamos que o(a) aluno(a) acima concluiu com êxito o curso completo de Aeronáutica, 
                demonstrando proficiência nos fundamentos da aviação, sistemas de aeronaves, navegação aérea, 
                meteorologia aeronáutica, regulamentação aeronáutica e manutenção de aeronaves.
              </div>
              ${grade ? `<div class="grade">Nota Final: ${grade}%</div>` : ''}
            </div>
            
            <div class="signature-section">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">Costanza Pasquotto Assef</div>
                <div class="signature-title">Instrutora e Especialista em Aeronáutica</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">AeroCourse</div>
                <div class="signature-title">Plataforma de Ensino</div>
              </div>
            </div>
            
            <div class="date">
              Data de Conclusão: ${completionDate || new Date().toLocaleDateString('pt-BR')}
            </div>
            
            <div class="certificate-number">
              Certificado Nº: AC-${Date.now().toString().slice(-8)}
            </div>
          </div>
        </body>
        </html>
      `;

      // Criar blob com o conteúdo HTML
      const blob = new Blob([certificateContent], { type: 'text/html' });
      
      // Criar URL do blob
      const url = URL.createObjectURL(blob);
      
      // Abrir em nova aba para impressão
      const newWindow = window.open(url, '_blank');
      
      // Aguardar carregamento e imprimir
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      }
      
      // Limpar URL após um tempo
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao gerar certificado:', error);
      alert('Erro ao gerar o certificado. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsText = () => {
    const certificateText = `
CERTIFICADO DE CONCLUSÃO - AEROCOURSE

Aluno(a): ${user?.name || 'Estudante'}
Data de Conclusão: ${completionDate || new Date().toLocaleDateString('pt-BR')}
${grade ? `Nota Final: ${grade}%` : ''}

Certificamos que o(a) aluno(a) acima concluiu com êxito o curso completo de Aeronáutica, 
demonstrando proficiência nos fundamentos da aviação, sistemas de aeronaves, navegação aérea, 
meteorologia aeronáutica, regulamentação aeronáutica e manutenção de aeronaves.

Assinatura: Costanza Pasquotto Assef
Instrutora e Especialista em Aeronáutica

Certificado Nº: AC-${Date.now().toString().slice(-8)}
    `;

    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-aerocourse-${user?.name || 'estudante'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="certificate-generator">
      <div className="certificate-preview">
        <div className="certificate-header">
          <div className="certificate-logo">
            <Plane size={40} strokeWidth={1.75} aria-hidden />
          </div>
          <h2>AeroCourse</h2>
          <p>Plataforma de Ensino em Aeronáutica</p>
        </div>
        
        <div className="certificate-content">
          <div className="student-name">{user?.name || 'Estudante'}</div>
          <div className="certificate-description">
            Certificamos que o(a) aluno(a) acima concluiu com êxito o curso completo de Aeronáutica, 
            demonstrando proficiência nos fundamentos da aviação, sistemas de aeronaves, navegação aérea, 
            meteorologia aeronáutica, regulamentação aeronáutica e manutenção de aeronaves.
          </div>
          {grade && <div className="certificate-grade">Nota Final: {grade}%</div>}
        </div>
        
        <div className="certificate-signatures">
          <div className="signature">
            <div className="signature-line"></div>
            <div className="signature-name">Costanza Pasquotto Assef</div>
            <div className="signature-title">Instrutora e Especialista em Aeronáutica</div>
          </div>
          <div className="signature">
            <div className="signature-line"></div>
            <div className="signature-name">AeroCourse</div>
            <div className="signature-title">Plataforma de Ensino</div>
          </div>
        </div>
        
        <div className="certificate-footer">
          <div className="certificate-date">
            Data de Conclusão: {completionDate || new Date().toLocaleDateString('pt-BR')}
          </div>
          <div className="certificate-number">
            Certificado Nº: AC-{Date.now().toString().slice(-8)}
          </div>
        </div>
      </div>
      
      <div className="certificate-actions">
        <button 
          className="download-pdf-btn"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="cert-btn-spin" aria-hidden /> Gerando…
            </>
          ) : (
            <>
              <FileDown size={18} aria-hidden /> Baixar PDF
            </>
          )}
        </button>
        <button 
          className="download-text-btn"
          onClick={downloadAsText}
        >
          <FileText size={18} aria-hidden /> Baixar texto
        </button>
      </div>
      
      <div className="certificate-info">
        <h4 className="certificate-info-title">
          <ClipboardList size={18} aria-hidden />
          Informações do certificado
        </h4>
        <ul>
          <li>
            <Check size={14} strokeWidth={3} aria-hidden /> Certificado oficial da AeroCourse
          </li>
          <li>
            <Check size={14} strokeWidth={3} aria-hidden /> Assinado pela instrutora Costanza Pasquotto Assef
          </li>
          <li>
            <Check size={14} strokeWidth={3} aria-hidden /> Número único de identificação
          </li>
          <li>
            <Check size={14} strokeWidth={3} aria-hidden /> Data de conclusão registrada
          </li>
          <li>
            <Check size={14} strokeWidth={3} aria-hidden /> Nota final (se aplicável)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CertificateGenerator; 