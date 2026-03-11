'use client';

import { PlaceStatus } from '@/types';

const statusConfig: Record<PlaceStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-[var(--status-open-bg)] text-[var(--status-open)]',
  },
  closed: {
    label: 'Closed',
    className: 'bg-[var(--status-closed-bg)] text-[var(--status-closed)]',
  },
  closing_soon: {
    label: 'Closing Soon',
    className: 'bg-[var(--status-closing-bg)] text-[var(--status-closing)] animate-pulse-gentle',
  },
  opening_soon: {
    label: 'Opening Soon',
    className: 'bg-[var(--status-opening-bg)] text-[var(--status-opening)]',
  },
  closed_today: {
    label: 'Closed Today',
    className: 'bg-[var(--status-closed-bg)] text-[var(--status-closed)] opacity-60',
  },
};

export function StatusBadge({ status }: { status: PlaceStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
