const http = require('http');
const hostname = 'leia.cs.spu.edu';
const port = 3000;

var mysql = require('mysql');
var message;
var connection = mysql.createConnection({
	    host: "localhost",
	    user: "dbuser",
	    password: "csc3221!",
	    database: "employees"
});

connection.connect(function (err) {
	    if (err) throw err;
	    console.log("Connected!");
	    connection.query("SELECT * FROM employees LIMIT 5", function (err, result, fields) {
		            if (err) throw err;
		            console.log(result);
		            message = result;
		        });
});

const server = http.createServer((req, res) => {
	    res.statusCode = 200;
	    res.setHeader('Content-type', 'text/plain');
	    res.end(JSON.stringify(message));
});

server.listen(port, hostname, () => {
	    console.log(`Server running at http://${hostname}:${port}/`);
});

