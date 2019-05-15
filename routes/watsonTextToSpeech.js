const watsonConfig = require('../config/watsonConfig');
const textToSpeech = watsonConfig.textToSpeechConfig;

var fs = require('fs');

module.exports = {
    sendTextToSpeech : function(callback, data){

        const synthesizeParams = {
            text: data,
            accept: 'audio/wav',
            voice : "pt-BR_IsabelaVoice"
        }

        textToSpeech.synthesize(synthesizeParams)
            .then(audio => {
                audio.pipe(fs.createWriteStream('./audio/retornoTtS.wav'));
            })
            .catch(err => {
                console.log('error:', err);
            });

    }
}