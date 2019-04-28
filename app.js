const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

//Routes
const watsonAssistantRouter = require('./routes/watsonAssistant');

//Endpoints
app.use('/watsonAssistant', watsonAssistantRouter);

module.exports = app;