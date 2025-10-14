'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';

import type { ClientCase } from '@/types/gift';

import styles from './clients-orbit.module.css';

type ClientsOrbitProps = {
  cases: ClientCase[];
  onSelect: (client: ClientCase) => void;
};

export function ClientsOrbit({ cases, onSelect }: ClientsOrbitProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useAnimationFrame((t) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const angle = t / 4000;
    el.style.setProperty('--orbit-rotation', `${angle}rad`);
  });

  return (
    <section className={styles.section} aria-labelledby="clients-orbit">
      <div className="section-header">
        <h2 id="clients-orbit">Наши заказчики</h2>
        <p>Технологичные компании, банки и корпорации, которые строят культуру через подарки.</p>
      </div>
      <div ref={ref} className={styles.orbit}>
        {cases.map((client, index) => (
          <button
            key={client.id}
            type="button"
            className={styles.client}
            style={{ '--index': index } as never}
            onClick={() => onSelect(client)}
            aria-label={`${client.company}. ${client.summary}`}
          >
            <Image src={client.logo} alt={client.company} width={120} height={60} />
          </button>
        ))}
        <motion.div className={styles.pulse} aria-hidden />
      </div>
    </section>
  );
}
