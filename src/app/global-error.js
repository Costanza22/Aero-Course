'use client';

import { useEffect } from 'react';
import { syne, dmSans } from './fonts';
import './globals.css';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <div className="ac-error-page">
          <div className="ac-error-card">
            <h1 className="ac-error-title">Erro na aplicação</h1>
            <p className="ac-error-text">
              Ocorreu um problema crítico. Recarregue a página ou tente novamente em instantes.
            </p>
            <div className="ac-error-actions">
              <button type="button" className="ac-error-btn ac-error-btn--primary" onClick={() => reset()}>
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
