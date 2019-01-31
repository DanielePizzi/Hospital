var http = require('http');

/***ARGS */

var PORT = 1234,MOCK_FOLDER = "mocks";

process.argv.forEach(function (val, index, array) {
  if(val.indexOf("mockPort") != -1){
    PORT = val.split("=")[1];
  }

  if(val.indexOf("mockFolder") != -1){
    MOCK_FOLDER = val.split("=")[1];
  }
});

/***ARGS */

var server = http.createServer(function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  try{

    var jsonStr = JSON.stringify(require('../' + MOCK_FOLDER +'/' + req.url + ".json"));

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(jsonStr);
  }
  catch(err){
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end("" + err);
  }


})

server.listen(PORT);
