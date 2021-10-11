var fs = require("fs");
var http = require('http');
var ip = require('ip');
var os = require('os');

function getuptime() {
    serverTime = os.uptime();
    var serverMinutes = Math.floor(serverTime/60)
    var ServerHours = Math.floor(serverMinutes/60)
    var ServerDays  = Math.floor(ServerHours/24)

    var concatenatedTime = "Days: " + ServerDays + ", Hours: " + ServerHours%24 + ", Minutes: " + serverMinutes%60 + ", Seconds: " + serverTime%60
    return concatenatedTime;
}

//days = serverTime.math.floor
    //https://github.com/uc-botheaj/it3038c-scripts/tree/main/node

var server = http.createServer(function (req, res) {
    if (req.url === "/") {

        fs.readFile("./public/index.html", "UTF-8", function (err, body) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(body);
        });
    }
    else if (req.url.match("/sysinfo")) {
        myHostName = os.hostname();

        html = `
        <!DOCTYPE HTML>
                <html>
                    <head> 
                        <title>Node JS Response</title> 
                    </head>
                    <body>
                        <p>Hostname: ${myHostName}</p>
                        <p>IP: ${ip.address()}</p>
                        <p>Server Uptime: ${getuptime()}</p>
                        <p>Total Memory: ${(os.totalmem()/1024/1024)} MB</p>
                        <p>Free Memory: ${os.freemem()/1024/1024} MB</p>
                        <p>Number of CPUs: ${os.cpus().length} CPUs</p>

                    </body>
                </html>`
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end(`404 file not found at ${req.url}`);
    }

}).listen(3000)

console.log("Server listening on port 3000");
