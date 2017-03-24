'use strict';

var _index = require('./routes/index');

var fs = require('fs');
var https = require('https');
var http = require('http');
var privateKey = fs.readFileSync('./dist/certificate/private.pem', 'utf8');
var certificate = fs.readFileSync('./dist/certificate/csr.crt', 'utf8');
var cert = { key: privateKey, cert: certificate };
var app = require('./app');

var httpsServer = https.createServer(cert, app);
var httpServer = http.createServer(app);

httpServer.listen(1111);
httpsServer.listen(1110);

(0, _index.router)(app);