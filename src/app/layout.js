import './globals.css';
import { syne, dmSans } from './fonts';

export const metadata = {
  title: 'AeroCourse — Aeronáutica',
  description:
    'Plataforma educacional de aeronáutica: curso, simuladores e recursos práticos.',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
