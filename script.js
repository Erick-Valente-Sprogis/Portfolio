// ===== i18n =====

const TRANSLATIONS = {
  pt: {
    "nav.about":       "Sobre",
    "nav.skills":      "Habilidades",
    "nav.projects":    "Projetos",
    "section.about":   "Sobre",
    "section.skills":  "Habilidades",
    "section.projects":"Projetos",
    "label.education": "Formação",
    "label.location":  "Localização",
    "skills.known":    "Linguagens & Ferramentas",
    "skills.learning": "Estudando no momento",
    "projects.hint":   "Para adicionar ou remover projetos, edite projects.json → featured_repos.",
    "state.loading":   "Carregando projetos...",
    "state.error":     "Não foi possível carregar os projetos. Verifique os nomes em projects.json.",
    "state.empty":     "Configure os projetos em projects.json → featured_repos.",
    "btn.github":      "GitHub",
    "btn.linkedin":    "LinkedIn",
    "btn.instagram":   "Instagram",
    "btn.email":       "Email",
    "no.description":  "Sem descrição disponível.",
  },
  en: {
    "nav.about":       "About",
    "nav.skills":      "Skills",
    "nav.projects":    "Projects",
    "section.about":   "About",
    "section.skills":  "Skills",
    "section.projects":"Projects",
    "label.education": "Education",
    "label.location":  "Location",
    "skills.known":    "Languages & Tools",
    "skills.learning": "Currently studying",
    "projects.hint":   "To add or remove projects, edit projects.json → featured_repos.",
    "state.loading":   "Loading projects...",
    "state.error":     "Could not load projects. Check the names in projects.json.",
    "state.empty":     "Configure your projects in projects.json → featured_repos.",
    "btn.github":      "GitHub",
    "btn.linkedin":    "LinkedIn",
    "btn.instagram":   "Instagram",
    "btn.email":       "Email",
    "no.description":  "No description available.",
  },
  es: {
    "nav.about":       "Sobre mí",
    "nav.skills":      "Habilidades",
    "nav.projects":    "Proyectos",
    "section.about":   "Sobre mí",
    "section.skills":  "Habilidades",
    "section.projects":"Proyectos",
    "label.education": "Educación",
    "label.location":  "Ubicación",
    "skills.known":    "Lenguajes y Herramientas",
    "skills.learning": "Estudiando actualmente",
    "projects.hint":   "Para agregar o quitar proyectos, edita projects.json → featured_repos.",
    "state.loading":   "Cargando proyectos...",
    "state.error":     "No se pudieron cargar los proyectos. Verifica los nombres en projects.json.",
    "state.empty":     "Configura los proyectos en projects.json → featured_repos.",
    "btn.github":      "GitHub",
    "btn.linkedin":    "LinkedIn",
    "btn.instagram":   "Instagram",
    "btn.email":       "Email",
    "no.description":  "Sin descripción disponible.",
  },
};

const SUPPORTED_LANGS = ["pt", "en", "es"];
let currentLang = localStorage.getItem("lang") || "pt";
let appConfig = null;
let appGhUser = null;

function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.pt)[key] || key;
}

function getLocalized(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[currentLang] || value.pt || value.en || "";
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Atualiza o atributo lang do HTML
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es";

  // Atualiza todos os elementos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation = t(key);
    if (translation) el.textContent = translation;
  });

  // Atualiza botões do switcher
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Re-renderiza conteúdo dinâmico dependente de idioma
  if (appConfig && appGhUser !== null) {
    updateDynamicContent();
  }
}

function updateDynamicContent() {
  const cfg = appConfig;
  const ghUser = appGhUser;

  const roleEl = document.getElementById("about-role");
  if (roleEl) roleEl.textContent = getLocalized(cfg.role);

  const eduEl = document.getElementById("about-education");
  if (eduEl) eduEl.textContent = getLocalized(cfg.education);

  const bioEl = document.getElementById("about-bio");
  if (bioEl) {
    const bio = getLocalized(cfg.bio);
    bioEl.textContent = bio || (ghUser && ghUser.bio) || "";
  }

  const locEl = document.getElementById("about-location");
  if (locEl) locEl.textContent = cfg.location || "";

  const footerEl = document.getElementById("footer-text");
  if (footerEl) {
    footerEl.textContent = `© ${new Date().getFullYear()} ${cfg.name || cfg.github_username}`;
  }
}

