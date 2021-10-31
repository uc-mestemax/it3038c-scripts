//const cheerio = require('cheerio');
//const request = require("request-promise")


const axios = require('axios'); //This is the main library that I used to GET the json data from UC's double map. There were a lot of different choices like pupetteer and cheerio that are more suited I believe for dynamic sites.
const { time } = require('console');
const { response } = require('express');

//const URL = 'https://uc.doublemap.com/map/v2/eta?stop='
const stopID = '110';

const URL = `https://uc.doublemap.com/map/v2/eta?stop=${stopID}`;
console.log(URL);



//var ETA = JSON.parse(axios.response)
//console.log(ETA)


/* ( async () => {
    const response = await fetch('https://wordpress.org/wp-json');
    const json = await response.json();
    console.log(JSON.stringify(json));
  })()

  async(); */







//function isTimeToLeaveConditionMet

/* function whenIsItTimeToLeave() {
    console.log(eta)
} */

/* function shuttleScraper() {
    axios 
	.get(URL)
	.then((response) => {
        const eta = response.data.etas[stopID].etas[0]['avg'];
	})
	.catch((error) => {
		console.error(error)
	})
    return eta;
} */

const shuttleScraper = async () => {
    const response = await axios.get(URL);
    return response.data.eta[stopID].etas[0]['avg']
}

/* function continueToCheck() {
    console.log('Continuing to check ETAs')
    whatIsTheETA()
    if (eta=0) {
    }

    DELETE ME
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

function collectTheETA() {
    //var eta = shuttleScraper()
    console.log(Promise.shuttleScraper)
    //isItTimeToLeave(shuttleScraper);
}

collectTheETA()
