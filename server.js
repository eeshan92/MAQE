//Lets require/import the HTTP module
var http = require('http'),
    fs = require('fs'),
    express = require("express"),
    app     = express(),
    path    = require("path"),
    xml = require('xml');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname +'/home.html'));
});

app.get('/canvas_out',function(req,res){
  res.sendFile(path.join(__dirname +'/canvas_out.html'))
});

app.get('/get_components', function(req,res) {
  var style = req.query.type;
  var dir = 'assets/images/svg/' + style + '/';
  var array = [];
  var files = fs.readdirSync(dir);
  
  files.forEach(function(file) {
    array.push(file);
  });

  res.send(array);
});

app.get('/canvas_in',function(req,res){
  res.sendFile(path.join(__dirname +'/canvas_in.html'));
});

app.use(express.static(__dirname + '/assets'));

app.listen(3000);

console.log("Running at Port 3000");
