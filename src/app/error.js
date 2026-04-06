'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="ac-error-page">
      <div className="ac-error-card">
        <h1 className="ac-error-title">Algo deu errado</h1>
        <p className="ac-error-text">
          Não foi possível carregar esta parte da página. Você pode tentar de novo ou voltar ao início.
        </p>
        <div className="ac-error-actions">
          <button type="button" className="ac-error-btn ac-error-btn--primary" onClick={() => reset()}>
            Tentar novamente
          </button>
          <Link href="/" className="ac-error-btn ac-error-btn--ghost">
            Ir ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
