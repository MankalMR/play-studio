/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * This is an O(n) operation and provides an unbiased shuffle.
 *
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
