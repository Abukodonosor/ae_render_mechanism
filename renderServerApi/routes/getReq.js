var express = require('express');
var router = express.Router();
var fs = require('fs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

//lib for request parse
let parseReq = require('../../renderMechanisam/parseRequest');

//Rendering project
let Nexrender = require('../../renderMechanisam/nexrender/index');
let Project = Nexrender.Project;


//config files
let config = require('../../config');
let dir = config.clip_storage.path;

// request from Reevio
router.post('/', function(req, res, next) {
    let param = req.body;

    let parsedRespons = parseReq.parse_request(param);

    //init db if donsenot exist
    db.defaults({ scenes: [] })
        .write();
    //write scripts in his place


    //insert scene in dbLow
    for(let scena of parsedRespons.scenes){
        //scene object
        // let renderObj = new Project(scena);
        // renderObj.full_object = parsedRespons.init;
        // renderObj.attempts = 0;

        //add to quee Project render object
        db.get('scenes')
        .push(scena)
        .write();
    }

    //make folder where we will transfer our scene_videos
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        if (!fs.existsSync(dir+"/"+parsedRespons['init'].OrderId)){
            fs.mkdirSync(dir+"/"+parsedRespons['init'].OrderId);
        }
    }

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
    })
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

router.get('/aerenderProcesses', function(req, res, next) {

    let resultArray = [];
    // res.header("Content-Type", "application/javascript");
    //init ports
    let numberOfProcesses = config.renderingProcesses.count;
    let startingPort = config.renderingProcesses.startingPort;

    for(let i = 0;i<numberOfProcesses;i++){
        resultArray.push((startingPort+i)+1);
    }

    res.json({port: resultArray});
});




module.exports = router;
