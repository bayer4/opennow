'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, LayoutGrid, Map, Settings } from 'lucide-react';

const tabs = [
  { href: '/dashboard', label: 'Today', icon: CalendarDays },
  { href: '/dashboard/week', label: 'Week', icon: LayoutGrid },
  { href: '/dashboard/map', label: 'Map', icon: Map },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
