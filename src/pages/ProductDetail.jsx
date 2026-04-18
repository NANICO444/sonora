import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const specifications = {
  1: { material: 'Cedro macico / Jacaranda', dimensoes: '100 x 37 x 12 cm', peso: '1.8 kg', origem: 'Brasil' },
  2: { material: 'Plastico ABS / Metal', dimensoes: '132.6 x 29.5 x 16.6 cm', peso: '11.8 kg', origem: 'Japao' },
  3: { material: 'Poplar / Mahogany', dimensoes: '150 x 120 x 100 cm', peso: '28 kg', origem: 'China' },
  4: { material: 'Abeto / Maple', dimensoes: '59 x 20 x 12 cm', peso: '0.5 kg', origem: 'Brasil' },
  5: { material: 'Latao laqueado a ouro', dimensoes: '65 x 28 x 14 cm', peso: '2.5 kg', origem: 'China' },
  6: { material: 'Basswood / Maple / Pau-ferro', dimensoes: '99 x 33 x 5 cm', peso: '3.6 kg', origem: 'Brasil' },
  7: { material: 'Plastico ABS / Componentes eletronicos', dimensoes: '94.8 x 38.4 x 12.2 cm', peso: '7 kg', origem: 'Japao' },
  8: { material: 'MDF com esteira de aco', dimensoes: '30 x 30 x 46 cm', peso: '3.2 kg', origem: 'Brasil' },
  9: { material: 'Niquel-prata', dimensoes: '67.3 x 4 x 4 cm', peso: '0.46 kg', origem: 'Japao' },
  10: { material: 'Plastico / Metal / Espuma', dimensoes: '19 x 18 x 9 cm', peso: '0.28 kg', origem: 'Japao' },
  11: { material: 'Metal / Plastico', dimensoes: '18 x 5 x 5 cm', peso: '0.34 kg', origem: 'Alemanha' },
  12: { material: 'Sapele', dimensoes: '61 x 21 x 8 cm', peso: '0.6 kg', origem: 'China' },
}

function StarRating({ rating, size = 18 }) {
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

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const product = products.find((p) => p.id === Number(id))

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-24 pb-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-surface-700 dark:text-surface-300 mb-4">
          Produto nao encontrado
        </h2>
        <Link
          to="/produtos"
          className="text-brand-500 hover:text-brand-600 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Voltar para produtos
        </Link>
      </div>
    )
  }

  const { name, category, price, originalPrice, image, rating, reviews, badge, description, inStock } = product
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const specs = specifications[product.id] || { material: 'Madeira nobre', dimensoes: '80 x 30 x 10 cm', peso: '2.0 kg', origem: 'Brasil' }

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-24 pb-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400 mb-6 flex-wrap"
        >
          <Link to="/" className="hover:text-brand-500 transition-colors">
            Inicio
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to="/produtos" className="hover:text-brand-500 transition-colors">
            Produtos
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link
            to={`/produtos?categoria=${category.toLowerCase()}`}
            className="hover:text-brand-500 transition-colors"
          >
            {category}
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-surface-900 dark:text-surface-50 font-medium truncate max-w-[200px]">
            {name}
          </span>
        </motion.nav>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </motion.div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 aspect-square"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={
                isZoomed
                  ? {
                      transform: 'scale(1.8)',
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                  : {}
              }
            />
            {badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                  badge === 'Novo'
                    ? 'bg-blue-500 text-white'
                    : badge === 'Mais Vendido'
                    ? 'bg-amber-500 text-white'
                    : badge === 'Oferta'
                    ? 'bg-red-500 text-white'
                    : 'bg-surface-600 text-white'
                }`}
              >
                {badge}
              </span>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg tracking-wide uppercase">
                  Indisponivel
                </span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-xs font-medium uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-2">
              {category}
            </span>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-50 mb-4 leading-tight">
              {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={rating} size={20} />
              <span className="text-sm text-surface-600 dark:text-surface-400">
                {rating} ({reviews} avaliacoes)
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-end gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-surface-50">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
              {originalPrice && originalPrice > price && (
                <>
                  <span className="text-lg text-surface-400 line-through">
                    R$ {originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Installment info */}
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-8">
              ou 12x de R$ {(price / 12).toFixed(2).replace('.', ',')} sem juros
            </p>

            {/* Quantity Selector + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden bg-white dark:bg-surface-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={!inStock}
                  className="flex items-center justify-center w-11 h-11 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-surface-900 dark:text-surface-50 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!inStock}
                  className="flex items-center justify-center w-11 h-11 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={!inStock}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-surface-300 disabled:dark:bg-surface-600 text-white font-semibold text-base py-3.5 px-6 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-3">
                <Truck size={20} className="text-brand-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-surface-900 dark:text-surface-50">Frete Gratis</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-3">
                <Shield size={20} className="text-brand-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-surface-900 dark:text-surface-50">Garantia</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">12 meses</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-3">
                <RotateCcw size={20} className="text-brand-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-surface-900 dark:text-surface-50">Devolucao</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Ate 30 dias</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-3">
                Descricao
              </h2>
              <p className="text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                {description}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-3">
                Especificacoes
              </h2>
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                {[
                  { label: 'Material', value: specs.material },
                  { label: 'Dimensoes', value: specs.dimensoes },
                  { label: 'Peso', value: specs.peso },
                  { label: 'Origem', value: specs.origem },
                ].map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-center px-4 py-3 text-sm ${
                      i % 2 === 0
                        ? 'bg-surface-50 dark:bg-surface-800/50'
                        : 'bg-white dark:bg-surface-800'
                    }`}
                  >
                    <span className="font-medium text-surface-600 dark:text-surface-400">
                      {spec.label}
                    </span>
                    <span className="text-surface-900 dark:text-surface-50 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.main>
  )
}
