import { predictWordVector, updateWordVectors } from '../packages/wordToVec';

const sentence = "This is an example of some text data for training a word2vec model.";

// Tokenize the sentence
const tokens = sentence.toLowerCase().split(' ');

// Create the co-occurrence matrix
const windowSize = 2;
const coOccurrenceMatrix: { [word: string]: { [contextWord: string]: number } } = {};

for (let i = 0; i < tokens.length; i++) {
  const word = tokens[i];

  for (let j = Math.max(0, i - windowSize); j <= Math.min(tokens.length - 1, i + windowSize); j++) {
    if (i === j) continue;

    const contextWord = tokens[j];

    if (!coOccurrenceMatrix[word]) {
      coOccurrenceMatrix[word] = {};
    }

    coOccurrenceMatrix[word][contextWord] = (coOccurrenceMatrix[word][contextWord] || 0) + 1;
  }
}

// Initialize word vectors
const numDimensions = 5;
const wordVectors: { [word: string]: number[] } = {};

for (const word in coOccurrenceMatrix) {
  const wordVector = [];

  for (let i = 0; i < numDimensions; i++) {
    wordVector.push(Math.random() * 2 - 1);
  }

  wordVectors[word] = wordVector;
}

// Train the word2vec model (simplified approach)
const learningRate = 0.01; // Learning rate for updating word vectors
const numIterations = 1000; // Number of training iterations

for (let iteration = 0; iteration < numIterations; iteration++) {
  for (const word in coOccurrenceMatrix) {
    const contextWords = Object.keys(coOccurrenceMatrix[word]);

    for (const contextWord of contextWords) {
      const wordVector = wordVectors[word];
      const contextWordVector = wordVectors[contextWord];

      const error = predictWordVector(coOccurrenceMatrix[word][contextWord], wordVector, contextWordVector);
      updateWordVectors(wordVector, contextWordVector, error, learningRate);
    }
  }
}

// Print the word vectors for the sentence
for (const word of tokens) {
  console.log(`"${word}": ${wordVectors[word]}`);
}