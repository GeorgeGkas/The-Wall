var express = require('express');
var app = express();
var MYSQL_db = require('./models/database/MYSQL');
var helper = require('./models/utils/functions');
var util = require('util');

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
});

app.set('view engine', 'pug');
app.use(express.static('public'));

var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database: 'NodeJSBlog'
});



mysql.connect();

app.get('/', function(req, res) {
    mysql.select_post({
        status: 'draft'
    }, function(result) {
        res.render('index', {
            _POST_LIST: helper.prepate_index_post_data(result)
        });
    });
});

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
});
