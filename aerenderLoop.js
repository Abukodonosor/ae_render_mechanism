'use strict';

var cron = require('node-cron');
let request = require('request');
let config = require('./config')

let RenderingProces = require('./renderMechanisam/initRenderProcess');
let renderLoopRepeat = config.renderingProcesses.renderLoopRepeat;

let AvailablePorts = [];

// main function
(async function(){
    AvailablePorts = await RenderingProces.availablePorts();

    cron.schedule(`*/${renderLoopRepeat} * * * * *`, function(){
        (async()=> {
            console.log("Free aerender processes: "+ AvailablePorts.length);
            if (AvailablePorts.length != 0 && await RenderingProces.peekScene()) {
                //take port for
                let port = AvailablePorts.pop();
                let project = await RenderingProces.getScene();

                console.log("rendering Start port: ", port);
                //aerender instance
                RenderingProces.renderNode(port, project, (port) => {
                    AvailablePorts.push(port);
                });
            }
        })();
    });
}());



// request.post({
//     url: config.server.ip+config.server.port+'/renderServer/mergeVideoControll',
//     form: {status: "done", obj:  JSON.stringify({OrderId:178621}) }
// },function(err,res,body){
//     console.log('rendering finished');
//     // server.close();
//     // callback(port);
//     // return false;
// });
/*

    request.post({
        url: config.server.ip+config.server.port+'/renderServer/mergeVideoControll',
        form: {
            status: "done",
            obj: JSON.stringify({
            OrderId: 178621,
            status: 1,
            audioUrl: "https://sdn-global-streaming-cache.3qsdn.com/6707/uploads/6707-P5lhalSwcVwAQrrDds21.mp3",
            watermark: "",
            watermarkpos: 0,
            isFadeOut: 0,
            fadeoutMins: 0,
            volume: 1,
            removeAudio: 0,
            isAlphaChannel: 0,
            IsJpeg: 0,
            fileName: "16630_Weeding thinks",
            updateVideoUrl: "http://18.196.40.196:3010",
            totalcomp: 2
            })
        }
    },function(err,res,body){
        console.log("POSLAO");
        // console.error(err);
        // server.close();
        // callback(port);
        // // return false;
    });


*/