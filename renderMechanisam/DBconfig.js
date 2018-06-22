/*
    Config Params for DB
*/

module.exports = config = {
    local:{
        host     : 'localhost',
        user     : 'root',
        password : 'qwe123',
        database : 'RenderHistory'
    },
    server:{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'smile'
    },
    ip: '123.132.32.123', /* add ip address of server */
    path_to_models_folder: '../',  /* Path where you will put all your models (navigate from this file) */
};

