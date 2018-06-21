let pathFromApiToC= "../../..";
let pathFromApiWinToC = "..\\..\\..";
let finalMergeResult= "C:\\inetpub\\wwwroot\\videos";

let mainConfig = require('./mainConfig.js');

let config = {
    server:{
        ip: mainConfig.server.ip ,
        port: mainConfig.server.port ,
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
        aebinary: mainConfig.renderingProcesses.aebinary, //path to aerender
        count: mainConfig.renderingProcesses.count,
        startingPort: 6060,
        renderLoopRepeat: mainConfig.renderingProcesses.renderLoopRepeat, // seconds
    }
};

module.exports = config;