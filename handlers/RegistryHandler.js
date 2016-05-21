module.exports = (function(){
    'use strict'
    var db = require('../db');
    var db = db.db;
    var Handler = function() {};
    Handler.register = function(req, res) {
        db.cypher({
            query: 'CREATE (service:Microservice {name: {name}, group: {group}, ip: {ip}, port: {port}})'
             + 'RETURN id(service) AS id',
            params: req.body
        }, function (err, result) {
            console.log(err);
            console.log(result);
            if (err) throw err;

            if (!result[0].id) {
                console.log('No service created');
                throw 'No service created';
            }

            res.status(201).json({ id: result[0].id });
        });
    };
    return Handler;
})();