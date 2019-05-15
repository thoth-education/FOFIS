var watsonSpeechToTextRouter = require('../routes/watsonSpeechToText');
var watsonLanguageTranslatorRouter = require('../routes/watsonLanguageTranslator');
var watsonToneAnalyzerRouter = require('../routes/watsonToneAnalyzer');
var watsonTextToSpeechRouter = require('../routes/watsonTextToSpeech');
var voiceRecorder = require('../audio/micRecorder');

module.exports = {
    //Starts the chain of watson's api calls
    startChain : function() {
        startRecordingAudio();
    }
}

//Record audio input
function startRecordingAudio() {
    voiceRecorder.startRecording(function(err, data) {
        if(err){
            console.log('Error recording audio');
        } else {
            console.log(data);
            sendAudioToSpeechToText();
        }
    });
}

//Send audio to watson's speech to text api
function sendAudioToSpeechToText() {
    console.log('\n>>> Speech to Text called');
    watsonSpeechToTextRouter.sendSpeechToText(function(err, data) {
        if(err){
            console.log('Error sending audio to speech-to-text api');
        } else {
            console.log(data);
            sendTextToSpeech(data);
            //sendTextToAssistant(data);
            //sendTextToTranslate(data);
        }
    });
}

//Send the text to watson's translator api
function sendTextToTranslate(data) {
    console.log('\n>>> Translator to Text called');
    watsonLanguageTranslatorRouter.sendTextToTranslate(function(err, data) {
        if(err) {
            console.log('Error translating text');
        } else {
            console.log(data);
            sendTextTranslatedToToneAnalyzer(data);
        }
    }, data);
}

function sendTextTranslatedToToneAnalyzer(data){
    console.log('\n>>> Tone Analyzer called');
    watsonToneAnalyzerRouter.sendTextTranslatedToToneAnalyzer(function(err, data) {
        if(err) {
            console.log('Error sending text translated to tone analyzer');
        } else {
            console.log(data);
        }
    }, data);
}

function sendTextToAssistant(data){
    console.log('\n Enviando pro assistant');
}

function sendTextToSpeech(data){
    watsonTextToSpeechRouter.sendTextToSpeech(function(err, data){
        if(err){
            console.log('Error text to speech: ', err);
        }else{
            console.log('Deu bom');
        }
    }, data);
}