var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = require('path');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/**', function(req,res,next) {
  //  console.log("xxx" + req.path);
    var filePath = path.join(__dirname, '../public', req.path);
    console.log(filePath);
  //console.log(__dirname + "/../public" + req.path)
    fs.exists(filePath, function(exists){
      if(exists) {
        res.sendFile(filePath);
      } else {
        next();
      }
    });
  //res.sendFile(path.join(__dirname, '../public/stylesheets', 'style.css'));
  //next();

});

router.get('/tweets', function (req, res, next) {
  console.log("tweets called")
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets }, function(err, html){
    //res.status(200);
    res.contents = html;
    next();
  });
});


module.exports = router;
