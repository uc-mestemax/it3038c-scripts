var http = require('http');
var fs = require('fs').promises;
var express = require("express"); //This library is used to collect the form data from index.html
var ip = require('ip');
var os = require('os');

// This is kinda a neat package I found that allows for more of a dynamic client side experience 
let ejs = require('ejs');
//Did not use the below library yet
//var path = require('path') 

//const html = fs.readFileSync('./project3/index.html');



//This is the main library that I used to GET the json data from UC's double map. There were a lot of different choices like pupetteer and cheerio that are more suited I believe for dynamic sites.
const axios = require('axios');
const timeToGetThere = 10;

//*******************************************************//
//The variables below are the variables that you modify.//
//*****************************************************//
//const stopID = '129'; //This is the stopID that can be found in the doublemap link: /eta?stop=28
//const objectPosition = '0'; // If there is more than one shuttle that stops at your location, you will have to select that. It is the integer under the second iteration of etas/
//****************************************************//



//shuttleScraper()



//console.log('The ETA for the shuttle is ' + eta + ' minute(s)')

//const txt = fs.readFileSync('test.txt')
// used https://gullele.com/how-to-get-user-input-and-process-it-in-nodejs-tutorial/ to understand how to ship the HTML form data into nodeJS

var server = http.createServer(async function (req, res) {
    //const ETA =  await scraper();
    const formSubmission = 
    `<!DOCTYPE HTML>
    <html lang="en">
        <head> 
            <title>Node JS Response</title> 
            <meta charset="UTF-8">
        </head>
        <body>
                <h3 id="stopID" style="text-align: center;">Your Stop ID:</h3>
                <p style="text-align: center;">This is HTML. The current ETA is <span id="ETA"></span></p>
            <form style="text-align: center;" method="post" action="http://localhost:3000/post-eta">stopID: 
                <input type="number" min="0" required="required" name="stopID" />
                <input type="submit" value="Submit" />
            </form>
        </body>
        <script>
            window.onload = function(){
            //var stopID = prompt("What is the stopID for the bus?");
            window.setInterval( async function() {
                let response = await fetch('http://localhost:3000/get-eta');
                document.getElementById('ETA').innerHTML = await response.text()
            }, 10e2);
            /* fetch('localhost:3000/post-eta', { 
                method: 'POST',
                body: stopID
            }); */
            //var objectPosition = prompt("What is the object's position in the json");
            document.getElementById('stopID').innerHTML = "Your stop ID is " + stopID;
            //document.getElementById('objectPosition').innerHTML = objectPosition;
            };  
        </script>
    </html>`;

    const etaPage = 
    `<!DOCTYPE HTML>
    <html lang="en">
        <head> 
            <title>Your ETA</title> 
            <meta charset="UTF-8">
        </head>
        <body>
                <h3 id="stopID" style="text-align: center;"></h3>
                <p style="text-align: center;">This is HTML. The current ETA is <span id="ETA"></span></p>
        </body>
        <script>
            window.onload = function(){
            //var stopID = prompt("What is the stopID for the bus?");
            window.setInterval( async function() {
                let response = await fetch('http://localhost:3000/get-eta');
                document.getElementById('ETA').innerHTML = await response.text()
            }, 10e2);
            /* fetch('localhost:3000/post-eta', { 
                method: 'POST',
                body: stopID
            }); */
            //var objectPosition = prompt("What is the object's position in the json");
            document.getElementById('stopID').innerHTML = "Your stop ID is " + stopID;
            //document.getElementById('objectPosition').innerHTML = objectPosition;
            };  
        </script>
    </html>`;

if (req.url === "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(formSubmission);
    res.end();
}
else if (req.url.match("/get-eta")) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write('test')
    res.end()
// res.write();
//res.end(await scraper(stopID))
//res.end(ETA.toString())
}

// This was shamelessly stolen from stackoverflow here: https://stackoverflow.com/questions/12006417/node-js-server-that-accepts-post-requests
else if (req.url.match("/post-eta")) {
    if (req.method == 'POST') {
        console.log('POST RECEIVED')

        var stopID = '0'

        req.on('data', function(data) {
          stopID += data
          scraper(stopID)
        })
        req.on('end', async function() {
          res.writeHead(302, {'Location': '/'})
          //res.write(etaPage)
          res.end()
          // Nothing should be appended below. This should exist as HTML from etaPage only
          //res.end('The selected bus at the stop location of ' + stopID.split("=").pop() + ' is ' + await scraper(stopID) + ' minute(s) away!')
        }) 
    }
}
else {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.end(`404 file not found at ${req.url}`);
}
}).listen(3000) 
console.log("Server listening on port 3000");

async function scraper(stopID) {
    //const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
    //console.log("Watching the url: " + URL);
    //const response = await axios.get(URL);
    //return response.data.etas[stopID].etas[objectPosition]['avg'];
    console.log("Your stopID is: " + stopID.split("=").pop()) // Learned this with more help from stackoverflow https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
    return Math.random();
  } 

 

function isItTimeToLeave(eta) {
    console.log('The ETA for the shuttle is ' + eta + ' minute(s)')
    //These are a series of if statements that are checking the ETA compared to the time you need to leave.
    if (eta === 5) {
        console.log('There is five minutes until the shuttle is arriving!')
        alert('There is 5 minutes!')
    }
    if (eta === 1) {
        console.log('There is one minute until the shuttle is arriving!')
        alert('There is 1 minute!')

    }
    if (eta === timeToGetThere) {
        console.log('Leave now to make it to the stop in time!')
        alert('Leave now to make it to the stop in time!')

    }
    if (eta === 0) {
        console.log('The shuttle is arriving!')
        alert('The shuttle is arriving!')

    }
    if (eta !== 0) {
        setTimeout(collectTheETA, 5000);
    }
}



//function isTimeToLeaveConditionMet

/* function whenIsItTimeToLeave() {
    console.log(eta)
} */

/* async function shuttleScraper() {
    const response =  axios.get(URL);
    const eta = response.data.eta[stopID].etas[0]['avg'];
    console.log(eta);
    //return eta;
} */

/*
function collectTheETA() {
    const theETA =  shuttleScraper();
    return theETA;
} */