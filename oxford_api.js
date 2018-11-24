var request = require('request');
var prompt = require('prompt');
var headers = {
    'Accept': 'application/json',
    'app_id': '3abb2aca',
    'app_key': '756e6e908531078e2bee1b184daad49f'
};

var options;

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}


module.exports = {
    wordDefinition: function(word){
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/"+word,
            headers: headers
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                //     console.log(body)
                body = JSON.parse(body)
                if(body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length){
                    if(body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length){
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        console.log('\n "Definition" of the word: "%s"', word);
                        
                        if(senses[0] && senses[0].definitions && senses[0].definitions[0])
                            console.log(senses[0].definitions[0]);
                        /*senses.forEach(function(each){
                            console.log(each.definitions[0]);
                            // each.definitions.forEach(function(each1){
                            //     console.log(each1)
                            // })
                        })*/

                    }
                }

            }else{
                console.log('\n"Definition" Not Found for',word,response.statusCode)
            }
        }

        request(options, callback);
    },
    synonyms: function(word){
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/"+word+"/synonyms",
            headers: headers
        };
        function callback(error, response, body) {
            var synary='';
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body)
                if(body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length){
                    if(body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length){
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        console.log('\n "Synonyms" of the word: "%s"', word);
                        senses.forEach(function(each){
                            each.synonyms.forEach(function(each1){
                                synary +=each1.id+', '
                            })
                        })
                        console.log(synary.substring(0,synary.lastIndexOf(',')));
                    }
                }

            }else{
                console.log('\n"synonyms" Not Found for',word,response.statusCode)
            }
        }

        request(options, callback);
    },
    Antonyms:function(word){
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/"+word+"/antonyms",
            headers: headers
        };
        function callback(error, response, body) {
            var synary='';
            if (!error && response.statusCode == 200) {
                //   console.log(body)
                body = JSON.parse(body)
                if(body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length){
                    if(body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length){
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        console.log('\n "Antonyms" of the word: "%s"', word);
                        senses.forEach(function(each){
                            each.antonyms.forEach(function(each1){
                                synary +=each1.id+', '
                            })
                        })
                        console.log(synary.substring(0,synary.lastIndexOf(',')));
                    }
                }

                //   console.log(body);
            }else{
                console.log('\n"Antonyms" Not Found for',word,response.statusCode)
            }
        }

        request(options, callback);
    },
    examples:function(word){
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/"+word,
            headers: headers
        };
        function callback(error, response, body) {
            var synary=[];
            if (!error && response.statusCode == 200) {
                //     console.log(body)
                body = JSON.parse(body)
                if(body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length){
                    if(body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length){
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        console.log('\n "Example" of the word: "%s"', word);

                        senses.forEach(function(each){
                            if(each.examples && each.examples.length){
                                each.examples.forEach(function(each1){
                                    console.log(each1.text)
                                    //   synary.push(each1.text)
                                })
                            }else{
                                // console.log("Examples Not Found for",word)

                            }

                        })
                    }
                }

                //   console.log(body);
            }else{
                console.log('\n"Examples" Not Found for :',word,'',response.statusCode)
            }
        }

        request(options, callback);
    },
    play:function (word) {
        options = {
            url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/"+word,
            headers: headers
        };
        function prompt_c(cb) {
            prompt.get(['word'], function (err, result) {
                cb(null,result.word)
            });
        }
        var counter=1;
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                //     console.log(body)
                body = JSON.parse(body)
                if(body.results && body.results.length && body.results[0].lexicalEntries && body.results[0].lexicalEntries.length && body.results[0].lexicalEntries[0].entries && body.results[0].lexicalEntries[0].entries.length){
                    if(body.results[0].lexicalEntries[0].entries[0].senses && body.results[0].lexicalEntries[0].entries[0].senses.length){
                        var senses = body.results[0].lexicalEntries[0].entries[0].senses;
                        if(senses[0] && senses[0].definitions && senses[0].definitions[0])
                            console.log(senses[0].definitions[0]);
                        prompt_c(function (err,wordd) {
                            if(wordd === word){
                                console.log("correct");
                            }else {
                                console.log("oops...try again\nHint::\n",word.shuffle());
                                prompt_c(function (ee,ww) {
                                    if(ww === word){
                                        console.log("correct word")
                                    }else{
                                        console.log("you are not getting the word\n")
                                    }
                                })
                            }
                        })
                    }
                }

            }else{
                console.log('\n"Definition" Not Found for',word,response.statusCode)
            }
        }

        request(options, callback);

    }
};