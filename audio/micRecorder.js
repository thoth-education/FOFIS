const spawn = require('child_process').spawn;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// prepare 2 child processes
const recordProcess = spawn('arecord', ['-f', 'cd']);
const encodeProcess = spawn('lame', ['-', './audio/out.mp3']);

function start(callback) {
  // pipe child
  recordProcess.stdout.pipe(encodeProcess.stdin);

  readline.question(`Press enter to stop recording`, (name) => {
    console.log(`Stop recording...`);
    stopRecording(callback);
    readline.close()
  });
};

function stopRecording(callback) {
  recordProcess.stdin.pause();
  recordProcess.kill();
  encodeProcess.stdin.pause();
  encodeProcess.kill();
  callback(null, 'Audio recorded');
};

module.exports = {
  startRecording: function (callback) {
    readline.question(`Press enter to start recording`, (name) => {
      console.log(`Start recording...`);
      start(callback);
    });
  }
};
