'use strict';

let request = require('request');

let config = require('../config');

let ip = config.server.ip;
let port = config.server.port;

let aebinary = config.renderingProcesses.aebinary;

const renderer  = require('../renderMechanisam/nexrender/index').renderer;
const Project  = require('../renderMechanisam/nexrender/index').Project;
const http      = require('http');
const url       = require('url');
const path      = require('path');
const fs        = require('fs');

module.exports = {

    //geting init number of aerender isntaces
    availablePorts: () => {
        return new Promise((resolve)=>{
            request.get(ip+port+'/renderServer/aerenderProcesses',[],(err,res,body)=>{
                let ports = JSON.parse(body).port;
                resolve(ports);
            });
        });
    },

    //receive scene from api
    getScene:() => {
        return new Promise((resolve)=>{
            request.post(ip+port+'/renderServer/getNextScene',[],(err,res,body)=>{
                resolve(body);
            });
        });
    },

    //peek scene from api
    peekScene:() => {
        return new Promise((resolve)=>{
            request.post(ip+port+'/renderServer/peekNextScene',[],(err,res,body)=>{
                resolve(body);
            });
        });
    },

    //aerender node
    renderNode:(port,project,callback) => {

        /**
         * HTTP server
         */
        let server = http.createServer((req, res) => {

            let uri         = url.parse(req.url).pathname;
            let filename    = path.join(process.cwd(), uri);

            fs.exists(filename, (exists) => {
                if(!exists) {
                    res.writeHead(404, {"Content-Type": "text/plain"});
                    res.write("404 Not Found\n");

                    return res.end();
                }
                fs.readFile(filename, "binary", function(err, file) {
                    if(err) {
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        res.write(err + "\n");
                        return res.end();
                    }
                    // send 200
                    res.writeHead(200);
                    res.write(file, "binary");
                    return res.end();
                });
            });
        });

        /**
         * Renderer
         */
        server.listen(port, () => {

            console.log('Started local static server at port:', port);

            let project1 = new Project(JSON.parse(project));
            project1.full_object = JSON.parse(project).init;
            project1.attempts = 0;
            changePort(project1.assets,port);

            console.log(project1);

            // start rendering
            renderer.render(aebinary, project1).then(() => {
                // success
                server.close();
                console.log('rendering finished');
                callback(port);
                return false;
            }).catch((err) => {
                // error
                console.error(err);
                server.close();
                callback(port);
                return false;
            });
        });
    }


};


function changePort(list,port){
    for(let obj of list){
        obj.src = obj.src.replace("___",port);
    }
}

