import type { SeduxEngineInput, SeduxEngineOutput, ModelProvider, ModelRequest } from './contracts';
import { ModelGateway } from './gateway';

export class SeduxEngine {
  private gateway: ModelGateway;

  constructor(provider: ModelProvider, configId?: string) {
    this.gateway = new ModelGateway(provider, configId);
  }

  async generate(input: SeduxEngineInput): Promise<SeduxEngineOutput> {
    const req: ModelRequest = {
      systemPrompt: '',
      userPrompt: input.message,
      temperature: input.intensity || 0.8,
      maxTokens: 1024,
      imageBase64: input.imageBase64,
    };

    const response = await this.gateway.request(req);
    return {
      options: [{
        style: 'ideal',
        label: 'Response',
        text: response.text,
      }],
    };
  }

  get providerId(): string {
    return this.gateway.providerId;
  }
}
