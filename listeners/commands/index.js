
const { sampleCommandCallback } = require('./sample-command');

module.exports.register = (app) => {
  app.command('/check', sampleCommandCallback);
};