'use strict';

let request = require('request');
let config = require('./config')

let RenderingProces = require('./renderMechanisam/initRenderProcess');
let renderLoopRepeat = config.renderingProcesses.renderLoopRepeat;

let AvailablePorts = [];

// main function
(async function(){

    AvailablePorts = await RenderingProces.availablePorts();


    setInterval(async()=>{
            console.log( AvailablePorts);

            if(AvailablePorts.length !=0 && await RenderingProces.peekScene()){

                //take port for
                let port = AvailablePorts.pop();
                let project = await RenderingProces.getScene();

                console.log("rendering Start port: ",port);
                //aerender instance
                RenderingProces.renderNode(port,project,(port) => {
                    AvailablePorts.push(port);
                });
             }
    },renderLoopRepeat);


}());
