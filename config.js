let pathFromApiToC= "../../..";
let pathFromApiWinToC = "..\\..\\..";

let finalMergeResult= "C:\\inetpub\\wwwroot\\videos";

let config = {
    server:{
        ip: 'http://192.168.0.10',
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
        path: pathFromApiToC + "/reevio_results", // ../../../ => path to C:\
        pathToFinalStorage: finalMergeResult ,
        relPathToFinalStorage :"..\\..\\..\\inetpub\\wwwroot\\videos"
    },
    ffmpeg:{
        path: "C:\\rend_mecha\\ffmpeg\\\\bin\\ffmpeg",
        resultClips: pathFromApiWinToC+"\\reevio_results",
        unlink: finalMergeResult,                     // for deleting ffmpeg result clip
        pathForMergeFile: pathFromApiToC+"/reevio_results",

    },
    renderingProcesses:{
        aebinary: 'C:\\Program Files\\Adobe\\Adobe After Effects CC 2018\\Support Files\\aerender.exe', //path to aerender
        count: 2,
        startingPort: 6060,
        renderLoopRepeat: 2, // seconds
    }
};

module.exports = config;