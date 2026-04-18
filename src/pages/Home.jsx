import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Guitar,
  Wind,
  Drum,
  Piano,
  Headphones,
  Truck,
  Shield,
  BadgePercent,
  ArrowRight,
  Send,
} from 'lucide-react'

import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import CourseCard from '../components/CourseCard'
import BlogCard from '../components/BlogCard'
import TestimonialCard from '../components/TestimonialCard'

import { products } from '../data/products'
import { courses } from '../data/courses'
import { blogPosts } from '../data/blogPosts'
import { testimonials } from '../data/testimonials'

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

/* ------------------------------------------------------------------ */
/*  Categories data                                                    */
/* ------------------------------------------------------------------ */
const categories = [
  { name: 'Cordas', slug: 'Cordas', icon: Guitar, color: 'from-amber-500 to-orange-600' },
  { name: 'Sopro', slug: 'Sopro', icon: Wind, color: 'from-sky-500 to-blue-600' },
  { name: 'Percussao', slug: 'Percussao', icon: Drum, color: 'from-red-500 to-rose-600' },
  { name: 'Teclas', slug: 'Teclas', icon: Piano, color: 'from-violet-500 to-purple-600' },
  { name: 'Acessorios', slug: 'Acessorios', icon: Headphones, color: 'from-emerald-500 to-teal-600' },
]

/* ------------------------------------------------------------------ */
/*  "Why choose us" features                                           */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Truck,
    title: 'Entrega Rapida',
    description: 'Envio expresso para todo o Brasil com rastreamento em tempo real.',
  },
  {
    icon: Shield,
    title: 'Garantia Estendida',
    description: 'Todos os instrumentos com garantia estendida de ate 2 anos.',
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Equipe de musicos prontos para te ajudar a escolher o melhor.',
  },
  {
    icon: BadgePercent,
    title: 'Precos Justos',
    description: 'Melhores precos do mercado com parcelamento em ate 12x.',
  },
]

/* ------------------------------------------------------------------ */
/*  Section title helper                                               */
/* ------------------------------------------------------------------ */
function SectionTitle({ children, subtitle }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-surface-500 dark:text-surface-400">
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */
export default function Home() {
  const [email, setEmail] = useState('')

  const featuredProducts = products.slice(0, 4)
  const featuredCourses = courses.slice(0, 3)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <main>
      {/* ============================================================ */}
      {/* 1. HERO                                                       */}
      {/* ============================================================ */}
      <Hero />

      {/* ============================================================ */}
      {/* 2. FEATURED CATEGORIES                                        */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-900"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Encontre o instrumento perfeito para o seu estilo">
            Explore por Categoria
          </SectionTitle>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div key={cat.slug} variants={staggerItem}>
                  <Link
                    to={`/produtos?categoria=${cat.slug}`}
                    className="group relative flex flex-col items-center gap-4 rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 dark:hover:border-brand-600 overflow-hidden"
                  >
                    {/* Gradient hover background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-300`}
                    />

                    <div
                      className={`relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={28} />
                    </div>

                    <span className="relative z-10 text-sm sm:text-base font-semibold text-surface-800 dark:text-surface-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 3. FEATURED PRODUCTS                                          */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-950"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Os instrumentos mais procurados pelos nossos clientes">
            Instrumentos em Destaque
          </SectionTitle>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm sm:text-base py-3 px-8 shadow-lg shadow-brand-500/25 transition-colors duration-200"
              >
                Ver Todos
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 4. COURSES PREVIEW                                            */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-50 dark:bg-surface-900"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Cursos online com professores renomados para acelerar seu aprendizado">
            Aprenda com os Melhores
          </SectionTitle>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredCourses.map((course) => (
              <motion.div key={course.id} variants={staggerItem}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/cursos"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 dark:border-brand-400 text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white font-semibold text-sm sm:text-base py-3 px-8 transition-colors duration-200"
              >
                Ver Todos os Cursos
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE US                                              */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-950"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Mais do que uma loja, somos parceiros da sua jornada musical">
            Por que Escolher a Sonora?
          </SectionTitle>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center gap-4 rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 p-6 sm:p-8 transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 dark:text-brand-400">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-surface-900 dark:text-surface-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 6. TESTIMONIALS                                               */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Milhares de musicos confiam na Sonora">
            O que Dizem Nossos Clientes
          </SectionTitle>

          {/* Horizontal scroll container */}
          <div className="relative">
            <div role="region" aria-label="Depoimentos de clientes" className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-[420px] snap-start"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>

            {/* Fade edges to hint at scroll */}
            <div className="hidden lg:block absolute top-0 right-0 bottom-4 w-24 bg-gradient-to-l from-surface-50 dark:from-surface-900 to-transparent pointer-events-none" />
            <div className="hidden lg:block absolute top-0 left-0 bottom-4 w-24 bg-gradient-to-r from-surface-50 dark:from-surface-900 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 7. BLOG PREVIEW                                               */}
      {/* ============================================================ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-950"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Dicas, tutoriais e inspiracao para sua jornada musical">
            Do Nosso Blog
          </SectionTitle>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestPosts.map((post) => (
              <motion.div key={post.id} variants={staggerItem}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-14 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-semibold text-sm sm:text-base transition-colors duration-200"
              >
                Ver Todos os Artigos
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 8. CTA BANNER                                                 */}
      {/* ============================================================ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 dark:from-brand-800 dark:via-brand-700 dark:to-brand-600" />

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pronto para Comecar sua Jornada Musical?
          </motion.h2>

          <motion.p
            className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Cadastre-se e receba ofertas exclusivas, lancamentos e dicas musicais diretamente no seu email.
          </motion.p>

          <motion.form
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              aria-label="Seu melhor email"
              required
              className="w-full sm:flex-1 rounded-full bg-white/15 border border-white/25 text-white placeholder-white/60 px-6 py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition-all duration-200"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-600 font-semibold text-sm sm:text-base py-3.5 px-8 shadow-lg hover:bg-surface-100 transition-colors duration-200 cursor-pointer"
            >
              <Send size={16} />
              Inscrever-se
            </motion.button>
          </motion.form>

          <motion.p
            className="mt-4 text-xs text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Sem spam, apenas conteudo relevante. Cancele quando quiser.
          </motion.p>
        </div>
      </motion.section>
    </main>
  )
}
