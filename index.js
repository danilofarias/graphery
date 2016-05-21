var app = require('express')();
var http = require('http').Server(app);


// Index
app.get('/', function (req, res) {
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

// Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});