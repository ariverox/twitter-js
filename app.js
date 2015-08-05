var express = require('express');
var app = express();
var swig = require('swig');
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html' );
app.set('views', __dirname + '/views');

var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];



app.post("/", function(request,response){
  console.dir(response);
  console.log(request.logx);
});

app.get("/birds", function(request, response, next) {
  response.status(200);
  //console.log(request.logx);
  response.contents = "birds";
  //response.send("birds");
  next();

});
app.get("/people", function(request,response, next){
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  response.render( 'index', {title: 'Hall of Fame', people: people }, function(err,html){
    response.contents = html;
    next();
  } );


});

app.use( function(request, response, next) {
  request.logx = request.method + request.path;
  console.log(request.method + request.path  + " " +response.statusCode );
  response.send(response.contents);
});

var port = 3000;
app.listen(port, function () {
	console.log('Awaiting orders on port', port);
});
