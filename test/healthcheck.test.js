'use strict';

const request = require('supertest');
const loopback = require('loopback');
const boot = require('loopback-boot');
const assert = require('assert');
const app = require('./server/server');
const healthcheck = require('../healthcheck');

describe('healthcheck', function() {
  it('should install default route when registered in middleware.json', function(done) {
    app.boot(function() {
      request(app)
        .get('/health')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert(res.body.started);
          assert(res.body.uptime);
          assert.equal(res.body.version, 'x.x.1');
          done();
        });
    });
  });
  it('should install route passed in params when registered via API', function(done) {
    const app2 = loopback();
    app2.middleware(
      'routes',
      healthcheck({
        path: '/test',
        versionFile: './package.json'
      })
    );
    boot(app2, __dirname, function() {
      request(app2)
        .get('/test')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert(res.body.started);
          assert(res.body.uptime);
          assert.equal(res.body.version, '0.0.1');
          done();
        });
    });
  });
});
