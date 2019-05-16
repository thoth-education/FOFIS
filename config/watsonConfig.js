//credential file
const credentials = require('../credentials')

//Watson assistant API config constant
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonAssistantConfig = new AssistantV1({
    version: credentials.watson_assistant.version,
    iam_apikey: credentials.watson_assistant.key,
    url: credentials.watson_assistant.url 
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

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzerConfig = new ToneAnalyzerV3({
  version: credentials.tone_analyzer.version,
  iam_apikey: credentials.tone_analyzer.key,
  url: credentials.tone_analyzer.url
});

const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const textToSpeechConfig = new TextToSpeechV1({
  iam_apikey: credentials.text_to_speech.key,
  url: credentials.text_to_speech.url
});

//Exports
module.exports.watsonAssistantConfig = watsonAssistantConfig;
module.exports.speechToTextConfig = speechToTextConfig;
module.exports.languageTranslatorConfig = languageTranslatorConfig;
module.exports.toneAnalyzerConfig = toneAnalyzerConfig;
module.exports.textToSpeechConfig = textToSpeechConfig;