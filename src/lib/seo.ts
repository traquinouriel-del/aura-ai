import type { Language } from './settings';

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://auraai.app').replace(/\/$/, '');
const SITE_NAME = 'Aura AI';
const TWITTER_HANDLE = '@AuraAI';

export type PageArea = 'public' | 'private';



const SEO_STRINGS: Record<Language, {
  htmlLang: string;
  title: string;
  description: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  locale: string;
  jsonLdDescription: string;
}> = {
  pt: {
    htmlLang: 'pt-PT',
    title: 'Aura AI — IA para Conversas Inteligentes e Respostas Personalizadas',
    description: 'Aura AI é uma inteligência artificial que analisa conversas, interpreta o contexto e cria respostas naturais, personalizadas e inteligentes para diferentes situações sociais.',
    ogDescription: 'Aura AI analisa conversas, interpreta o contexto e cria respostas naturais e inteligentes para ti.',
    twitterTitle: 'Aura AI — IA para Conversas Inteligentes',
    twitterDescription: 'Cria respostas naturais, personalizadas e inteligentes para qualquer conversa.',
    locale: 'pt_PT',
    jsonLdDescription: 'Aura AI é uma inteligência artificial que analisa conversas, interpreta o contexto e cria respostas naturais, personalizadas e inteligentes para diferentes situações sociais.',
  },
  en: {
    htmlLang: 'en',
    title: 'Aura AI — AI for Smart Conversations and Personalized Replies',
    description: 'Aura AI is an artificial intelligence that analyzes conversations, interprets context and creates natural, personalized and intelligent replies for different social situations.',
    ogDescription: 'Aura AI analyzes conversations, interprets context and creates natural and intelligent replies for you.',
    twitterTitle: 'Aura AI — AI for Smart Conversations',
    twitterDescription: 'Create natural, personalized and intelligent replies for any conversation.',
    locale: 'en_US',
    jsonLdDescription: 'Aura AI is an artificial intelligence that analyzes conversations, interprets context and creates natural, personalized and intelligent replies for different social situations.',
  },
  es: {
    htmlLang: 'es',
    title: 'Aura AI — IA para Conversaciones Inteligentes y Respuestas Personalizadas',
    description: 'Aura AI es una inteligencia artificial que analiza conversaciones, interpreta el contexto y crea respuestas naturales, personalizadas e inteligentes para diferentes situaciones sociales.',
    ogDescription: 'Aura AI analiza conversaciones, interpreta el contexto y crea respuestas naturales e inteligentes para ti.',
    twitterTitle: 'Aura AI — IA para Conversaciones Inteligentes',
    twitterDescription: 'Crea respuestas naturales, personalizadas e inteligentes para cualquier conversación.',
    locale: 'es_ES',
    jsonLdDescription: 'Aura AI es una inteligencia artificial que analiza conversaciones, interpreta el contexto y crea respuestas naturales, personalizadas e inteligentes para diferentes situaciones sociales.',
  },
  fr: {
    htmlLang: 'fr',
    title: 'Aura AI — IA pour Conversations Intelligentes et Réponses Personnalisées',
    description: 'Aura AI est une intelligence artificielle qui analyse les conversations, interprète le contexte et crée des réponses naturelles, personnalisées et intelligentes pour différentes situations sociales.',
    ogDescription: 'Aura AI analyse les conversations, interprète le contexte et crée des réponses naturelles et intelligentes pour toi.',
    twitterTitle: 'Aura AI — IA pour Conversations Intelligentes',
    twitterDescription: 'Crée des réponses naturelles, personnalisées et intelligentes pour toute conversation.',
    locale: 'fr_FR',
    jsonLdDescription: 'Aura AI est une intelligence artificielle qui analyse les conversations, interprète le contexte et crée des réponses naturelles, personnalisées et intelligentes pour différentes situations sociales.',
  },
  de: {
    htmlLang: 'de',
    title: 'Aura AI — KI für Intelligente Gespräche und Personalisierte Antworten',
    description: 'Aura AI ist eine künstliche Intelligenz, die Gespräche analysiert, den Kontext interpretiert und natürliche, personalisierte und intelligente Antworten für verschiedene soziale Situationen erstellt.',
    ogDescription: 'Aura AI analysiert Gespräche, interpretiert den Kontext und erstellt natürliche und intelligente Antworten für dich.',
    twitterTitle: 'Aura AI — KI für Intelligente Gespräche',
    twitterDescription: 'Erstelle natürliche, personalisierte und intelligente Antworten für jede Konversation.',
    locale: 'de_DE',
    jsonLdDescription: 'Aura AI ist eine künstliche Intelligenz, die Gespräche analysiert, den Kontext interpretiert und natürliche, personalisierte und intelligente Antworten für verschiedene soziale Situationen erstellt.',
  },
};

