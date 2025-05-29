'use client';

import { useState, useRef, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // const pathname = usePathname();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const languages = [
    { label: 'Português (Brasil)', locale: 'br', path: '/' },
    { label: 'English', locale: 'en', path: '/en' },
  ];

  const current = languages.find((lang) => lang.locale === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm hover:bg-muted px-2 py-1 rounded transition"
        aria-haspopup="true"
        aria-expanded={open}
        role="button"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          className="text-muted-foreground"
        >
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
        <span>{current.label}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      <ul
        className={clsx(
          'absolute right-0 mt-2 w-56 bg-background border border-border rounded shadow-md origin-top-right transition-all duration-200 z-50',
          open
            ? 'scale-100 opacity-100 visible'
            : 'scale-95 opacity-0 invisible pointer-events-none'
        )}
      >
        {languages.map((lang) => (
          <li key={lang.locale}>
            <button
              type="button"
              lang={lang.locale}
              className={clsx(
                'block w-full text-left px-4 py-2 text-sm hover:bg-muted transition',
                currentLocale === lang.locale && 'font-semibold'
              )}
              onClick={() => {
                changeLocale(lang.locale as 'br' | 'en');
                setOpen(false);
              }}
            >
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
