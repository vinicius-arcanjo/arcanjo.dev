'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/locales/client';

export function Footer() {
  const t = useI18n();

  return (
    <footer className="mt-12 pt-6 border-t">
      <div className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright')} {new Date().getFullYear()} {' '}
          <Link href="https://github.com/weslleyaraujo" className="hover:underline font-bold">Vinicius Arcanjo</Link>.
        </p>
      </div>
    </footer>
  );
}
