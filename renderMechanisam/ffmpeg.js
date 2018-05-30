'use strict';

let config = require('../config');
let spawn = require('child_process').spawn;
var fs = require('fs');
let ffmpeg = config.ffmpeg.path;

let pathToResult = config.ffmpeg.resultClips;
let unlinkFile = config.ffmpeg.unlink;

module.exports = {

    runFFmpeg:(obj) => {
        // path to folder where clips are seted
        let realPath = pathToResult+"\\"+obj.OrderId+"\\";
        let unlink = unlinkFile+"\\"+obj.OrderId+"\\"+obj.fileName+".mp4";

        let mergeFile = realPath + "mergeFiles.txt";
        let soundFile = realPath + "sound.mp3";
        let resultName = realPath + obj.fileName+".mp4";

        var args = [
            "-f","concat",
            "-safe","0",
            "-i", mergeFile,
            "-i", soundFile,
            "-c:a", "copy", "-shortest", resultName
        ];

        //deleting final video
        if(fs.existsSync(unlink)){
            fs.unlinkSync(unlink);
        }

        var proc = spawn(ffmpeg, args);

        proc.stdout.on('data', function(data) {
            console.log(data.toString());
        });
        proc.stderr.on('data', function(data) {
            console.log(data.toString());
        });
        proc.on('close', function() {
            console.log('finished');

            //send to milan
        });

    },

    downloadAssetsForFFmpeg:() => {

    },

};

/*

var spawn = require('child_process').spawn;

var cmd = 'C:\\Users\\Abu\\Desktop\\DBLOW test\\ffmpeg\\bin\\ffmpeg';

var args = [
    "-f","concat",
    "-safe","0",
    "-i", "\\ffmpeg\\bin\\vv.txt",
    "-i", "\\ffmpeg\\bin\\sound.mp3",
    "-c:a", "copy", "-shortest",'..\\..\\kraj.mp4'
];

var proc = spawn(cmd, args);

proc.stdout.on('data', function(data) {
    console.log(data.toString());
});

proc.stderr.on('data', function(data) {
    console.log(data.toString());
});

proc.on('close', function() {
    console.log('finished');
});

* */