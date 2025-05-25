import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import '../../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { I18nProviderClient } from '@/locales/client';
import { getI18n } from '@/locales/server';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const styreneB = localFont({
  src: '../../../public/fonts/styrene-b-regular.woff',
  variable: '--font-styrene-b',
  display: 'swap',
});

const michelangeloStrips = localFont({
  src: './fonts/michelangelo-strips.woff2',
  variable: '--font-michelangelo-strips',
  display: 'swap',
});

const michelangeloClock = localFont({
  src: './fonts/michelangelo-clock.otf',
  variable: '--font-michelangelo-clock',
  display: 'swap',
});

const michelangeloGrunge = localFont({
  src: './fonts/michelangelo-grunge.otf',
  variable: '--font-michelangelo-grunge',
  display: 'swap',
});

const michelangeloInline = localFont({
  src: './fonts/michelangelo-inline.otf',
  variable: '--font-michelangelo-inline',
  display: 'swap',
});

const michelangeloMinimal = localFont({
  src: './fonts/michelangelo-minimal.otf',
  variable: '--font-michelangelo-minimal',
  display: 'swap',
});

const michelangeloOutline01 = localFont({
  src: './fonts/michelangelo-outline01.otf',
  variable: '--font-michelangelo-outline01',
  display: 'swap',
});

const michelangeloOutline02 = localFont({
  src: './fonts/michelangelo-outline02.otf',
  variable: '--font-michelangelo-outline02',
  display: 'swap',
});

const michelangeloRegular = localFont({
  src: './fonts/michelangelo-regular-1.otf',
  variable: '--font-michelangelo-regular',
  display: 'swap',
});

const michelangeloRound = localFont({
  src: './fonts/michelangelo-round.otf',
  variable: '--font-michelangelo-round',
  display: 'swap',
});

const michelangeloShadow01 = localFont({
  src: './fonts/michelangelo-shadow01.otf',
  variable: '--font-michelangelo-shadow01',
  display: 'swap',
});

const michelangeloShadow02 = localFont({
  src: './fonts/michelangelo-shadow02.otf',
  variable: '--font-michelangelo-shadow02',
  display: 'swap',
});

const michelangeloSpur = localFont({
  src: './fonts/michelangelo-spur.otf',
  variable: '--font-michelangelo-spur',
  display: 'swap',
});

const michelangeloStencil = localFont({
  src: './fonts/michelangelo-stencil.otf',
  variable: '--font-michelangelo-stencil',
  display: 'swap',
});

const michelangeloVintage = localFont({
  src: './fonts/michelangelo-vintage.otf',
  variable: '--font-michelangelo-vintage',
  display: 'swap',
});

// export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
//   const t = await getI18n(params.locale);
//
//   return {
//     title: t('metadata.title'),
//     description: t('metadata.description'),
//     icons: {
//       icon: '/vercel.svg',
//     },
//   };
// }

export default function RootLayout({
                                     children,
                                     params
                                   }: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  const locale = params?.locale || 'br';

  return (
    <html lang={locale} suppressHydrationWarning>
    <body
      className={`${styreneB.variable} 
      ${poppins.variable}
      ${michelangeloStrips.variable} 
      ${michelangeloClock.variable} 
      ${michelangeloGrunge.variable} 
      ${michelangeloInline.variable} 
      ${michelangeloMinimal.variable} 
      ${michelangeloOutline01.variable} 
      ${michelangeloOutline02.variable} 
      ${michelangeloRegular.variable} 
      ${michelangeloRound.variable} 
      ${michelangeloShadow01.variable} 
      ${michelangeloShadow02.variable} 
      ${michelangeloSpur.variable} 
      ${michelangeloStencil.variable} 
      ${michelangeloVintage.variable} 
      antialiased bg-background text-foreground min-h-screen font-sans`}
    >
    <I18nProviderClient locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 flex flex-col min-h-screen">
        <Header />
          {/*<header className="flex justify-end mb-8">*/}
          {/*<ThemeToggle />*/}
          {/*</header>*/}
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </I18nProviderClient>
    </body>
    </html>
  );
}
