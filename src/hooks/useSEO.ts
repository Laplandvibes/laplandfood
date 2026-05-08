// Backward-compat shim. Real implementation moved to src/components/SEO.tsx
// because the previous useEffect-based hook broke Google indexing.
// See memory: bug_static_canonical_index_html.md
export { useSEO, default as SEO } from '../components/SEO';
