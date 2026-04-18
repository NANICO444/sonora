import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Users, BookOpen, ArrowRight } from 'lucide-react'

const levelColors = {
  Iniciante: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  Intermediario: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  Avancado: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
}

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-surface-200 text-surface-200 dark:fill-surface-600 dark:text-surface-600'
          }
        />
      ))}
    </div>
  )
}

export default function CourseCard({ course }) {
  const {
    id,
    title,
    instructor,
    level,
    duration,
    lessons,
    price,
    originalPrice,
    image,
    rating,
    students,
  } = course

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-800 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-surface-200 dark:border-surface-700"
    >
      {/* Thumbnail */}
      <Link to={`/cursos/${id}`} className="relative block overflow-hidden aspect-video">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Level Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${levelColors[level] || 'bg-surface-200 text-surface-700'}`}
        >
          {level}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Title */}
        <Link
          to={`/cursos/${id}`}
          className="text-sm sm:text-base font-semibold leading-snug text-surface-900 dark:text-surface-50 hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-2"
        >
          {title}
        </Link>

        {/* Instructor */}
        <p className="text-xs text-surface-500 dark:text-surface-400">
          por <span className="font-medium text-surface-700 dark:text-surface-300">{instructor}</span>
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-surface-500 dark:text-surface-400">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {duration}h
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {lessons} aulas
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {students.toLocaleString('pt-BR')}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-amber-500">{rating}</span>
          <StarRating rating={rating} />
        </div>

        {/* Spacer */}
        <div className="mt-auto" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3 pt-2 border-t border-surface-100 dark:border-surface-700">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-surface-900 dark:text-surface-50">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
              {discount > 0 && (
                <span className="text-xs font-bold text-green-600 dark:text-green-400">
                  -{discount}%
                </span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-surface-400 line-through">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/cursos/${id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 px-4 transition-colors duration-200"
            >
              Saiba Mais
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
