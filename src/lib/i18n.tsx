import * as React from "react";

export type Locale = "pt" | "en" | "es";

const STORAGE_KEY = "feedback.locale";

type Dict = {
  app: {
    title: string;
    tagline: string;
    homeIntro: string;
    homeCta: string;
    loginCta: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    back: string;
    submit: string;
    submitting: string;
    skip: string;
    finish: string;
    optional: string;
  };
  language: {
    label: string;
    pt: string;
    en: string;
    es: string;
  };
  rate: {
    headline: string;
    subline: string;
    starsLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    send: string;
    sendFeedback: string;
    notFoundTitle: string;
    notFoundDesc: string;
    thanksHigh: string;
    redirecting: string;
    thanksLow: string;
    highTitle: string;
    highMessage: string;
    postOnGoogle: string;
    successTitle: string;
    successMessage: string;
    tagsTitle: string;
    tagsHelp: string;
    tagService: string;
    tagFood: string;
    tagAmbience: string;
    tagWaiting: string;
    tagPrice: string;
    tagCleanliness: string;
    finalThanks: string;
    criteriaTitle: string;
    criteriaHelp: string;
    critFood: string;
    critService: string;
    critCleanliness: string;
    critValue: string;
    detailsLabel: string;
    detailsPlaceholder: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    invalid: string;
    signOut: string;
  };
  dash: {
    title: string;
    welcome: string;
    metricTotal: string;
    metricAverage: string;
    metricPositive: string;
    metricNegative: string;
    improvementWall: string;
    improvementEmpty: string;
    recent: string;
    recentEmpty: string;
    filterPeriod: string;
    period7: string;
    period30: string;
    period90: string;
    periodAll: string;
    filterRating: string;
    ratingAll: string;
    noRestaurant: string;
    tagsLabel: string;
    publicLink: string;
    copyLink: string;
    copied: string;
  };
};

