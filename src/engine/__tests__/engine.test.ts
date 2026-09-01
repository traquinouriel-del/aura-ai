import { describe, it, expect } from 'vitest';
import { SeduxEngine, MockProvider } from '@/engine/index';
import type { SeduxEngineInput } from '@/engine/contracts';
import { CONTEXTS, TONES } from '@/types';

const mockInput: SeduxEngineInput = {
  message: 'Hello there',
  context: CONTEXTS[0],
  tone: TONES[0].id,
  intensity: 0.8,
  extraInstructions: '',
  language: 'en',
};

describe('SeduxEngine integration (MockProvider)', () => {
  it('routes through Gateway → Provider → returns structured output', async () => {
    const engine = new SeduxEngine(new MockProvider());
    const output = await engine.generate(mockInput);

    expect(output).toBeDefined();
    expect(output.options).toBeInstanceOf(Array);
    expect(output.options.length).toBeGreaterThan(0);
    expect(output.options[0].text).toContain('[mock]');
    expect(output.options[0].style).toBe('ideal');
  });

  it('providerId is accessible from engine', () => {
    const engine = new SeduxEngine(new MockProvider());
    expect(engine.providerId).toBe('mock');
  });
});
