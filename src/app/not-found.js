import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="ac-error-page">
      <div className="ac-error-card">
        <p className="ac-error-kicker">404</p>
        <h1 className="ac-error-title">Página não encontrada</h1>
        <p className="ac-error-text">O endereço não existe ou foi movido.</p>
        <div className="ac-error-actions">
          <Link href="/" className="ac-error-btn ac-error-btn--primary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
