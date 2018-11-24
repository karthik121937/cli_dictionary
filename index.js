#!/usr/bin/env node

const program = require('commander');
const oxfordApi = require('./oxford_api');

if (process.argv.length == 2) {
    console.log('Getting word of the day...');
    oxfordApi.wordOfTheDay();
}

program.arguments('command', 'word').action(async(command, word) => {
    switch (command) {
        case "def":
        {
            if (word && typeof word == 'string') {
                console.log('\nGetting "Definition" of the word: "%s"', word);
                oxfordApi.wordDefinition(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
        case "syn":
        {
            if (word && typeof word == 'string') {
                console.log('\nGetting "Synonyms" of the word: "%s" \n', word);
                oxfordApi.synonyms(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
        case "ant":
        {
            if (word && typeof word == 'string') {
                console.log('\nGetting "Antonyms" of the word: "%s" \n', word);
                oxfordApi.Antonyms(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
        case "ex":
        {
            if (word && typeof word == 'string') {
                console.log('\nGetting "Example" of the word: "%s" \n', word);
                oxfordApi.examples(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
        /*case "dict":
        {
            if (word && typeof word == 'string') {
                console.log('\nGetting "Details" of the word: "%s" \n', word);
                oxfordApi.getDefinition(word)
                oxfordApi.getSynonym(word)
                oxfordApi.getAntonym(word)
                oxfordApi.getExample(word)
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
        case "play":
        {
            if (word && typeof word == 'string') {
                console.log('\nPreparing the ground for a game \n');
                oxfordApi.startGame(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }*/
        default:
        {
            if (typeof word == 'object')
                var word = command;
            if (word && typeof word == 'string') {
                console.log('\nGetting "Details" of the word : "%s". \n', word);
                oxfordApi.wordDefinition(word);
                oxfordApi.synonyms(word);
                oxfordApi.antonyms(word);
                oxfordApi.examples(word);
            } else {
                console.log('Please enter valid word \n');
            }
            break;
        }
    }
}).parse(process.argv);
