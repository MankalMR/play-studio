/**
 * Word validation engine using English dictionary
 */

let dictionary: Set<string> | null = null;
let isLoading = false;

export async function loadDictionary(): Promise<void> {
  if (dictionary || isLoading) return;
  
  isLoading = true;
  try {
    // Use ENABLE1 dictionary - standard for word games, excludes most abbreviations and proper nouns
    const response = await fetch("https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt");
    const text = await response.text();
    const words = text.split("\n").map(w => w.trim().toUpperCase()).filter(w => w.length >= 3);
    dictionary = new Set(words);
    console.log(`Dictionary loaded: ${dictionary.size} words`);
  } catch (error) {
    console.error("Failed to load dictionary", error);
    // Fallback: minimal dictionary if fetch fails
    dictionary = new Set(["CAT", "DOG", "BIRD", "WORD", "GAME", "PLAY"]);
  } finally {
    isLoading = false;
  }
}

export function isValidWord(word: string): boolean {
  if (!dictionary) return false;
  return dictionary.has(word.toUpperCase());
}

export function isDictionaryReady(): boolean {
  return dictionary !== null;
}
