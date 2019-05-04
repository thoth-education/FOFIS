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

//Exports
module.exports.watsonAssistantConfig = watsonAssistantConfig;
module.exports.speechToTextConfig = speechToTextConfig;