import React from 'react';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="app-footer">
      Desenvolvido por{' '}
      <a
        href="https://adrianaevangelista.com"
        target="_blank"
        rel="noopener noreferrer"
        className="app-footer__link"
      >
        Adriana Evangelista
      </a>
    </footer>
  );
}
