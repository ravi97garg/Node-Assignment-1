const http = require('http');
const port = 8000;
const hostname = '127.0.0.1';
const fs = require('fs');
const url = require('url');
const students  = require('./student');

function getStudents(pathObj, res) {
    let queryString = pathObj.query;
    console.log(":student", pathObj, queryString);
    if(queryString.subject){
        res.setHeader("Content-Type", 'application/json');
        var filteredStudents = students.list.filter((student) => student.subject === queryString.subject);
        res.end(JSON.stringify(filteredStudents));
    } else {
        res.setHeader("Content-Type", 'application/json');
        //res.end(JSON.stringify(users.list));
    }
}



var server = http.createServer(function(req,res) {
        let pathObj = url.parse(req.url, true);
        console.log("hey", req.url, pathObj);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');

        switch (pathObj.pathname) {

            case '/student':
                if (req.method === 'GET') {
                    getStudents(pathObj, res);
                }
                break;

        }
    }
);

server.listen(port,() =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});