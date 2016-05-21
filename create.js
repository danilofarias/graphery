var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');

db.cypher({
    query: "CREATE (test:Microservice { name: 'Test' })",
    params: {}
}, function (err, results) {
    if (err) throw err;
    console.log(JSON.str(results,null,4));
});

