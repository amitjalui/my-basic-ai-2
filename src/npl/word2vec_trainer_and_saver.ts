// Import the fs module for file operations
import * as fs from 'fs';
import { predictWordVector, updateWordVectors } from '../utils/wordVectorUtils';
import { getNegativeSamples } from './getNegativeSamples';

// Preprocess the text data
const sentence = "example of word2vec model.";

// Tokenize the sentence
const tokens = sentence.toLowerCase().split(' ');

const vocabulary = new Set(tokens); // Create a unique set of word
const vocabularyArray: string[] = Array.from(vocabulary);

// Create the co-occurrence matrix
const windowSize = 2;

/*
  coOccurrenceMatrix = {
    example: { of: 1, word2vec: 1 },
    of: { example: 1, word2vec: 1, 'model.': 1 },
    word2vec: { example: 1, of: 1, 'model.': 1 },
    'model.': { of: 1, word2vec: 1 }
  }
*/
const coOccurrenceMatrix: { [word: string]: { [contextWord: string]: number } } = {};

for (let i = 0; i < tokens.length; i++) {
  const word = tokens[i];

  for (let j = Math.max(0, i - windowSize); j <= Math.min(tokens.length - 1, i + windowSize); j++) {
    if (i === j) continue;

    const contextWord = tokens[j];
    
    /*
      !example = {} 
    */
    if (!coOccurrenceMatrix[word]) {
      /*
        example = {} 
      */
      coOccurrenceMatrix[word] = {};
    }

    /*
      word        contextWord
      example = { of: 1, word2vec: 1} 
      
      * if coOccurrenceMatrix[word][contextWord] is falsy, such as undefined), the expression evaluates to undefined.
      * 0: This is the logical OR operator. If the left operand is falsy, it returns the right operand. In this case, if coOccurrenceMatrix[word][contextWord] is falsy (undefined, null, 0, etc.), it defaults to 0.
    */
    coOccurrenceMatrix[word][contextWord] = (coOccurrenceMatrix[word][contextWord] || 0) + 1;
  }
}


// Apply dimensionality reduction (simplified approach)
const numDimensions = 100;
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

const numNegativeSamples = 5; // Set the desired number of negative samples

// Update training loop to include negative samples
for (let iteration = 0; iteration < numIterations; iteration++) {
  for (const word in coOccurrenceMatrix) {
    const contextWords = Object.keys(coOccurrenceMatrix[word]);

    for (const contextWord of contextWords) {
      const wordVector = wordVectors[word];
      const contextWordVector = wordVectors[contextWord];

      // Train with poitive pair
      const error = predictWordVector(coOccurrenceMatrix[word][contextWord], wordVector, contextWordVector);
      updateWordVectors(wordVector, contextWordVector, error, learningRate);

      // Train with negative pair
      const negativeSamples = getNegativeSamples(contextWord, vocabularyArray, numNegativeSamples);
      for (const negativeSample of negativeSamples) {
        const negativeSampleVector = wordVectors[negativeSample];
        const negativeError = predictWordVector(0, wordVector, negativeSampleVector); // Expected co-occurrence is 0
        updateWordVectors(wordVector, negativeSampleVector, negativeError, learningRate);
      }
    }
  }
}

// Print the word vectors for the sentence
for (const word of tokens) {
  // console.log(`"${word}": ${wordVectors[word]}`);
}

// Save the trained model (simplified approach)
const saveWordVectorsToFile = (fileName: string) => {
  const json = JSON.stringify(wordVectors);
  fs.writeFileSync(fileName, json);
};

saveWordVectorsToFile('word_vectors.json');
