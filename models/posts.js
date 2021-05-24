var mysql = require('mysql');
var conf = require('../conf');
 
var connection = mysql.createConnection(conf.db);
var sql = '';
 
module.exports = {
    posts: function (req, callback) {
        sql = 'SELECT * FROM accounts';
        return connection.query(sql, callback);
    },

    post: function(req, callback){
        sql = 'SELECT '
    }
}