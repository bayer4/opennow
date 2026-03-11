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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div className="flex items-center justify-around h-14">
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
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ease-out"
              style={{
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 1.8} />
              <span
                className="text-[10px] leading-tight"
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
