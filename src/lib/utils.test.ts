import test from 'node:test';
import assert from 'node:assert';
import { shuffle } from './utils.ts';

test('shuffle', async (t) => {
    await t.test('should maintain the same array length', () => {
        const input = [1, 2, 3, 4, 5];
        const output = shuffle([...input]);
        assert.strictEqual(output.length, input.length);
    });

    await t.test('should contain all original elements', () => {
        const input = [1, 2, 3, 4, 5];
        const output = shuffle([...input]);
        const sortedInput = [...input].sort();
        const sortedOutput = [...output].sort();
        assert.deepStrictEqual(sortedOutput, sortedInput);
    });

    await t.test('should shuffle elements (probabilistic)', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // Shuffling 10 elements has 10! (3,628,800) permutations.
        // The probability of getting the same order is extremely low.
        const output = shuffle([...input]);
        
        // This test might technically fail once in 3.6 million runs, 
        // but it's standard for verifying shuffle logic.
        assert.notDeepStrictEqual(output, input);
    });

    await t.test('should handle empty arrays', () => {
        const input: number[] = [];
        const output = shuffle([...input]);
        assert.deepStrictEqual(output, input);
    });

    await t.test('should handle single-element arrays', () => {
        const input = [42];
        const output = shuffle([...input]);
        assert.deepStrictEqual(output, input);
    });

    await t.test('should modify the array in place', () => {
        const input = [1, 2, 3];
        const result = shuffle(input);
        assert.strictEqual(result, input);
    });
});
