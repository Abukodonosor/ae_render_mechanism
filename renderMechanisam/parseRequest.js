'use strict';

let config = require('../config');
let hexRgb = require('hex-rgb');

let ip = config.server.ip;
let port = config.server.port;

let object = {
    init: {},
    scenes: [],
    scripts: []
};

let sceneSchema = {
    uid: '',
    template: '',
    composition: '',
    settings: {
        outputModule: 'Lossless',
        outputExt: 'mov',
        startFrame: 0,
        // endFrame: 542
    },
    assets: [
    ]
};


module.exports={

    parse_request:(data)=>{
        //clone existing objact by value not reference
        var reqObj = JSON.parse(JSON.stringify(object));

        parseInit(data,reqObj);
        parseScene(data.Content,reqObj);

        return reqObj;
    },

};


function parseInit(data,reqObj){
    for(let key in data){
        if(key != "Content"){
            reqObj.init[key] = data[key];
        }
    }
}

function parseScene(data,reqObj){

    // converting to JSON
    // let assets = "["+data+"]";
    let assets = data;
    // assets = JSON.parse(assets);

    //loop true the scenes (Content)
    for(let asset of assets){
        // clone object
        let schema = JSON.parse(JSON.stringify(sceneSchema));

        // for script object (key and value)
        let scriptSch = {};

        for(let prop in asset){
            // console.log(prop)
            assetProp(prop,asset,reqObj,schema,scriptSch);
        }
        reqObj['scenes'].push(schema);
        reqObj['scripts'].push(scriptSch);
        // console.log(schema);
    }

}

function assetProp(prop,asset,reqObj,schema,scriptSch){

    // project specification
    if (prop == 'aep'){
        //name of .apex
        let project_name = asset[prop].split("\\").pop();
        project_name = project_name.split(".")[0] +'.aepx';
        schema['template'] = project_name;

        //ading project assets path
        let templatePath = format_server_download_path(asset[prop],'.aepx');
        schema['assets'].push({'type': "project",'name': project_name , 'src': templatePath });
    }
    else if (prop == 'target'){
        //parseing name of composition
        schema['composition'] = asset[prop];
    }
    else if (prop == 'totalcomp'){
        //parse maxNumber of compositions to render video
        reqObj['init']['totalcomp'] = asset[prop];
    }
    else if (prop == 'output'){
        //parse output_name of scene
        schema['uid'] = asset[prop];
        //scripts key
        scriptSch['scriptName'] = asset[prop];
    }

    //Asset parsing
    else if (prop.indexOf('bg_image')!= -1 ){
        let templatePath = format_server_download_path(asset[prop],'.jpg');
        schema['assets'].push({'name': prop , 'src': asset[prop] });
    }
    else if (prop.indexOf('duration')!= -1 ){
        let templatePath = format_server_download_path(asset[prop],'.mp3');
        schema['assets'].push({'name': prop , 'src': asset[prop] });
    }

    //Expressions parsing
    else if(prop.indexOf('text')!= -1 ){
        scriptSch[prop] = "'"+asset[prop]+"'";
    }
    else if(prop.indexOf('color')!= -1 ){
        let color = hexRgb("#"+asset[prop], {format: 'array'});
        color[3]= 1;
        scriptSch[prop] = color;
    }
    else if(prop.indexOf('background_color')!= -1 ){
        let color = hexRgb("#"+asset[prop], {format: 'array'});
        color[3]= 1;
        scriptSch[prop] = color;
    }
}

/* pathTo for downloading files*/
function format_server_download_path(path,sufix){
    let templatePath = path.split("\\\\").slice(1).join("/");

    if(sufix == '.aepx'){
        let array = templatePath.split("/");
        let project_name = array.pop();
        project_name = project_name.split(".")[0] +'.aepx';
        array.push(project_name);
        templatePath = array.join("/");
    }

    templatePath.indexOf(sufix) == -1 ?templatePath += sufix: templatePath;

    return ip+":___"+"/"+config.pathTo_C.path+templatePath;
}