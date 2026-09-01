import type { ModelProvider, ModelRequest, ModelResponse } from '../contracts';

export class MockProvider implements ModelProvider {
  readonly id = 'mock';

  async generate(req: ModelRequest): Promise<ModelResponse> {
    return {
      text: `[mock] ${req.userPrompt}`,
      tokensUsed: req.userPrompt.length,
    };
  }
}
