'use client';

import { Map } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center px-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <Map className="w-7 h-7" style={{ color: 'var(--accent)' }} />
        </div>
        <p
          className="text-base font-semibold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          Map View
        </p>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Coming soon
        </p>
      </div>
    </div>
  );
}
