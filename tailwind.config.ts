import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
    fontFamily: {
      display: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'serif'],
      sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      fa: ['var(--font-vazir)', 'Vazirmatn', 'sans-serif'],
    },
    fontSize: {
      cap: ['0.66rem', { letterSpacing: '0.28em', lineHeight: '1.4' }],
      body: ['0.95rem', { letterSpacing: '0.005em', lineHeight: '1.7' }],
      lede: ['clamp(1.15rem, 1.4vw, 1.4rem)', { lineHeight: '1.55' }],
      h3: ['clamp(1.6rem, 2.4vw, 2.4rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      h2: ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      hero: ['clamp(4rem, 11vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.025em' }],
    },
    extend: {
      colors: {
        bone: { DEFAULT: '#ECE6D3', soft: '#F4EFE0', deep: '#D9D3BD' },
        sage: { DEFAULT: '#C0BFB2', soft: '#D2D1C5', deep: '#A8A89A' },
        ink: {
          DEFAULT: '#1F1A12',
          soft: 'rgb(31 26 18 / 0.65)',
          faint: 'rgb(31 26 18 / 0.40)',
          mute: 'rgb(31 26 18 / 0.14)',
        },
        earth: { DEFAULT: '#8C846C', soft: 'rgb(140 132 108 / 0.62)' },
        terracotta: { DEFAULT: '#BC846C', soft: '#D4A188', deep: '#8E5E47' },
        umber: '#1A140E',
        rule: 'rgb(31 26 18 / 0.10)',
        whisper: 'rgb(31 26 18 / 0.04)',
      },
      spacing: {
        gutter: 'clamp(1.5rem, 7vw, 8rem)',
        section: 'clamp(5rem, 12vw, 12rem)',
        margin: 'clamp(8rem, 16vw, 16rem)',
      },
      maxWidth: {
        measure: '58ch',
        editorial: '1640px',
      },
      transitionTimingFunction: {
        glance: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
        heavy: 'cubic-bezier(0.65, 0, 0.35, 1)',
        cinema: 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      transitionDuration: {
        glance: '220ms',
        reveal: '980ms',
        heavy: '2200ms',
        cinema: '4200ms',
      },
      boxShadow: {
        soft: '0 1px 1px rgb(31 26 18 / 0.04), 0 8px 24px rgb(31 26 18 / 0.06)',
        med: '0 4px 12px rgb(31 26 18 / 0.08), 0 24px 60px rgb(31 26 18 / 0.10)',
        inspect: '0 30px 60px rgb(31 26 18 / 0.18), 0 12px 24px rgb(31 26 18 / 0.12)',
      },
      backdropBlur: {
        glass: '24px',
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, definition: string) => void }) {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
      addVariant('fa', '[lang="fa"] &');
    },
  ],
};

export default config;
