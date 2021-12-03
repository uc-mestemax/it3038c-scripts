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
//const input = '129'; //This is the input that can be found in the doublemap link: /eta?stop=28
//const objectPosition = '0'; // If there is more than one shuttle that stops at your location, you will have to select that. It is the integer under the second iteration of etas/
//****************************************************//



//shuttleScraper()



//console.log('The ETA for the shuttle is ' + eta + ' minute(s)')

//const txt = fs.readFileSync('test.txt')
// used https://gullele.com/how-to-get-user-input-and-process-it-in-nodejs-tutorial/ to understand how to ship the HTML form data into nodeJS
let input = ''

var server = http.createServer(async function (req, res) {
    //const ETA =  await scraper();
    const formSubmission = 
    `<!DOCTYPE HTML>
    <html lang="en">
        <head> 
            <title>Node JS Response</title> 
            <meta charset="UTF-8">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
            <!-- Optional theme -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
        </head>
        <body>
                <h3 id="input" style="text-align: center;">Your Stop ID:</h3>
                <p style="text-align: center;">The current ETA is <span id="ETA"></span></p>
            
            <form onsubmit="document.getElementById('form').style.display = 'none' id="form" style="text-align: center; margin-left: 30vw; margin-right: 30vw;" method="post" action="http://localhost:3000/post-eta">
                <div class="form-group">
                    <label for="stopID">What is your shuttle stop number?</label>
                    <input type="number" min="0" required="required" name="stopID" placeholder="Shuttle Stop ID"" class="form-control" >
                    <small id="stopIDHelp" class="form-text text-muted">This is found in the of your doublemap json URL: eta?stop=??</small>
                </div>
                <div class="form-group">
                    <label for="objectPosition">What is your object position?</label>
                    <input type="number" min="0" required="required" name="objectPosition" class="form-control" placeholder="Object Position">
                    <input type="submit" class="btn btn-primary" value="Submit">
                </div>
            </form>

            <input type="button" value="Click Me to Set a Reminder" onclick="var timeToAlert = prompt('How many minutes until arrival would you like to be notified?')">

        </body>
        <script>
            window.onload = function(){
            //var timeToAlert = prompt("How many minutes until arrival would you like to be notified?");
            window.setInterval( async function() {
                //Because the shuttle doesn't decremement by 1 each time it updates, some of the IF statements will completely be missed because for example, 
                //it can jump from 6 to 4 without showing 5. These also only allow the if statement to run once per browser session.
                let has5MinutesBeenUsed = 0
                let has1MinuteBeenUsed = 0
                let has0MinutesBeenUsed = 0
                let hastimeToAlertBeenUsed = 0

                let response = await fetch('http://localhost:3000/get-eta');
                message = await response.text()
                document.getElementById('ETA').innerHTML = message
                isItTimeToLeave(message)
                /*function isItTimeToLeave(eta) {
                    console.log('The ETA for the shuttle is ' + eta + ' minute(s)')
                    //These are a series of if statements that are checking the ETA compared to the time you need to leave.
                    if (eta <= '5' && has5MinutesBeenUsed = 0) {
                        console.log('There is five minutes until the shuttle is arriving!')
                        has5MinutesBeenUsed = 1
                        alert('There is 5 minutes!')
                    }
                    else if (eta <= '1' && has1MinuteBeenUsed = 0) {
                        console.log('There is one minute until the shuttle is arriving!')
                        has1MinuteBeenUsed = 1
                        alert('There is 1 minute!')
                
                    }
                  
                    else if (eta <= '0' && has0MinutesBeenUsed = 0) {
                        console.log('The shuttle is arriving!')
                        has0MinutesBeenUsed = 1
                        alert('The shuttle is arriving!')
                
                    }

                    else if (eta <= timeToAlert && hastimeToAlertBeenUsed = 0) {
                        console.log('The shuttle is arriving!')
                        hastimeToAlertBeenUsed = 1
                        alert('Time to leave! Your designated time has arrived at ' + eta + ' minute')
                    }
    
                }*/
            }, 10e3);
            //var objectPosition = prompt("What is the object's position in the json");
            document.getElementById('input').innerHTML = "Your stop ID is " + input;
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
    if (input === '') { //essentially if the input is still at the starting variable
        console.log('There has not been any input sent yet!')
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write('(awaiting)')
        res.end()
    }
    else if (input !== '') {
        let eta = await scraper(input)
        console.log(eta)
        res.write(eta.toString())
        res.end()
    }
    
    
// res.write();
//res.end(await scraper(input))
//res.end(ETA.toString())
}

// This was shamelessly stolen from stackoverflow here: https://stackoverflow.com/questions/12006417/node-js-server-that-accepts-post-requests
else if (req.url.match("/post-eta")) {
    if (req.method == 'POST') {
        console.log('POST RECEIVED')


        req.on('data', function(data) {
          input = data
          console.log('The data received is ' + input)
        })
        req.on('end', async function() {
          res.writeHead(302, {'Location': '/'})
          res.end()

        }) 
    }
}
else {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.end(`404 file not found at ${req.url}`);
}
}).listen(3000) 
console.log("Server listening on port 3000");

//scraper(input)
async function scraper(input) {
    dataChunk = input.split("&") // This splits the two form elements that are received, the shuttle stop ID and the object position
    //input[0] = input.split("=").pop()
    stopID = dataChunk[0].split("=").pop() //Takes the form data and uses the first element that is send (which is the stopID), and removed the input field name and the equal sign, so I am only left with the integers
    objectPosition = dataChunk[1].split("=").pop() //Takes the form data and uses the second element that is send (which is the objectPosition), and removed the input field name and the equal sign, so I am only left with the integers

    console.log('The current stopID is ' + stopID)
    console.log('The current objectPosition is ' + objectPosition)

    console.log("Your input is: " + input) // Learned the .split and .pop with more help from stackoverflow https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
    const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
    console.log("Parsing the url: " + URL);
    const response = await axios.get(URL);
    return response.data.etas[stopID].etas[objectPosition]['avg'];     //const URL = `https://uc.doublemap.com/map/v2/eta?stop=${input}`;
    //console.log("Watching the url: " + URL);
    //const response = await axios.get(URL);
    //return response.data.etas[input].etas[objectPosition]['avg'];
  } 

//getETA("=129")
async function getETA(input) {
    console.log(await testing(input))
}
 async function testing(input) {
    input = input.split("=").pop()
    objectPosition = 0
    const URL = `https://uc.doublemap.com/map/v2/eta?stop=${input}`;
    console.log("Watching the url: " + URL);
    const response = await axios.get(URL);
    return 'Your ETA is ' + response.data.etas[input].etas[objectPosition]['avg']; 
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
    const eta = response.data.eta[input].etas[0]['avg'];
    console.log(eta);
    //return eta;
} */

/*
function collectTheETA() {
    const theETA =  shuttleScraper();
    return theETA;
} */