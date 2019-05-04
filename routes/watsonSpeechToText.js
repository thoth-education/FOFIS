const express = require('express');
const watsonConfig = require('../config/watsonConfig');
const speechToText = watsonConfig.speechToTextConfig;
var fs = require('fs');
var path = require('path');
var router = express.Router();

//Concatenate API response
function concatenateResponse(response) {
    var results = response['results'];
    var functionReturn = "";

    for(var jsonArray in results) {
        var currentJson = results[jsonArray]
        var alternativesArray = currentJson['alternatives'];
        var firstAlternative = alternativesArray[0];
        var transcript = firstAlternative['transcript'];
        if(typeof transcript === 'string' || transcript instanceof String) {
            functionReturn = functionReturn.concat(transcript);
        }
    }    
    return JSON.stringify(functionReturn, null, 2)
}

//Send audio file to Speech to text API
module.exports = {
    sendSpeechToText : function(callback){
        var params = {
            objectMode: true,
            content_type: 'audio/mp3',
            model: 'en-US_BroadbandModel',
            keywords: ['obama', 'speech', 'iran', 'deal'],
            keywords_threshold: 0.5,
            max_alternatives: 1
        };
        var audioPath = path.join(__dirname, '..', 'audio', 'iran-deal-speech-trimmed.mp3');
        
        // Create the stream.
        var recognizeStream = speechToText.recognizeUsingWebSocket(params);
        
        // Pipe in the audio.
        fs.createReadStream(audioPath).pipe(recognizeStream);
        
        // Listen for events.
        recognizeStream.on('data', function(event) { onEvent('Data:', event); });
        recognizeStream.on('error', function(event) { onEvent('Error:', event); });
        recognizeStream.on('close', function(event) { onEvent('Close:', event); });
        
        // Display events on the console.
        function onEvent(name, event) {
            if(name == 'Error:') {
                callback(JSON.stringify(event, null, 2), null);
            } else {
                callback(null, concatenateResponse(event));
            }
        };
    }
}