var neo4j = require('neo4j');
var fs = require('fs');

var dbuser = process.env.DB_USER || "neo4j";
var dbpass = process.env.DB_PASS || "neo4j";
var dbhost = process.env.DB_HOST || "localhost";
var dbport = process.env.DB_HOST || "7474";

var db = new neo4j.GraphDatabase('http://'+dbuser+':'+dbpass+'@'+dbhost+':'+dbport);

fs.readFile( __dirname + '/data.cypher', function (err, data) {
    if (err) throw err;

    console.log(data.toString());

    db.cypher({
        query: data.toString(),
        params: {}
    }, function (err, result) {
        if (err) throw err;
    });
});

exports.db = db;