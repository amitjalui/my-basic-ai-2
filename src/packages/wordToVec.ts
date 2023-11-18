// Import the fs module for file operations
import * as fs from 'fs';

// Preprocess the text data
const text = "This is an example of some text data for training a word2vec model.";
const tokens = text.toLowerCase().split(' ');

// Create a co-occurrence matrix
const windowSize = 2; // Size of the context window for word pairs
const coOccurrenceMatrix: { [word: string]: { [contextWord: string]: number } } = {};

for (let i = 0; i < tokens.length; i++) {
  const word = tokens[i];

  for (let j = Math.max(0, i - windowSize); j <= Math.min(tokens.length - 1, i + windowSize); j++) {
    if (i === j) continue; // Skip the same word pair

    const contextWord = tokens[j];

    if (!coOccurrenceMatrix[word]) {
      coOccurrenceMatrix[word] = {};
    }

    coOccurrenceMatrix[word][contextWord] = (coOccurrenceMatrix[word][contextWord] || 0) + 1;
  }
}

// Apply dimensionality reduction (simplified approach)
const numDimensions = 5; // Number of reduced dimensions
const wordVectors: { [word: string]: number[] } = {};

for (const word in coOccurrenceMatrix) {
  const wordVector = [];

  for (let i = 0; i < numDimensions; i++) {
    wordVector.push(Math.random() * 2 - 1); // Initialize random vector components
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

// Save the trained model (simplified approach)
const saveWordVectorsToFile = (fileName: string) => {
  const json = JSON.stringify(wordVectors);
  fs.writeFileSync(fileName, json);
};

saveWordVectorsToFile('word_vectors.json');

function predictWordVector(cooccurrenceCount: number, wordVector: number[], contextWordVector: number[]): number {
  const predictedVector = wordVector.slice(); // Copy the current word vector

  // Calculate the dot product between the context word vector and the predicted word vector
  const dotProduct = predictedVector.reduce((acc, component1, i) => {
    return acc + component1 * contextWordVector[i];
  }, 0);

  // Scale the predicted vector based on the cooccurrence count
  for (let i = 0; i < predictedVector.length; i++) {
    predictedVector[i] *= cooccurrenceCount;
  }

  // Calculate the error between the predicted vector and the actual word vector
  const error = predictedVector.reduce((acc, component1, i) => {
    return acc + (component1 - contextWordVector[i]) ** 2;
  }, 0);

  return error;
}

function updateWordVectors(wordVector: number[], contextWordVector: number[], error: number, learningRate: number): void {
  // Calculate the gradient of the error with respect to the word vector
  const gradient = wordVector.map((component1, i) => {
    return (component1 - contextWordVector[i]) * learningRate;
  });

  // Update the word vector
  for (let i = 0; i < wordVector.length; i++) {
    wordVector[i] -= gradient[i];
  }
}

export { predictWordVector, updateWordVectors }