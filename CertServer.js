// CertServer.js
// Utitity for easy and safe installation of certificates on Android
// Usage: node CertServer.js path_to_certificate
//
// (C) Copyright 2011 Victor Klos
// This code is licenced under the Creative Commons Attribution-ShareAlike 3.0
// Trick based on http://www.realmb.com/droidCert/ (by Brian Kelley)

// Welcome
console.log('Thanks for using CertServer.js')
console.log()

// Check command line
if (process.argv.length != 3) {
    console.log('usage: node CertServer.js path_to_cert')
    process.exit(1)
}

process.title = "CertServer"
var path_to_cert = process.argv[2]

// Serve the certificate
var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 22666
var host = '0.0.0.0'
http.createServer(function (req, resp) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') {
        resp.writeHead(200, {'Content-Type': 'application/x-x509-ca-cert'});
        fs.createReadStream(path_to_cert).pipe(resp);
        console.log('[200] Certificate served to ' + req.connection.remoteAddress)
    } else {
        resp.writeHead(404, {"Content-Type": "text/plain"});  
        resp.write("404 Not Found\n");  
        console.log('[404] ' + pathname + ' requested from ' + req.connection.remoteAddress)
    }
}).listen(port, host);

console.log('Now visit http://this_computer:' + port + '/ with your (Android) device to');
console.log('install the certificate and press Ctrl-C when done.')
console.log()
