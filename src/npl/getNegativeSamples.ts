// Function to generate negative samples
function getNegativeSamples(word: string, vocabulary: string[], numNegativeSamples: number) {
  const negativeSamples = [];
  while (negativeSamples.length < numNegativeSamples) {
    /**
      eg: vocabulary = ['good', 'happy', 'joyful', 'love', 'amazing']
      randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)]
      radomWord = vocabulary[2]   // i.e joyful
    */
    const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    if (randomWord !== word) {
      negativeSamples.push(randomWord);
    }
  }
  console.log("negativeSamples", negativeSamples);
  
  return negativeSamples;
}

export { getNegativeSamples }