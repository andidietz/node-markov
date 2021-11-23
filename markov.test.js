const {MarkovMachine} = require('./markov')

describe('tests for markov.js functions', function () {
    let text = 'dog cat tree dog tree cat'
    let words = ['dog', 'cat', 'tree']

    test('make markiv chains', function () {
        let mm = new MarkovMachine(text)
        
        expect(mm.markovChains).toEqual(new Map([
            ["dog", ['cat', 'tree']],
            ['cat', ['tree', null]],
            ['tree', ['dog', 'cat']]
        ]))
    })

    test('choose random word', function () {
        expect(words).toContain(MarkovMachine.choice(words))
    })

    test('result in a text string', function () {
        let mm = new MarkovMachine(text)
        let result = mm.makeTextFromChain()

        expect(result).toEqual(expect.any(String))
    })
})