/* eslint-disable no-console */
const spawn = require('child_process').spawn;
let readline;
let recordProcess;
let encodeProcess;

function start(callback) {
  // pipe child
  recordProcess = spawn('arecord', ['-f', 'cd']);
  encodeProcess = spawn('lame', ['-', './audio/out.mp3']);
  recordProcess.stdout.pipe(encodeProcess.stdin);

  readline.question(`Press enter to stop recording`, () => {
    stopRecording(callback);
    readline.close()
  });
}

function stopRecording(callback) {
  recordProcess.stdin.pause();
  recordProcess.kill();
  encodeProcess.stdin.pause();
  encodeProcess.kill();
  callback(null, 'Audio recorded');
}

module.exports = {
  startRecording: function (callback) {
    readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`Press enter to start recording`, () => {
      start(callback);
    });
  }
};
