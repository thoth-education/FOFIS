const express = require('express');
const watsonConfig = require('../config/watsonConfig');
const speechToText = watsonConfig.speechToTextConfig;
var fs = require('fs');
var path = require('path');
var router = express.Router();

//Send audio file to Speech to text API
function sendSpeechToText(){
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
          console.log(name, JSON.stringify(event, null, 2));
      };
}

router.get('/', function(req, res, next) {
    sendSpeechToText();
    res.send('Request sent');
  });

module.exports = router;