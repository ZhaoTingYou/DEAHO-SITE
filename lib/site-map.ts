import type {Locale} from '@/i18n/routing';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {id: 'home', label: 'HOME', href: '/'},
  {id: 'chronicle', label: 'CHRONICLE', href: '/chronicle'},
  {
    id: 'legacy',
    label: 'LEGACY',
    href: '/legacy',
    children: [
      {id: 'loyalty', label: 'LOYALTY', href: '/legacy/loyalty'},
      {id: 'credibility', label: 'CREDIBILITY', href: '/legacy/credibility'},
      {id: 'achievement', label: 'ACHIEVEMENT', href: '/legacy/achievement'}
    ]
  },
  {
    id: 'specialty',
    label: 'SPECIALTY',
    href: '/specialty',
    children: [
      {id: 'technique', label: 'TECHNIQUE', href: '/specialty/technique'},
      {id: 'collection', label: 'COLLECTION', href: '/specialty/collection'}
    ]
  },
  {id: 'news', label: 'NEWS', href: '/news'},
  {id: 'golf', label: 'GOLF', href: '/golf'}
];

export function withLocale(locale: Locale | string, href: string) {
  return `/${locale}${href === '/' ? '' : href}`;
}

export function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/' || pathname === '';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
