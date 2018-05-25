'use strict';

let request = require('request');
let config = require('./config')

let RenderingProces = require('./renderMechanisam/initRenderProcess');
let renderLoopRepeat = config.renderingProcesses.renderLoopRepeat;

let AvailablePorts = [];

// main function
(async function(){
    let last = Date.now();
    let summ = 0;

    AvailablePorts = await RenderingProces.availablePorts();

    console.log(AvailablePorts)

    while(true){
        let now = Date.now();
        let dt = ( now - last );
        summ += dt;

        if( summ > renderLoopRepeat ){
            console.log(summ);
            summ = 0;

            console.log(await RenderingProces.peekScene())

            // if(AvailablePorts.length !=0 && await RenderingProces.peekScene()){
            //     console.log("MOZEEE");
            // }

        }
        last = now;
    }


}());

// mainLoop();
//

//kontaktiraj rutu za init render procesa

//loop
    //request getNextScene (if isnt undefined => tun run async function with params runRenderer(port,project)

    // run instance
        //callback of istance... back port to array, move result file to his folder, request fmpeg mergeRoot with logick whic need to watch

