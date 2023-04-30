const { sampleActionCallback } = require('./sample-action');
const { sendMessageActionCallback } = require('./send-message');

module.exports.register = (app) => {
  app.action('send_message', sendMessageActionCallback);
};