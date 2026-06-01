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
        hero: ['clamp(56px,8vw,100px)', {lineHeight: '1'}],
        h1: ['clamp(34px,4.5vw,52px)', {lineHeight: '1.12'}],
        eyebrow: ['clamp(12px,1.1vw,13px)', {lineHeight: '1.4'}],
        body: ['clamp(18px,1.5vw,20px)', {lineHeight: '1.7'}],
        stat: ['clamp(44px,6vw,88px)', {lineHeight: '1'}]
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
