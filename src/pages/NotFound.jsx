import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4 bg-surface-50 dark:bg-surface-950"
    >
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold text-brand-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-3">
          Pagina nao encontrada
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mb-8">
          A pagina que voce procura nao existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
          >
            <Home size={18} />
            Voltar ao Inicio
          </Link>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            Ver Instrumentos
          </Link>
        </div>
      </div>
    </motion.main>
  )
}
