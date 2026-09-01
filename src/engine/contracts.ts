import type { Tone, Context, ResponseOption } from '@/types';

export type Language = 'pt' | 'en' | 'es' | 'fr' | 'de';

export type SeduxEngineInput = {
  message: string;
  context: Context;
  tone: Tone;
  intensity: number;
  extraInstructions: string;
  language: Language;
  imageBase64?: string;
};

export type SeduxEngineOutput = {
  options: ResponseOption[];
};

export type ModelRequest = {
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  maxTokens: number;
  imageBase64?: string;
};

export type ModelResponse = {
  text: string;
  tokensUsed: number;
};

export type ModelProviderConfig = {
  id: string;
  label: string;
  endpoint: string;
  modelId: string;
  maxTokens: number;
  temperature: number;
};

export interface ModelProvider {
  readonly id: string;
  generate(req: ModelRequest): Promise<ModelResponse>;
}

export type ProviderErrorKind =
  | 'auth'
  | 'rate_limit'
  | 'network'
  | 'timeout'
  | 'invalid_response'
  | 'quota'
  | 'unknown';

export type ProviderError = {
  kind: ProviderErrorKind;
  message: string;
  providerId: string;
  retryable: boolean;
};
