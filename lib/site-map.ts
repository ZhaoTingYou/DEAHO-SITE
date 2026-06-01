import type {Locale} from '@/i18n/routing';

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {label: 'HOME', href: '/'},
  {label: 'CHRONICLE', href: '/chronicle'},
  {
    label: 'LEGACY',
    href: '/legacy',
    children: [
      {label: 'LOYALTY', href: '/legacy/loyalty'},
      {label: 'CREDIBILITY', href: '/legacy/credibility'},
      {label: 'ACHIEVEMENT', href: '/legacy/achievement'}
    ]
  },
  {
    label: 'SPECIALTY',
    href: '/specialty',
    children: [
      {label: 'TECHNIQUE', href: '/specialty/technique'},
      {label: 'COLLECTION', href: '/specialty/collection'}
    ]
  },
  {label: 'NEWS', href: '/news'},
  {label: 'GOLF', href: '/golf'}
];

export type RoutePage = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  sections?: NavItem[];
};

const pages = {
  chronicle: {
    ko: {
      eyebrow: 'EST. 1988',
      title: 'THE CHRONICLE / 역사의 기록물',
      subtitle: '대호의 역사가 곧 한국 우승·임관 반지의 역사입니다.',
      image: 'chronicle_hero.png'
    },
    en: {
      eyebrow: 'EST. 1988',
      title: 'THE CHRONICLE',
      subtitle: 'The history of DEAHO is the history of championship and appointment rings in Korea.',
      image: 'chronicle_hero.png'
    }
  },
  legacy: {
    ko: {
      eyebrow: 'LEGACY',
      title: 'THE MEANING, IN FORM',
      subtitle: '우리는 금속을 만들지 않습니다. 순간을 영원으로 만듭니다.',
      image: 'legacy_hero.png',
      sections: navItems[2].children
    },
    en: {
      eyebrow: 'LEGACY',
      title: 'THE MEANING, IN FORM',
      subtitle: 'We do not make metal. We make moments permanent.',
      image: 'legacy_hero.png',
      sections: navItems[2].children
    }
  },
  loyalty: {
    ko: {
      eyebrow: 'LEGACY · LOYALTY',
      title: '신의',
      subtitle: '오래 지속되는 관계와 다시 찾는 신뢰를 위한 페이지 골격입니다.',
      image: 'legacy_loyalty_hero.png'
    },
    en: {
      eyebrow: 'LEGACY · LOYALTY',
      title: 'LOYALTY',
      subtitle: 'A route shell for enduring relationships and returning clients.',
      image: 'legacy_loyalty_hero.png'
    }
  },
  credibility: {
    ko: {
      eyebrow: 'LEGACY · CREDIBILITY',
      title: '신뢰',
      subtitle: '38 / 200,000+ / 00 협업 / 00% 등 확인 전 수치는 그대로 유지합니다.',
      image: 'legacy_credibility_hero.png'
    },
    en: {
      eyebrow: 'LEGACY · CREDIBILITY',
      title: 'CREDIBILITY',
      subtitle: 'Placeholder metrics stay as 38 / 200,000+ / 00 partners / 00% until confirmed.',
      image: 'legacy_credibility_hero.png'
    }
  },
  achievement: {
    ko: {
      eyebrow: 'LEGACY · ACHIEVEMENT',
      title: '성취',
      subtitle: '인정, 수상, 화제 프로젝트를 위한 밝은 아카이브 골격입니다.',
      image: 'legacy_achievement_01.png'
    },
    en: {
      eyebrow: 'LEGACY · ACHIEVEMENT',
      title: 'ACHIEVEMENT',
      subtitle: 'A bright archive shell for recognition, awards, and notable projects.',
      image: 'legacy_achievement_01.png'
    }
  },
  specialty: {
    ko: {
      eyebrow: 'SPECIALTY',
      title: 'THE DIFFERENCE / 대호는 왜 다른가',
      subtitle: '아무나 만들 수 있는 제품이 아닙니다.',
      image: 'specialty_hero.png',
      sections: navItems[3].children
    },
    en: {
      eyebrow: 'SPECIALTY',
      title: 'THE DIFFERENCE',
      subtitle: 'This is not a product anyone can make.',
      image: 'specialty_hero.png',
      sections: navItems[3].children
    }
  },
  technique: {
    ko: {
      eyebrow: 'SPECIALTY · TECHNIQUE',
      title: '공정',
      subtitle: '일곱 단계 제작 과정과 고난도钉屏 애니메이션을 위한 페이지 골격입니다.',
      image: 'specialty_technique_hero.png'
    },
    en: {
      eyebrow: 'SPECIALTY · TECHNIQUE',
      title: 'TECHNIQUE',
      subtitle: 'A page shell for the seven-step process and pinned desktop animation.',
      image: 'specialty_technique_hero.png'
    }
  },
  collection: {
    ko: {
      eyebrow: 'SPECIALTY · COLLECTION',
      title: '작품',
      subtitle: '전체 / 챔피언 / 임관 / 주문제작 갤러리를 위한 페이지 골격입니다.',
      image: 'specialty_collection_hero.png'
    },
    en: {
      eyebrow: 'SPECIALTY · COLLECTION',
      title: 'COLLECTION',
      subtitle: 'A gallery shell for all, championship, appointment, and bespoke rings.',
      image: 'specialty_collection_hero.png'
    }
  },
  news: {
    ko: {
      eyebrow: 'NEWS',
      title: '지금, 대호',
      subtitle: '그리고 지금도 만들고 있다.',
      image: 'news_hero.png'
    },
    en: {
      eyebrow: 'NEWS',
      title: 'THE CURRENT PULSE',
      subtitle: 'DEAHO is still creating now.',
      image: 'news_hero.png'
    }
  },
  golf: {
    ko: {
      eyebrow: 'PREMIUM CUSTOMIZED GOLF BRACELET',
      title: 'FORM OF THE GAME',
      subtitle: '골프의 구조를 하나의 오브젝트로 재해석하다.',
      image: 'golf_hero.png'
    },
    en: {
      eyebrow: 'PREMIUM CUSTOMIZED GOLF BRACELET',
      title: 'FORM OF THE GAME',
      subtitle: 'Reinterpreting the structure of golf as a singular object.',
      image: 'golf_hero.png'
    }
  }
} satisfies Record<string, Record<Locale, RoutePage>>;

export type PageKey = keyof typeof pages;

export function getRoutePage(key: PageKey, locale: Locale) {
  return pages[key][locale];
}

export function withLocale(locale: Locale | string, href: string) {
  return `/${locale}${href === '/' ? '' : href}`;
}

export function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/' || pathname === '';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
