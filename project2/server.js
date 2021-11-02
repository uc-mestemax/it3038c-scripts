var http = require('http');
var fs = require('fs');
//Did not use the below library yet
//var path = require('path') 




//This is the main library that I used to GET the json data from UC's double map. There were a lot of different choices like pupetteer and cheerio that are more suited I believe for dynamic sites.
const axios = require('axios');
const timeToGetThere = 10;

//*******************************************************//
//The variables below are the variables that you modify.//
//*****************************************************//
const stopID = '28'; //This is the stopID that can be found in the doublemap link: /eta?stop=28
const objectPosition = '0'; // If there is more than one shuttle that stops at your location, you will have to select that. It is the integer under the second iteration of etas/
const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
console.log("Watching the url: " + URL);

//shuttleScraper()


const html = `<!DOCTYPE HTML>
<html>
    <head> 
        <title>Node JS Response</title> 
    </head>
    <body>
        <p>ETA: ${collectTheETA()}</p>
        

    </body>
</html>`

//fs.readFileSync('./project2/index.html')
//const txt = fs.readFileSync('test.txt')


var server = http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end('The current ETA is ' + await collectTheETA());
}).listen(3000) 
console.log("Server listening on port 3000");

//console.log('The ETA for the shuttle is ' + eta + ' minute(s)')


async function shuttleScraper() {
    return axios 
	.get(URL)
	.then((response) => {
        var eta = response.data.etas[stopID].etas[objectPosition]['avg'];
        return eta
	})
	.catch((error) => {
		console.error(error)
	});
} 
function isItTimeToLeave(eta) {
    console.log('The ETA for the shuttle is ' + eta + ' minute(s)')
    //These are a series of if statements that are checking the ETA compared to the time you need to leave.
    if (eta === 5) {
        console.log('There is five minutes until the shuttle is arriving!')
    }
    if (eta === 1) {
        console.log('There is one minute until the shuttle is arriving!')
    }
    if (eta === timeToGetThere) {
        console.log('Leave now to make it to the stop in time!')
    }
    if (eta === 0) {
        console.log('The shuttle is arriving!')
    }
    if (eta !== 0) {
        setTimeout(collectTheETA, 5000);
    }
}

async function collectTheETA() {
    const theETA = await shuttleScraper();
    return theETA;
} 






//var ETA = JSON.parse(axios.response)
//console.log(ETA)


/*  ( async () => {
    const response = await fetch('https://wordpress.org/wp-json');
    const json = await response.json();
    console.log(JSON.stringify(json));
  })()

  async();  */

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



