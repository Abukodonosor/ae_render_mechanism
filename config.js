let config = {
    server:{
        ip: 'http://192.168.0.16',
        port: ':3000',
    },
    //reference to C:\\
    pathTo_C:{
        path:"../",
    },
    pathForScriptsAepx:{
        path: ""
    },
    clip_storage:{
        path: "../../../reevio_results",
    },
    result:{
        path:"",
    },
    aerender:{
        path: "",
    },
    renderingProcesses:{
        count: 2,
        startingPort: 6060,
        renderLoopRepeat: 2000, // miliseconds
    }
};

module.exports = config;