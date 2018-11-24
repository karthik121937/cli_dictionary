#!/usr/bin/env node

const program = require('commander');
const oxfordApi = require('./oxford_api');

var wordArray = ["mobile","remote","bottle","book","pillow","rubber","chocolate","robot","bed","ace","spectacles","light","ship","possessive","umbrella","rainbow","sex","snake","purse","laptop"];
var randomNumber = Math.floor(Math.random()*wordArray.length);
var wordofday = wordArray[randomNumber];

if (process.argv.length == 2) {
    console.log('Word of the day "%s"',wordofday)
    oxfordApi.wordDefinition(wordofday)
    oxfordApi.synonyms(wordofday)
    oxfordApi.Antonyms(wordofday)
    oxfordApi.examples(wordofday)
}else {
    if(process.argv.length > 2){
        program.arguments('command', 'word').action(async(command, word) => {
            switch (command) {
                case "def":
                {
                    if (word && typeof word == 'string') {
                        // console.log('\nGetting "Definition" of the word: "%s"', word);
                        oxfordApi.wordDefinition(word);
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
                case "syn":
                {
                    if (word && typeof word == 'string') {
                        // console.log('\nGetting "Synonyms" of the word: "%s" \n', word);
                        oxfordApi.synonyms(word);
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
                case "ant":
                {
                    if (word && typeof word == 'string') {
                        // console.log('\nGetting "Antonyms" of the word: "%s" \n', word);
                        oxfordApi.Antonyms(word);
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
                case "ex":
                {
                    if (word && typeof word == 'string') {
                        // console.log('\nGetting "Example" of the word: "%s" \n', word);
                        oxfordApi.examples(word);
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
                case "dict":
                {
                    if (word && typeof word == 'string') {
                        console.log('\nGetting "Details" of the word: "%s"', word);
                        oxfordApi.wordDefinition(word)
                        oxfordApi.synonyms(word)
                        oxfordApi.Antonyms(word)
                        oxfordApi.examples(word)
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
                case "play":
                {
                    oxfordApi.play(wordofday);
                }
                default:
                {
                    if (typeof word == 'object')
                        var word = command;
                    if(word && typeof word == 'string' && word === "play")
                        break;
                    if (word && typeof word == 'string') {
                        console.log('\nGetting "Details" of the word : "%s". \n', word);
                        oxfordApi.wordDefinition(word);
                        oxfordApi.synonyms(word);
                        oxfordApi.Antonyms(word);
                        oxfordApi.examples(word);
                    } else {
                        console.log('Please enter valid word \n');
                    }
                    break;
                }
            }
        }).parse(process.argv);
    }
}