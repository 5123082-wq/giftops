import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'GiftOps Portal',
  description: 'GiftGo — управление корпоративными подарками'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="main-container">
          <header style={{ paddingBlock: '2rem' }}>
            <a href="/" aria-label="GiftOps — на главную">
              <strong>GiftOps</strong>
            </a>
          </header>
          {children}
          <footer style={{ paddingBlock: '3rem', fontSize: '0.875rem', opacity: 0.7 }}>
            © {new Date().getFullYear()} GiftOps.
          </footer>
        </div>
      </body>
    </html>
  );
}
