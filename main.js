#! /usr/bin/env node
var shell = require("shelljs");
let RenderHistory = require('./renderMechanisam/DBhistory.js');

const args = process.argv;

if( args.length != 3){
    process.exit(0);
    console.log("Invalid number of arguments. You can add only one !");
}

let key = args[2];

switch(key){
    case 'start':
        shell.exec("pm2 start process.json");
        console.log("pm2 start processes !");
        process.exit(0);
        break;
    case 'stop':
        shell.exec("pm2 stop process.json");
        console.log("pm2 stoped processes !");
        process.exit(0);
        break;
    case 'delete':
        shell.exec("pm2 delete process.json");
        console.log("pm2 delete processes !");
        process.exit(0);
        break;
    case 'migrate':
        RenderHistory.historyTableMigration(callback=>{
            console.log(callback);
            process.exit(0);
        });
        break;

    default:
        console.log("Valid argumets are : start , stop , delete, migrate. You entered: " + key);
        break;
}



/*

-- support for pm2 clustering ==

"instances"  : 4,
"exec_mode"  : "cluster"

*/
