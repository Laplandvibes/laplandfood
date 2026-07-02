import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Locale } from './config';
import { localisedPath, stripLocale, localeFromSegment, LOCALE_BCP47 } from './config';

/**
 * Hook that:
 *  1. Reads the current locale from the URL path (`/fi/...` → `fi`, `/br/...` → `pt-BR`, etc.)
 *  2. Keeps i18next in sync with the URL on every route change
 *  3. Updates `<html lang>` so browsers, search engines, and screen readers
 *     see the right language (BCP-47 tag)
 *  4. Returns helpers for building locale-aware paths
 */
export function useLocale() {
  const location = useLocation();
  const { i18n } = useTranslation();

  const seg = location.pathname.split('/').filter(Boolean)[0];
  const locale: Locale = localeFromSegment(seg);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = LOCALE_BCP47[locale];
    }
  }, [locale, i18n]);

  return {
    locale,
    pathWithoutLocale: stripLocale(location.pathname),
    to: (path: string, target: Locale = locale) => localisedPath(path, target),
  };
}
