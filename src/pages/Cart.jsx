import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-700">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-surface-900 dark:text-surface-50 truncate">
              {item.name}
            </h3>
            {item.category && (
              <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">
                {item.category}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="flex-shrink-0 p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
            aria-label="Remover item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Quantity Controls */}
          <div className="flex items-center gap-0 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="flex items-center justify-center w-8 h-8 text-surface-500 hover:text-surface-900 dark:hover:text-surface-50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
              aria-label="Diminuir quantidade"
            >
              <Minus size={14} />
            </button>
            <span className="flex items-center justify-center w-10 h-8 text-sm font-semibold text-surface-900 dark:text-surface-50 bg-surface-50 dark:bg-surface-800 border-x border-surface-200 dark:border-surface-700 tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="flex items-center justify-center w-8 h-8 text-surface-500 hover:text-surface-900 dark:hover:text-surface-50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
              aria-label="Aumentar quantidade"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Subtotal */}
          <span className="text-sm sm:text-base font-bold text-surface-900 dark:text-surface-50">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-28 h-28 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
        <ShoppingCart size={48} className="text-surface-300 dark:text-surface-600" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-2">
        Seu carrinho esta vazio
      </h2>
      <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 max-w-md mb-8">
        Parece que voce ainda nao adicionou nenhum produto. Explore nossa loja e encontre o
        instrumento perfeito para voce!
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm sm:text-base px-8 py-3.5 shadow-lg shadow-brand-500/25 transition-colors"
        >
          <ShoppingCart size={18} />
          Explorar Produtos
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart()

  const FREE_SHIPPING_THRESHOLD = 299
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 29.9
  const orderTotal = total + shipping

  return (
    <main className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-surface-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 pt-28 sm:pt-32 pb-10 sm:pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-400/10 dark:bg-brand-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50"
          >
            Seu <span className="text-brand-500 dark:text-brand-400">Carrinho</span>
          </motion.h1>
          {items.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-surface-500 dark:text-surface-400"
            >
              {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
            </motion.p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>

              {/* Continue Shopping Link */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-2">
                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Continuar Comprando
                </Link>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="sticky top-24 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-surface-900 dark:text-surface-50 mb-6">
                  Resumo do Pedido
                </h2>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-500 dark:text-surface-400">Subtotal</span>
                    <span className="font-medium text-surface-900 dark:text-surface-50">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-500 dark:text-surface-400">Frete</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-green-600 dark:text-green-400">Gratis</span>
                    ) : (
                      <span className="font-medium text-surface-900 dark:text-surface-50">
                        {formatPrice(shipping)}
                      </span>
                    )}
                  </div>

                  {/* Free Shipping Notice */}
                  {total < FREE_SHIPPING_THRESHOLD && (
                    <div className="flex items-start gap-2 mt-1 p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
                      <Package size={16} className="flex-shrink-0 mt-0.5 text-brand-500" />
                      <p className="text-xs text-brand-700 dark:text-brand-300">
                        Frete Gratis acima de{' '}
                        <span className="font-semibold">{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
                        . Faltam{' '}
                        <span className="font-semibold">
                          {formatPrice(FREE_SHIPPING_THRESHOLD - total)}
                        </span>
                        !
                      </p>
                    </div>
                  )}

                  {total >= FREE_SHIPPING_THRESHOLD && (
                    <div className="flex items-center gap-2 mt-1 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <Package size={16} className="text-green-600 dark:text-green-400" />
                      <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                        Voce ganhou Frete Gratis!
                      </p>
                    </div>
                  )}

                  <div className="border-t border-surface-200 dark:border-surface-700 mt-3 pt-4 flex items-center justify-between">
                    <span className="text-base font-bold text-surface-900 dark:text-surface-50">
                      Total
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-surface-900 dark:text-surface-50">
                      {formatPrice(orderTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base py-4 px-6 shadow-lg shadow-brand-500/25 transition-colors duration-200 cursor-pointer"
                >
                  Finalizar Compra
                  <ArrowRight size={18} />
                </motion.button>

                {/* Security note */}
                <p className="mt-4 text-center text-xs text-surface-400 dark:text-surface-500">
                  Pagamento 100% seguro. Dados protegidos.
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
