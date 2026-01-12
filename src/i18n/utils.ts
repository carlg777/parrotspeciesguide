// src/i18n/utils.ts
import en from './locales/en.json';
import es from './locales/es.json';

export const languages = {
  en: 'English',
  es: 'Español'
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

const translations = {
  en,
  es
} as const;

type TranslationKey = keyof typeof en;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language = defaultLang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] || translations[defaultLang][key] || key;
  }
}

export function getLocalizedPath(path: string, locale: Language): string {
  // Remove leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If default locale, return path as-is
  if (locale === defaultLang) {
    return `/${cleanPath}`;
  }

  // For other locales, prefix with locale
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  const [, maybeLang, ...rest] = path.split('/');
  if (maybeLang in languages) {
    return `/${rest.join('/')}`;
  }
  return path;
}

export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'es' : 'en';
}
