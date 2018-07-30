export const pluralize = (count, word, suffix = 's') => `${count} ${pluralizeWord(count, word, suffix)}`
export const pluralizeWord = (count, word, suffix = 's') => `${word}${count !== 1 ? suffix : ''}`
