/*var http= require('http');
http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('hello');
}).listen(1337,'127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');
*/

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: '
