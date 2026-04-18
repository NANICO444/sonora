import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

function StarRating({ rating, size = 16 }) {
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

export default function TestimonialCard({ testimonial, index = 0 }) {
  const { name, role, text, avatar, rating } = testimonial

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col rounded-2xl bg-white dark:bg-surface-800 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-surface-200 dark:border-surface-700 p-6 sm:p-8"
    >
      {/* Decorative Quote Mark */}
      <Quote
        size={40}
        className="absolute top-5 right-5 text-brand-100 dark:text-brand-900/40 fill-brand-100 dark:fill-brand-900/40"
      />

      {/* Rating */}
      <StarRating rating={rating} />

      {/* Quote Text */}
      <blockquote className="mt-4 flex-1 text-sm sm:text-base leading-relaxed text-surface-600 dark:text-surface-300">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-700">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover ring-2 ring-surface-100 dark:ring-surface-700"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-surface-900 dark:text-surface-50">
            {name}
          </span>
          <span className="text-xs text-surface-500 dark:text-surface-400">
            {role}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
