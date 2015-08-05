/*****
* A server listens on a port
* A server won't handle any requests unless you tell it to
*****/
// hyper-minimal
// require('express')().listen(1234);
var express = require('express');
var app = express(); // instance of an express application

// /*****
// * Express exposes the request and response objects through a callback
// * If you don't send a response, the client hangs
// *****/
// app.get('/example', function (request, response) {
// 	console.log('Request keys:', Object.keys(request));
// 	console.log('Response keys:', Object.keys(response));
// });

// /*****
// * The client decides what to do with the response
// *****/
// // in each case try `curl localhost:1234/example` versus localhost:1234/example in url bar of browser
// // string
// app.get('/example', function (request, response) {
// 	response.send('Something of great importance, clearly');
// });
// // html
// app.get('/example', function (request, response) {
// 	response.send('<div style="background:blue;">Something of great importance, clearly</div>');
// });
// json
// app.get('/example', function (request, response) {
// 	response.json({i: {am: 'json'}});
// });

// /*****
// * Request handlers are specific to a verb and a route
// * You can match all verbs with `app.all`
// *****/
// // try `curl localhost:1234/example -X GET` vs. `curl localhost:1234/example -X GET`
// app.get('/example', function (request, response) {
// 	response.send('im a get request response');
// });
// app.post('/example', function (request, response) {
// 	response.send('im a post request response');
// });
// app.all('/example', function (request, response) {
// 	response.send('im an anything request response');
// });

// /*****
// * Routes are not filepaths
// *****/
// // a simple CR app
// var dumbledores = [],
// 	id = 0;
// app.get('/data', function (request, response) {
// 	response.json(dumbledores);
// });
// app.post('/data', function (request, response) {
// 	dumbledores.push({
// 		name: 'Dumbledore',
// 		id: id++
// 	});
// 	response.json(dumbledores[dumbledores.length - 1]);
// });

// /*****
// * You can chain handlers with `next()`
// * Every handler should always either `next()` or send a response
// *****/
// app.get('/athing', function (request, response, next) {
// 	console.log('firstly!');
// 	next(); // you need this! if you don't it hangs indefinitely
// });
// // independent
// app.get('/anotherthing', function (request, response) {
// 	response.send('look ma no hands!');
// });
// app.get('/athing', function (request, response) {
// 	response.send('finally!');
// });

// /*****
// * Order matters: handlers fire in the order in which they are registered
// *****/
// app.get('/something', function (request, response, next) {
// 	console.log('firstly!');
// 	next();
// });
// app.get('/something', function (request, response) {
// 	response.send('finally!');
// });

// /*****
// * You can snowball data by attaching it to `request` or `response`
// *****/
// app.get('/santaclaus', function (request, response, next) {
// 	request.someProperty = 'magic';
// 	next();
// });
// app.get('/santaclaus', function (request, response) {
// 	response.send('how is this possible? ' + request.someProperty);
// });

// /*****
// * Request data can be in the route and is accessible via `request.params`
// * Request data can be in the query string and is accessible via `request.query`
// * Request data can be in the payload and is accessible via `request.body`
// *****/
// // route fragment of request, `request.params`
// app.get('/times2/:number', function (request, response) {
// 	response.json(request.params.number * 2);
// });
// // query string of request, `request.query`
// app.get('/times2', function (request, response) {
// 	response.json(request.query.num * 2);
// });
// // you won't have `request.body` unless you use `bodyParser`
// var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// // payload of request, `request.body`
// app.post('/times2', function (request, response) {
// 	console.log(request.body);
// 	response.json(request.body.n * 2);
// });

// /*****
// * `app.use` matches the route up to the next '/'
// * `app.all` matches the the whole route exactly
// * `app.use` will assume '/' as its first argument, if not given
// *****/
// app.all('/stuff', function (request, response) {
// 	response.send('hit the ALL handler');
// });
// app.use('/stuff', function (request, response) {
// 	response.send('hit the USE handler');
// });
// app.use(function (request, response, next) {
// 	console.log('I ran');
// 	next();
// });

// /*****
// * You can make your own middleware
// *****/
// app.use(function (request, response, next) {
// 	var strOfData = '';
// 	request.on('end', function () {
// 		request.body = JSON.parse(strOfData);
// 		next();
// 	});
// 	request.on('data', function (x) {
// 		// pull in data
// 		strOfData += x.toString();
// 	});
// });
// app.use(function (request, response, next) {
// 	console.log(request.body);
// 	next();
// });

// /*****
// * Routes are not filepaths
// *****/
// app.use(function (request, response) {
// 	var routeString = request.path;
// 	response.json(routeString.length);
// });

// // matches GET, POST, PUT, DELETE, ... everything
// // route /example
// // NOT match /example/123, /123/example
// app.all('/example', function (request, response) {
// 	response.send('this one')
// });
// // matches GET, POST, PUT, DELETE, ... everything
// // route /example, /example/123, /example/<anythinghere>
// // NOT match /123/example, /examplexyz
// app.use('/example', function (request, response) {
// 	response.send('that one');
// })


// /*****
// * You can map routes to filepaths
// *****/
// // for all incoming requests, attempt to map
// // the route to a file
// var fs = require('fs');
// app.use('/staticFiles', function (request, response) {
// 	fs.readFile('.' + request.path, function (err, contents) {
// 		if (err) next();
// 		else response.send(contents.toString());
// 	});
// });

// '.' ==> directory from which you ran `node whatever`
// __dirname ==> actual directory of the file using this global variable

// /*****
// * You can pass errors to `next`
// * Error handlers are parallel to normal handlers
// *****/
// app.get('/roulette', function (request, response, next) {
// 	var n = Math.random();
// 	if (n > 0.5) response.send('phew!');
// 	else if (n > 0.4) {}
// 	else {
// 		var error = new Error();
// 		next(error);
// 	}
// });
// app.use(function (request, response, next) {
// 	console.log('normally, i would match');
// 	next();
// });
// // this is error handling middleware simply because
// // it declares four arguments!
// app.use(function (error, request, response, next) {
// 	console.log('sh*t happens');
// 	response.send(error);
// });

// /*****
// * Routers modularize your request handling
// * You must incorporate routers into your app with `app.use`
// *****/
// var birdRouter = express.Router(); // new instance of a router
// birdRouter.get('/hens', function (request, response) {
// 	response.send('cluck');
// });
// birdRouter.get('/crows', function (request, response) {
// 	response.send('caw');
// });
// app.use('/birds', birdRouter);

var port = 1234;
app.listen(port, function () {
	console.log('Awaiting orders on port', port);
});
