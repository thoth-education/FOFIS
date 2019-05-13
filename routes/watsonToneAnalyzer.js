const watsonConfig = require('../config/watsonConfig'); 
const toneAnalyzer = watsonConfig.toneAnalyzerConfig;

module.exports = {
    sendTextTranslatedToToneAnalyzer : function(callback, data){

        //parametros necessarios para enviar o texto pro tone
        const toneParams = {
            tone_input: { 'text': data },
            content_type: 'application/json',
          };
          
          toneAnalyzer.tone(toneParams)
            .then(toneAnalysis => {
              callback(null, (JSON.stringify(toneAnalysis, null, 2)));
            })
            .catch(err => {
              callback(console.log('error:', err), null);
            });
    }
}