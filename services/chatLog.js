/* eslint-disable no-console */
const fs = require('fs');
const path = './log/chatlog.txt'
const pathTone = './log/tonelog.txt'

const writingLogCallback = (err) =>{
  if(err) {
      return console.log(err);
  }
}

module.exports = {
  //Log message
  addLog: function (data) {    
    fs.access(path, fs.F_OK, (err) => {
      //File does not exists
      if (err) {
        fs.writeFile(path, data, writingLogCallback); 
        return;
      }  
      //File exists
      fs.appendFileSync(path, '\n' + data, writingLogCallback);
    })
  },

  //Tone Analyzer log
  addToneAnalyzerLog: function(data_sent, response) {
    let toneName = "";
    try {
      let documentTone = response['document_tone'];
      let tones = documentTone['tones']
      let firstTone = tones[0];
      toneName = firstTone['tone_name'];
    } catch(err) {     
      toneName = 'analysis not provided';
    }

    fs.access(pathTone, fs.F_OK, (err) => {
      //File does not exists
      if (err) {
        fs.writeFile(pathTone, toneName, writingLogCallback); 
        return;
      }  
      //File exists
      fs.appendFileSync(
        pathTone,
        '\n\n>>> Analysis' +
        '\n- Kid\'s phrase: ' + data_sent +
        '\n- Tone Analyzer result: ' + toneName,
         writingLogCallback);
    })
  },

  //Clear log
  clearLog: function() {
    fs.writeFile(path, '##### FOFIS CHAT REPORT #####', writingLogCallback); 
    fs.writeFile(pathTone, '##### FOFIS TONE REPORT #####', writingLogCallback); 
  }
};



