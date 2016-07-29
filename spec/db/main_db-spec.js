var MYSQL_db = require('../../app/models/MYSQL');
var authors_table = require('./authors/authors-spec.js');

var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database : 'test_NodeJSBlog'
});

mysql.connect();

authors_table.runTest();

mysql.end();