'use strict';

let RenderHistory = require('./renderMechanisam/DBhistory.js');
let request = require('request');
let config = require('./config.js')

const args = process.argv;

if( args.length != 4){
    process.exit(0);
    console.log("Invalid number of arguments!")
}

let OrderId = args[2];
let order_method = args[3];

let magicUrl;


RenderHistory.readByOrderId(OrderId, order_method, data => {

    switch(order_method){
        case 'json_request':
            magicUrl = config.server.ip+config.server.port+'/renderServer/mergeVideoControll';
            break;
        case 'json_response':
            magicUrl = data.ip+'/api/dataclay/rlo30U8cLn';
            break;
        default:
            console.log("invalid key given !!!");
    }

    console.log(data.data);
    request.post({
        url: magicUrl,
        // form: JSON.stringify(data.data)
        form: data.data //when you are on server you expect object
    },function(err,res,body){
        console.log('Manual order done!');

        console.log("OrderId: " + OrderId);
        console.log("methode: " + order_method);
        console.log(body);

        process.exit(0);
    });
});



