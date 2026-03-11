'use client';

import { ThemeProvider } from '@/components/ThemeProvider';

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
