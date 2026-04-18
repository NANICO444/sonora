import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const badgeColors = {
  'Novo': 'bg-blue-500 text-white',
  'Mais Vendido': 'bg-amber-500 text-white',
  'Oferta': 'bg-red-500 text-white',
}

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

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { id, name, category, price, originalPrice, image, rating, reviews, badge, inStock } = product

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
      {/* Image */}
      <Link to={`/produtos/${id}`} className="relative block overflow-hidden aspect-square">
        <motion.img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeColors[badge] || 'bg-surface-600 text-white'}`}
          >
            {badge}
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Indisponivel
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-surface-400 dark:text-surface-400">
          {category}
        </span>

        {/* Name */}
        <Link
          to={`/produtos/${id}`}
          className="text-sm sm:text-base font-semibold leading-snug text-surface-900 dark:text-surface-50 hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-2"
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={rating} size={14} />
          <span className="text-xs text-surface-500 dark:text-surface-400">
            ({reviews})
          </span>
        </div>

        {/* Spacer */}
        <div className="mt-auto" />

        {/* Price */}
        <div className="flex flex-wrap items-end gap-2">
          <span className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-50">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-sm text-surface-400 line-through">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="ml-auto text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={!inStock}
          onClick={() => addItem(product)}
          className="mt-2 flex items-center justify-center gap-2 w-full rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-surface-300 disabled:dark:bg-surface-600 text-white font-semibold text-sm py-3 px-4 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
        >
          <ShoppingCart size={16} />
          Adicionar ao Carrinho
        </motion.button>
      </div>
    </motion.div>
  )
}
