var watsonSpeechToTextRouter = require('../routes/watsonSpeechToText');
var watsonLanguageTranslatorRouter = require('../routes/watsonLanguageTranslator');

module.exports = {
    //Starts the chain of watson's api calls
    startChain : function() {
        watsonSpeechToTextRouter.sendSpeechToText(function(err, data) {
            if(err){
                console.log('Error sending audio to speech-to-text api');
            } else {
                console.log(data);
                sendTextToTranslate(data);
            }
        });
    }
}

//Send the text to watson's translator api
function sendTextToTranslate(data) {
    watsonLanguageTranslatorRouter.sendTextToTranslate(function(err, data) {
        if(err){
            console.log('Error translating text');
        } else {
            console.log(data);
        }
    }, data);
}