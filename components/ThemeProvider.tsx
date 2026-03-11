'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return <>{children}</>;
}
