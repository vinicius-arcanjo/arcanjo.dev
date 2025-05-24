// components/section-nav.tsx
import Link from 'next/link';
import {
  Code,
  MicVocal,
  Scroll,
  UserRoundSearch,
} from 'lucide-react';

const navLinks = [
  { href: '/projects', icon: Code, label: 'Projetos' },
  { href: '/talks', icon: MicVocal, label: 'Palestras' },
  { href: '/articles', icon: Scroll, label: 'Artigos' },
  { href: '/about', icon: UserRoundSearch, label: 'Sobre' },
];

export function SectionNav() {
  return (
      <menu className="w-full flex justify-center">
        <section className="grid grid-cols-2 gap-2 w-1/2">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
            >
              <span>{label}</span>
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </section>
      </menu>
  );
}
