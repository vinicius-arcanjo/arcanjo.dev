import { Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { Heading } from '@/components/heading';
import { useI18n } from '@/locales/client';

export function HeroSection() {
  const t = useI18n();

  return (
    <section className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Heading size="5xl" font="strips">{t('heroSection.title')}</Heading>
        <p className="text-muted-foreground text-lg">
          {t('heroSection.subtitle')} <br/>
          {t('heroSection.mvpTitle')} <br />
          {t('heroSection.maintainer')}
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-2">
        <a href="https://github.com/weslley" target="_blank" rel="noreferrer">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/weslley" target="_blank" rel="noreferrer">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://twitter.com/weslley" target="_blank" rel="noreferrer">
          <Twitter className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
