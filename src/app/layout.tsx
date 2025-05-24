import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
// import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vinícius Arcanjo - Software Engineer',
  description: 'Software Engineer, passionate about building great products and solving complex problems.',
  icons: {
    icon: '/vercel.svg',
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
    >
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
    </body>
    </html>
  );
}
