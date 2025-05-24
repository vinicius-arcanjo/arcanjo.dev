'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Code,
  MicVocal,
  Scroll,
  UserRoundSearch,
  Menu,
  X,
} from "lucide-react";
import { LanguageSwitcher } from '@/components/language-switcher';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-background/80 border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Abrir menu"
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/avatar.jpg"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />
              <span className="font-semibold text-sm">Weslley A.</span>
            </Link>
          </div>

          {/* Desktop nav */}
          {/*<nav className="hidden md:flex items-center gap-6 text-sm">*/}
          {/*  <Link href="/projects" className="flex items-center gap-1 hover:underline">*/}
          {/*    <Code className="w-4 h-4" />*/}
          {/*    Projetos*/}
          {/*  </Link>*/}
          {/*  <Link href="/talks" className="flex items-center gap-1 hover:underline">*/}
          {/*    <MicVocal className="w-4 h-4" />*/}
          {/*    Palestras*/}
          {/*  </Link>*/}
          {/*  <Link href="/articles" className="flex items-center gap-1 hover:underline">*/}
          {/*    <Scroll className="w-4 h-4" />*/}
          {/*    Artigos*/}
          {/*  </Link>*/}
          {/*  <Link href="/about" className="flex items-center gap-1 hover:underline">*/}
          {/*    <UserRoundSearch className="w-4 h-4" />*/}
          {/*    Sobre*/}
          {/*  </Link>*/}
          {/*</nav>*/}
          <LanguageSwitcher />
        </div>
      </header>

      {/* Sidebar mobile */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed top-0 left-0 w-72 h-full z-50 bg-background border-r px-4 py-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Image
                  src="/avatar.jpg"
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border"
                />
                <span className="font-semibold text-sm">Weslley A.</span>
              </Link>
              <button aria-label="Fechar menu" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-sm">
              <Link href="/projects" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Code className="w-4 h-4" />
                Projetos
              </Link>
              <Link href="/talks" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <MicVocal className="w-4 h-4" />
                Palestras
              </Link>
              <Link href="/articles" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Scroll className="w-4 h-4" />
                Artigos
              </Link>
              <Link href="/about" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <UserRoundSearch className="w-4 h-4" />
                Sobre
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
