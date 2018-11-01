'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const app = loopback();

module.exports = app;

app.boot = cb => {
  boot(app, __dirname, function(err) {
    if (err) {
      throw err;
    }
    cb();
  });
};
