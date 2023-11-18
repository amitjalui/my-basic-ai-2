const positiveWords = [];
const negativeWords = [];

function classifyWord(word: string) {
  // Define lists of positive and negative words
  const positiveWordList = ['good', 'happy', 'joyful', 'love', 'amazing'];
  const negativeWordList = ['bad', 'sad', 'angry', 'hate', 'terrible'];

  // Check if the word is present in the positive word list
  const isPositive = positiveWordList.some((positiveWord) => word === positiveWord);

  // Check if the word is present in the negative word list
  const isNegative = negativeWordList.some((negativeWord) => word === negativeWord);

  if (isPositive) return "positive";
  
  if (isNegative) return "negative";
  
  return "Not in Database";
}

const ans = classifyWord;

console.log(ans)