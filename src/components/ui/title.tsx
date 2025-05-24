import React from 'react';
import { cn } from '@/lib/utils';

type TitleProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  font?: 'strips' | 'clock' | 'grunge' | 'inline' | 'minimal' | 'outline01' | 'outline02' | 'regular' | 'round' | 'shadow01' | 'shadow02' | 'spur' | 'stencil' | 'vintage';
  className?: string;
};

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

const fontClasses = {
  strips: 'font-michelangelo-strips',
  clock: 'font-michelangelo-clock',
  grunge: 'font-michelangelo-grunge',
  inline: 'font-michelangelo-inline',
  minimal: 'font-michelangelo-minimal',
  outline01: 'font-michelangelo-outline01',
  outline02: 'font-michelangelo-outline02',
  regular: 'font-michelangelo-regular',
  round: 'font-michelangelo-round',
  shadow01: 'font-michelangelo-shadow01',
  shadow02: 'font-michelangelo-shadow02',
  spur: 'font-michelangelo-spur',
  stencil: 'font-michelangelo-stencil',
  vintage: 'font-michelangelo-vintage',
};

export function Title({
  children,
  as: Component = 'h1',
  size = '2xl',
  font = 'regular',
  className
}: TitleProps) {
  // Base classes for all titles
  const baseClasses = 'tracking-tight';

  return (
    <Component
      className={cn(
        baseClasses,
        fontClasses[font],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
