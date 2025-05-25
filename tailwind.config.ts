import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'sans': ['var(--font-styrene-b)', 'var(--font-poppins)', 'sans-serif'],
  			'michelangelo-strips': ['var(--font-michelangelo-strips)'],
  			'michelangelo-clock': ['var(--font-michelangelo-clock)'],
  			'michelangelo-grunge': ['var(--font-michelangelo-grunge)'],
  			'michelangelo-inline': ['var(--font-michelangelo-inline)'],
  			'michelangelo-minimal': ['var(--font-michelangelo-minimal)'],
  			'michelangelo-outline01': ['var(--font-michelangelo-outline01)'],
  			'michelangelo-outline02': ['var(--font-michelangelo-outline02)'],
  			'michelangelo-regular': ['var(--font-michelangelo-regular)'],
  			'michelangelo-round': ['var(--font-michelangelo-round)'],
  			'michelangelo-shadow01': ['var(--font-michelangelo-shadow01)'],
  			'michelangelo-shadow02': ['var(--font-michelangelo-shadow02)'],
  			'michelangelo-spur': ['var(--font-michelangelo-spur)'],
  			'michelangelo-stencil': ['var(--font-michelangelo-stencil)'],
  			'michelangelo-vintage': ['var(--font-michelangelo-vintage)'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
