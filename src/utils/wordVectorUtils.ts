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