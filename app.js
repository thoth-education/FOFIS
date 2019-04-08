const express = require('express');
const bodyParser = require('body-parser');

const textExample = require('./routes/textExample');

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/textExample', textExample);

app.listen(port, () => console.log(`Listening on port ${port}...`));
