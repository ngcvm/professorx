const { appHomeOpenedCallback } = require('./app-home-opened');
const { onMessage } = require('./on-message');
const { messageContext } = require('../../middlwares');

module.exports.register = (app) => {
  app.event('message', messageContext,  onMessage);
};