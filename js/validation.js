const startsWithSymbol = (string, symbol = '#') => string[0] === symbol;

const hasValidLength = (string, minLength = 2, maxLength = 20) => string.length >= minLength && string.length <= maxLength;

const hasValidSymbols = (string, invalidSymbols = /[^a-zA-Z0-9а-яА-ЯёЁ]/g) => !invalidSymbols.test(string.slice(1));

const isValidTag = (tag) => startsWithSymbol(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags, maxCount = 5) => tags.length <= maxCount;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

export function validateHashtags (value) {
  if (value === '') {
    return true;
  }
  const tags = value.split(' ');
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
}
