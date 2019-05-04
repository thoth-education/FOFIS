var watsonSpeechToTextRouter = require('../routes/watsonSpeechToText');

module.exports = {
    //Starts the chain of watson's api calls
    startChain : function() {
        watsonSpeechToTextRouter.sendSpeechToText(function(err, data) {
            if(err){
                console.log('Error sending audio to speech-to-text api');
            } else {
                console.log(data);
            }
        });
    }
}