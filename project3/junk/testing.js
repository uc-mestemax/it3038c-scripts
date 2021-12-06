let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});


res.end('The current ETA is ' + await scraper() + ' minutes');

