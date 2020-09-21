'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser=require('body-parser')

var cors = require('cors');

var app = express();

const dns = require('dns');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.DB_URI,function(err){
  if(err){console.log("connection error is:" + err)}
  else{console.log("connected successfully")}
});

var URLSchema = new mongoose.Schema({
  OriginalURL:String,
  ShortURL:String
})
  const shortURL = mongoose.model("shortURL",URLSchema)
app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended:true}))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new",function(req,res){
   var url=req.body.url
    var pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (pattern.test(url)){
   
    var short=Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);

  
    var newURL = new shortURL({
      OriginalURL:url,
  ShortURL:short
    })
    newURL.save(function(err){
      if(err){
        console.log("error")
      }else{
        console.log("successfully saved to DB")
      }
    })
    res.json(newURL)
    
  }else{
    res.json({error:"Invalid URL"})
  }
  console.log(url)
  
})

app.get("/api/shorturl/:new",function(req,res){
 console.log(req.params.new)
  shortURL.findOne({'ShortURL':req.params.new},(err,doc)=>{
    if(err){console.log(err)}
    else{
      res.redirect(doc.OriginalURL)
    }
  })
})
mongoose.connection.close()

app.listen(port, function () {
  console.log('Node.js listening ...');
});
