var MYSQL_db = require('../../app/models/database/MYSQL');
var authors_table = require('./authors/authors-spec.js');
var email_subscriptions = require('./email_subscriptions/email_subscriptions-spec.js');

var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database: 'test_NodeJSBlog'
});

authors_table.runTest(mysql);
email_subscriptions.runTest(mysql);
