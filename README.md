# Portfólio — Erick Valente Sprogis

Portfólio pessoal desenvolvido com HTML, CSS e JavaScript puro, hospedado no GitHub Pages.

## Funcionalidades

- Integração com a GitHub API (foto, projetos e descrições em tempo real)
- Suporte a múltiplos idiomas: Português, Inglês e Espanhol
- Skills clicáveis com link para a documentação oficial de cada tecnologia
- Responsivo para mobile
- Configuração de projetos sem editar código — basta editar `projects.json`

## Como adicionar ou remover projetos

Edite o arquivo `projects.json` e altere a lista `featured_repos` com o nome exato dos repositórios:

```json
"featured_repos": [
  "Chess-AI",
  "Palavritas"
]
```

## Estrutura

```text
├── index.html       # Estrutura da página
├── styles.css       # Estilos (paleta: preto, verde, bege)
├── styles.scss      # Fonte SCSS com variáveis de cor
├── script.js        # Lógica, i18n e integração com GitHub API
└── projects.json    # Configuração: projetos, skills, idiomas, links
```

## Tecnologias

HTML · CSS · JavaScript · GitHub API · GitHub Pages
