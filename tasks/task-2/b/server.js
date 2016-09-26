
const app = require('./app').makeApp();

app.listen(app.get('port'), function(){
    console.log('Web server listening on port ' + app.get('port'));
});