'use strict';

/*** MAIN CONFIG FILE ***/

let config = {
    server:{
        ip: 'http://192.168.56.1', //ip address of the server
        port: ':3000', // server port
    },
    renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe', // path to installed aerender.exe
        count: 2, // number of render processes simuntaniusly
        renderLoopRepeat: 4, // render waiting x seconds till take next scene
    }
};


module.exports = config;