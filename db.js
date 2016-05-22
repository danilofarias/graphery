var neo4j = require('neo4j');
var fs = require('fs');

var dbuser = process.env.DB_USER || "neo4j";
var dbpass = process.env.DB_PASS || "neo4j";
var dbaddr = process.env.DB_ADDR || "localhost:7474";

var db = new neo4j.GraphDatabase('http://'+dbuser+':'+dbpass+'@'+dbaddr);

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