// ===== Docs de linguagens/ferramentas =====

const SKILL_LINKS = {
  Python:        "https://docs.python.org/3/",
  JavaScript:    "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  TypeScript:    "https://www.typescriptlang.org/docs/",
  Java:          "https://docs.oracle.com/en/java/",
  C:             "https://devdocs.io/c/",
  "C#":          "https://learn.microsoft.com/pt-br/dotnet/csharp/",
  "C++":         "https://en.cppreference.com/w/",
  Kotlin:        "https://kotlinlang.org/docs/home.html",
  PHP:           "https://www.php.net/docs.php",
  HTML:          "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
  CSS:           "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
  SCSS:          "https://sass-lang.com/documentation/",
  React:         "https://react.dev/",
  "Vue.js":      "https://vuejs.org/guide/",
  "Node.js":     "https://nodejs.org/en/docs/",
  Django:        "https://docs.djangoproject.com/",
  Spring:        "https://spring.io/projects/spring-framework",
  Laravel:       "https://laravel.com/docs/",
  "Next.js":     "https://nextjs.org/docs",
  "React Native":"https://reactnative.dev/docs/getting-started",
  Flutter:       "https://docs.flutter.dev/",
  MySQL:         "https://dev.mysql.com/doc/",
  PostgreSQL:    "https://www.postgresql.org/docs/",
  MongoDB:       "https://www.mongodb.com/docs/",
  Supabase:      "https://supabase.com/docs",
  Git:           "https://git-scm.com/doc",
  Docker:        "https://docs.docker.com/",
  AWS:           "https://docs.aws.amazon.com/",
  Azure:         "https://learn.microsoft.com/pt-br/azure/",
};

// ===== Cores e ícones de linguagem =====

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Java:       "#b07219",
  "C++":      "#f34b7d",
  C:          "#555555",
  "C#":       "#178600",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  SCSS:       "#c6538c",
  Rust:       "#dea584",
  Go:         "#00ADD8",
  Ruby:       "#701516",
  Swift:      "#F05138",
  Kotlin:     "#A97BFF",
  Dart:       "#00B4AB",
  Shell:      "#89e051",
  Lua:        "#000080",
  PHP:        "#4F5D95",
  R:          "#198CE7",
};

const LANG_ICONS = {
  JavaScript: "🟨",
  TypeScript: "🔷",
  Python:     "🐍",
  Java:       "☕",
  "C++":      "⚡",
  C:          "🔵",
  "C#":       "🟣",
  HTML:       "🌐",
  CSS:        "🎨",
  SCSS:       "🎨",
  Rust:       "🦀",
  Go:         "🐹",
  Ruby:       "💎",
  Swift:      "🍎",
  Kotlin:     "🟠",
  Dart:       "🎯",
  Shell:      "🐚",
  Lua:        "🌙",
  PHP:        "🐘",
};

// ===== Utilitários =====

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// ===== Fetch helpers =====

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function loadConfig() {
  try {
    return await fetchJSON("./projects.json");
  } catch {
    console.warn("projects.json não encontrado, usando defaults.");
    return {
      github_username: "Erick-Valente-Sprogis",
      name: "Portfólio",
      role: { pt: "", en: "", es: "" },
      education: { pt: "", en: "", es: "" },
      bio: { pt: "", en: "", es: "" },
      linkedin: "",
      email: "",
      skills_known: [],
      skills_learning: [],
      featured_repos: [],
    };
  }
}

async function fetchGitHubUser(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}

async function fetchRepo(username, repoName) {
  try {
    return await fetchJSON(`https://api.github.com/repos/${username}/${repoName}`);
  } catch {
    return null;
  }
}

// ===== Renderização =====

function makeSkillTag(skill) {
  const url = SKILL_LINKS[skill];
  if (url) {
    const a = el("a", "skill-tag", skill);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = skill;
    return a;
  }
  return el("span", "skill-tag", skill);
}

function renderSkills(config) {
  const knownEl    = document.getElementById("skills-known");
  const learningEl = document.getElementById("skills-learning");

  (config.skills_known || []).forEach((skill) => {
    knownEl.appendChild(makeSkillTag(skill));
  });

  (config.skills_learning || []).forEach((skill) => {
    learningEl.appendChild(makeSkillTag(skill));
  });
}

