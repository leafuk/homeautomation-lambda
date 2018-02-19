var request = require('request');
var REMOTE_CLOUD_HOSTNAME = process.env.hostname;
var REMOTE_CLOUD_BASE_PATH = process.env.smarthomepath;;

exports.handler = function(event, context) {

    log('Input', JSON.stringify(event, null, 4));

    handleController(event, context);
};

function handleController(event, context, controllerPath) {
    var options = {
        url: REMOTE_CLOUD_HOSTNAME + REMOTE_CLOUD_BASE_PATH,
         body: event,
         json: true,
         method: 'POST'
    }

    request(options, function(err, response, body){
        if(err) log('Error:', JSON.stringify(err, null, 4));
        if(body) log('Body:', JSON.stringify(body, null, 4));

        context.succeed(body);
    });
}

/**
 * Utility functions.
 */
function log(title, msg) {
    console.log('*************** ' + title + ' *************');
    console.log(msg);
    console.log('*************** ' + title + ' End*************');
}