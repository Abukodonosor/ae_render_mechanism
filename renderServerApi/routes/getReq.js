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


// request from Reevio
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    let param = req.body;
    // console.log(param.OrderId);

    let parsedRespons = parseReq.parse_request(param);

    // upisi skripte gde im je mesto

    //
    db.defaults({ scenes: [] })
        .write();
    //insert scene in dbLow
    for(let scena of parsedRespons.scenes){
        //scene object

        //add to quee
        db.get('scenes')
        .push(scena)
        .write();
    }

    //pravimo folder gde cemo prebacivati izrenderovane klipove
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    //console.log(parsedRespons)
    //write
    res.send(parsedRespons);

});

//Next scene for rendering
router.post('/getNextScene', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let param = req.body;

    //get scene data and send to render
    let scene = db.get('scenes')
        .pop()
        .write();

    // res.send(scene);
});



module.exports = router;
