'use strict';

/* parse request lib */
let parseRequest = require('./renderMechanisam/parseRequest');


/* request data*/
let data = require('./json/test_object1');



let podatak = parseRequest.parse_request(data);



console.log("==============");
console.log(podatak);