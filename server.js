var connect = require('connect'), 
    http    = require('http');

var app = connect().use(connect.static('public'));

http.createServer(app).listen(process.env.PORT || 3000);
