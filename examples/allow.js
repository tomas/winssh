var winssh = require('./../');

winssh.start({ allow: [ '10.0.2.15' ] }, function(err) {
  console.log(err || 'Server listening on port ' + server.address().port);
});
