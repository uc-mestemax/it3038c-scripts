var http = require('http');
var fs = require('fs');
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
            <title>UC Shuttle Scraper</title> 
            <meta charset="UTF-8">
            <link rel="icon" type="image/x-icon" href="favicon.ico">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
            <!-- Optional theme -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
        </head>
        <body style="margin: 50px">
        <h1 style="color: red; text-align: center;">UC Shuttle Scraper</h1>
                <p style="text-align: center; font-size:large;">The current ETA at the designated stop location is <b><span id="ETA">(awaiting for user)</span></b> minute(s) until the shuttle arrives</p>
            
            <form id="form" style="text-align: center; margin-left: 30vw; margin-right: 30vw;" method="post" action="http://localhost:3000/post-eta">
                <div class="form-group">
                    <label for="stopID">What is your shuttle stop number?</label>
                    <input type="number" min="0" required="required" name="stopID" placeholder="Shuttle Stop ID"" class="form-control" >
                    <small id="stopIDHelp" class="form-text text-muted">This is found in the of your doublemap json URL: eta?stop=??</small>
                </div>
                <div class="form-group">
                    <label for="objectPosition">What is your ETA position</label>
                    <input type="number" min="0" required="required" name="objectPosition" class="form-control" placeholder="Object Position">
                    <small id="stopIDHelp" class="form-text text-muted">This is found in the json data right above the avg: key. 0 is for the first bus.</small>
                    <br> <br>
                    <input type="submit" class="btn btn-primary" value="Submit">
                </div>
                <input type="button" class="btn btn-primary" id="button_A" style="text-align=center;" value="Click Me to Set a Reminder" onclick="let timeToAlert = prompt('How many minutes until arrival would you like to be notified?');">
            </form>


        </body>
        <script>
        



            window.onload = function(){

                //Because the shuttle doesn't decremement by 1 each time it updates, some of the IF statements will completely be missed because for example, 
                //it can jump from 6 to 4 without showing 5. These variables below will only allow the if statement to run once per browser session, and ensure each if statement 
                //gets run at some point

            const buttonA = document.querySelector('#button_A');
            let timeToAlert = -1;

            buttonA.onclick = function() {
                
                timeToAlert = prompt('How many minutes until arrival would you like to be notified?');
                while (!/^[0-9]+$/.test(timeToAlert)) {
                    alert("You did not enter a number.");
                    timeToAlert = prompt('How many minutes until arrival would you like to be notified?');
                }
                console.log('Time to alert has been set to ' + timeToAlert)
              }
            let has5MinutesBeenUsed = 0;
            let has1MinuteBeenUsed = 0;
            let has0MinutesBeenUsed = 0;
            let hastimeToAlertBeenUsed = 0;

            function randomColor() { // I wanted to make it flash every time the ETA value is different from the previous one, but that is outside my javascript grasp right now. Come back to this later, I already invested too much time.
                document.getElementById('ETA').style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
              }
            
            let etaCalculation = window.setInterval( async function() {
                let response = await fetch('http://localhost:3000/get-eta');
                randomColor()
                message = await response.text()
                document.getElementById('ETA').innerHTML = message
                isItTimeToLeave(message)
                function isItTimeToLeave(eta) { 
                    eta = parseInt(eta) //converts ETA to an INT
                    timeToAlert = parseInt(timeToAlert)
                    console.log('The ETA for the shuttle is ' + eta + ' minute(s)')

                    //These are a series of if statements that are checking the ETA compared to the time you need to leave.
                    if (eta <= timeToAlert && hastimeToAlertBeenUsed === 0) {
                        console.log('Heads up! Your designated time of ' + timeToAlert + ' has come!')
                        hastimeToAlertBeenUsed = 1
                        alert('Time to leave! Your designated time has arrived at ' + eta + ' minute(s)')
                    }

                    else if (eta <= 5 && has5MinutesBeenUsed === 0) {
                        console.log('There is five minutes or less until the shuttle is arriving!')
                        has5MinutesBeenUsed = 1
                        alert('There is five minutes until the shuttle is arriving!')
                    }

                    else if (eta <= 1 && has1MinuteBeenUsed === 0) {
                        console.log('There is one minute or less until the shuttle is arriving!')
                        has1MinuteBeenUsed = 1
                        alert('There is 1 minute until the shuttle arrives!')
                
                    }
                  
                    else if (eta <= 0 && has0MinutesBeenUsed === 0) {
                        console.log('The shuttle is arriving!')
                        has0MinutesBeenUsed = 1
                        alert('The shuttle is arriving!')
                        clearInterval(etaCalculation) //stops the constant interval every 10 seconds so we prevent unneccessary fetches to the campus doublemap
                    }

                
                }
            }, 10e3);
            };  
        </script>
    </html>`;

    
if (req.url === "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(formSubmission);
    res.end();
}

// This was shamelessly stolen from stackoverflow here: https://stackoverflow.com/questions/12006417/node-js-server-that-accepts-post-requests
else if (req.url.match("/post-eta")) {
    if (req.method == 'POST') { // When the client submits the form, it posts data to /post-eta
        console.log('POST RECEIVED')
        req.on('data', function(data) { // This stored the data as the input variable to be used in calculating the ETA
          input = data
          console.log('The data received is ' + input)
        })
        req.on('end', async function() { // This sends the client back to the index.html of the file.
          res.writeHead(302, {'Location': '/'})
          res.end()
        }) 
    }
}
else if (req.url.match("/get-eta")) {
    if (input === '') { //essentially if the input is still at the starting variable, it indicates the client hasn't sent anything yet, so we prevent the scraper from being initialized, limiting unneccesary calls to the doublemap
        console.log('There has not been any input sent yet!')
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write('(awaiting)') // This shows the client that it is awaiting for the scraper to gather the ETA, or that the client hasn't submitted any form data yet.
        res.end()
    }
    else if (input !== '') {
        let eta = await scraper(input) // When the input submitted by the form is anything other than the starting variable, the scraper can begin. Every time localhost:3000/get-eta is refreshed, the scraper sends another request to the doublemap to get the ETA.
        console.log(eta)
        res.write(eta.toString())
        res.end()
    }
}

else if (req.url.match("favicon.ico")) {
    res.writeHead(200,{'Content-type':'image/ico'});
    let img = fs.readFileSync('./project3/favicon.ico');
    res.write(img, 'binary');
    res.end()
}

else {
    res.writeHead(404, { "Content-Type": "text/html" }) // If the client submits a url that is anything else other than the above directories, this catches the request and tells them it isn't found.
    res.end(`404 file not found at ${req.url}`);
}
}).listen(3000) 
console.log("Server listening on port 3000");

//scraper(input)
async function scraper(input) {
    let dataChunk = input.toString().split("&") // This splits the two form elements that are received, the shuttle stop ID and the object position
    //input[0] = input.split("=").pop()
    let stopID = dataChunk[0].split("=").pop() //Takes the form data and uses the first element that is send (which is the stopID), and removed the input field name and the equal sign, so I am only left with the integers
    let objectPosition = dataChunk[1].split("=").pop() //Takes the form data and uses the second element that is send (which is the objectPosition), and removed the input field name and the equal sign, so I am only left with the integers

    console.log('The current stopID is ' + stopID)
    console.log('The current objectPosition is ' + objectPosition)

    console.log("Your input is: " + input) // Learned the .split and .pop with more help from stackoverflow https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
    const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
    console.log("Parsing the url: " + URL);
    const response = await axios.get(URL);
    return response.data.etas[stopID].etas[objectPosition]['avg']; 
  } 