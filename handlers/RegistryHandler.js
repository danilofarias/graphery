var crypto = require('crypto');
var http = require('http');

module.exports = (function(){
    'use strict'
    var db = require('../db');
    var db = db.db;
    var Handler = function() {};
    Handler.register = function(request, response) {

        var sha = crypto.createHash('sha256');

        sha.update(request.body.name);
        sha.update(request.body.group);
        sha.update(request.body.ip);
        sha.update(request.body.port);

        var params = request.body;
        params["hash"] = sha.digest('hex');

        db.cypher({
            query: 'CREATE (service:Microservice {name: {name}, group: {group}, ip: {ip}, port: {port}, hash: {hash}})'
             + 'RETURN service',
            params: params
        }, function (err, result) {

            if (err) {

                if (err.neo4j.code == "Neo.ClientError.Schema.ConstraintValidationFailed") {
                    response.status(201).json({ hash: params.hash });
                    return;
                }
                response.status(403).json(err);
                return;
            }

            if (!result[0].service.properties.hash) {
                console.log('No service created');
                response.status(500).json(result);
                return;
            }

            response.status(201).json({ hash: result[0].service.properties.hash });
        });
    };

    Handler.proxy = function(request, response){

        var host = request.headers['host'];
        var port = request.headers['port'];
        var hash = request.headers['hash'];
        var path = request.path;
        var options = {
            port: port || 80,
            host: host
        };

        var proxy_request = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response.write(chunk);
            });
            res.on('end', function() {
                response.end();
            });
        });

        request.on('data', function(chunk) {
            proxy_request.write(chunk, 'binary');
        });

        request.on('end', function() {
            proxy_request.end();
        });

        db.cypher({
            query: 'MATCH (service:Microservice), (dependency: Microservice)'+
            'WHERE service.hash = {hash} AND dependency.ip = {host}'+
            'CREATE UNIQUE (service)-[r:DEPENDS_ON]->(dependency)'+
            'CREATE (request:Request {from: id(service), to: id(dependency), endpoint: {path} })'+
            'RETURN dependency, service',
            params: {
                hash: hash,
                host: host,
                path: path
            }
        }, function (err, result) {

            if (err) {

                console.log(err);
                if (err.neo4j.code == "Neo.ClientError.Schema.ConstraintValidationFailed") {
                    response.status(201).json({ hash: params.hash });
                    return;
                }
                response.status(403).json(err);
                return;
            }
        });
    };

    Handler.info = function (request, response) {
        db.cypher({
            query: 'MATCH (services:Microservice)-[r]->(b) RETURN *'
        }, function (err, result) {
            if (err) {
                response.status(403).json(err);
                return;
            }
            response.status(200).json(result);
        });
    }

    return Handler;
})();
