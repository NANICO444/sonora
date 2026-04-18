import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock,
  Users,
  BookOpen,
  Star,
  Play,
  CheckCircle,
  ArrowLeft,
  Award,
} from 'lucide-react'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'

const levelColors = {
  Iniciante:
    'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  Intermediario:
    'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  Avancado:
    'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
}

const curriculumData = {
  default: [
    {
      title: 'Modulo 1: Fundamentos e Preparacao',
      lessons: [
        'Introducao ao curso e materiais necessarios',
        'Postura correta e cuidados iniciais',
        'Primeiros exercicios de aquecimento',
        'Entendendo notacao basica',
      ],
    },
    {
      title: 'Modulo 2: Tecnicas Essenciais',
      lessons: [
        'Dominio da tecnica principal',
        'Exercicios progressivos de coordenacao',
        'Pratica com metronomo e tempo',
        'Correcao de erros comuns',
      ],
    },
    {
      title: 'Modulo 3: Repertorio Inicial',
      lessons: [
        'Primeira musica completa passo a passo',
        'Variacao ritmica e dinamica',
        'Segunda musica com novos elementos',
        'Pratica de repertorio com acompanhamento',
      ],
    },
    {
      title: 'Modulo 4: Aprofundamento Teorico',
      lessons: [
        'Teoria aplicada ao instrumento',
        'Escalas e padroes importantes',
        'Harmonia funcional na pratica',
        'Analise de progressoes populares',
      ],
    },
    {
      title: 'Modulo 5: Tecnicas Avancadas',
      lessons: [
        'Ornamentos e expressividade',
        'Tecnicas de improvisacao basica',
        'Construcao de arranjos simples',
        'Performance e presenca de palco',
      ],
    },
    {
      title: 'Modulo 6: Projeto Final',
      lessons: [
        'Preparacao do repertorio final',
        'Gravacao e autoavaliacao',
        'Proximos passos e plano de estudo continuo',
      ],
    },
  ],
}

const instructorBios = {
  'Rafael Mendes':
    'Violonista e educador musical com mais de 15 anos de experiencia. Formado em Musica pela UFRJ, Rafael ja ensinou mais de 10.000 alunos online e presencialmente. Seu metodo unico combina teoria acessivel com pratica imediata, tornando o aprendizado envolvente e eficaz.',
  'Dra. Mariana Costa':
    'Doutora em Performance Pianistica pela USP, Mariana e concertista ativa com apresentacoes na Europa e America do Sul. Especialista em pedagogia do piano, desenvolve metodos que unem a tradicao classica a abordagens modernas de ensino.',
  'Thiago Drummond':
    'Baterista profissional ha 20 anos, Thiago ja acompanhou artistas como Djavan, Ivete Sangalo e Lenine. Formado pelo Musicians Institute em Los Angeles, traz uma visao pratica e musical para o ensino da bateria.',
  'Luciana Oliveira':
    'Cantora e preparadora vocal com especializacao em Fonoaudiologia Artistica. Luciana trabalhou com grandes nomes da MPB e desenvolve tecnicas que unem saude vocal a expressividade artistica.',
  'Prof. Carlos Augusto':
    'Mestre em Composicao Musical pela UNICAMP, Carlos leciona teoria musical ha 25 anos em conservatorios e universidades. Autor de dois livros sobre harmonia funcional, e reconhecido por tornar a teoria musical acessivel e pratica.',
  'DJ Marcelo Souza':
    'Produtor musical e DJ com mais de 50 lancamentos em selos internacionais. Marcelo e especialista em producao com Ableton Live e Logic Pro, e mentor de diversos produtores que alcancaram sucesso no mercado.',
  'Fernando Vidal':
    'Guitarrista virtuoso e compositor, Fernando estudou no Berklee College of Music e ja lancou 4 albuns instrumentais. Especialista em improvisacao e fusion, leciona masterclasses em festivais pelo Brasil.',
  'Andre Vasconcellos':
    'Pianista de jazz reconhecido internacionalmente, Andre apresentou-se em festivais como Montreux e Montreal. Mestre em Jazz Performance pela Manhattan School of Music, dedica-se a formar a nova geracao de pianistas brasileiros.',
}

