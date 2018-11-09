# loopback-healthcheck-middleware

A loopback middleware to install an route that returns basic server status.

Install
=============

```bash
  npm install loopback-healthcheck-middleware --save
```

How to use
=============

Add the middleware to your *middleware.json*:

```json
{
  "routes:before": {
    "loopback-healthcheck-middleware": {}
  }
}
```

Or registered via loopback API, e.g. `/server/server.js`:

```js
var loopback = require('loopback');
var hcmw = require('loopback-healthcheck-middleware');

var app = loopback();

app.middleware('routes:before', hcmw({ versionFile: './package.json' }));
```



Configuration
=============

### options.path

string that used as route path, default value is `/health`

### options.versionFile

string that used as relative path for the json file has version defined, default value is `../../package.json`, which is the path relative to `<project_path>/node_modules/loopback-healthcheck-middleware/healthcheck.js`
