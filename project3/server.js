var http = require('http');
var fs = require('fs');
//This is the main library that I used to GET the json data from UC's double map. There were a lot of different choices like pupetteer and cheerio that are more suited I believe for dynamic sites.
const axios = require('axios');

let input = '' // assigned a starting variable to prevent /get-eta to be called while still awaiting form input

var server = http.createServer(async function (req, res) {
    const formSubmission = fs.readFileSync('./project3/index.html') //Displays the index.html file for web requests at the root

    
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
        console.log('The current estimated time of arrival is ' + eta)
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

    console.log("The current input is: " + input) // Learned the .split and .pop with more help from stackoverflow https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
    const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
    console.log("Parsing the url: " + URL);
    console.log('------------------------------------------------------------------------------------------------------------------')
    const response = await axios.get(URL);
    return response.data.etas[stopID].etas[objectPosition]['avg']; 
  } 