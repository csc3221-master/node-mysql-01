const http = require('http');
const hostname = 'leia.cs.spu.edu';
const port = 3000;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "dbuser",
    password: "csc3221!",
    database: "employees"
});


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    connection.connect(function (err) {
    	if (err) throw err;
    	console.log("Connected!");
    	connection.query("SELECT * FROM employees LIMIT 5", function (err, result, fields) {
        	if (err) throw err;
        	console.log(result);
		res.end(JSON.stringify(result));
    	});
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

