var express = require('express');
var router = express.Router();
var fs = require('fs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// request parse
let parseReq = require('../../renderMechanisam/parseRequest');
// write ExpressionScript files
let expressionsJS = require('../../renderMechanisam/extensionsScriptMaker');
//ffmpeg merge
let ffmpeg = require('../../renderMechanisam/ffmpeg');
//Rendering project
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
    db.defaults({ scenes: [], sceneMergeControl: [] })
        .write();

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

    //make folder where we will transfer our scene_videos (result folder)
    if (!fs.existsSync(clip_storage)){
        fs.mkdirSync(clip_storage);
        if (!fs.existsSync(clip_storage+"/"+parsedRespons['init'].OrderId)){
            fs.mkdirSync(clip_storage+"/"+parsedRespons['init'].OrderId);
        }
    }

    //we need to insert clip options to merge controll
    db.get('sceneMergeControl')
        .push(parsedRespons.init)
        .write();

    //download assets for ffmpeg


    //write
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
        resultArray.push((startingPort+i)+1);
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
        //*** ukloni sve scene vezane za njega u scenes
        //*** ili izmapiraj da samo renderuje one koji mu fale ... kada opet posalje reevio
        //javi na reevio
    }

    res.send({kraj:"done"});

});





module.exports = router;
