var assert = require('chai').assert;
var request = require('supertest');
var server = require('../setup');
var app = server.app

describe('Registry', function() {
  describe('register', function () {
    it('should save a microservice', function (done) {
      
      microservice = {
        name: "test01",
        group: "test",
        ip: "10.0.0.1",
        port: "5555",
        endpoints: [
          {
            uri: "testetest/test",
            method: "post"
          },
          {
            uri: "testetest/test",
            method: "get"
          }
        ]
      };

      request(app)
        .get('/register')
        .send()
        .expect(201, done);
    });
  });
});
