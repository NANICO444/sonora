# Manual de Boas Praticas — Projeto Sonora

## Arquitetura e Codigo

### Stack
- React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion
- Deploy: GitHub Pages (branch `gh-pages`)
- Codigo fonte: branch `main`

### Estrutura
```
sonora/
  src/
    components/   # Componentes reutilizaveis (Header, Footer, Hero, Cards)
    pages/        # Paginas completas (Home, Products, Courses, Blog, Cart, Contact)
    context/      # Contextos React (ThemeContext, CartContext)
    data/         # Dados estaticos (products, courses, blogPosts, testimonials)
    index.css     # Tailwind + tema customizado (brand-*, surface-*)
  public/         # Assets estaticos (favicon, icons, 404.html)
  docs/           # Documentacao e regras
```

### Convencoes
- Mobile-first: todas as classes Tailwind partem de mobile
- Tema claro/escuro: usar classes `dark:` do Tailwind, toggle via ThemeContext
- Carrinho: persistencia em localStorage via CartContext
- Rotas: React Router DOM com `basename="/sonora"` (GitHub Pages)
- Animacoes: Framer Motion para transicoes de pagina e interacoes
- Icones: Lucide React (nao usar icons que nao existem no pacote)

### SPA no GitHub Pages
- `public/404.html` faz redirect para `index.html` com query string
- `index.html` tem script que restaura a rota original
- Sem isso, rotas diretas como `/sonora/produtos` dao 404

## Deploy
1. `npm run build` (gera pasta `dist/`)
2. Conteudo de `dist/` vai para branch `gh-pages` via GitHub API
3. GitHub Pages serve automaticamente de `gh-pages`
4. URL: https://nanico444.github.io/sonora/

## Modelo de IA
- Ver `docs/regras_modelo.md`
- Sempre usar Claude Opus 4.7 como principal

## Sincronizacao
- **GitHub:** Codigo fonte + docs (fonte da verdade para codigo)
- **Google Drive:** Backups, apresentacao, arquivos exportados
  - Pasta principal: https://drive.google.com/drive/folders/1BFfjx19eZSsdEpK_CeX3PJg6bvZNHa12
  - Referencia oficial: https://drive.google.com/drive/folders/1pdRe0JoDRo_738AFyAejr5SozTPHUSBO
- **Se arquivos sumirem:** Rebaixar do Drive para o sandbox e reconstruir

## Recuperacao
Se algum arquivo estiver quebrado, faltando ou inconsistente:
1. Baixar versao correta da pasta Google Drive de referencia
2. Reclonar do GitHub: `gh repo clone NANICO444/sonora`
3. `npm install && npm run build`
4. Redeployar no gh-pages
