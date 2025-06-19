import { describe, it, expect } from 'vitest';

import { calculateSum } from './index';

describe('calculateSum', () => {
  it('should add two positive numbers correctly', () => {
    expect(calculateSum(2, 3)).toBe(5);
    expect(calculateSum(10, 20)).toBe(30);
    expect(calculateSum(0, 5)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(calculateSum(-2, 3)).toBe(1);
    expect(calculateSum(2, -3)).toBe(-1);
    expect(calculateSum(-2, -3)).toBe(-5);
  });

  it('should handle decimal numbers', () => {
    expect(calculateSum(2.5, 3.5)).toBe(6);
    expect(calculateSum(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it('should handle zero values', () => {
    expect(calculateSum(0, 0)).toBe(0);
    expect(calculateSum(5, 0)).toBe(5);
    expect(calculateSum(0, 5)).toBe(5);
  });
});
