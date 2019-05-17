const watsonSpeechToTextRouter = require('../services/watsonSpeechToText');
const watsonLanguageTranslatorRouter = require('../services/watsonLanguageTranslator');
const watsonToneAnalyzerRouter = require('../services/watsonToneAnalyzer');
const watsonTextToSpeechRouter = require('../services/watsonTextToSpeech');
const voiceRecorder = require('../audio/micRecorder');

module.exports = {
  //Starts the chain of watson's api calls
  startChain : function() {
    startRecordingAudio();
  }
}

//Record audio input
const startRecordingAudio = () => {
  voiceRecorder.startRecording(function(err, data) {
    if(err) {
      console.log('Error recording audio');
    } else {
      console.log(data);
      sendAudioToSpeechToText();
    }
  });
}

//Send audio to watson's speech to text api
const sendAudioToSpeechToText = () => {
  console.log('\n>>> Speech to Text called');
  watsonSpeechToTextRouter.sendSpeechToText(function(err, data) {
    if(err) {
      console.log('Error sending audio to speech-to-text api');
    } else {
      console.log(data);
      sendTextToTranslate(data);
    }
  });
}

//Send the text to watson's translator api
const sendTextToTranslate = (data) => {
  console.log('\n>>> Translator to Text called');
  watsonLanguageTranslatorRouter.sendTextToTranslate(function(err, data) {
    if (err) {
      console.log('Error translating text');
    } else {
      console.log(data);
      sendTextTranslatedToToneAnalyzer(data);
    }
  }, data);
}

const sendTextTranslatedToToneAnalyzer = (data) => {
  console.log('\n>>> Tone Analyzer called');
  watsonToneAnalyzerRouter.sendTextTranslatedToToneAnalyzer(function(err, data) {
    if (err) {
      console.log('Error sending text translated to tone analyzer');
    } else {
      console.log(data);
    }
  }, data);
}

const sendTextToSpeech = (data) => {
  watsonTextToSpeechRouter.sendTextToSpeech(function(err, data){
    if (err) {
      console.log('Error text to speech: ', err);
    } else {
      console.log('statusCode', data);
    }
  }, data);
}
