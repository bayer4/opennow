'use client';

import { StatusInfo } from '@/types';

export function TimeLeft({ statusInfo }: { statusInfo: StatusInfo }) {
  const { status, timeLeft, opensIn, closesAt, opensAt } = statusInfo;

  if (status === 'closing_soon') {
    return (
      <div className="text-right">
        <p className="text-base font-bold font-mono text-[var(--status-closing)]">
          {timeLeft} left
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Closes {closesAt}
        </p>
      </div>
    );
  }

  if (status === 'open') {
    return (
      <div className="text-right">
        <p className="text-base font-bold font-mono text-[var(--status-open)]">
          {timeLeft} left
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Closes {closesAt}
        </p>
      </div>
    );
  }

  if (status === 'opening_soon') {
    return (
      <div className="text-right">
        <p className="text-base font-bold font-mono text-[var(--status-opening)]">
          in {opensIn}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Opens {opensAt}
        </p>
      </div>
    );
  }

  if (status === 'closed' && opensAt) {
    return (
      <div className="text-right">
        <p className="text-sm text-[var(--text-secondary)]">
          Opens {opensAt}
        </p>
      </div>
    );
  }

  return (
    <div className="text-right">
      <p className="text-sm text-[var(--text-secondary)] opacity-50">
        Closed
      </p>
    </div>
  );
}
