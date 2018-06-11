let pathFromApiToC= "../../..";
let pathFromApiWinToC = "..\\..\\..";

let config = {
    server:{
        ip: 'http://192.168.0.23',
        port: ':3000',
    },
    pathTo_C:{
        path:"../",
    },
    pathForScriptsExpressions:{
        path: pathFromApiToC+"/script_tempaltes", // ../../../ => path to C:\
        folder_init: "C:/script_tempaltes"
    },
    clip_storage:{
        path: pathFromApiToC+"/reevio_results", // ,,/../../ => path to C:\
    },
    ffmpeg:{
        path: "C:\\rend_mecha\\ffmpeg\\\\bin\\ffmpeg",
        resultClips: pathFromApiWinToC+"\\reevio_results",
        unlink: "C:\\reevio_results",
        pathForMergeFile: pathFromApiToC+"/reevio_results"
    },
    renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe', //path to aerender
        count: 2,
        startingPort: 6060,
        renderLoopRepeat: 20, // seconds
    }
};

module.exports = config;