const watsonConfig = require('../config/watsonConfig');
const languageTranslator = watsonConfig.languageTranslatorConfig;

//Function to concatenate API's response
function getTranslationText(response) {
  let translations = response['translations'];
  let firstObject = translations[0]
  return firstObject['translation']
}

module.exports = {
  sendTextToTranslate: function (callback, data) {
    const translateParams = {
      text: data,
      model_id: 'pt-en',
    };

    languageTranslator.translate(translateParams)
      .then(translationResult => {
        callback(null, getTranslationText(translationResult));
      })
      .catch(err => {
        callback(JSON.stringify(err, null, 2), null);
      });
  }
}
