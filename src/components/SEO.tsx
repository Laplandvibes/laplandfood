// Locale-aware SEO component.
// 2026-05-21: hreflang + og:locale extended to all 11 supported locales;
// JSON-LD inLanguage injection.

import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';
import { SUPPORTED_LOCALES, LOCALE_BCP47, localisedPath, type Locale } from '../i18n/config';

interface SEOProps {
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  path?: string;
  canonical?: string;
  schema?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noindex?: boolean;
}

const BASE = 'https://laplandfood.com';
const SITE_NAME = 'LaplandFood';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL',
  sv: 'sv_SE',
};

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47;
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47));
    return o;
  }
  return node;
}

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

  // Skip the brand suffix when the title already carries it (either a manual
  // "|" or the brand word itself, e.g. "About LaplandFood") — otherwise the
  // fi/de home titles rendered "LaplandFood, … | LaplandFood".
  const fullTitle = resolvedTitle.includes('|') || resolvedTitle.includes(SITE_NAME)
    ? resolvedTitle
    : `${resolvedTitle} | ${SITE_NAME}`;
  const p = path ?? canonical ?? '/';
  // Trailing-slash form matches the prerendered static HTML and sitemap.xml
  // (Cloudflare Pages serves /path/index.html at /path/ with 200; the no-slash
  // form 308-redirects).
  const enUrl = `${BASE}${p === '/' ? '/' : p}`.replace(/\/?$/, '/');
  const currentUrl = `${BASE}${localisedPath(p, locale)}`.replace(/\/?$/, '/');
  const bcp47 = LOCALE_BCP47[locale];

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          inLanguage: bcp47,
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: `${BASE}${b.url}`,
          })),
        }
      : null;

  const localizedSchema = schema ? injectInLanguage(JSON.parse(JSON.stringify(schema)), bcp47) : null;

  return (
    <>
      <title>{fullTitle}</title>
      <link rel="canonical" href={currentUrl} />
      {/* Short hreflang codes (en, fi, pt-BR, zh-CN, …) + trailing-slash hrefs:
          must match the prerenderer (_prerender_routes.mjs) and sitemap.xml. */}
      {SUPPORTED_LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${BASE}${localisedPath(p, l)}`.replace(/\/?$/, '/')} />
      ))}
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
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {localizedSchema !== null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedSchema) }}
        />
      )}
    </>
  );
}

// Backward-compat shim — keeps old useSEO imports compiling during migration.
export function useSEO(_: SEOProps): void {
  /* no-op: pages should migrate to <SEO /> */
}
