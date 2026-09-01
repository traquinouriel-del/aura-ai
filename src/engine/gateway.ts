import type { ModelProvider, ModelRequest, ModelResponse, ModelProviderConfig } from './contracts';
import { SeduxProviderError } from './errors';
import { getProviderConfig, SEDUX_ENGINE_CONFIG } from './config';

export class ModelGateway {
  private provider: ModelProvider;
  private config: ModelProviderConfig | undefined;

  constructor(provider: ModelProvider, configId?: string) {
    this.provider = provider;
    this.config = configId ? getProviderConfig(configId) : undefined;
  }

  async request(req: ModelRequest): Promise<ModelResponse> {
    const maxRetries = SEDUX_ENGINE_CONFIG.maxRetries;
    const timeoutMs = SEDUX_ENGINE_CONFIG.requestTimeoutMs;
    let lastError: SeduxProviderError | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        return await this.provider.generate(req);
      } catch (err) {
        if (err instanceof SeduxProviderError) {
          lastError = err;
          if (!err.retryable) break;
        } else if (err instanceof DOMException && err.name === 'AbortError') {
          lastError = new SeduxProviderError('timeout', 'Gateway request timed out', this.provider.id, true);
        } else {
          lastError = new SeduxProviderError('unknown', err instanceof Error ? err.message : 'Request failed', this.provider.id, false);
          break;
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    throw lastError ?? new SeduxProviderError('unknown', 'Request failed', this.provider.id, false);
  }

  get providerId(): string {
    return this.provider.id;
  }
}
