import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  Globe,
  MessageCircle,
  Link2,
  Copy,
} from 'lucide-react'
import { blogPosts } from '../data/blogPosts'
import BlogCard from '../components/BlogCard'

export default function BlogPost() {
  const { id } = useParams()

  const post = blogPosts.find((p) => String(p.id) === String(id))

  if (!post) {
    return (
      <main className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-4">
            Artigo nao encontrado
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            O artigo que voce procura nao existe ou foi removido.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 dark:text-brand-400 font-semibold"
          >
            <ArrowLeft size={16} />
            Voltar ao Blog
          </Link>
        </div>
      </main>
    )
  }

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

  // Content paragraphs
  const paragraphs = post.content
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  // Related posts: same category first, then others, excluding current
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1
      if (a.category !== post.category && b.category === post.category) return 1
      return 0
    })
    .slice(0, 3)

  const handleShare = (platform) => {
    const url = window.location.href
    const text = post.title

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      copy: null,
    }

    if (platform === 'copy') {
      navigator.clipboard?.writeText(url)
      return
    }

    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  return (
    <main className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Hero Image */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-surface-950/30 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute top-6 left-4 sm:left-8 z-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={16} />
            Blog
          </Link>
        </motion.div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 lg:p-14">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/80">
                <Calendar size={12} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/80">
                <Clock size={12} />
                {post.readTime} de leitura
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-4 pb-8 border-b border-surface-200 dark:border-surface-800"
        >
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-sm font-bold text-brand-600 dark:text-brand-400">
            {initials}
          </div>
          <div>
            <p className="text-base font-semibold text-surface-900 dark:text-surface-50">
              {post.author}
            </p>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Publicado em {formattedDate}
            </p>
          </div>

          {/* Share Buttons */}
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:block text-xs font-medium text-surface-400 dark:text-surface-500 mr-1">
              Compartilhar
            </span>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-full text-surface-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors cursor-pointer"
              aria-label="Compartilhar no Facebook"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full text-surface-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors cursor-pointer"
              aria-label="Compartilhar no Twitter"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 rounded-full text-surface-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors cursor-pointer"
              aria-label="Copiar link"
            >
              <Copy size={18} />
            </button>
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8"
        >
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg leading-relaxed text-surface-700 dark:text-surface-300 mb-6"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-800"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={16} className="text-surface-400 dark:text-surface-500" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Bar Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center gap-4"
        >
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400 flex items-center gap-2">
            <Share2 size={16} />
            Gostou? Compartilhe este artigo!
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare('facebook')}
              className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="px-4 py-2 rounded-full text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors cursor-pointer"
            >
              Twitter
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="px-4 py-2 rounded-full text-sm font-medium bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Link2 size={14} />
              Copiar Link
            </button>
          </div>
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao Blog
          </Link>
        </motion.div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-8 text-center"
            >
              Artigos Relacionados
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
