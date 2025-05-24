import Link from 'next/link';
import {
  Code,
  Box,
  Scroll,
  UserRoundSearch,
  Palette
} from 'lucide-react';

const navLinks = [
  { href: '/projects', icon: Code, label: 'Projetos' },
  { href: '/devlog', icon: Scroll, label: 'Devlog' },
  { href: '/about', icon: UserRoundSearch, label: 'Sobre' },
  { href: '/hobbies', icon: Palette, label: 'Hobbies' },
  { href: '/sandbox', icon: Box, label: 'Caixa de Pandora' },
];

export function SectionNav() {
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
