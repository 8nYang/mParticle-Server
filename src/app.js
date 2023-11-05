const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

var express = require('express');
var logger = require('morgan');
var app = express();
var mparticle = require('mparticle');

/*const options = {
  key: fs.readFileSync('/usr/local/etc/nginx/key.pem'),
  cert: fs.readFileSync('/usr/local/etc/nginx/cert.pem')
};

const app = https.createServer(options, function (request, response) {
  let filePath = path.join(__dirname, 'public', request.url);
  if (filePath === path.join(__dirname, 'public', '/')) filePath = path.join(__dirname, 'public', 'index.html');

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500);
      response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(443);*/

https
    .createServer(
        {
          key: fs.readFileSync("/usr/local/etc/nginx/key.pem"),
          cert: fs.readFileSync("/usr/local/etc/nginx/cert.pem"),
        },
        app
    ).listen(443, ()=>{
        console.log('server is runing at port 443')
    });

http
    .createServer(
        app
    ).listen(80, ()=>{
        console.log('server is runing at port 80')
    });

// log requests
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public', 'index.html')));
app.use('/mp/book_flight', require('./public/mp/book-flight.js'));
app.use('/mp/check_in', require('./public/mp/check-in.js'));
app.use('/mp/flight_update', require('./public/mp/flight-update.js'));
app.use('/mp/buy_coin', require('./public/mp/buy-coin.js'));
app.use('/mp/buy_matas', require('./public/mp/buy-matas.js'));
app.use('/mp/buy_puc', require('./public/mp/buy-puc.js'));
app.use('/mp/push_notification', require('./public/mp/push-notification.js'));
app.use('/mp/profile', require('./public/mp/profile.js'));

module.exports = app;
