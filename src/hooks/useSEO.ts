import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  path: string
  schema?: object
}

/**
 * Per-page SEO setter for the laplandfood.com canonical site.
 * Sets <title>, <meta name="description">, og:title/description/url/type,
 * <link rel="canonical">, twitter:card/title/description, and an optional
 * JSON-LD <script id="schema-org"> block. The body is replaced on every
 * route change so per-page values are always correct.
 */
export function useSEO({ title, description, path, schema }: SEOProps) {
  useEffect(() => {
    const url = `https://laplandfood.com${path}`
    document.title = title

    const setMetaName = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', val)
    }
    const setMetaProp = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', prop)
        document.head.appendChild(el)
      }
      el.setAttribute('content', val)
    }

    setMetaName('description', description)
    setMetaName('robots', 'index, follow')
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:site', '@laplandvibes')
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)

    setMetaProp('og:title', title)
    setMetaProp('og:description', description)
    setMetaProp('og:url', url)
    setMetaProp('og:type', 'website')
    setMetaProp('og:site_name', 'LaplandFood')

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    let schemaEl = document.querySelector('#schema-org') as HTMLScriptElement | null
    if (!schemaEl) {
      schemaEl = document.createElement('script') as HTMLScriptElement
      schemaEl.setAttribute('type', 'application/ld+json')
      schemaEl.id = 'schema-org'
      document.head.appendChild(schemaEl)
    }
    if (schema) schemaEl.textContent = JSON.stringify(schema)
  }, [title, description, path, schema])
}
