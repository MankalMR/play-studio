import test from 'node:test';
import assert from 'node:assert';
import { calculateScore } from './engine.ts';

test('calculateScore', async (t) => {
  await t.test('should return 0 for undefined word', () => {
    assert.strictEqual(calculateScore(undefined, 4, 3), 0);
  });

  await t.test('should return 0 for words shorter than minWordLength', () => {
    assert.strictEqual(calculateScore('hi', 4, 3), 0);
    assert.strictEqual(calculateScore('cat', 4, 4), 0);
  });

  await t.test('should return correct scores for standard lengths', () => {
    // Length 3
    assert.strictEqual(calculateScore('cat', 4, 3), 1);
    // Length 4
    assert.strictEqual(calculateScore('cats', 4, 3), 2);
    // Length 5
    assert.strictEqual(calculateScore('apple', 4, 3), 3);
    // Length 6
    assert.strictEqual(calculateScore('banana', 4, 3), 5);
    // Length 7
    assert.strictEqual(calculateScore('letters', 4, 3), 8);
    // Length 8+
    assert.strictEqual(calculateScore('mountain', 4, 3), 13);
    assert.strictEqual(calculateScore('mountains', 4, 3), 13);
  });

  await t.test('should respect minWordLength', () => {
    assert.strictEqual(calculateScore('cat', 4, 3), 1);
    assert.strictEqual(calculateScore('cat', 4, 4), 0);
  });

  await t.test('should return 0 for words of length 1 or 2 even if minWordLength is small', () => {
    assert.strictEqual(calculateScore('a', 4, 1), 0);
    assert.strictEqual(calculateScore('at', 4, 1), 0);
  });
});
