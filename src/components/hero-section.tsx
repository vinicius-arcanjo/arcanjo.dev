import { Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
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
        <h1 className="text-4xl font-bold tracking-tight">Vinicius Arcanjo</h1>
        <p className="text-muted-foreground text-lg">
          Open Sourcerer | E2E Developer | Palestrante <br/>
          Microsoft MVP on Developer Technologies <br />
          MySQL2 Co-Maintainer e Criador do Poku
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
