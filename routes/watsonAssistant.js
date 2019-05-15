const watsonConfig = require('../config/watsonConfig');
const watsonAssistant = watsonConfig.watsonAssistantConfig;

/* POST to Watson API */
router.post('/', function(req, res, next) {
  var { text, context } = req.body;
  context = JSON.parse(context);

  const params = {
    input: { text },
    workspace_id: '<WORKSPACE_ID>',
    context  
  };

  watsonAssistant.message(
      params,
      function(err, response) {
          if(err) {
              res.json({status:'ERRO', data:err});
          } else {
              res.json({status: 'OK', data:response});
          }
      }
  )
});

module.exports = router;