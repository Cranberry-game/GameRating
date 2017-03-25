/*
    Start httpserver at port 1111
    Start httpsserver at port 1110

*/
let fs = require('fs');
let https = require('https'); 
let http = require('http');
let privateKey = fs.readFileSync('./src/certificate/private.pem', 'utf8');
let certificate = fs.readFileSync('./src/certificate/csr.crt', 'utf8');
let cert = {key:privateKey, cert: certificate};
let app = require('./app');


let httpsServer=https.createServer(cert, app);
let httpServer = http.createServer(app);

httpServer.listen(1111);
httpsServer.listen(1110);


import {router} from './routes/index';
router(app);