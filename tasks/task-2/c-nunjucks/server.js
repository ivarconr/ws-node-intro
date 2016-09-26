const app = require('./app-nunjucks').makeApp();

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Web server listening on port ' +port);
    console.log("PID:" + process.pid);
});
