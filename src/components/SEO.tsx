// Generated SEO component — locale-aware (i18n migration 2026-05-08).
// React 19 native head-tag SEO helper.
//
// When a page passes `titleKey` + `descriptionKey`, the component pulls
// translations from the `pages` namespace. Pass `path` (the EN canonical
// path, no /fi prefix) and the component automatically emits the right
// canonical + hreflang for the current locale.

import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';

interface SEOProps {
  /** Optional literal title (used when no titleKey is given). */
  title?: string;
  /** Optional literal description (used when no descriptionKey is given). */
  description?: string;
  /** i18n key under the `pages` namespace, e.g. "home.title". */
  titleKey?: string;
  /** i18n key under the `pages` namespace, e.g. "home.description". */
  descriptionKey?: string;
  /** Path-only canonical (no locale prefix). Defaults to "/". */
  path?: string;
  /** Alias for `path`. */
  canonical?: string;
  schema?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noindex?: boolean;
}

const BASE = 'https://laplandfood.com';
const SITE_NAME = 'LaplandFood';

export default function SEO({
  title,
  description,
  titleKey,
  descriptionKey,
  path,
  canonical,
  schema,
  breadcrumbs,
  noindex,
}: SEOProps): ReactNode {
  const { t } = useTranslation('pages');
  const { locale } = useLocale();

  const resolvedTitle = titleKey ? t(titleKey) : (title ?? '');
  const resolvedDesc = descriptionKey ? t(descriptionKey) : (description ?? '');

  const fullTitle = resolvedTitle.includes('|') ? resolvedTitle : `${resolvedTitle} | ${SITE_NAME}`;
  const p = path ?? canonical ?? '/';

  const enUrl = `${BASE}${p === '/' ? '/' : p}`;
  const fiUrl = `${BASE}/fi${p === '/' ? '' : p}`;
  const currentUrl = locale === 'fi' ? fiUrl : enUrl;

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: `${BASE}${b.url}`,
          })),
        }
      : null;

  return (
    <>
      <title>{fullTitle}</title>
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fi" href={fiUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta name="description" content={resolvedDesc} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale === 'fi' ? 'fi_FI' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}

// Backward-compat shim — keeps old useSEO imports compiling during migration.
export function useSEO(_: SEOProps): void {
  /* no-op: pages should migrate to <SEO /> */
}
