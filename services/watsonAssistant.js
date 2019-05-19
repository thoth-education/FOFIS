const watsonConfig = require('../config/watsonConfig');
const credentials = require('../credentials');
const watsonAssistant = watsonConfig.watsonAssistantConfig;

//Extract assistant response from the JSON
function extractResponse(json) {
  return JSON.stringify(json['output']['text'][0], null, 2);
}

module.exports = {
  sendTextToAssistant: function (callback, data, input_context) {
    watsonAssistant.message({
      workspace_id: credentials.watson_assistant.workspaceid,
      input: { 'text': data },
      context: input_context
    })
      .then(res => {
        callback(null, extractResponse(res), res['context']);
      })
      .catch(err => {
        callback(err, null, null);
      });
  }
}