import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

export default function BlogCard({ post }) {
  const { id, title, excerpt, author, date, readTime, image, category } = post

  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  // Derive initials for a fallback avatar
  const initials = author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-800 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-surface-200 dark:border-surface-700"
    >
      {/* Image with gradient overlay */}
      <Link to={`/blog/${id}`} className="relative block overflow-hidden aspect-[16/10]">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-surface-800/90 text-surface-800 dark:text-surface-100 backdrop-blur-sm">
          {category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Title */}
        <Link
          to={`/blog/${id}`}
          className="text-base sm:text-lg font-semibold leading-snug text-surface-900 dark:text-surface-50 hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-2"
        >
          {title}
        </Link>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400 line-clamp-2">
          {excerpt}
        </p>

        {/* Spacer */}
        <div className="mt-auto" />

        {/* Author & Meta */}
        <div className="flex items-center gap-3 pt-3 border-t border-surface-100 dark:border-surface-700">
          {/* Avatar */}
          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-400">
            {initials}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">
              {author}
            </span>
            <div className="flex items-center gap-2 text-xs text-surface-400 dark:text-surface-500">
              <span>{formattedDate}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-surface-300 dark:bg-surface-600" />
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {readTime}
              </span>
            </div>
          </div>

          {/* Read link */}
          <Link
            to={`/blog/${id}`}
            className="ml-auto flex-shrink-0 flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
          >
            Ler Artigo
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
