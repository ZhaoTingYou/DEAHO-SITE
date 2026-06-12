import type {Locale} from '@/i18n/routing';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

export type LocaleMessages = typeof koMessages;

export function getLocaleMessages(locale: Locale): LocaleMessages {
  return locale === 'en' ? enMessages : koMessages;
}
