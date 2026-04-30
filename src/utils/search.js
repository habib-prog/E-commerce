const normalizeSearchValue = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const relatedSearchTerms = {
  perfume: ["fragrance", "fragrances", "scent"],
  perfumes: ["fragrance", "fragrances", "scent"],
  scent: ["perfume", "fragrance", "fragrances"],
  scents: ["perfume", "fragrance", "fragrances"],
  fragrance: ["perfume", "perfumes", "scent"],
  fragrances: ["perfume", "perfumes", "scent"],
  mobile: ["smartphone", "smartphones", "phone", "phones"],
  mobiles: ["smartphone", "smartphones", "phone", "phones"],
  phone: ["smartphone", "smartphones", "mobile", "mobiles"],
  phones: ["smartphone", "smartphones", "mobile", "mobiles"],
  smartphone: ["phone", "phones", "mobile", "mobiles"],
  smartphones: ["phone", "phones", "mobile", "mobiles"],
  laptop: ["laptops", "notebook", "notebooks"],
  laptops: ["laptop", "notebook", "notebooks"],
  notebook: ["laptop", "laptops"],
  notebooks: ["laptop", "laptops"],
  makeup: ["beauty", "cosmetics"],
  cosmetic: ["beauty", "makeup"],
  cosmetics: ["beauty", "makeup"],
  grocery: ["groceries", "food"],
  groceries: ["grocery", "food", "vegetable", "vegetables", "fruit", "fruits"],
  food: ["grocery", "groceries"],
  vegetable: ["vegetables", "grocery", "groceries"],
  vegetables: ["vegetable", "grocery", "groceries"],
  fruit: ["fruits", "grocery", "groceries"],
  fruits: ["fruit", "grocery", "groceries"],
};

const getEditDistance = (firstValue, secondValue) => {
  const first = normalizeSearchValue(firstValue);
  const second = normalizeSearchValue(secondValue);

  if (first === second) return 0;
  if (!first.length) return second.length;
  if (!second.length) return first.length;

  const distances = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    let previousDiagonal = distances[0];
    distances[0] = firstIndex;

    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const previousAbove = distances[secondIndex];
      const cost = first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;

      distances[secondIndex] = Math.min(
        distances[secondIndex] + 1,
        distances[secondIndex - 1] + 1,
        previousDiagonal + cost,
      );
      previousDiagonal = previousAbove;
    }
  }

  return distances[second.length];
};

const tokenMatchesWord = (token, word) => {
  if (word.includes(token)) return true;

  if (token.length < 4 || word.length < 4) return false;
  if (token[0] !== word[0]) return false;
  if (Math.abs(token.length - word.length) > 1) return false;

  return getEditDistance(token, word) <= 1;
};

const getTokenRelevanceScore = (token, words, text) => {
  if (text === token) return 100;
  if (text.startsWith(token)) return 90;
  if (words.some((word) => word === token)) return 80;
  if (words.some((word) => word.startsWith(token))) return 70;
  if (text.includes(token)) return 60;

  if (token.length < 4) return 0;

  const fuzzyMatch = words.some((word) => tokenMatchesWord(token, word));

  return fuzzyMatch ? 35 : 0;
};

export const getSearchRelevanceScore = (searchTerm, fields) => {
  const normalizedSearch = normalizeSearchValue(searchTerm);

  if (!normalizedSearch) return 0;

  const tokens = normalizedSearch.split(" ").filter(Boolean);
  const searchableFields = fields.filter(Boolean).map(normalizeSearchValue);

  return tokens.reduce((totalScore, token) => {
    const termsToMatch = [token, ...(relatedSearchTerms[token] ?? [])];
    const tokenScore = searchableFields.reduce((bestFieldScore, field, fieldIndex) => {
      const words = field.split(" ").filter(Boolean);
      const bestTermScore = termsToMatch.reduce((bestTermScore, term, termIndex) => {
        const relationPenalty = termIndex === 0 ? 0 : 20;
        const score = getTokenRelevanceScore(term, words, field);

        return Math.max(bestTermScore, Math.max(score - relationPenalty, 0));
      }, 0);
      const titleBoost = fieldIndex === 0 ? 10 : 0;

      return Math.max(bestFieldScore, bestTermScore + titleBoost);
    }, 0);

    return totalScore + tokenScore;
  }, 0);
};

export const matchesSearchTerm = (searchTerm, fields) => {
  return !normalizeSearchValue(searchTerm) || getSearchRelevanceScore(searchTerm, fields) > 0;
};
