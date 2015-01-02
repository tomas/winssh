var net        = require('net'),
    spawn      = require('child_process').spawn,
    is_windows = process.platform == 'win32';

var default_port = 22,
    debug = !!process.env.DEBUG,
    child,
    server;

var log = function(str) {
  if (debug) console.log(str);
}

var rule_matches = function(arr, str) {
  var matches = false;
  for (i = 0, e = arr.length; i < e; i++) {
    var rule = new RegExp(arr[i]);
    if (str.match(rule))
      matches = true;
  }
  return matches;
}

exports.start = function(opts, cb) {
  // if (!is_windows)
  //  return cb && cb(new Error('This module only runs on Windows'));

  if (typeof opts.debug != 'undefined')
    debug = opts.debug;

  // returns true of no allow list defined, or ip is in that list
  var allowed = function(ip) {
    return (!opts.allow || rule_matches(opts.allow, ip));
  }

  // returns true of denied list exists and ip belongs to that list
  var denied = function(ip) {
    return (opts.deny && rule_matches(opts.deny, ip));
  }

  server = net.createServer(function(socket) {
    var ip = socket.address().address;
    log('New session from ' + ip)

    if (!allowed(ip) || denied(ip))
      return socket.end('Access denied.\n');

    socket.child = spawn('cmd.exe');
    // socket.write('C:\\>');

    var write = function(data) {
      if (socket.readyState != 'closed')
        socket.write(data);
    };

    socket.child.stdout.on('data', write);
    socket.child.stderr.on('data', write);

    socket.on('data', function(data){
      if (socket.child.stdin.destroyed)
        process.stdin.resume();

      socket.child.stdin.write(data);
    })

    socket.child.on('error', function(err){
      log(err.message);
    })

    socket.child.stdin.on('end', function () {
      log('Child stdin closed');
    });

    socket.child.on('exit', function(){
      socket.end();
    })

    socket.on('end', function(){
      log('Session closed.')
      socket.child.kill();
    })

    socket.on('error', function(err){
      log(err.message);
    })

  })

  server.listen(opts.port || default_port, function(err) {
    cb(err, server);
  });
}

exports.stop = function() {
  if (!server) return;
  try { server.close() } catch(e) { log(e) };
}
