var express = require('express');
var router = express.Router();
var fs = require('fs');

//dataBase
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// request parse
let parseReq = require('../../renderMechanisam/parseRequest');
let expressionsJS = require('../../renderMechanisam/extensionsScriptMaker');
let ffmpeg = require('../../renderMechanisam/ffmpeg');
let Nexrender = require('../../renderMechanisam/nexrender/index');

//config files
let config = require('../../config');
let expressionsDIR = config.pathForScriptsExpressions.path;
let clip_storage = config.clip_storage.path;

// request from Reevio
router.post('/', function(req, res, next) {

    let param = req.body;
    let parsedRespons = parseReq.parse_request(param);
    //init db if donsenot exist
    db.defaults({ scenes: [], sceneMergeControl: [] , requestHistory: []})
        .write();


    //make folder to store results
    if (!fs.existsSync(clip_storage)){
        fs.mkdirSync(clip_storage);
    }
    //make folder with name of order
    if (!fs.existsSync(clip_storage+"/"+parsedRespons['init'].OrderId)){
        fs.mkdirSync(clip_storage+"/"+parsedRespons['init'].OrderId);
    }

    //insert scene in dbLow
    for(let scena of parsedRespons.scenes){
        scena.full_object = parsedRespons.init;
        scena.attempts = 0;
        //add to quee Project render object
        db.get('scenes')
        .push(scena)
        .write();
    }

    //creating expressions script folder
    if (!fs.existsSync(expressionsDIR)){
        fs.mkdirSync(expressionsDIR);
    }

    //write scripts in his place
    expressionsJS.writeScriptFiles(parsedRespons.scripts);
    //write ffmpeg merge file
    ffmpeg.wirteFFmpegMergeFile(parsedRespons.scenes, parsedRespons['init'].OrderId);
    let downloadAssets = config.ffmpeg.resultClips+"\\"+parsedRespons.init.OrderId+"\\";
    ffmpeg.downloadAssetsForFFmpeg(parsedRespons.init,downloadAssets);


    //insert clip to merge controll
    db.get('sceneMergeControl')
    .push(parsedRespons.init)
    .write();
    //insert json to history
    db.get('requestHistory')
        .push(param)
        .write();

    //answer
    res.send(parsedRespons);
});

//Peek for next scene
router.post('/peekNextScene', function(req, res, next) {

    //function for peek
    db._.mixin({
        last: function(array) {
            return array[array.length-1];
        }
    });
    //peek in last scene
    let scene= db.get('scenes')
        .last()
        .value();

    res.send(scene);
});

//Next scene for rendering
router.post('/getNextScene', function(req, res, next) {
    //get scene data and send to render
    let scene = db.get('scenes')
        .pop()
        .write();

    res.send(scene);
});

//creating port values for processes
router.get('/aerenderProcesses', function(req, res, next) {

    let resultArray = [];
    //init ports
    let numberOfProcesses = config.renderingProcesses.count;
    let startingPort = config.renderingProcesses.startingPort;

    for(let i = 0;i<numberOfProcesses;i++){
        resultArray.push((startingPort+i) + 1);
    }

    res.json({port: resultArray});
});

router.post('/mergeVideoControll', function(req, res, next) {

    let status = req.body.status;
    let obj = JSON.parse(req.body.obj);

    console.log(status,obj);

    let videoStatus = db.get('sceneMergeControl')
        .find({ OrderId: obj.OrderId })
        .write();

    if( status == "done"){
        videoStatus.totalcomp -- ;
        if(videoStatus.totalcomp == 0 ){
            db.get('sceneMergeControl').remove({OrderId:obj.OrderId}).write();
            //start merge process
            ffmpeg.runFFmpeg(videoStatus);
        }else{
            db.get('endRender').find( obj.OrderId).write(videoStatus)
        }
    }
    else if (status == "broken"){
        //delete item from mergeControl
        db.get('sceneMergeControl').remove({OrderId:obj.OrderId}).write();
        let resName =  obj.fileName.replace(/ /g,'_') + ".mp4";
        let resImgName = obj.fileName.replace(/ /g,'_') + ".jpg";
        //*** ukloni sve scene vezane za njega u scenes
        request.post({
            url: obj.updateVideoUrl+"/api/dataclay/rlo30U8cLn",
            form: {
                "id": obj.OrderId+"",
                "video_url": config.server.ip+"/videos/"+userId+"/" + obj.OrderId + "/" + resName,
                "image_url": config.server.ip+"/videos/"+userId+"/" + obj.OrderId + "/" + resImgName,
                "status": "broken"
            }
        },function(err,res,body){
            console.log('Sended to milan Broken');
            console.log(body);
            // return false;
        });
        //*** ili izmapiraj da samo renderuje one koji mu fale ... kada opet posalje reevio
        //javi na reevio
    }

    res.send({kraj:"done"});

});





module.exports = router;
