var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');

db.cypher({
    query: 'MATCH (services:Microservice)-[r]->(b) RETURN *',
    params: {},
}, function (err, results) {
    if (err) throw err;
    if (!results.lenght == 0) {
        console.log('No services found.');
    } else {
        console.log(JSON.stringify(results, null, 4));
    }
});
