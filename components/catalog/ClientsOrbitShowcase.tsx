'use client';

import { useState } from 'react';

import { Modal } from '@/components/ui';
import type { ClientCase } from '@/types/gift';

import { ClientsOrbit } from './ClientsOrbit';

export function ClientsOrbitShowcase({ cases }: { cases: ClientCase[] }) {
  const [selected, setSelected] = useState<ClientCase | null>(null);

  return (
    <>
      <ClientsOrbit cases={cases} onSelect={setSelected} />
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? selected.company : 'Кейс'}
      >
        {selected && (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <p>{selected.summary}</p>
            <p>
              <strong>Задача:</strong> {selected.challenge}
            </p>
            <p>
              <strong>Масштаб:</strong> {selected.scale}
            </p>
            <p>
              <strong>SLA:</strong> {selected.sla}
            </p>
            <p>
              <strong>Отзыв:</strong> {selected.feedback}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
