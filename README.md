# DEAHO Official Site

Bright-theme official site for DEAHO, built from the project documents in
`projectdoc/`.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Framer Motion and Lenis
- next-intl with `/ko` as the default locale and `/en` as the English route

## Run

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
```

## Routes

- `/ko` and `/en`
- `/[locale]/chronicle`
- `/[locale]/legacy`
- `/[locale]/legacy/loyalty`
- `/[locale]/legacy/credibility`
- `/[locale]/legacy/achievement`
- `/[locale]/specialty`
- `/[locale]/specialty/technique`
- `/[locale]/specialty/collection`
- `/[locale]/news`
- `/[locale]/golf`
- `/__styleguide` for the internal design-system sandbox

## Design Rules

- Keep the site bright. Do not introduce black or near-black backgrounds.
- Use only the project tokens defined in `app/globals.css` and
  `tailwind.config.ts`.
- Use only the approved fonts: Cormorant Garamond, Inter, MaruBuri, and
  Pretendard.
- Missing images must render named placeholders instead of collapsing layout.
- Motion must respect `prefers-reduced-motion`.

## Content

Main copy lives in:

- `messages/ko.json`
- `messages/en.json`

Do not replace placeholder figures such as `00`, `19XX`, partner counts,
retention rates, or exact milestone years until the real content is confirmed.

## Images

Place confirmed images in `public/images/` with the exact filenames referenced by
the message files and page code. Current important groups:

- Home: `home_hero.png`, `home_ring_01.png` to `home_ring_05.png`,
  `home_stats_bg.png`, `home_pillar_chronicle.png`, `home_pillar_legacy.png`,
  `home_pillar_specialty.png`, `home_pillar_news.png`
- Chronicle: `chronicle_hero.png`, `chronicle_milestone_01.png` to
  `chronicle_milestone_06.png`
- Legacy: `legacy_hero.png`, `legacy_card_loyalty.png`,
  `legacy_card_credibility.png`, `legacy_card_achievement.png`,
  `legacy_loyalty_hero.png`, `legacy_credibility_hero.png`,
  `legacy_achievement_hero.png`, `legacy_achievement_01.png` to
  `legacy_achievement_04.png`, `legacy_partner_placeholder.png`
- Specialty: `specialty_hero.png`, `specialty_card_technique.png`,
  `specialty_card_collection.png`, `specialty_technique_hero.png`,
  `specialty_process_1_sketch.png` to `specialty_process_7_delivery.png`,
  `specialty_detail_01.png` to `specialty_detail_03.png`,
  `specialty_bespoke.png`, `specialty_collection_hero.png`,
  `collection_ring_01.png` to `collection_ring_12.png`
- News: `news_hero.png`, `news_featured.png.png`, `news_card_01.png` to
  `news_card_06.png`
- Golf: `golf_hero.png`, `golf_hero_2.png`, `golf_head_ball.png`,
  `golf_head_iron.png`, `golf_head_putter.png`, `golf_head_wood.png`,
  `golf_shaft_black.png`, `golf_shaft_white.png`,
  `golf_shaft_burgundy.png`, `golf_shaft_navy.png`,
  `golf_engrave_studio.png`, `golf_engrave_detail.png`, `golf_box.png`,
  `golf_lifestyle.png`

## Home Video

Home automatically uses a video when one exists in `public/videos/`.

Supported filenames:

- `home_hero.mp4` or `home.mp4`
- optional `home_hero.webm` or `home.webm`

If no video exists, the hero falls back to `home_hero.png`. Reduced-motion and
data-saver users also receive the poster image.

## External Links

The utility-bar links are configured in `lib/config.ts`:

```ts
export const externalLinks = {
  daeho: '',
  oh: '',
  vulcan: ''
} as const;
```

Empty values are intentionally rendered as disabled links. Fill a URL to enable
the link with `target="_blank"`.

## Known Content Placeholders

The project documents intentionally leave several real values unconfirmed:

- exact CHRONICLE milestone years and descriptions
- partner counts and retention rates
- external DAEHO/OH/VULCAN URLs
- final names and captions for collection works
- final news dates and article sources

Keep these as placeholders until confirmed source material is provided.
