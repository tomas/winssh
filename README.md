winssh
======

Node.js 'SSH-like' server for Windows, in less that 100 lines of code.

Does not provide any way of authentication (yet). Although you can set IP address allow/deny rules.

# Installation

    npm install -g winssh

# Usage

    > winssh

    WinSSH server listening on port 1232
    Connect using: ssh 10.10.2.39 -p 1232

Yes, that's right. There are a few options available:

	-p/--port [port]
	-a/--allow [hosts]
	-d/--deny [hosts]
	-D/--debug

    winssh -p 2222 # listens on port 2222
    winssh -d 6.5.4.3 # denies access from IP 6.5.4.3
    winssh -a 10.0.2.8,10.0.2.10 # allows access only from IPs 10.0.2.8 and 10.0.2.10

# Programatic use

But of course. Options are equivalent to those than available on the CLI.

``` js
var winssh = require('winssh');

// using the default options (port 22, no allow or deny hosts)
winssh.start(function(err, server) {
  if (!err)
    console.log('Server listening on port ' + server.address().port); // by default, port 22
});

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
