var request = require('request');

var headers = {
    'Accept': 'application/json',
    'app_id': '3abb2aca',
    'app_key': '756e6e908531078e2bee1b184daad49f'
};

var options;

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
                        senses.forEach(function(each){
                            each.definitions.forEach(function(each1){
                                console.log(each1)
                            })
                        })

                    }
                }

            }else{
                console.log('"Definition" Not Found for',word,response.statusCode)
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
                console.log('"synonyms" Not Found for',word,response.statusCode)
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
                console.log('"Antonyms" Not Found for',word,response.statusCode)
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
                console.log('"Examples" Not Found for :',word,'',response.statusCode)
            }
        }

        request(options, callback);
    }
};