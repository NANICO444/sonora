import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  Clock,
  Music,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  QrCode,
  Banknote,
  Globe,
  Video,
  MessageCircle,
  Camera,
} from 'lucide-react'

const institucionalLinks = [
  { label: 'Sobre Nos', to: '#' },
  { label: 'Nossa Historia', to: '#' },
  { label: 'Trabalhe Conosco', to: '#' },
  { label: 'Blog', to: '/blog' },
]

const atendimentoLinks = [
  { label: 'Central de Ajuda', to: '#' },
  { label: 'Trocas e Devolvucoes', to: '#' },
  { label: 'Prazo de Entrega', to: '#' },
  { label: 'Formas de Pagamento', to: '#' },
]

const socialLinks = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Video, href: '#', label: 'Youtube' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="relative mt-auto">
      {/* Newsletter Bar */}
      <div className="bg-brand-500 dark:bg-brand-600">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Receba ofertas exclusivas
              </h3>
              <p className="mt-1 text-sm text-white/80">
                Cadastre-se e ganhe 10% de desconto na primeira compra
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-center gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  required
                  className="w-full rounded-lg border-0 bg-white/95 py-3 pl-10 pr-4 text-sm text-surface-900 placeholder-surface-400 shadow-sm outline-none transition focus:ring-2 focus:ring-white/50 dark:bg-surface-800 dark:text-surface-50 dark:placeholder-surface-500"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-surface-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-surface-800 active:scale-[0.97] dark:bg-white dark:text-surface-900 dark:hover:bg-surface-100"
              >
                {subscribed ? 'Inscrito!' : 'Assinar'}
                {!subscribed && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-surface-900 dark:bg-surface-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1 - Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="group inline-flex items-center gap-2">
                <Music className="h-7 w-7 text-brand-400 transition group-hover:text-brand-300" />
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  Sonora
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-surface-400">
                Sua jornada musical comeca aqui. Instrumentos, equipamentos e
                acessorios para todos os niveis.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-800 text-surface-400 transition hover:bg-brand-500 hover:text-white dark:bg-surface-800 dark:hover:bg-brand-600"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Institucional */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300">
                Institucional
              </h4>
              <ul className="mt-4 space-y-3">
                {institucionalLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-surface-400 transition hover:text-brand-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Atendimento */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300">
                Atendimento
              </h4>
              <ul className="mt-4 space-y-3">
                {atendimentoLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-surface-400 transition hover:text-brand-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contato */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300">
                Contato
              </h4>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <a
                    href="mailto:contato@sonora.com.br"
                    className="text-sm text-surface-400 transition hover:text-brand-400"
                  >
                    contato@sonora.com.br
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <a
                    href="tel:+551199998888"
                    className="text-sm text-surface-400 transition hover:text-brand-400"
                  >
                    (11) 9999-8888
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span className="text-sm text-surface-400">
                    Seg - Sex, 9h as 18h
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-surface-800" />
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Copyright */}
            <p className="text-xs text-surface-500">
              &copy; {new Date().getFullYear()} Sonora. Todos os direitos
              reservados.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="mr-1 text-xs text-surface-500">Pagamento:</span>
              {[
                { icon: CreditCard, label: 'Cartao de Credito' },
                { icon: CreditCard, label: 'Cartao de Debito' },
                { icon: Banknote, label: 'Boleto' },
                { icon: QrCode, label: 'Pix' },
                { icon: Building2, label: 'Transferencia' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  title={label}
                  className="flex h-8 w-10 items-center justify-center rounded bg-surface-800 text-surface-400 transition hover:text-surface-300"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-1.5 text-xs text-surface-500">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>Compra 100% Segura</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
