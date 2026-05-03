import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/local-ingredients', label: 'Ingredients' },
  { to: '/traditional-recipes', label: 'Recipes' },
  { to: '/modern-lapland', label: 'Modern' },
  { to: '/foraging-guide', label: 'Foraging' },
  { to: '/michelin-dining', label: 'Michelin' },
  { to: '/food-tours', label: 'Food Tours' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002F6C] border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" aria-label="LaplandFood home">
          <span className="font-heading tracking-wide text-2xl md:text-3xl">
            <span className="text-vibe-pink drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">#</span>
            <span className="text-white">LAPLAND</span>
            <span className="text-vibe-pink">FOOD</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm transition-colors duration-200 rounded-md ${
                isActive(link.to)
                  ? 'text-white font-bold'
                  : 'text-white/80 hover:text-white font-medium'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden p-2 text-white min-w-11 min-h-11 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#002F6C] border-t border-white/20">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 text-sm rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'text-white font-bold bg-white/10'
                    : 'text-white/80 hover:text-white font-medium hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
