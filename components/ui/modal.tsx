'use client';

import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

import styles from './modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const portal = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const el = document.createElement('div');
    el.setAttribute('role', 'presentation');
    return el;
  }, []);

  useEffect(() => {
    if (!portal || typeof document === 'undefined') return;
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
  }, [portal]);

  useEffect(() => {
    if (!open || !portal) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKey);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = container.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose, portal]);

  useEffect(() => {
    if (!portal) return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, portal]);

  if (!portal || !open) return null;

  return createPortal(
    <div className={styles.wrapper} aria-modal="true" role="dialog">
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.container}>
        <div ref={container} className={styles.panel} role="document">
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.body}>{children}</div>
          <button type="button" onClick={onClose} className={styles.close}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    portal
  );
}
