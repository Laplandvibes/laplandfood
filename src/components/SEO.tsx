// Generated SEO component — created by fix-seo-ecosystem.mjs.
// laplandfood.com + LaplandFood are placeholder strings replaced by the script.
// React 19 native head-tag SEO helper.
// See memory: bug_static_canonical_index_html.md

import type { ReactNode } from 'react';

interface SEOProps {
  title: string;
  description: string;
  /** Path-only canonical (e.g. "/operators"). Defaults to "/" for home. */
  path?: string;
  /** Path-only canonical, alternate name. */
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
  path,
  canonical,
  schema,
  breadcrumbs,
  noindex,
}: SEOProps): ReactNode {
  const fullTitle = title.includes('|') ? title : `${title} | ${SITE_NAME}`;
  const p = path ?? canonical ?? '/';
  const url = `${BASE}${p}`;

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
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
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
