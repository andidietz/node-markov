const fs = require('fs')
const markov = require('./markov')
const axios = require('axios')
const process = require('process')

const LANGUAGE = 'utf8'

function generateMarkovText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeTextFromChain())
}

function makeText(path) {
    fs.readFile(path, LANGUAGE, (err, data) => {
        if (err) {
            console.error(`Cannot read file at path: ${path} due to err: ${err}`)
            process.exit(2)
        } else {
            generateMarkovText(data)
        }
    })
}

async function makeTextFromURL(url) {
    let resp

    try {
        resp = await axios.get(url)
    } catch (err) {
        console.error(`Cannot read file at URL: ${url} due to err: ${err}`)
        process.exit(3)
    }
    generateMarkovText(resp.data)
}

let path = process.argv[3]

if (process.argv[2] === 'file') {
    makeText(path)
} else if (process.argv[2] === 'url') {
    makeTextFromURL(path)
} else {
    console.error(`Cannot read method: ${process.argv[2]}`)
}