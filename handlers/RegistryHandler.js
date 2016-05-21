var crypto = require('crypto');

module.exports = (function(){
    'use strict'
    var db = require('../db');
    var db = db.db;
    var Handler = function() {};
    Handler.register = function(req, res) {

        var sha = crypto.createHash('sha256');

        sha.update(req.body.name);
        sha.update(req.body.group);
        sha.update(req.body.ip);
        sha.update(req.body.port);

        var params = req.body;
        params["hash"] = sha.digest('hex');

        db.cypher({
            query: 'CREATE (service:Microservice {name: {name}, group: {group}, ip: {ip}, port: {port}, hash: {hash}})'
             + 'RETURN service',
            params: params
        }, function (err, result) {

            if (err) {

                if (err.neo4j.code == "Neo.ClientError.Schema.ConstraintValidationFailed") {
                    res.status(201).json({ hash: params.hash });
                    return;
                }
                res.status(403).json(err);
                return;
            }

            if (!result[0].service.properties.hash) {
                console.log('No service created');
                res.status(500).json(result);
                return;
            }

            res.status(201).json({ hash: result[0].service.properties.hash });
        });
    };
    return Handler;
})();