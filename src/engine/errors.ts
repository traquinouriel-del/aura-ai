import type { ProviderError, ProviderErrorKind } from './contracts';

export class SeduxProviderError extends Error implements ProviderError {
  readonly kind: ProviderErrorKind;
  readonly providerId: string;
  readonly retryable: boolean;

  constructor(kind: ProviderErrorKind, message: string, providerId: string, retryable = false) {
    super(message);
    this.name = 'SeduxProviderError';
    this.kind = kind;
    this.providerId = providerId;
    this.retryable = retryable;
  }
}

export class SeduxEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeduxEngineError';
  }
}
