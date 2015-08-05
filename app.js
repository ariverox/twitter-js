var express = require('express');
var app = express();


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
app.get("/news", function(request,response){
  response.send("the news");
});

app.use( function(request, response, next) {
  request.logx = request.method + request.path;
  console.log(request.method + request.path  + response.statusCode );
  response.send(response.contents);
});

var port = 3000;
app.listen(port, function () {
	console.log('Awaiting orders on port', port);
});
