import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Mount inside <BrowserRouter> so each route change lands at the top of the
 * new page. Honours `#anchor` URLs (does not jump to top when a hash is set).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}
