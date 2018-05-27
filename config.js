let config = {
    server:{
        ip: 'http://192.168.1.102',
        port: ':3000',
    },
    //reference to C:\\
    pathTo_C:{
        path:"../",
    },
    pathForScriptsExpressions:{
        path: "../../../script_tempaltes", // ../../../ => path to C:\
        folder_init: "C:/script_tempaltes"
    },
    clip_storage:{
        path: "../../../reevio_results",
    },
    result:{
        path:"",
    },
    renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe',
        count: 1,
        startingPort: 6060,
        renderLoopRepeat: 10000, // miliseconds
    }
};

module.exports = config;