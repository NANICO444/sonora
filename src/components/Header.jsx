import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Sun, Moon, Music } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Instrumentos', href: '/produtos' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { count } = useCart()
  const location = useLocation()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${isDark
          ? 'bg-surface-950/80 text-surface-50'
          : 'bg-white/80 text-surface-900'}
        backdrop-blur-xl
        ${scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/20' : ''}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-1 text-2xl font-extrabold tracking-tight select-none"
        >
          <span className="text-brand-500 transition-transform duration-300 group-hover:rotate-12">
            <Music className="h-6 w-6" />
          </span>
          <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            Sonora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`
                relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none
                ${isActive(link.href)
                  ? 'text-brand-600 dark:text-brand-400'
                  : isDark
                    ? 'text-surface-300 hover:text-surface-50 hover:bg-surface-800/60'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'}
              `}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-brand-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              rounded-lg p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none
              ${isDark
                ? 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                : 'text-surface-500 hover:bg-surface-100 hover:text-surface-900'}
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Sun className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Moon className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Cart Button */}
          <Link
            to="/carrinho"
            aria-label="Carrinho de compras"
            className={`
              relative rounded-lg p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none
              ${isDark
                ? 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                : 'text-surface-500 hover:bg-surface-100 hover:text-surface-900'}
            `}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold leading-none text-white shadow-sm"
              >
                {count > 99 ? '99+' : count}
              </motion.span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className={`
              rounded-lg p-2 transition-colors duration-200 md:hidden focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none
              ${isDark
                ? 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                : 'text-surface-500 hover:bg-surface-100 hover:text-surface-900'}
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className={`
                fixed top-16 right-0 bottom-0 z-50 w-72 overflow-y-auto border-l md:hidden
                ${isDark
                  ? 'border-surface-800 bg-surface-950/95 backdrop-blur-xl'
                  : 'border-surface-200 bg-white/95 backdrop-blur-xl'}
              `}
            >
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.href}
                      className={`
                        flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200
                        ${isActive(link.href)
                          ? isDark
                            ? 'bg-brand-500/10 text-brand-400'
                            : 'bg-brand-50 text-brand-600'
                          : isDark
                            ? 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}
                      `}
                    >
                      {isActive(link.href) && (
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile drawer footer */}
              <div className={`
                mt-auto border-t p-4
                ${isDark ? 'border-surface-800' : 'border-surface-200'}
              `}>
                <p className={`text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
                  &copy; {new Date().getFullYear()} Sonora. Todos os direitos reservados.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
