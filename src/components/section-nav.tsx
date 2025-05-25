'use client';

import Link from 'next/link';
import {
  Code,
  Box,
  Scroll,
  UserRoundSearch,
  Palette
} from 'lucide-react';
import { useI18n } from '@/locales/client';

export function SectionNav() {
  const t = useI18n();

  const navLinks = [
    { href: '/projects', icon: Code, label: t('navigation.projects') },
    { href: '/devlog', icon: Scroll, label: t('navigation.devlog') },
    { href: '/about', icon: UserRoundSearch, label: t('navigation.about') },
    { href: '/hobbies', icon: Palette, label: t('navigation.hobbies') },
    { href: '/sandbox', icon: Box, label: t('navigation.pandoraBox') },
  ];

  return (
    <menu className="w-full flex justify-center">
      <section className="grid grid-cols-2 gap-2 w-1/2">
        {navLinks.map(({ href, icon: Icon, label }, index) => {
          const isOdd = navLinks.length % 2 !== 0;
          const isLast = index === navLinks.length - 1;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition ${
                isOdd && isLast ? 'col-span-2' : ''
              }`}
            >
              <span>{label}</span>
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
      </section>
    </menu>
  );
}
