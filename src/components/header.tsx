'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  // Code,
  // MicVocal,
  // Scroll,
  // UserRoundSearch,
  Menu,
  // X,
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { useI18n } from '@/locales/client';

export function Header() {
  const t = useI18n();
  const [, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-background/80 border-b">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label={t('header.openMenu')}
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/avatar-one.jpeg"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />
              <span className="font-semibold text-sm">{t('header.name')}</span>
            </Link>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
            <span className="mx-2 text-gray-500">|</span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
