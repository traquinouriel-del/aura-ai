import type { ModelProvider, ModelRequest, ModelResponse, ProviderErrorKind } from '../contracts';
import { SeduxProviderError } from '../errors';

export class SeduxEdgeProvider implements ModelProvider {
  readonly id = 'sedux-edge';
  private endpoint: string;

  constructor(endpoint?: string) {
    this.endpoint = endpoint ?? this.defaultEndpoint();
  }

  private defaultEndpoint(): string {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    if (!supabaseUrl) {
      throw new SeduxProviderError('auth', 'VITE_SUPABASE_URL not configured', this.id, false);
    }
    return `${supabaseUrl}/functions/v1/sedux-generate`;
  }

  async generate(req: ModelRequest): Promise<ModelResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const resp = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: req.systemPrompt,
          userPrompt: req.userPrompt,
          temperature: req.temperature,
          maxTokens: req.maxTokens,
          imageBase64: req.imageBase64,
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        const kind = (body.kind as ProviderErrorKind) ?? this.statusToKind(resp.status);
        const retryable = kind === 'rate_limit' || kind === 'network' || kind === 'timeout';
        throw new SeduxProviderError(kind, body.error ?? `HTTP ${resp.status}`, this.id, retryable);
      }

      const data = await resp.json();
      return {
        text: data.text ?? '',
        tokensUsed: data.tokensUsed ?? 0,
      };
    } catch (err) {
      if (err instanceof SeduxProviderError) throw err;
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new SeduxProviderError('timeout', 'Request timed out', this.id, true);
      }
      throw new SeduxProviderError('network', err instanceof Error ? err.message : 'Network error', this.id, true);
    } finally {
      clearTimeout(timeout);
    }
  }

  private statusToKind(status: number): ProviderErrorKind {
    if (status === 401 || status === 403) return 'auth';
    if (status === 429) return 'rate_limit';
    if (status === 503) return 'quota';
    if (status >= 500) return 'network';
    return 'unknown';
  }
}
