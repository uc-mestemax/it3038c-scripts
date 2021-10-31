var http = require('http');
var fs = require('fs');
//var path = require('path')
// For Reference:
//https://github.com/uc-botheaj/it3038c-scripts/tree/main/node

const html = fs.readFileSync('index.html')

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(alert('Hello World'));
    res.end();
}).listen(3000) 

console.log("Server listening on port 3000");

/*TO DO

Form to collect busID variable and pass that to axios
Send alert() every matched value */