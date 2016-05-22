var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

function setup(app, handlers) {
    app.post('/register', jsonParser, handlers.registry.register);
    app.get('/', jsonParser, handlers.registry.proxy);
    app.get('/info', handlers.registry.info);

    // Index
    app.get('/manager', function (req, res) {
      res.sendFile(__dirname + '/index.html');
    });

    // Libraries 
    app.get('/lib/*', function(req, res){
        res.sendFile(__dirname + req.path);
    });

    // Public
    app.get('/public/*', function(req, res){
        res.sendFile(__dirname + req.path);
    });

    // Data
    app.get('/data/*', function(req, res){
        res.sendFile(__dirname + req.path);
    });
}

exports.setup = setup;
