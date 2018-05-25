var express = require('express');
var router = express.Router();
var fs = require('fs');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//lib for request parse
let parseReq = require('../../renderMechanisam/parseRequest');

//config files
let config = require('../../config');
let dir = config.clip_storage.path;

// request from Reevio
router.post('/', function(req, res, next) {
    let param = req.body;

    let parsedRespons = parseReq.parse_request(param);

    //write scripts in his place

    //
    db.defaults({ scenes: [] })
        .write();
    //insert scene in dbLow
    // for(let scena of parsedRespons.scenes){
    //     //scene object
    //
    //     //add to quee
    //     db.get('scenes')
    //     .push(scena)
    //     .write();
    // }

    //make folder where we will transfer our scene_videos
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        if (!fs.existsSync(dir+"/"+parsedRespons['init'].OrderId)){
            fs.mkdirSync(dir+"/"+parsedRespons['init'].OrderId);
        }
    }


    //console.log(parsedRespons)
    //write
    res.send(parsedRespons);

});

//Next scene for rendering
router.post('/getNextScene', function(req, res, next) {
    let param = req.body;

    //get scene data and send to render
    let scene = db.get('scenes')
        .pop()
        .write();

    // res.send(scene);
});

router.get('/aerenderProcesses', function(req, res, next) {
    let param = req.body;

    let resultArray = [];

    //init ports
    let numberOfProcesses = config.renderingProcesses.count;
    let startingPort = config.renderingProcesses.startingPort;

    for(let i = 0;i<numberOfProcesses;i++){
        resultArray.push((startingPort+i)+1);
    }

    res.send(resultArray)
    // res.send(scene);
});




module.exports = router;
