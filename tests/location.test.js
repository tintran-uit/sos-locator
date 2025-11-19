import { describe, it, expect } from 'vitest';
import { getCurrentPosition } from '../src/services/location';

describe('getCurrentPosition', () => {
  it('rejects if geolocation unsupported', async () => {
    const original = global.navigator.geolocation;
    // Temporarily remove geolocation support
    Object.defineProperty(global.navigator, 'geolocation', {
      configurable: true,
      value: undefined
    });
    await expect(getCurrentPosition()).rejects.toBeTruthy();
    // Restore
    Object.defineProperty(global.navigator, 'geolocation', {
      configurable: true,
      value: original
    });
  });
});
