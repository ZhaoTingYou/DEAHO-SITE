import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        white: 'var(--white)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        subtext: 'var(--subtext)',
        hairline: 'var(--hairline)',
        'on-navy': 'var(--on-navy)'
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        numeric: 'var(--font-numeric)'
      },
      fontSize: {
        hero: ['clamp(44px,6.8vw,76px)', {lineHeight: '1'}],
        h1: ['clamp(28px,3.4vw,42px)', {lineHeight: '1.12'}],
        eyebrow: ['clamp(10px,0.95vw,12px)', {lineHeight: '1.4'}],
        body: ['clamp(15px,1.15vw,16px)', {lineHeight: '1.7'}],
        stat: ['clamp(34px,4.8vw,64px)', {lineHeight: '1'}]
      },
      spacing: {
        section: 'clamp(96px,12vw,180px)',
        container: 'clamp(24px,5vw,80px)'
      },
      transitionTimingFunction: {
        brand: 'var(--ease)',
        expo: 'var(--ease-expo)'
      },
      transitionDuration: {
        hover: 'var(--dur-hover)',
        reveal: 'var(--dur-reveal)',
        hero: 'var(--dur-hero)'
      }
    }
  }
};

export default config;
