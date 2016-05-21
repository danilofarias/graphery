var express = require('express'),
    app = express(),
    RegistryHandler = require('./handlers/RegistryHandler'),
    routes = require('./routes');

var handlers = {
  registry: RegistryHandler,
};

routes.setup(app, handlers);

function start() {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
}

exports.start = start;
exports.app = app;