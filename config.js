let config = {
    server:{
        ip: 'http://192.168.0.16',
        port: ':3000',
    },
    pathTo_C:{
        path:"../",
    },
    pathForScriptsExpressions:{
        path: "../../../script_tempaltes", // ../../../ => path to C:\
        folder_init: "C:/script_tempaltes"
    },
    clip_storage:{
        path: "../../../reevio_results", // ,,/../../ => path to C:\
    },
    ffmpeg:{
        path: "C:\\rend_mecha\\ffmpeg\\\\bin\\ffmpeg",
        resultClips: "..\\..\\..\\reevio_results",
        unlink: "C:\\reevio_results",
        pathForMergeFile: "../../../reevio_results"
    },
    renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe',
        count: 1,
        startingPort: 6060,
        renderLoopRepeat: 10000, // miliseconds
    }
};

module.exports = config;