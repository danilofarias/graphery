var neo4j = require('neo4j');
var fs = require('fs');

var db = new neo4j.GraphDatabase('http://neo4j:12345@localhost:7474');

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