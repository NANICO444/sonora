import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, Search } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blogPosts'

const CATEGORIES = ['Todos', 'Dicas', 'Tutorial', 'Equipamento', 'Inspiracao']

function FeaturedPost({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const initials = post.author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl bg-white dark:bg-surface-800 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-surface-200 dark:border-surface-700"
    >
      {/* Image */}
      <Link to={`/blog/${post.id}`} className="relative block overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
        <motion.img
          src={post.image}
          alt={post.title}
          loading="eager"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white">
          Destaque
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10 justify-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-500 dark:text-brand-400">
          {post.category}
        </span>

        <Link
          to={`/blog/${post.id}`}
          className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-surface-900 dark:text-surface-50 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
        >
          {post.title}
        </Link>

        <p className="text-sm sm:text-base leading-relaxed text-surface-500 dark:text-surface-400 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-sm font-bold text-brand-600 dark:text-brand-400">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-surface-800 dark:text-surface-200">
              {post.author}
            </span>
            <div className="flex items-center gap-2 text-xs text-surface-400 dark:text-surface-500">
              <span>{formattedDate}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-surface-300 dark:bg-surface-600" />
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ x: 4 }} className="mt-2">
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
          >
            Ler Artigo Completo
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filteredPosts =
    activeCategory === 'Todos'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  return (
    <main className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-surface-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 pt-28 sm:pt-32 pb-12 sm:pb-16">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-400/10 dark:bg-brand-500/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-300/10 dark:bg-brand-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50"
          >
            Blog <span className="text-brand-500 dark:text-brand-400">Sonora</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
          >
            Dicas, tutoriais e inspiracao para sua jornada musical
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
                <p className="text-lg font-medium text-surface-500 dark:text-surface-400">
                  Nenhum artigo encontrado nesta categoria.
                </p>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && <FeaturedPost post={featuredPost} />}

                {/* Blog Grid */}
                {remainingPosts.length > 0 && (
                  <div className="mt-10 sm:mt-14">
                    <h2 className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-50 mb-6 sm:mb-8">
                      {activeCategory === 'Todos' ? 'Todos os Artigos' : activeCategory}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {remainingPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}
