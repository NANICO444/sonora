import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  ChevronDown,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'

const SUBJECTS = [
  'Selecione um assunto',
  'Duvida sobre produto',
  'Status do pedido',
  'Trocas e devolucoes',
  'Problemas com pagamento',
  'Parceria comercial',
  'Outro',
]

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Telefone',
    value: '(11) 4002-8922',
    detail: 'Seg a Sex, 8h as 18h',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contato@sonora.com.br',
    detail: 'Respondemos em ate 24h',
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Seg a Sex: 8h - 18h',
    detail: 'Sabado: 9h - 13h',
  },
  {
    icon: MapPin,
    title: 'Endereco',
    value: 'Rua da Musica, 123',
    detail: 'Sao Paulo - SP, 01310-100',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Qual o prazo de entrega?',
    answer:
      'O prazo de entrega varia de acordo com a sua regiao. Para capitais e regioes metropolitanas, o prazo e de 3 a 7 dias uteis. Para demais localidades, pode levar de 7 a 15 dias uteis. Voce pode acompanhar o status do seu pedido pela area "Meus Pedidos" no site.',
  },
  {
    question: 'Como funciona a politica de trocas e devolucoes?',
    answer:
      'Voce tem ate 30 dias apos o recebimento para solicitar a troca ou devolucao de qualquer produto. O item deve estar na embalagem original, sem sinais de uso. Para instrumentos, oferecemos 7 dias para teste. Entre em contato conosco e enviaremos as instrucoes de envio.',
  },
  {
    question: 'Quais formas de pagamento sao aceitas?',
    answer:
      'Aceitamos cartoes de credito (Visa, Mastercard, Elo, American Express) em ate 12x sem juros, boleto bancario com 5% de desconto, PIX com 7% de desconto, e transferencia bancaria. Parcelamentos acima de 6x estao disponiveis para compras acima de R$ 500.',
  },
  {
    question: 'Os instrumentos acompanham garantia?',
    answer:
      'Sim! Todos os instrumentos vendidos pela Sonora possuem garantia do fabricante, que varia de 3 meses a 1 ano dependendo da marca e categoria. Alem disso, oferecemos garantia estendida opcional de ate 2 anos em produtos selecionados.',
  },
  {
    question: 'Como faco para acompanhar meu pedido?',
    answer:
      'Apos a confirmacao do pagamento, voce recebera um e-mail com o codigo de rastreamento. Voce pode acompanhar a entrega diretamente pelo site dos Correios ou transportadora, ou acessando a secao "Meus Pedidos" em sua conta na Sonora.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors cursor-pointer"
      >
        <span className="text-sm sm:text-base font-medium text-surface-900 dark:text-surface-50">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-surface-400 dark:text-surface-500"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated submission
    setSubmitted(true)
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-surface-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-400/10 dark:bg-brand-500/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-300/10 dark:bg-brand-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-surface-50"
          >
            Fale <span className="text-brand-500 dark:text-brand-400">Conosco</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-surface-600 dark:text-surface-400 leading-relaxed"
          >
            Estamos aqui para ajudar. Envie sua mensagem ou encontre a resposta nas perguntas frequentes.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((info, idx) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                className="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-500 dark:text-brand-400">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-1">
                    {info.title}
                  </p>
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-50">
                    {info.value}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                    {info.detail}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6 flex items-center gap-2">
              <MessageSquare size={22} className="text-brand-500" />
              Envie sua Mensagem
            </h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl bg-white dark:bg-surface-800 border border-green-200 dark:border-green-800 text-center"
                >
                  <CheckCircle size={48} className="text-green-500 mb-4" />
                  <h3 className="text-lg font-bold text-surface-900 dark:text-surface-50 mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Obrigado pelo contato. Responderemos em ate 24 horas.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 p-6 sm:p-8 shadow-sm"
                >
                  {/* Nome */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nome"
                      className="text-sm font-medium text-surface-700 dark:text-surface-300"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-surface-700 dark:text-surface-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors"
                    />
                  </div>

                  {/* Assunto */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="assunto"
                      className="text-sm font-medium text-surface-700 dark:text-surface-300"
                    >
                      Assunto
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      required
                      value={formData.assunto}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-surface-50 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors appearance-none cursor-pointer"
                    >
                      {SUBJECTS.map((s, i) => (
                        <option key={s} value={i === 0 ? '' : s} disabled={i === 0}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="mensagem"
                      className="text-sm font-medium text-surface-700 dark:text-surface-300"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows={5}
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva como podemos ajudar..."
                      className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm sm:text-base py-3.5 px-6 shadow-lg shadow-brand-500/25 transition-colors duration-200 cursor-pointer"
                  >
                    <Send size={16} />
                    Enviar Mensagem
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50 mb-0 flex items-center gap-2">
              <MapPin size={22} className="text-brand-500" />
              Nossa Localizacao
            </h2>

            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800 shadow-sm">
              {/* Stylized map placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-4">
                  <MapPin size={28} className="text-brand-500" />
                </div>
                <p className="text-base font-semibold text-surface-900 dark:text-surface-50">
                  Sonora Instrumentos
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                  Rua da Musica, 123 - Centro
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Sao Paulo - SP, 01310-100
                </p>
              </div>

              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-10 dark:opacity-5" aria-hidden="true">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Pulsing dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" aria-hidden="true">
                <motion.div
                  className="w-4 h-4 rounded-full bg-brand-500"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-50">
              Perguntas Frequentes
            </h2>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
              Encontre respostas rapidas para as duvidas mais comuns.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
