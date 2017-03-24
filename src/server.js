let fs = require('fs');
let https = require('https'); 
let http = require('http');
let privateKey = fs.readFileSync('./dist/certificate/private.pem', 'utf8');
let certificate = fs.readFileSync('./dist/certificate/csr.crt', 'utf8');
let cert = {key:privateKey, cert: certificate};
let app = require('./app');


let httpsServer=https.createServer(cert, app);
let httpServer = http.createServer(app);






httpServer.listen(1111);
httpsServer.listen(1110);


import {router} from './routes/index';
router(app);