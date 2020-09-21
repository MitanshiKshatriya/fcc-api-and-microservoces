// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var os = require("os")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
var x={}
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//whoami
app.get("/api/whoami",function(req,res){
  var ip=req.connection.remoteAddress
  var lang=req.headers["accept-language"]
var software=req.headers["user-agent"]
console.log(software)
  res.json({ipaddress:ip,
            language:lang,
            software:software
           })
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
