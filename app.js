var express = require('express');
var tweetBank = require("./tweetBank");
var app = express();
var swig = require('swig');

var routes = require("./routes");
app.use("/", routes, function(req,res) {
  console.log(req.method + req.path + res.statusCode);
  res.send(res.contents);
});
// , function(request, response) {
//   console.log(request.method + request.path + response.statusCode);
// });

// swig setup
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html' );
app.set('views', __dirname + '/views');


// app.use( function(request, response, next) {
//   request.logx = request.method + request.path;
//   console.log(request.method + request.path  + " " +response.statusCode );
//   response.send(response.contents);
// });

var port = 3000;
app.listen(port, function () {
	console.log('Awaiting orders on port', port);
});
