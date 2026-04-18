import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const allCategories = [{ id: 'todos', name: 'Todos' }, ...categories]

const sortOptions = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'menor-preco', label: 'Menor Preco' },
  { value: 'maior-preco', label: 'Maior Preco' },
  { value: 'mais-avaliados', label: 'Mais Avaliados' },
]

function sortProducts(list, sortBy) {
  const sorted = [...list]
  switch (sortBy) {
    case 'menor-preco':
      return sorted.sort((a, b) => a.price - b.price)
    case 'maior-preco':
      return sorted.sort((a, b) => b.price - a.price)
    case 'mais-avaliados':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    default:
      return sorted
  }
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('categoria') || 'todos'
  const activeSort = searchParams.get('ordenar') || 'relevancia'
  const searchQuery = searchParams.get('busca') || ''

  const [localSearch, setLocalSearch] = useState(searchQuery)

  function updateParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (!value || value === 'todos' || value === 'relevancia' || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      return next
    })
  }

  function handleCategoryChange(catId) {
    updateParam('categoria', catId)
  }

  function handleSortChange(e) {
    updateParam('ordenar', e.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    updateParam('busca', localSearch.trim())
  }

  function handleSearchChange(e) {
    setLocalSearch(e.target.value)
    if (e.target.value === '') {
      updateParam('busca', '')
    }
  }

  const filtered = useMemo(() => {
    let result = products

    // Filter by category
    if (activeCategory && activeCategory !== 'todos') {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    // Filter by search
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Sort
    result = sortProducts(result, activeSort)

    return result
  }, [activeCategory, activeSort, searchQuery])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-24 pb-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-surface-50 mb-8"
        >
          Nossos Instrumentos
        </motion.h1>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-4 mb-8"
        >
          {/* Search + Sort Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 pointer-events-none"
              />
              <input
                type="text"
                value={localSearch}
                onChange={handleSearchChange}
                placeholder="Buscar instrumentos..."
                className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-2.5 pl-10 pr-4 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
              />
            </form>

            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-2">
              <SlidersHorizontal
                size={16}
                className="text-surface-500 dark:text-surface-400 shrink-0"
              />
              <select
                value={activeSort}
                onChange={handleSortChange}
                className="appearance-none rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-2.5 pl-3 pr-8 text-sm text-surface-900 dark:text-surface-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent cursor-pointer transition-shadow"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => {
              const isActive = activeCategory === cat.id || (cat.id === 'todos' && activeCategory === 'todos')
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  {cat.name}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Result Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-surface-500 dark:text-surface-400 mb-6"
        >
          {filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </motion.p>

        {/* Product Grid or Empty State */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Search size={48} className="text-surface-300 dark:text-surface-600 mb-4" />
            <h2 className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">
              Nenhum produto encontrado
            </h2>
            <p className="text-surface-500 dark:text-surface-400 max-w-md">
              Tente ajustar os filtros ou buscar por outro termo para encontrar o instrumento ideal.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setLocalSearch('')
                setSearchParams({})
              }}
              className="mt-6 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-2.5 px-6 transition-colors cursor-pointer"
            >
              Limpar filtros
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.main>
  )
}
