
var app = require('./app');
var http = require('http');

var port = process.env.PORT || '3000'
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', console.error);
server.on('listening', () => console.log(`Listening on port ${port}`));
