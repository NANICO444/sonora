import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'

const levels = ['Todos', 'Iniciante', 'Intermediario', 'Avancado']

const categories = [
  'Todos',
  'Violao',
  'Piano',
  'Bateria',
  'Canto',
  'Teoria Musical',
  'Producao Musical',
]

const sortOptions = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'menor-preco', label: 'Menor Preco' },
  { value: 'mais-alunos', label: 'Mais Alunos' },
  { value: 'melhor-avaliacao', label: 'Melhor Avaliacao' },
]

export default function Courses() {
  const [activeLevel, setActiveLevel] = useState('Todos')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState('relevancia')

  const filtered = useMemo(() => {
    let result = [...courses]

    if (activeLevel !== 'Todos') {
      result = result.filter((c) => c.level === activeLevel)
    }

    if (activeCategory !== 'Todos') {
      result = result.filter((c) => c.category === activeCategory)
    }

    switch (sortBy) {
      case 'menor-preco':
        result.sort((a, b) => a.price - b.price)
        break
      case 'mais-alunos':
        result.sort((a, b) => b.students - a.students)
        break
      case 'melhor-avaliacao':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [activeLevel, activeCategory, sortBy])

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Cursos Online
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Aprenda musica no seu ritmo, com os melhores professores
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeLevel === level
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
              }`}
            >
              {level}
            </button>
          ))}
        </motion.div>

        {/* Category + Sort Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          {/* Category Filter */}
          <div className="flex-1">
            <label className="sr-only" htmlFor="category-filter">
              Categoria
            </label>
            <select
              id="category-filter"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todos' ? 'Todas as Categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="sr-only" htmlFor="sort-filter">
              Ordenar por
            </label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="mt-6 text-sm text-surface-500 dark:text-surface-400">
          {filtered.length} {filtered.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
        </p>

        {/* Course Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-lg font-medium text-surface-600 dark:text-surface-400">
              Nenhum curso encontrado com os filtros selecionados.
            </p>
            <button
              onClick={() => {
                setActiveLevel('Todos')
                setActiveCategory('Todos')
              }}
              className="mt-4 text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium text-sm underline underline-offset-2 cursor-pointer"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </section>
    </div>
  )
}
