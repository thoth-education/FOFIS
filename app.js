const express = require('express');
const app = express();
const port = 3000;

//Routes
//var watsonAssistantRouter = require('./routes/watsonAssistant');
var watsonSpeechToTextRouter = require('./routes/watsonSpeechToText');

//Endpoints
//app.use('/watsonAssistant', watsonAssistantRouter);

app.listen(port, function () {
    console.log("express has started on port " + port);
});

app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  
app.use('/watsonSpeechToText', watsonSpeechToTextRouter)
