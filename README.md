# DEAHO Official Site

DEAHO official website built from the documents in `projectdoc/`. This README is
also a handoff note for Claude Code or any future coding agent.

The project has moved to:

```bash
/Users/tingyouzhao/Desktop/daeho/deaho官网方案
```

Remote repository:

```bash
https://github.com/ZhaoTingYou/DEAHO-SITE
```

## Source Documents

Read these first before making design or behavior changes:

- `projectdoc/DEAHO_Codex构建指令.md`
- `projectdoc/DEAHO_设计书.md`
- `projectdoc/DEAHO_动画实现要点.md`
- `projectdoc/DEAHO_生图Prompt.md`
- `projectdoc/DEAHO_母题线框.html`

The user has revised these documents several times. Treat the latest local files
as the source of truth. Earlier implementation decisions should be adjusted when
the docs are updated.

The user also explicitly requested using the local `ui-ux-pro-max` skill for
visual decisions.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lenis smooth scrolling
- `next-intl`
- Routes use `/ko` and `/en`

## Run

Install dependencies:

```bash
npm install
```

Run locally on port 3000 when available:

```bash
npm run dev -- --port 3000
```

If port 3000 is already occupied, use another port such as 3001:

```bash
npm run dev -- --port 3001
```

Useful checks:

```bash
npm run lint
npm run build
git diff --check
```

Latest verification before this README update:

- `npm run lint` passed
- `npm run build` passed
- `git diff --check` passed
- Local routes checked on `http://localhost:3001`
- English pages were checked for Korean text leakage and passed for main and
  detail routes

## Important Agent Rules

- Do not hardcode visible UI copy in `app/` or `components/`.
- Put visible content in `messages/ko.json` and `messages/en.json`.
- Use `getLocaleMessages(locale)` from `lib/locale-messages.ts` in server
  components and utilities.
- Use `useTranslations(...)` in client components that are inside the
  `NextIntlClientProvider`.
- Keep route structure in `lib/site-map.ts`, but do not put page copy there.
- Future content is expected to move to a database, so keep page components
  data-driven.
- Do not replace placeholder values like `00`, `19XX`, unconfirmed partner
  counts, retention rates, milestone years, or exact source claims unless the
  user provides confirmed material.
- Keep the site bright, minimal, editorial, and luxury-brand focused. The user
  repeatedly referenced the feeling of the Omega Watches website.
- Avoid large text. Typography should now be closer to Omega-scale: refined,
  smaller, and less loud than the first implementation.
- Do not add black or near-black full-page backgrounds.
- Missing images must preserve layout with named placeholders.
- Motion must respect reduced motion.

## Current Routes

- `/ko` and `/en`
- `/[locale]/chronicle`
- `/[locale]/legacy`
- `/[locale]/legacy/loyalty`
- `/[locale]/legacy/credibility`
- `/[locale]/legacy/achievement`
- `/[locale]/specialty`
- `/[locale]/specialty/technique`
- `/[locale]/specialty/collection`
- `/[locale]/specialty/collection/[slug]`
- `/[locale]/news`
- `/[locale]/news/[slug]`
- `/[locale]/golf`
- `/[locale]/golf/inquiry`
- `/[locale]/contact`
- `/sitemap.xml`
- `/robots.txt`
- `/__styleguide`

System states:

- `app/[locale]/(site)/not-found.tsx`
- `app/[locale]/(site)/loading.tsx`
- `components/empty-state.tsx`

## Internationalization

Main copy lives in:

- `messages/ko.json`
- `messages/en.json`

Helper:

- `lib/locale-messages.ts`

Current multilingual cleanup completed:

- Header labels, mega-menu labels, footer labels, skip link, contact CTA, forms,
  empty states, news popups, collection detail labels, golf inquiry labels,
  not-found page, and several page UI labels were moved into messages.
- Pages no longer use scattered `locale === 'en' ? enMessages : koMessages`
  content selection. They use `getLocaleMessages(locale)` instead.
- `lib/site-map.ts` was cleaned so it only holds route IDs, fallback route
  labels, hrefs, and child relationships.
- English pages were checked for Korean text leakage.

When adding future copy:

1. Add the same key to both `messages/ko.json` and `messages/en.json`.
2. Read it from the page/component.
3. Keep data shape stable so it can later be replaced by database content.

## Header And Navigation

Current behavior:

- Desktop logo, categories, language switcher, and contact CTA are on one row.
- Desktop categories are centered on the same row as the DAEHO logo.
- Header is transparent over the home video hero.
- Header text is white while over the home video.
- Header becomes solid with dark text after scrolling past the video area.
- Header becomes solid when the mouse hovers at the top area.
- Header hides on scroll down and reappears on scroll up.
- Mega menus exist for `LEGACY` and `SPECIALTY`.
- Hidden external links for `대호`, `OH`, and `VULCAN` are currently disabled
  with `showExternalHeaderLinks = false` in `components/site/site-header.tsx`.
- Contact CTA is styled as a simple underline-style button to match the site
  direction.

Important file:

- `components/site/site-header.tsx`

## Home Page Status

Important files:

