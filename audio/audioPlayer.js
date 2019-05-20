const player = require('play-sound')(opts = {})

module.exports = {
  playAudio: function () {
    player.play('./audio/answer.mp3', function(err) {
      if (err) throw err
    })
  }
}