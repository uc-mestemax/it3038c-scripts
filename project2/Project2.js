const axios = require('axios'); //This is the main library that I used to GET the json data from UC's double map. There were a lot of different choices like pupetteer and cheerio that are more suited I believe for dynamic sites.

//*******************************************************//
//The variables below are the variables that you modify.//
//*****************************************************//
const stopID = '129'; //This is the stopID that can be found in the doublemap link: /eta?stop=129
const objectPosition = '0'; // If there is more than one shuttle that stops at your location, you will have to select that. It is the integer under the second iteration of etas/

const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
console.log("Watching the url: " + URL);



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

function shuttleScraper() {
    axios 
	.get(URL)
	.then((response) => {
        const eta = response.data.etas[stopID].etas[objectPosition]['avg'];
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
            setTimeout(shuttleScraper, 15000);
        }
	})
	.catch((error) => {
		console.error(error)
	})  
} 

/* async function shuttleScraper() {
    const response =  axios.get(URL);
    const eta = response.data.eta[stopID].etas[0]['avg'];
    console.log(eta);
    //return eta;
} */


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

const timeToGetThere = 10;

async function collectTheETA() {
    //var eta = shuttleScraper()
    //console.log(await shuttleScraper())
} 

shuttleScraper()
//collectTheETA()