const dictionaries: Record<Locale, Dict> = {
  pt: {
    app: {
      title: "Mural",
      tagline: "Feedback inteligente para restaurantes",
      homeIntro:
        "Capture avaliações no salão, encaminhe as positivas para o Google e receba críticas privadas para melhorar.",
      homeCta: "Acessar painel",
      loginCta: "Entrar",
    },
    common: {
      loading: "Carregando…",
      error: "Algo deu errado.",
      retry: "Tentar novamente",
      back: "Voltar",
      submit: "Enviar",
      submitting: "Enviando…",
      skip: "Pular",
      finish: "Concluir",
      optional: "opcional",
    },
    language: { label: "Idioma", pt: "Português", en: "Inglês", es: "Espanhol" },
    rate: {
      headline: "Como foi sua experiência?",
      subline: "Sua opinião ajuda a melhorar a cada dia.",
      starsLabel: "Toque nas estrelas",
      commentLabel: "Comentário",
      commentPlaceholder: "Conte um pouco mais (opcional)",
      send: "Enviar avaliação",
      sendFeedback: "Enviar feedback",
      notFoundTitle: "Restaurante não encontrado",
      notFoundDesc: "O link que você acessou não está disponível.",
      thanksHigh: "Obrigado! Compartilhe sua avaliação no Google.",
      redirecting: "Redirecionando…",
      thanksLow:
        "Obrigado pelo feedback! Sua opinião foi enviada diretamente ao gerente para melhorarmos nossos serviços.",
      highTitle: "Que ótimo saber disso!",
      highMessage:
        "Ajude outras pessoas a descobrirem nossa comida. Leva apenas 10 segundos para postar no Google!",
      postOnGoogle: "Postar no Google",
      successTitle: "Recebemos seu feedback!",
      successMessage:
        "O gerente foi notificado e sua opinião será usada para melhorarmos a sua próxima visita. Muito obrigado.",
      tagsTitle: "O que poderíamos melhorar?",
      tagsHelp: "Selecione um ou mais (opcional)",
      tagService: "Atendimento",
      tagFood: "Comida",
      tagAmbience: "Ambiente",
      tagWaiting: "Tempo de espera",
      tagPrice: "Preço",
      tagCleanliness: "Limpeza",
      finalThanks: "Pronto! Obrigado por nos ajudar a melhorar.",
      criteriaTitle: "Avalie cada aspecto",
      criteriaHelp: "Toque nas estrelas para classificar",
      critFood: "Comida",
      critService: "Atendimento",
      critCleanliness: "Limpeza",
      critValue: "Custo-benefício",
      detailsLabel: "Quer adicionar algum detalhe?",
      detailsPlaceholder: "Opcional",
    },
    auth: {
      loginTitle: "Acesso do gerente",
      loginSubtitle: "Entre para ver as avaliações do seu restaurante.",
      email: "E-mail",
      password: "Senha",
      signIn: "Entrar",
      invalid: "E-mail ou senha inválidos.",
      signOut: "Sair",
    },
    dash: {
      title: "Painel",
      welcome: "Bem-vindo",
      metricTotal: "Total de avaliações",
      metricAverage: "Média de satisfação",
      metricPositive: "Positivas (4–5★)",
      metricNegative: "Negativas (1–3★)",
      improvementWall: "Mural de Melhorias",
      improvementEmpty: "Nenhuma avaliação negativa no período. 🎉",
      recent: "Avaliações positivas",
      recentEmpty: "Sem avaliações positivas ainda.",
      filterPeriod: "Período",
      period7: "Últimos 7 dias",
      period30: "Últimos 30 dias",
      period90: "Últimos 90 dias",
      periodAll: "Tudo",
      filterRating: "Nota",
      ratingAll: "Todas",
      noRestaurant:
        "Nenhum restaurante vinculado a este usuário. Peça ao administrador para vincular seu restaurante.",
      tagsLabel: "Tags",
      publicLink: "Link público de avaliação",
      copyLink: "Copiar",
      copied: "Copiado!",
    },
  },
  en: {
    app: {
      title: "Mural",
      tagline: "Smart feedback for restaurants",
      homeIntro:
        "Capture in-house reviews, route positive ones to Google, and receive private critiques you can act on.",
      homeCta: "Go to dashboard",
      loginCta: "Sign in",
    },
    common: {
      loading: "Loading…",
      error: "Something went wrong.",
      retry: "Try again",
      back: "Back",
      submit: "Submit",
      submitting: "Submitting…",
      skip: "Skip",
      finish: "Finish",
      optional: "optional",
    },
    language: { label: "Language", pt: "Portuguese", en: "English", es: "Spanish" },
    rate: {
      headline: "How was your experience?",
      subline: "Your feedback helps us improve every day.",
      starsLabel: "Tap the stars",
      commentLabel: "Comment",
      commentPlaceholder: "Tell us a bit more (optional)",
      send: "Send review",
      sendFeedback: "Send feedback",
      notFoundTitle: "Restaurant not found",
      notFoundDesc: "The link you opened is not available.",
      thanksHigh: "Thank you! Share your review on Google.",
      redirecting: "Redirecting…",
      thanksLow:
        "Thanks for your feedback! Your message was sent directly to the manager so we can improve our service.",
      highTitle: "So glad to hear that!",
      highMessage:
        "Help others discover our food. It only takes 10 seconds to post on Google!",
      postOnGoogle: "Post on Google",
      successTitle: "We received your feedback!",
      successMessage:
        "The manager has been notified and your input will help us improve your next visit. Thank you so much.",
      tagsTitle: "What could we improve?",
      tagsHelp: "Select one or more (optional)",
      tagService: "Service",
      tagFood: "Food",
      tagAmbience: "Ambience",
      tagWaiting: "Waiting time",
      tagPrice: "Price",
      tagCleanliness: "Cleanliness",
      finalThanks: "All set! Thanks for helping us improve.",
      criteriaTitle: "Rate each aspect",
      criteriaHelp: "Tap the stars to rate",
      critFood: "Food",
      critService: "Service",
      critCleanliness: "Cleanliness",
      critValue: "Value for money",
      detailsLabel: "Want to add any details?",
      detailsPlaceholder: "Optional",
    },
    auth: {
      loginTitle: "Manager access",
      loginSubtitle: "Sign in to view your restaurant's reviews.",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      invalid: "Invalid email or password.",
      signOut: "Sign out",
    },
    dash: {
      title: "Dashboard",
      welcome: "Welcome",
      metricTotal: "Total reviews",
      metricAverage: "Average rating",
      metricPositive: "Positive (4–5★)",
      metricNegative: "Negative (1–3★)",
      improvementWall: "Improvement Wall",
      improvementEmpty: "No negative reviews in this period. 🎉",
      recent: "Positive reviews",
      recentEmpty: "No positive reviews yet.",
      filterPeriod: "Period",
      period7: "Last 7 days",
      period30: "Last 30 days",
      period90: "Last 90 days",
      periodAll: "All time",
      filterRating: "Rating",
      ratingAll: "All",
      noRestaurant:
        "No restaurant linked to this user. Ask the administrator to link your restaurant.",
      tagsLabel: "Tags",
      publicLink: "Public review link",
      copyLink: "Copy",
      copied: "Copied!",
    },
  },
  es: {
    app: {
      title: "Mural",
      tagline: "Feedback inteligente para restaurantes",
      homeIntro:
        "Captura reseñas en el salón, dirige las positivas a Google y recibe críticas privadas para mejorar.",
      homeCta: "Ir al panel",
      loginCta: "Iniciar sesión",
    },
    common: {
      loading: "Cargando…",
      error: "Algo salió mal.",
      retry: "Reintentar",
      back: "Volver",
      submit: "Enviar",
      submitting: "Enviando…",
      skip: "Omitir",
      finish: "Finalizar",
      optional: "opcional",
    },
    language: { label: "Idioma", pt: "Portugués", en: "Inglés", es: "Español" },
    rate: {
      headline: "¿Cómo fue tu experiencia?",
      subline: "Tu opinión nos ayuda a mejorar cada día.",
      starsLabel: "Toca las estrellas",
      commentLabel: "Comentario",
      commentPlaceholder: "Cuéntanos un poco más (opcional)",
      send: "Enviar reseña",
      sendFeedback: "Enviar feedback",
      notFoundTitle: "Restaurante no encontrado",
      notFoundDesc: "El enlace que abriste no está disponible.",
      thanksHigh: "¡Gracias! Comparte tu reseña en Google.",
      redirecting: "Redirigiendo…",
      thanksLow:
        "¡Gracias por tu opinión! Tu mensaje fue enviado directamente al gerente para mejorar nuestro servicio.",
      highTitle: "¡Qué bueno saberlo!",
      highMessage:
        "Ayuda a otras personas a descubrir nuestra comida. ¡Solo toma 10 segundos publicar en Google!",
      postOnGoogle: "Publicar en Google",
      successTitle: "¡Recibimos tu feedback!",
      successMessage:
        "El gerente fue notificado y tu opinión nos ayudará a mejorar tu próxima visita. Muchas gracias.",
      tagsTitle: "¿Qué podríamos mejorar?",
      tagsHelp: "Selecciona uno o más (opcional)",
      tagService: "Atención",
      tagFood: "Comida",
      tagAmbience: "Ambiente",
      tagWaiting: "Tiempo de espera",
      tagPrice: "Precio",
      tagCleanliness: "Limpieza",
      finalThanks: "¡Listo! Gracias por ayudarnos a mejorar.",
      criteriaTitle: "Valora cada aspecto",
      criteriaHelp: "Toca las estrellas para calificar",
      critFood: "Comida",
      critService: "Servicio",
      critCleanliness: "Limpieza",
      critValue: "Calidad/Precio",
      detailsLabel: "¿Deseas añadir algún detalle más?",
      detailsPlaceholder: "Opcional",
    },
    auth: {
      loginTitle: "Acceso del gerente",
      loginSubtitle: "Inicia sesión para ver las reseñas de tu restaurante.",
      email: "Correo",
      password: "Contraseña",
      signIn: "Entrar",
      invalid: "Correo o contraseña inválidos.",
      signOut: "Salir",
    },
    dash: {
      title: "Panel",
      welcome: "Bienvenido",
      metricTotal: "Total de reseñas",
      metricAverage: "Promedio de satisfacción",
      metricPositive: "Positivas (4–5★)",
      metricNegative: "Negativas (1–3★)",
      improvementWall: "Mural de Mejoras",
      improvementEmpty: "No hay reseñas negativas en el período. 🎉",
      recent: "Reseñas positivas",
      recentEmpty: "Aún no hay reseñas positivas.",
      filterPeriod: "Período",
      period7: "Últimos 7 días",
      period30: "Últimos 30 días",
      period90: "Últimos 90 días",
      periodAll: "Todo",
      filterRating: "Calificación",
      ratingAll: "Todas",
      noRestaurant:
        "Ningún restaurante vinculado a este usuario. Pide al administrador que vincule tu restaurante.",
      tagsLabel: "Etiquetas",
      publicLink: "Enlace público de reseña",
      copyLink: "Copiar",
      copied: "¡Copiado!",
    },
  },
};

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const I18nContext = React.createContext<Ctx | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "pt" || stored === "en" || stored === "es") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return "pt";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("pt");

  React.useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

export const TAG_KEYS = [
  "service",
  "food",
  "ambience",
  "waiting",
  "price",
  "cleanliness",
] as const;
export type TagKey = (typeof TAG_KEYS)[number];

export function tagLabel(t: Dict, key: TagKey): string {
  switch (key) {
    case "service":
      return t.rate.tagService;
    case "food":
      return t.rate.tagFood;
    case "ambience":
      return t.rate.tagAmbience;
    case "waiting":
      return t.rate.tagWaiting;
    case "price":
      return t.rate.tagPrice;
    case "cleanliness":
      return t.rate.tagCleanliness;
  }
}
