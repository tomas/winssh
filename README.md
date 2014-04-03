winssh
======

Node.js 'SSH-like' server for Windows, in less that 100 lines of code.

Does not provide any way of authentication (yet). Although you can set IP address allow/deny rules.

# Installation

    $ npm install winssh

# Usage

``` js
var winssh = require('winssh');

winssh.start(function(err, server) {
  if (!err)
    console.log('Server listening on port ' + server.address().port); // by default, port 22
});
```

# Options

``` js
var options = {
  port: 2345,
  allow: [ '10.0.2.2' ]
}
winssh.start(options, function(err, server) {
  // all connections will be rejected, except those coming from '10.0.2.2'
});
```

For more usage examples, check the `examples` directory.

# Copyright / License

By Tomás Pollak. MIT Licensed.
