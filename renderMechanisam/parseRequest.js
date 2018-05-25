'use strict';

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

    // console.log(assets[0])

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
        project_name.indexOf(".aepx") == -1 ?project_name += '.aepx': project_name;
        schema['template'] = project_name;

        //ading project assets path
        schema['assets'].push({'type': "project",'name': project_name , 'src': asset[prop] });
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
        schema['assets'].push({'name': prop , 'src': asset[prop] });
    }
    else if (prop.indexOf('duration')!= -1 ){
        schema['assets'].push({'name': prop , 'src': asset[prop] });
    }

    //Expressions parsing
    else if(prop.indexOf('text')!= -1 ){
        scriptSch[prop] = asset[prop];
    }
    else if(prop.indexOf('color')!= -1 ){
        scriptSch[prop] = asset[prop];
    }
    else if(prop.indexOf('background_color')!= -1 ){
        scriptSch[prop] = asset[prop];
    }

}

/*
FIX VALUES:
    aep: 'C:\\prj\\AeTemplate\\Dynamic\\Simple_Promo\\Fade_Up\\02',
    target: 'Final Comp',
    id: 176113,
    'render-status': 'ready',
    totalcomp: 18,
    output: 'betareevio_4857_176113_1',
{
    uid: 'jedinstveni',
    template: 'template1.aepx',
    composition: 'composition1',
    settings: {
        outputModule: 'h264',
        outputExt: 'mp4',
        startFrame: 0,
        endFrame: 542
    },
    assets: [
        {
            type: 'project',
            src: 'http://example.com/projects/proj1.aepx',
            name: 'template1.aepx'
        }, {
            type: 'image',
            src: 'http://example.com/images/image1.jpg',
            name: 'tumb1.jpg'
        }, {
            type: 'image',
            src: 'http://example.com/images/image2.jpg',
            name: 'background.jpg',
            filters: [{
                name: 'cover',
                params: [1920, 1080]
            }],
        }, {
            type: 'audio',
            src: 'http://example.com/music/fligh_high.mp3',
            name: 'track.mp3'
        }, {
            type: 'script',
            src: 'http://example.com/projects/script.js',
            name: 'script.js'
        }
    ]
}
*/