import type { ModelProviderConfig } from './contracts';

const DEFAULT_TEMPERATURE = 0.8;
const DEFAULT_MAX_TOKENS = 1024;

export const SEDUX_ENGINE_CONFIG = {
  defaultTemperature: DEFAULT_TEMPERATURE,
  defaultMaxTokens: DEFAULT_MAX_TOKENS,
  requestTimeoutMs: 30_000,
  maxRetries: 2,
} as const;

export const PROVIDER_CONFIGS: Record<string, ModelProviderConfig> = {
  'sedux-edge': {
    id: 'sedux-edge',
    label: 'SEDUX Edge Proxy',
    endpoint: '',
    modelId: '',
    maxTokens: 1024,
    temperature: 0.8,
  },
};

export function getProviderConfig(id: string): ModelProviderConfig | undefined {
  return PROVIDER_CONFIGS[id];
}
