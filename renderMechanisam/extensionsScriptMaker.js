'use strict';

let fs = require('fs');
let config = require('../config');

let scriptPath = config.pathForScriptsExpressions.path;

let scriptInit = "let data = {};";

module.exports = {

    writeScriptFiles:(scripts) => {

        let scriptContent = "";
        let scriptName = '';

        for(let script of scripts){
            for(let prop in script){
                if(prop == 'scriptName'){
                    scriptName =script[prop]+".js";
                    scriptContent = scriptInit;
                }else{
                    scriptContent += `data['${prop}'] = '${script[prop]}';`;
                }

            }
            fs.writeFileSync(scriptPath+"/"+scriptName, scriptContent);
            scriptContent = null;
            scriptName = null;
        }
    },

};