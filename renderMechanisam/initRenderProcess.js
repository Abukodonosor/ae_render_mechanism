'use strict';

let request = require('request');

let config = require('../config');

let ip = config.server.ip;
let port = config.server.port;


module.exports = {

    //geting init number of aerender isntaces
    availablePorts: () => {
        return new Promise((resolve)=>{
            request.get(ip+port+'/renderServer/aerenderProcesses',[],(err,res,body)=>{
                resolve(body);
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







};