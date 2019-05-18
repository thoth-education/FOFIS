/* eslint-disable no-console */
const watsonSpeechToTextService = require('../services/watsonSpeechToText');
const watsonLanguageTranslatorService = require('../services/watsonLanguageTranslator');
const watsonToneAnalyzerService = require('../services/watsonToneAnalyzer');
const watsonTextToSpeechService = require('../services/watsonTextToSpeech');
const watsonAssistantService = require('../services/watsonAssistant');
const voiceRecorder = require('../audio/micRecorder');
const audioPlayer = require('../audio/audioPlayer');

module.exports = {
  //Starts the chain of watson's api calls
  startChain : function() {
    callAssistantWelcome();
  }
}

//Log the assistant's welcome
const callAssistantWelcome = () => {
  watsonAssistantService.sendTextToAssistant(function(err, data, context) {
    if (err) {
      console.log('Error sending text to assistant, error: ' + err);
    } else {
      console.log(data);
      watsonAssistantService.context = context;
      sendTextToSpeech(data);
      startRecordingAudio();
    }
  });
}

//Record audio input
const startRecordingAudio = () => {
  voiceRecorder.startRecording(function(err, data) {
    if(err) {
      console.log('Error recording audio');
    } else {
      sendAudioToSpeechToText();
    }
  });
}

//Send audio to watson's speech to text api
const sendAudioToSpeechToText = () => {
  //console.log('\n>>> Speech to Text called');
  watsonSpeechToTextService.sendSpeechToText(function(err, data) {
    if(err) {
      console.log('Error sending audio to speech-to-text api');
    } else {
      console.log(data);
      sendTextToAssistant(data);
      sendTextToTranslate(data);
    }
  });
}

//Send the text to watson's translator api
const sendTextToTranslate = (data) => {
  //console.log('\n>>> Translator to Text called');
  watsonLanguageTranslatorService.sendTextToTranslate(function(err, data) {
    if (err) {
      console.log('Error translating text');
    } else {
      sendTextTranslatedToToneAnalyzer(data);
    }
  }, data);
}

const sendTextTranslatedToToneAnalyzer = (data) => {
  //console.log('\n>>> Tone Analyzer called');
  watsonToneAnalyzerService.sendTextTranslatedToToneAnalyzer(function(err, data) {
    if (err) {
      console.log('Error sending text translated to tone analyzer');
    } else {
      //console.log(data);
    }
  }, data);
}

const sendTextToAssistant = (data) => {
  console.log('\n>>> Assistant called');
  watsonAssistantService.sendTextToAssistant(function(err, data, context) {
    if (err) {
      console.log('Error sending text to assistant, error: ' + err);
    } else {
      console.log(data);
      watsonAssistantService.context = context;
      sendTextToSpeech(data);
      startRecordingAudio();
    }
  }, data, watsonAssistantService.context);
}

const sendTextToSpeech = (data) => {
  watsonTextToSpeechService.sendTextToSpeech(function(err, data){
    if (err) {
      console.log('Error text to speech: ', err);
    } else {
      audioPlayer.playAudio();
    }
  }, data);
}
