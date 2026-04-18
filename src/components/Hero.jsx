import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Floating musical symbols                                          */
/* ------------------------------------------------------------------ */
const MUSIC_SYMBOLS = [
  { char: '\u266A', size: 'text-2xl' },   // ♪
  { char: '\u266B', size: 'text-3xl' },   // ♫
  { char: '\u266C', size: 'text-2xl' },   // ♬
  { char: '\uD83C\uDFB8', size: 'text-3xl' }, // guitar emoji
  { char: '\uD83C\uDFB9', size: 'text-3xl' }, // piano emoji
  { char: '\uD83C\uDFB5', size: 'text-xl' },  // musical note emoji
  { char: '\uD83C\uDFB6', size: 'text-xl' },  // musical notes emoji
  { char: '\u266A', size: 'text-4xl' },
  { char: '\u266B', size: 'text-lg' },
  { char: '\uD83C\uDFB5', size: 'text-2xl' },
  { char: '\u266C', size: 'text-3xl' },
  { char: '\uD83C\uDFB6', size: 'text-3xl' },
  { char: '\u266A', size: 'text-xl' },
  { char: '\uD83C\uDFB8', size: 'text-2xl' },
  { char: '\u266B', size: 'text-4xl' },
];

function FloatingNote({ symbol, index, total }) {
  // Deterministic but varied positioning
  const xStart = ((index * 37 + 13) % 100);
  const yStart = ((index * 53 + 7) % 100);
  const duration = 12 + (index % 8) * 3;
  const delay = (index * 0.7) % 5;
  const opacity = 0.08 + (index % 5) * 0.04;

  // Create a gentle drifting path unique to each note
  const xDrift = 30 + (index % 4) * 20;
  const yDrift = 20 + (index % 3) * 15;

  return (
    <motion.span
      className={`absolute pointer-events-none select-none ${symbol.size} text-brand-400/30 dark:text-brand-500/20`}
      style={{ left: `${xStart}%`, top: `${yStart}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        scale: [0.5, 1, 1, 0.5],
        x: [0, xDrift, -xDrift / 2, xDrift / 3, 0],
        y: [0, -yDrift, yDrift / 2, -yDrift / 3, 0],
        rotate: [0, 10, -10, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    >
      {symbol.char}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Headline with staggered word animation                            */
/* ------------------------------------------------------------------ */
const HEADLINE_WORDS = ['Descubra', 'o', 'Som', 'que', 'Mora', 'em', 'Voce'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -60,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Stats data                                                        */
/* ------------------------------------------------------------------ */
const STATS = [
  { value: '2.500+', label: 'Alunos' },
  { value: '150+', label: 'Instrumentos' },
  { value: '50+', label: 'Cursos' },
  { value: '98%', label: 'Satisfacao' },
];

/* ------------------------------------------------------------------ */
/*  Hero component                                                    */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white dark:from-surface-950 dark:via-surface-900 dark:to-surface-900">
      {/* ---- Ambient glow blobs ---- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-400/10 dark:bg-brand-500/5 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-300/10 dark:bg-brand-600/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/5 dark:bg-brand-400/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ---- Floating musical notes ---- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {MUSIC_SYMBOLS.map((symbol, i) => (
          <FloatingNote key={i} symbol={symbol} index={i} total={MUSIC_SYMBOLS.length} />
        ))}
      </div>

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50/80 dark:bg-brand-950/50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300 backdrop-blur-sm">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {'\uD83C\uDFB5'}
            </motion.span>
            A maior loja de instrumentos do Brasil
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50 leading-tight perspective-[1000px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.25em] ${
                word === 'Som' || word === 'Voce'
                  ? 'text-brand-500 dark:text-brand-400'
                  : ''
              }`}
              variants={wordVariants}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 sm:mt-8 max-w-2xl text-center text-base sm:text-lg md:text-xl text-surface-600 dark:text-surface-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          Instrumentos premium e cursos online para todos os niveis.
          <br className="hidden sm:block" />{' '}
          De o play na sua paixao.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/produtos"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 dark:shadow-brand-500/15 transition-colors duration-300 hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 overflow-hidden"
            >
              {/* Shine sweep effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">Ver Instrumentos</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-500 dark:border-brand-400 px-8 py-3.5 text-base font-semibold text-brand-600 dark:text-brand-400 transition-colors duration-300 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Explorar Cursos
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase text-surface-400 dark:text-surface-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-surface-400 dark:text-surface-500" />
        </motion.div>
      </motion.div>

      {/* ---- Stats bar ---- */}
      <motion.div
        className="absolute bottom-0 inset-x-0 z-10 border-t border-surface-200/60 dark:border-surface-800/60 bg-white/60 dark:bg-surface-950/60 backdrop-blur-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
      >
        <div className="max-w-5xl mx-auto px-4 py-5 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 + i * 0.15 }}
            >
              <motion.span
                className="text-xl sm:text-2xl font-bold text-brand-500 dark:text-brand-400 tabular-nums"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.span>
              <span className="mt-0.5 text-xs sm:text-sm text-surface-500 dark:text-surface-400 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