const HREFLANG_MAP: Record<Language, string> = {
  pt: 'pt-PT',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

const ALL_LANGS: Language[] = ['pt', 'en', 'es', 'fr', 'de'];

function ensureMeta(name: string, attr: 'name' | 'property'): HTMLMetaElement {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  return el;
}

function ensureCanonical(): HTMLLinkElement {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  return el;
}

function ensureJsonLd(): HTMLScriptElement {
  let el = document.head.querySelector('script[type="application/ld+json"]#aura-schema') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'aura-schema';
    document.head.appendChild(el);
  }
  return el;
}

function isProd(): boolean {
  return import.meta.env.PROD;
}

export function updateSEO(lang: Language, area: PageArea): void {
  const s = SEO_STRINGS[lang];

  document.documentElement.lang = s.htmlLang;

  document.title = s.title;

  ensureMeta('description', 'name').setAttribute('content', s.description);
  ensureMeta('theme-color', 'name').setAttribute('content', '#0a0a0f');

  const robotsContent = area === 'private' || !isProd()
    ? 'noindex, nofollow'
    : 'index, follow';
  ensureMeta('robots', 'name').setAttribute('content', robotsContent);

  ensureCanonical().setAttribute('href', SITE_URL);

  ensureMeta('og:site_name', 'property').setAttribute('content', SITE_NAME);
  ensureMeta('og:title', 'property').setAttribute('content', s.title);
  ensureMeta('og:description', 'property').setAttribute('content', s.ogDescription);
  ensureMeta('og:type', 'property').setAttribute('content', 'website');
  ensureMeta('og:url', 'property').setAttribute('content', SITE_URL);
  ensureMeta('og:locale', 'property').setAttribute('content', s.locale);
  ensureMeta('og:image', 'property').setAttribute('content', `${SITE_URL}/og-banner.png`);

  ensureMeta('twitter:card', 'name').setAttribute('content', 'summary_large_image');
  ensureMeta('twitter:creator', 'name').setAttribute('content', TWITTER_HANDLE);
  ensureMeta('twitter:title', 'name').setAttribute('content', s.twitterTitle);
  ensureMeta('twitter:description', 'name').setAttribute('content', s.twitterDescription);
  ensureMeta('twitter:image', 'name').setAttribute('content', `${SITE_URL}/og-banner.png`);

  ALL_LANGS.forEach((l) => {
    const hl = HREFLANG_MAP[l];
    ensureLink('alternate', hl).setAttribute('href', SITE_URL);
  });
  ensureLink('alternate', 'x-default').setAttribute('href', SITE_URL);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Aura AI',
    applicationCategory: 'SocialNetworkingApplication',
    applicationSubCategory: 'Lifestyle',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: s.jsonLdDescription,
    image: `${SITE_URL}/og-banner.png`,
    logo: `${SITE_URL}/aura.svg`,
    inLanguage: ALL_LANGS.map((l) => HREFLANG_MAP[l]),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  };
  ensureJsonLd().textContent = JSON.stringify(jsonLd);
}

export function getSiteUrl(): string {
  return SITE_URL;
}
