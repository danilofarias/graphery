var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://neo4j:12345@localhost:7474');
exports.db = db;