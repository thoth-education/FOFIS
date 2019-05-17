const fs = require('fs');
const watsonConfig = require('../config/watsonConfig');

const textToSpeech = watsonConfig.textToSpeechConfig;

module.exports = {
  sendTextToSpeech: function (callback, data) {

    const synthesizeParams = {
      text: data,
      accept: 'audio/wav',
      voice: "pt-BR_IsabelaVoice"
    }

    textToSpeech.synthesize(synthesizeParams)
      .then(audio => {
        audio.pipe(fs.createWriteStream('./audio/retornoTtS.wav'));
        callback(null, audio['statusCode']);
      })
      .catch(err => {
        console.log('error:', err);
      });

  }
};
