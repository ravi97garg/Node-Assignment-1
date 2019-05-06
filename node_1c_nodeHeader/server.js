const http = require('http');
const port = 8000;
const hostname = '127.0.0.1';
const fs = require('fs');
const url = require('url');

function renderhtml(path, res) {
	fs.readFile(path, null, function(error, data){
		if(error){
			res.writeHead(400);
			res.write("file not found");
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		}

		res.end();
	});
}

var server = http.createServer(function(req,res){
	let pathObj = url.parse(req.url, true);
	console.log("hey", req.url, pathObj);
	

	switch(pathObj.pathname){
		case '/':
		  renderhtml("./home.html", res);
		  break;
	 	case '/about':
		  renderhtml("./about.html", res);
		  break;
	   	case '/contact':
		  renderhtml("./contact.html", res);
		  break;

	}
});

server.listen(port,() =>{
	console.log(`Server running at http://${hostname}:${port}/`);
});