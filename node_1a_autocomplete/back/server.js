const http = require('http');
const port = 8000;
const hostname = '127.0.0.1';
const url = require('url');
const users  = require('./userDetails.json');

function getUsernames(pathObj, res) {
	let queryString = pathObj.query;
	if(queryString.username.length > 3){
		res.setHeader("Content-Type", 'application/json');
		var filteredUsername = users.list.filter((user) => user.username.startsWith(queryString.username))
		res.end(JSON.stringify(filteredUsername));
	} else {
		res.setHeader("Content-Type", 'application/json');
		res.end(JSON.stringify([]));
	}
}



var server = http.createServer(function(req,res){
	let pathObj = url.parse(req.url, true);
	console.log("hey", req.url, pathObj);

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');

	switch(pathObj.pathname){

		case '/users':
		  if(req.method === 'GET') {
		  	getUsernames(pathObj, res);
		  } 
		  break;

	}
});

server.listen(port,() =>{
	console.log(`Server running at http://${hostname}:${port}/`);
});