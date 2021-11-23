class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  static choice(words) {
    return words[Math.floor(Math.random() * words.length)]
  }

  makeChains() {
    let markovChains = new Map()

    for (let i = 0; i < this.words.length; i+= 1) {
      let currentWord = this.words[i]
      let nextWord = this.words[i + 1] || null

      if (markovChains.has(currentWord)) {
        markovChains.get(currentWord).push(nextWord)
      } else {
        markovChains.set(currentWord, [nextWord])
      }
      this.markovChains = markovChains
    }
  } 

  makeTextFromChain(numWords = 100) {
    let currentWord = MarkovMachine.choice(this.words)
    let result = []

    while (result.length < numWords && currentWord !== null) {
      result.push(currentWord)
      currentWord = MarkovMachine.choice(this.words)
    }
    return result.join(' ')
  }
}

module.exports = { MarkovMachine }
