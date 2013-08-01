var winssh = require('./../');

winssh.start({ debug: true }, function(err, server) {
  console.log(err || 'Server listening on port ' + server.address().port);
});
