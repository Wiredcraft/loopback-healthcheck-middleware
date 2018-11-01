'use strict';

const path = require('path');
const defautOpts = {
  path: '/health',
  versionFile: '../../package.json' // path relative to healthcheck.js
};

module.exports = function(options) {
  options = options ? Object.assign(defautOpts, options) : defautOpts;
  const started = new Date();
  const verpath = path.join(__dirname, options.versionFile);
  let version = 'unknown';
  try {
    const ver = require(verpath);
    version = (ver && ver.version) || version;
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
    console.log('Version file not found: ', verpath);
  }

  return function healthcheck(req, res, next) {
    if (req.path === options.path) {
      res.send({
        started: started,
        uptime: (Date.now() - Number(started)) / 1000,
        version
      });
    } else {
      next();
    }
  };
};
