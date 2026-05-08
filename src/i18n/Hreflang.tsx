import { useLocale } from './useLocale';

/**
 * Renders hreflang link tags for the current page. Pass the canonical absolute
 * URL of the EN version (without the `/fi` prefix). The component emits:
 *   - <link rel="canonical" href="..."> (locale-aware)
 *   - <link rel="alternate" hreflang="en" href="<enUrl>">
 *   - <link rel="alternate" hreflang="fi" href="<fiUrl>">
 *   - <link rel="alternate" hreflang="x-default" href="<enUrl>">
 */
export default function Hreflang({
  path,
  origin = 'https://laplandfood.com',
}: {
  path: string;
  origin?: string;
}) {
  const { locale } = useLocale();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const enUrl = `${origin}${cleanPath === '/' ? '/' : cleanPath}`;
  const fiUrl = `${origin}/fi${cleanPath === '/' ? '' : cleanPath}`;
  const canonical = locale === 'fi' ? fiUrl : enUrl;

  return (
    <>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fi" href={fiUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
    </>
  );
}
