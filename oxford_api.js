var request = require('request');
var prompt = require('prompt');
var headers = require('./config');
var chalk = require('chalk')
var options;

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
var worddef = function (word) {
    options = {
        url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word,
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            //     console.log(body)
            body = JSON.parse(body)
            if (body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length) {
                if (body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length) {
                    var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                    console.log('\n "Definition" of the word: "%s"', chalk.blue(word));

                    if (senses[0] && senses[0].definitions && senses[0].definitions[0])
                        console.log(senses[0].definitions[0]);
                    /*senses.forEach(function(each){
                        console.log(each.definitions[0]);
                        // each.definitions.forEach(function(each1){
                        //     console.log(each1)
                        // })
                    })*/

                }
            }

        } else {
            console.log('\n"Definition" Not Found for', chalk.blue(word), chalk.red(response.statusCode))
        }
    }

    request(options, callback);
}

var wordsyn = function (word) {
    options = {
        url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word + "/synonyms",
        headers: headers
    };

    function callback(error, response, body) {
        var synary = '';
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body)
            if (body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length) {
                if (body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length) {
                    var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                    console.log('\n "Synonyms" of the word: "%s"', chalk.blue(word));
                    senses.forEach(function (each) {
                        each.synonyms.forEach(function (each1) {
                            synary += each1.id + ', '
                        })
                    })
                    console.log(synary.substring(0, synary.lastIndexOf(',')));
                }
            }

        } else {
            console.log('\n"synonyms" Not Found for', chalk.blue(word), chalk.red(response.statusCode))
        }
    }

    request(options, callback);
}

var wordant = function (word) {
    options = {
        url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word + "/antonyms",
        headers: headers
    };

    function callback(error, response, body) {
        var synary = '';
        if (!error && response.statusCode == 200) {
            //   console.log(body)
            body = JSON.parse(body)
            if (body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length) {
                if (body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length) {
                    var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                    console.log('\n "Antonyms" of the word: "%s"', chalk.blue(word));
                    senses.forEach(function (each) {
                        each.antonyms.forEach(function (each1) {
                            synary += each1.id + ', '
                        })
                    })
                    console.log(synary.substring(0, synary.lastIndexOf(',')));
                }
            }

            //   console.log(body);
        } else {
            console.log('\n"Antonyms" Not Found for', chalk.blue(word), chalk.red(response.statusCode))
        }
    }

    request(options, callback);
}

var wordex = function (word) {
    options = {
        url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word,
        headers: headers
    };

    function callback(error, response, body) {
        var synary = [];
        if (!error && response.statusCode == 200) {
            //     console.log(body)
            body = JSON.parse(body)
            if (body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length) {
                if (body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length) {
                    var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                    console.log('\n "Example" of the word: "%s"', chalk.blue(word));

                    senses.every(function (each) {
                        if (each.examples && each.examples.length) {
                            each.examples.forEach(function (each1) {
                                console.log(each1.text)
                                //   synary.push(each1.text)
                            })
                        } else {
                            console.log("No Examples Found for", chalk.red(word));
                            return false;
                        }
                    })
                }
            }

            //   console.log(body);
        } else {
            console.log('\n"Examples" Not Found for :', chalk.blue(word), chalk.red(response.statusCode))
        }
    }

    request(options, callback);
}
module.exports = {
    wordDefinition: worddef,
    synonyms: wordsyn,
    Antonyms: wordant,
    examples: wordex,
    play: function (word) {
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word,
            headers: headers
        };

        function prompt_c(cb) {
            prompt.get(['word'], function (err, result) {
                cb(null, result.word)
            });
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                //     console.log(body)
                body = JSON.parse(body)
                if (body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length) {
                    if (body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length) {
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        if (senses[0] && senses[0].definitions && senses[0].definitions[0])
                            console.log(senses[0].definitions[0]);
                        console.log(chalk.blue.bold("Enter your Input"));
                        prompt_c(function (err, wordd) {
                            if (wordd === word) {
                                console.log(chalk.green("correct guess Game Over BYEE"));
                            } else {
                                console.log(chalk.blue.bgRed.bold("Enter your Input"));
                                console.log(chalk.red("oops...try again"), '\n', chalk.green("Hint is -->"), chalk.blue.bold(word.shuffle()));
                                prompt_c(function (ee, ww) {
                                    if (ww === word) {
                                        console.log(chalk.green("correct word bye bye......"));
                                    } else {
                                        console.log(chalk.black.bgRed.bold("you are not getting the word The word Details are\n"));
                                        worddef(word);
                                        wordsyn(word);
                                        wordant(word);
                                        wordex(word);
                                    }
                                })
                            }
                        })
                    }
                }

            } else {
                console.log('\n"Definition" Not Found for', word, response.statusCode)
            }
        }

        request(options, callback);

    }
};