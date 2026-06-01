# DEAHO Official Site

Phase 0-1 scaffold for the DEAHO official website.

## Run

```bash
npm install
npm run dev
```

Default locale is `/ko`; English is `/en`.

## Phase Notes

- Technology stack: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, next-intl.
- Design tokens are defined in `styles/tokens.css` and mapped for Tailwind usage in `app/globals.css`.
- Fonts follow the project documents: Cormorant Garamond and Inter for English, MaruBuri and Pretendard for Korean.
- Missing images render as named placeholders so layouts do not collapse.
- OH and VULCAN URLs live in `lib/config.ts` and are intentionally empty in v1.
- Phase 1 styleguide is available at `/__styleguide`. It is internally rewritten to the Korean locale route so it can share the locale font and motion providers.
- Global motion foundation lives in `components/motion/`: reduced-motion context, Lenis setup, reveal choreography, page entrance choreography, and count-up stats.
- Phase 2 site shell lives in `app/[locale]/(site)`: sticky header, mobile drawer, footer, and every route from the locked sitemap.
- OH and VULCAN links are disabled until `lib/config.ts` receives real URLs. Fill those strings to enable `target="_blank"` links automatically.
- Add confirmed image files to `public/images/` using the exact filenames from the design documents. Missing files continue to render named placeholders.

## Known Content Placeholders

Project documents keep several real values as placeholders, including `00`, `19XX`, external OH/VULCAN URLs, partner counts, retention rates, and exact CHRONICLE milestone years. These should remain placeholders until confirmed.
