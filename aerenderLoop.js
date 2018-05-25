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

    setInterval(async()=>{
        // if( summ > renderLoopRepeat ){
            console.log( AvailablePorts, summ);
            summ = 0;

            if(AvailablePorts.length !=0 && await RenderingProces.peekScene()){
                console.log("MOZEEE");

                //take port for
                let port = AvailablePorts.pop();
                let project = await RenderingProces.getScene();

                //aerender instance
                RenderingProces.renderNode(port,project,(port) => {
                    AvailablePorts.push(port);
                });
             }
    },renderLoopRepeat);


}());

// mainLoop();
//

//kontaktiraj rutu za init render procesa

//loop
    //request getNextScene (if isnt undefined => tun run async function with params runRenderer(port,project)

    // run instance
        //callback of istance... back port to array, move result file to his folder, request fmpeg mergeRoot with logick whic need to watch