const reviewsData = [
  {
    name: 'Ana Paula S.',
    rating: 5,
    date: 'Ha 2 semanas',
    avatar: 'A',
    comment:
      'Curso incrivel! O professor explica de forma clara e objetiva. Em menos de um mes ja consegui tocar minhas primeiras musicas. Recomendo demais para quem esta comecando.',
  },
  {
    name: 'Marcos R.',
    rating: 4,
    date: 'Ha 1 mes',
    avatar: 'M',
    comment:
      'Conteudo muito bem estruturado e didatico. Gostaria de mais exercicios praticos em alguns modulos, mas no geral superou minhas expectativas. Vale cada centavo investido.',
  },
  {
    name: 'Juliana F.',
    rating: 5,
    date: 'Ha 3 semanas',
    avatar: 'J',
    comment:
      'Melhor investimento que fiz na minha educacao musical. O suporte da comunidade e excelente e o material complementar e muito rico. Ja estou ansiosa pelo proximo nivel!',
  },
]

function StarRating({ rating, size = 16, interactive = false }) {
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

export default function CourseDetail() {
  const { id } = useParams()
  const [openModule, setOpenModule] = useState(0)

  const course = useMemo(
    () => courses.find((c) => String(c.id) === id),
    [id]
  )

  const relatedCourses = useMemo(() => {
    if (!course) return []
    return courses
      .filter((c) => c.id !== course.id && (c.category === course.category || c.level === course.level))
      .slice(0, 3)
  }, [course])

  if (!course) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
            Curso nao encontrado
          </h2>
          <Link
            to="/cursos"
            className="mt-4 inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium"
          >
            <ArrowLeft size={18} />
            Voltar para Cursos
          </Link>
        </div>
      </div>
    )
  }

  const {
    title,
    instructor,
    level,
    duration,
    lessons,
    price,
    originalPrice,
    description,
    image,
    rating,
    students,
    category,
  } = course

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const curriculum = curriculumData.default
  const bio = instructorBios[instructor] || 'Professor dedicado com vasta experiencia na area musical.'

  const whatYouLearn = [
    `Dominar os fundamentos de ${category.toLowerCase()} com confianca`,
    'Desenvolver tecnica solida com exercicios progressivos e praticos',
    'Ler e interpretar partituras e cifras com facilidade',
    'Tocar um repertorio variado de musicas populares e classicas',
    'Entender harmonia e teoria musical aplicada ao seu instrumento',
    'Criar seus proprios arranjos e improvisar com musicalidade',
  ]

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center gap-2 text-sm text-surface-500 dark:text-surface-400"
        >
          <li>
            <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/cursos" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              Cursos
            </Link>
          </li>
          <li>/</li>
          <li className="text-surface-900 dark:text-surface-100 font-medium truncate max-w-[200px] sm:max-w-none">
            {title}
          </li>
        </motion.ol>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-15 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900/95 to-surface-900/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[level] || 'bg-surface-200 text-surface-700'}`}
                >
                  {level}
                </span>
                <span className="text-sm text-surface-300">{category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {title}
              </h1>

              <p className="text-surface-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-surface-300">
                <span className="flex items-center gap-1.5">
                  <Award size={16} className="text-brand-400" />
                  por <strong className="text-white">{instructor}</strong>
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-surface-300">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-amber-400">{rating}</span>
                  <StarRating rating={rating} size={16} />
                  <span>({students.toLocaleString('pt-BR')} alunos)</span>
                </div>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {duration}h de conteudo
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={16} />
                  {lessons} aulas
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} />
                  {students.toLocaleString('pt-BR')} alunos
                </span>
              </div>
            </motion.div>

            {/* Right - Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl bg-white dark:bg-surface-800 shadow-2xl p-6 sm:p-8 border border-surface-200 dark:border-surface-700">
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-surface-900 dark:text-surface-50">
                      R$ {price.toFixed(2).replace('.', ',')}
                    </span>
                    {discount > 0 && (
                      <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  {originalPrice && originalPrice > price && (
                    <p className="text-sm text-surface-400 line-through">
                      R$ {originalPrice.toFixed(2).replace('.', ',')}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base py-4 px-6 transition-colors duration-200 shadow-lg shadow-brand-500/25 cursor-pointer"
                  >
                    Matricular Agora
                  </motion.button>

                  <p className="text-xs text-center text-surface-400 dark:text-surface-500">
                    Acesso vitalicio - Certificado incluso
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-surface-600 dark:text-surface-300">
                    <li className="flex items-center gap-2">
                      <Clock size={14} className="text-surface-400" />
                      {duration} horas de video em HD
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen size={14} className="text-surface-400" />
                      {lessons} aulas organizadas em modulos
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={14} className="text-surface-400" />
                      Acesso a comunidade exclusiva
                    </li>
                    <li className="flex items-center gap-2">
                      <Award size={14} className="text-surface-400" />
                      Certificado de conclusao
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                O que voce vai aprender
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whatYouLearn.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-800"
                  >
                    <CheckCircle
                      size={20}
                      className="mt-0.5 flex-shrink-0 text-green-500"
                    />
                    <span className="text-sm text-surface-700 dark:text-surface-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Curriculum */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                Conteudo do Curso
              </h2>
              <div className="space-y-3">
                {curriculum.map((module, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenModule(openModule === idx ? -1 : idx)
                      }
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-sm sm:text-base text-surface-900 dark:text-surface-50">
                          {module.title}
                        </span>
                      </div>
                      <span className="text-xs text-surface-400 ml-2 whitespace-nowrap">
                        {module.lessons.length} aulas
                      </span>
                    </button>

                    {openModule === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-surface-100 dark:border-surface-700"
                      >
                        <ul className="p-4 sm:p-5 space-y-3">
                          {module.lessons.map((lesson, li) => (
                            <li
                              key={li}
                              className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-400"
                            >
                              <Play
                                size={14}
                                className="flex-shrink-0 text-surface-400"
                              />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Instructor */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                Sobre o Instrutor
              </h2>
              <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-bold">
                  {instructor
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-surface-50">
                      {instructor}
                    </h3>
                    <p className="text-sm text-brand-500 dark:text-brand-400">
                      Especialista em {category}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                    {bio}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      {rating} avaliacao
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} />
                      {students.toLocaleString('pt-BR')} alunos
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Student Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                Avaliacoes dos Alunos
              </h2>

              {/* Summary */}
              <div className="flex items-center gap-4 mb-8 p-5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-surface-900 dark:text-surface-50">
                    {rating}
                  </div>
                  <StarRating rating={rating} size={18} />
                  <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                    {students.toLocaleString('pt-BR')} alunos
                  </p>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviewsData.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-sm">
                        {review.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-semibold text-sm text-surface-900 dark:text-surface-50">
                            {review.name}
                          </h4>
                          <span className="text-xs text-surface-400">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-1">
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="mt-3 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar - Sticky Price Card (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl bg-white dark:bg-surface-800 shadow-lg p-6 border border-surface-200 dark:border-surface-700 space-y-4">
                <div className="flex items-end gap-3">
                  <span className="text-2xl font-bold text-surface-900 dark:text-surface-50">
                    R$ {price.toFixed(2).replace('.', ',')}
                  </span>
                  {discount > 0 && (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>
                {originalPrice && originalPrice > price && (
                  <p className="text-sm text-surface-400 line-through">
                    R$ {originalPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base py-3.5 px-6 transition-colors duration-200 shadow-lg shadow-brand-500/25 cursor-pointer"
                >
                  Matricular Agora
                </motion.button>

                <p className="text-xs text-center text-surface-400 dark:text-surface-500">
                  Acesso vitalicio - Certificado incluso
                </p>

                <ul className="pt-4 border-t border-surface-100 dark:border-surface-700 space-y-3 text-sm text-surface-600 dark:text-surface-300">
                  <li className="flex items-center gap-2">
                    <Clock size={14} className="text-surface-400" />
                    {duration}h de video em HD
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen size={14} className="text-surface-400" />
                    {lessons} aulas em modulos
                  </li>
                  <li className="flex items-center gap-2">
                    <Users size={14} className="text-surface-400" />
                    Comunidade exclusiva
                  </li>
                  <li className="flex items-center gap-2">
                    <Award size={14} className="text-surface-400" />
                    Certificado de conclusao
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-8">
              Cursos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  )
}
