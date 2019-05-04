//credential file
const credentials = require('../credentials')

//Watson assistant API config constant
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonAssistantConfig = new AssistantV1({
    version: '2019-18-03',
    username: 'apikey',
    password: '<PASSWORD>',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

//Watson speech-to-text API config constant
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const speechToTextConfig = new SpeechToTextV1({
  iam_apikey: credentials.speech_to_text.key,
  url: credentials.speech_to_text.url
});

//Watson language translator API config constant
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
const languageTranslatorConfig = new LanguageTranslatorV3({
  version: credentials.language_translator.version,
  iam_apikey: credentials.language_translator.key,
  url: credentials.language_translator.url
});

//Exports
module.exports.watsonAssistantConfig = watsonAssistantConfig;
module.exports.speechToTextConfig = speechToTextConfig;
module.exports.languageTranslatorConfig = languageTranslatorConfig;