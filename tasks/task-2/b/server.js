const http = require('http');
const app = require('./app');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Web server listening on port ' + app.get('port'));
});