const http = require('http');
const app = require('./app').makeapp();

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, function(){
    console.log('Web server listening on port ' +port);
    console.log("PID:" + process.pid);
});