- `app/[locale]/(site)/page.tsx`
- `components/home/home-hero.tsx`
- `components/home/home-news-popups.tsx`

Current home decisions:

- Home hero uses video from `public/videos/` when available.
- The white overlay on the video was removed.
- Hero typography is white over the video.
- The scroll label is centered.
- The backup still image may show for reduced-motion or data-saver users, but
  normal video users should see the video when present.
- The old `숫자로 남은 신뢰` stats block was removed from home.
- The previous golf preview block was removed from home.
- The second section was redesigned with wide side margins and a smaller,
  Omega-like layout.
- The home section that previously acted as entry cards was changed to show
  recent news cards. Clicking opens a popup instead of navigating as a page
  entrance.
- News popup close control uses only an X icon, not a `닫기` text button.
- Popup text and layout were reduced in size and aligned toward the top.
- Signature cards in the third section were adjusted to equal sizes and made
  shorter/wider so they feel more like cards and less like tickets.
- Spacing between the third and fourth sections was reduced.
- Cooperation/sponsorship is a horizontal marquee section with no intro text.
- The marquee speed was increased.

Home data:

- Main structured content: `messages/*.json` under `home`
- UI labels and recent-news popup copy: `messages/*.json` under `homeUi`

Home video filenames:

- `public/videos/home_hero.mp4` or `public/videos/home.mp4`
- optional `public/videos/home_hero.webm` or `public/videos/home.webm`
- optional poster: `public/images/home_video_poster.jpg` or
  `public/images/home_video_poster.png`

If no video exists, the hero falls back to `home_hero.png`.

## Chronicle Page Status

Important files:

- `app/[locale]/(site)/chronicle/page.tsx`
- `components/chronicle/chronicle-horizontal.tsx`
- `components/chronicle/chronicle-timeline.tsx`

Current decisions:

- Chronicle was replaced with a horizontal scroll/archive style based on the
  earlier local project at `/Users/tingyouzhao/Desktop/daeho/deaho官网`.
- The old chronicle implementation is kept as a block comment in
  `app/[locale]/(site)/chronicle/page.tsx` for reference.
- Intro animation locks scrolling until it completes.
- Left-side year selector was made into a solid panel matching the background.
- The year selector background is around 50% opacity.
- The progress line sits above the solid panel and follows the scroll position.
- The progress bar should keep the original progress-line feeling while moving
  with the scroll.
- The year selector and progress line should not be pulled down into the footer
  after the chronicle scroll area ends.

Data:

- `messages/*.json` under `chronicle`
- UI labels under `chronicleUi`

## Legacy Pages Status

Important files:

- `app/[locale]/(site)/legacy/page.tsx`
- `app/[locale]/(site)/legacy/loyalty/page.tsx`
- `app/[locale]/(site)/legacy/credibility/page.tsx`
- `app/[locale]/(site)/legacy/achievement/page.tsx`
- `components/legacy/legacy-detail-page.tsx`
- `components/legacy/legacy-metric-grid.tsx`

Current decisions:

- Typography was reduced across desktop and mobile.
- Detail-page back button text is now in messages via `legacyUi.backToLegacy`.
- Legacy detail pages are data-driven from `messages/*.json`.

Data:

- `messages/*.json` under `legacy`
- `messages/*.json` under `legacyPages`
- UI labels under `legacyUi`

## Specialty And Collection Status

Important files:

- `app/[locale]/(site)/specialty/page.tsx`
- `app/[locale]/(site)/specialty/technique/page.tsx`
- `app/[locale]/(site)/specialty/collection/page.tsx`
- `app/[locale]/(site)/specialty/collection/[slug]/page.tsx`
- `components/specialty/specialty-collection-gallery.tsx`
- `components/specialty/specialty-detail-triplet.tsx`
- `components/specialty/specialty-process.tsx`

Current decisions:

- Typography was reduced.
- The `Anatomy of Craft` vertical label is now localized through
  `specialtyUi.anatomyLabel`.
- Collection detail CTA section was adjusted because the previous layout around
  `이와 같은 작품을 의뢰하고 싶다면` felt awkward.
- Collection detail buttons were simplified to match the brand style.
- Collection empty states and filter labels are localized.
- Collection detail labels such as specs, process CTA, related works, and
  thumbnails are localized.

Data:

- `messages/*.json` under `specialty`
- `messages/*.json` under `specialtyPages.technique`
- `messages/*.json` under `specialtyPages.collection`
- UI labels under `specialtyUi` and `collectionUi`

Collection detail route:

- Item IDs in `specialtyPages.collection.gallery.items` become
  `/[locale]/specialty/collection/[id]`

## News Status

Important files:

- `app/[locale]/(site)/news/page.tsx`
- `app/[locale]/(site)/news/[slug]/page.tsx`
- `components/news/news-journal-grid.tsx`
- `components/news/share-link-button.tsx`

Current decisions:

- News index and detail pages are data-driven.
- Empty state and filter labels are localized.
- Share button labels are localized.
- Home uses recent news popups instead of using that section as navigation
  entry cards.

Data:

- `messages/*.json` under `news`
- UI labels under `newsUi`

