export const mainMenu = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Instrumentos",
    href: "/instrumentos",
    children: [
      { label: "Cordas", href: "/instrumentos/cordas" },
      { label: "Sopro", href: "/instrumentos/sopro" },
      { label: "Percussao", href: "/instrumentos/percussao" },
      { label: "Teclas", href: "/instrumentos/teclas" },
      { label: "Acessorios", href: "/instrumentos/acessorios" },
      { label: "Ver Todos", href: "/instrumentos" },
    ],
  },
  {
    label: "Cursos",
    href: "/cursos",
    children: [
      { label: "Violao e Guitarra", href: "/cursos/violao" },
      { label: "Piano e Teclado", href: "/cursos/piano" },
      { label: "Bateria", href: "/cursos/bateria" },
      { label: "Canto", href: "/cursos/canto" },
      { label: "Teoria Musical", href: "/cursos/teoria-musical" },
      { label: "Producao Musical", href: "/cursos/producao-musical" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Ofertas",
    href: "/ofertas",
    badge: "Hot",
  },
  {
    label: "Contato",
    href: "/contato",
  },
];

export const footerSections = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Sonora", href: "/sobre" },
      { label: "Nossa Historia", href: "/sobre#historia" },
      { label: "Trabalhe Conosco", href: "/carreiras" },
      { label: "Politica de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Trocas e Devolucoes", href: "/trocas" },
      { label: "Prazo de Entrega", href: "/entrega" },
      { label: "Formas de Pagamento", href: "/pagamento" },
      { label: "Fale Conosco", href: "/contato" },
    ],
  },
  {
    title: "Categorias",
    links: [
      { label: "Violoes e Guitarras", href: "/instrumentos/cordas" },
      { label: "Pianos e Teclados", href: "/instrumentos/teclas" },
      { label: "Baterias e Percussao", href: "/instrumentos/percussao" },
      { label: "Sopro", href: "/instrumentos/sopro" },
      { label: "Acessorios", href: "/instrumentos/acessorios" },
    ],
  },
  {
    title: "Aprenda",
    links: [
      { label: "Cursos Online", href: "/cursos" },
      { label: "Blog", href: "/blog" },
      { label: "Dicas para Iniciantes", href: "/blog?categoria=Dicas" },
      { label: "Tutoriais", href: "/blog?categoria=Tutorial" },
      { label: "Canal no YouTube", href: "https://youtube.com/@sonora" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/sonora", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/sonora", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@sonora", icon: "youtube" },
  { label: "TikTok", href: "https://tiktok.com/@sonora", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/5511999999999", icon: "whatsapp" },
];

export const contactInfo = {
  phone: "(11) 4002-8922",
  whatsapp: "(11) 99999-9999",
  email: "contato@sonora.com.br",
  address: "Rua da Musica, 440 - Vila Madalena, Sao Paulo - SP, 05443-010",
  hours: "Seg a Sex: 9h as 18h | Sab: 9h as 13h",
};
