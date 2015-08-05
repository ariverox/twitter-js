var express = require('express');
var tweetBank = require("./tweetBank");
var app = express();
var swig = require('swig');

var routes = require("./routes");
app.use("/tweets", routes);

// swig setup
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html' );
app.set('views', __dirname + '/views');

//var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];



// app.post("/", function(request,response){
//   console.dir(response);
//   console.log(request.logx);
// });


/*

app.get("/tweets/:number", function(request, response, next) {
  var tweetNumber = request.params.number;
  console.log(request.params.number);
  var data = tweetBank.list();
  response.status(200);
  response.contents = data[tweetNumber];
  next();

});

app.get("/people", function(request,response, next){
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  response.render( 'index', {title: 'Hall of Fame', people: people }, function(err,html){
    response.contents = html;
    next();
  } );


});

*/

app.use( function(request, response, next) {
  request.logx = request.method + request.path;
  console.log(request.method + request.path  + " " +response.statusCode );
  response.send(response.contents);
});

var port = 3000;
app.listen(port, function () {
	console.log('Awaiting orders on port', port);
});
