var bodyParser = require('body-parser')

// create application/json parser 
var jsonParser = bodyParser.json()

function setup(app, handlers) {
  app.post('/register', jsonParser, handlers.registry.register);
}

exports.setup = setup;