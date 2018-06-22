let DB = require('./DB.js');
let moment = require('moment');

class RenderHistory {

    static insertHistory(obj, callback){
        let q = "INSERT INTO renderhistory (OrderId, status, json_request, timestamp_request) VALUES ( ?, ?, ?, ?)";
        let timestamp_request = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        DB.connection.query(q,[obj.OrderId, 'queue', JSON.stringify(obj), timestamp_request],(err,rows)=>{
            if (err) throw err;
            callback("inserted");
            return false;
        });
    }

    static updateHistory(obj, status, json_response, callback){
        let q = "UPDATE renderhistory SET status = ? , json_response = ?, timestamp_response = ? WHERE OrderId = ?";
        let timestamp_response = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        DB.connection.query(q,[status, JSON.stringify(json_response), timestamp_response, obj.OrderId],(err,rows)=>{
            if (err) throw err;
            callback("updated");
            return false;
        });
    }

    static readByOrderId(OrderId, type_of_json, callback){
        let q = "SELECT * FROM renderhistory WHERE OrderId = ?";
        DB.connection.query(q,[OrderId],(err,rows)=>{
            if (err) throw err;
            if(rows[0][type_of_json] == undefined )
                callback('wrong parametar');
            let data = JSON.parse(rows[0][type_of_json]);
            let json_request = JSON.parse(rows[0]['json_request']);
            callback({
                data : data,
                ip : json_request.updateVideoUrl
            });
            return false;
        });
    }

};


module.exports = RenderHistory;