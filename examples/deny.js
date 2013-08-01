var winssh = require('./../');

winssh.start({ deny: [ '10.0.2.15' ] }, function(err, server) {
  console.log(err || 'Server listening on port ' + server.address().port);
});
