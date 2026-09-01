import type { Language } from '@/lib/settings';

export type CantadaCategory =
  | 'Divertidas'
  | 'Fofas'
  | 'Confiantes'
  | 'Criativas'
  | 'Inteligentes'
  | 'Elogios'
  | 'Elogios 2.0'
  | 'Românticas'
  | 'Sedutoras'
  | 'Provocadoras'
  | 'Tentação'
  | 'Picantes';

export const CATEGORIES: CantadaCategory[] = [
  'Picantes',
  'Divertidas',
  'Fofas',
  'Confiantes',
  'Criativas',
  'Inteligentes',
  'Elogios',
  'Elogios 2.0',
  'Românticas',
  'Sedutoras',
  'Provocadoras',
  'Tentação',
];

export type LocalizedText = Partial<Record<Language, string>>;

export type Cantada = {
  id: number;
  category: CantadaCategory;
  text: LocalizedText;
};

import { CANTADAS_PT } from './cantadas-pt';
import { CANTADAS_PT_NEW } from './cantadas-pt-new';
import { CANTADAS_PICANTES_PT } from './cantadas-picantes-pt';
import { CANTADAS_PREMIUM_PT } from './cantadas-premium-pt';
import { CANTADAS_EN } from './cantadas-en';
import { CANTADAS_EN_NEW } from './cantadas-en-new';
import { CANTADAS_PICANTES_EN } from './cantadas-picantes-en';
import { CANTADAS_PREMIUM_EN } from './cantadas-premium-en';
import { CANTADAS_ES } from './cantadas-es';
import { CANTADAS_ES_NEW } from './cantadas-es-new';
import { CANTADAS_PICANTES_ES } from './cantadas-picantes-es';
import { CANTADAS_PREMIUM_ES } from './cantadas-premium-es';

const ALL_PT = [...CANTADAS_PT, ...CANTADAS_PT_NEW, ...CANTADAS_PICANTES_PT, ...CANTADAS_PREMIUM_PT];

const EN_BY_ID = new Map([...CANTADAS_EN, ...CANTADAS_EN_NEW, ...CANTADAS_PICANTES_EN, ...CANTADAS_PREMIUM_EN].map((c) => [c.id, c.text]));
const ES_BY_ID = new Map([...CANTADAS_ES, ...CANTADAS_ES_NEW, ...CANTADAS_PICANTES_ES, ...CANTADAS_PREMIUM_ES].map((c) => [c.id, c.text]));

export const CANTADAS: Cantada[] = ALL_PT.map((c) => ({
  id: c.id,
  category: c.category,
  text: {
    pt: c.text,
    en: EN_BY_ID.get(c.id) ?? `[Translation missing for #${c.id}]`,
    es: ES_BY_ID.get(c.id) ?? `[Traducción faltante para #${c.id}]`,
  },
}));

export const CANTADAS_BY_CATEGORY: Record<CantadaCategory, Cantada[]> = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat] = CANTADAS.filter((c) => c.category === cat);
    return acc;
  },
  {} as Record<CantadaCategory, Cantada[]>,
);