function renderProjectCard(repo) {
  const card = document.createElement("a");
  card.href = repo.html_url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.className = "project-card";

  const lang  = repo.language;
  const icon  = LANG_ICONS[lang] || "💻";
  const color = LANG_COLORS[lang] || "#8BAE66";
  const title = repo.name.replace(/[-_]/g, " ");
  const desc  = repo.description || t("no.description");

  const langHtml = lang
    ? `<div class="project-lang">
         <span class="lang-dot" style="background:${color}"></span>
         ${lang}
       </div>`
    : "";

  card.innerHTML = `
    <div class="project-icon">${icon}</div>
    <div class="project-title">${title}</div>
    <div class="project-description">${desc}</div>
    ${langHtml}
  `;

  return card;
}

function renderAbout(config, ghUser) {
  appConfig = config;
  appGhUser = ghUser;

  // Nome
  const nameEl = document.getElementById("about-name");
  if (nameEl) nameEl.textContent = config.name || ghUser.name || config.github_username;

  // Logo no header (primeiro nome)
  const headerName = document.getElementById("header-name");
  if (headerName) {
    headerName.textContent = (config.name || "Portfólio").split(" ")[0];
  }

  // Foto de perfil
  const photoEl = document.getElementById("profile-photo");
  if (photoEl && ghUser.avatar_url) {
    photoEl.src = ghUser.avatar_url;
    photoEl.alt = `Foto de ${config.name || config.github_username}`;
  }

  // Links sociais
  const linksEl = document.getElementById("about-links");
  if (linksEl) {
    const links = [
      { url: ghUser.html_url,   key: "btn.github" },
      { url: config.linkedin,   key: "btn.linkedin" },
      { url: config.instagram,  key: "btn.instagram" },
      { url: config.email ? `mailto:${config.email}` : null, key: "btn.email" },
    ];

    links.forEach(({ url, key }) => {
      if (!url) return;
      const a = el("a", "btn", t(key));
      a.href = url;
      if (!url.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.dataset.i18nBtn = key;
      linksEl.appendChild(a);
    });
  }

  updateDynamicContent();
}

// ===== Menu mobile =====

function setupMobileMenu() {
  const toggle    = document.querySelector(".nav-toggle");
  const navMobile = document.getElementById("nav-mobile");
  if (!toggle || !navMobile) return;

  toggle.addEventListener("click", () => {
    const open = navMobile.classList.toggle("open");
    navMobile.setAttribute("aria-hidden", String(!open));
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  });

  navMobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMobile.classList.remove("open");
      navMobile.setAttribute("aria-hidden", "true");
      toggle.innerHTML = "&#9776;";
    });
  });
}

// ===== Seletor de idioma =====

function setupLangSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang && SUPPORTED_LANGS.includes(lang) && lang !== currentLang) {
        applyLang(lang);
        // Atualiza também os textos dos botões de link social
        document.querySelectorAll("[data-i18n-btn]").forEach((a) => {
          a.textContent = t(a.dataset.i18nBtn);
        });
      }
    });
  });
}

// ===== Init =====

async function init() {
  setupMobileMenu();
  setupLangSwitcher();

  // Aplica idioma salvo (apenas strings estáticas antes do fetch)
  applyLang(currentLang);

  const config = await loadConfig();
  const username = config.github_username || "Erick-Valente-Sprogis";

  let ghUser = {};
  try {
    ghUser = await fetchGitHubUser(username);
  } catch (e) {
    console.error("Erro ao buscar usuário GitHub:", e);
  }

  renderAbout(config, ghUser);
  renderSkills(config);

  // Projetos
  const grid = document.getElementById("projects-grid");

  if (!config.featured_repos || config.featured_repos.length === 0) {
    grid.innerHTML = `<div class="loading">${t("state.empty")}</div>`;
    return;
  }

  const repos = await Promise.all(
    config.featured_repos.map((name) => fetchRepo(username, name))
  );

  const valid = repos.filter(Boolean);
  grid.innerHTML = "";

  if (valid.length === 0) {
    grid.innerHTML = `<div class="error">${t("state.error")}</div>`;
    return;
  }

  valid.forEach((repo) => grid.appendChild(renderProjectCard(repo)));
}

init();