News route:

- Card IDs in `news.grid.cards` become `/[locale]/news/[id]`

## Golf Status

Important files:

- `app/[locale]/(site)/golf/page.tsx`
- `app/[locale]/(site)/golf/inquiry/page.tsx`
- `components/golf/golf-configurator.tsx`
- `components/forms/golf-inquiry-form.tsx`

Current decisions:

- Golf page was fixed after a refresh-loop issue.
- Golf inquiry button and header consultation button were redesigned to be
  simpler and brand-aligned.
- Button animation should use simple underline/sweep behavior, not a heavy
  decorative style.
- Golf inquiry form text is now passed in from messages.

Data:

- `messages/*.json` under `golf`
- `messages/*.json` under `golfInquiry`
- Form labels under `forms.golfInquiry`

## Contact And Forms

Important files:

- `app/[locale]/(site)/contact/page.tsx`
- `components/forms/contact-form.tsx`
- `components/forms/golf-inquiry-form.tsx`

Current decisions:

- Forms are static consultation forms for v1.
- They do not collect card numbers, account details, sensitive IDs, or payment
  information.
- Contact form labels/options/success text/fallback text are localized.
- Golf inquiry form labels/success text/fallback text are localized.
- Contact page can receive query hints such as `type=bespoke`.
- Golf inquiry page can receive `head`, `shaft`, and `engraving` query values.

## Design System And Typography

Important files:

- `app/globals.css`
- `tailwind.config.ts`
- `styles/tokens.css`
- `components/section-intro.tsx`
- `components/media-text.tsx`
- `components/product-grid.tsx`
- `components/empty-state.tsx`

Current direction:

- Bright editorial luxury.
- Omega-like scale: smaller text, generous whitespace, refined spacing.
- Cards should use subtle shadows, simple edges, and restrained hover motion.
- Avoid big loud headings unless it is the home hero or an intentional hero.
- Avoid heavy button treatments. Prefer simple text buttons, underline sweep,
  and restrained motion.
- Keep repeated card sizes consistent inside a section.
- Keep side margins/maximum widths closer to the Omega homepage feeling.

Fonts:

- Cormorant Garamond
- Inter
- MaruBuri
- Pretendard

## Images And Assets

Place confirmed images in `public/images/` with exact filenames referenced by
message files and page code.

Current important groups:

- Home: `home_hero.png`, `home_ring_01.png` to `home_ring_05.png`,
  `home_stats_bg.png`, `home_pillar_chronicle.png`, `home_pillar_legacy.png`,
  `home_pillar_specialty.png`, `home_pillar_news.png`
- Chronicle: `chronicle_hero.png`, `chronicle_milestone_01.png` to
  `chronicle_milestone_06.png`, `chronicle_detail_01.png` to
  `chronicle_detail_03.png`
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
  `collection_ring_01.png` to `collection_ring_12.png`,
  `collection_detail_01.png` to `collection_detail_05.png`
- News: `news_hero.png`, `news_featured.png.png`, `news_card_01.png` to
  `news_card_06.png`, `news_detail_hero.png`
- Golf: `golf_hero.png`, `golf_hero_2.png`, `golf_head_ball.png`,
  `golf_head_iron.png`, `golf_head_putter.png`, `golf_head_wood.png`,
  `golf_shaft_black.png`, `golf_shaft_white.png`,
  `golf_shaft_burgundy.png`, `golf_shaft_navy.png`,
  `golf_engrave_studio.png`, `golf_engrave_detail.png`, `golf_box.png`,
  `golf_lifestyle.png`

## SEO And Sitemap

Important files:

- `lib/seo.ts`
- `app/sitemap.ts`
- `app/robots.ts`

Current decisions:

- Page metadata is centralized in `lib/seo.ts`.
- Static pages use `getPageMetadata`.
- NEWS and COLLECTION detail pages use `getDetailMetadata`.
- `app/sitemap.ts` includes static routes plus NEWS and COLLECTION detail routes
  for both `ko` and `en`.
- `app/robots.ts` points crawlers to the generated sitemap.

## External Links

Configured in:

- `lib/config.ts`

Current values:

```ts
export const externalLinks = {
  daeho: '',
  oh: '',
  vulcan: ''
} as const;
```

These links are currently hidden in the header. Keep them disabled/hidden until
the user asks to show them or provides confirmed URLs.

## Known Placeholders

Do not invent these:

- exact CHRONICLE milestone years and descriptions
- partner counts
- retention rates
- external DAEHO/OH/VULCAN URLs
- final names/captions for collection works
- final news dates
- final article sources
- exact company address, phone, email, and hours

## Recent Git Notes

The repository has been pushed several times during this build. The latest known
pushed commit before the current uncommitted changes was:

```bash
b93ff42 Refine home news and signature layout
```

Current working tree may include uncommitted changes from:

- global typography scale reduction
- multilingual cleanup
- this README handoff update

Before pushing:

```bash
npm run lint
npm run build
git diff --check
git status --short
git add .
git commit -m "Document DEAHO handoff state"
git push origin main
```

Use a different commit message if the README is committed together with other
implementation work.
