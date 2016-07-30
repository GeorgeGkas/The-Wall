var express = require('express');
var app = express();
var MYSQL_db = require('./models/database/MYSQL');
var utils = require('./models/utils/functions');

var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database : 'NodeJSBlog'
});

mysql.connect();


mysql.end();



app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        _FEATURE_POST_CONTENT: 'ABC',
        _LATEST_POST_CONTENT: 'DEF',
        _OTHER_POSTS: 'GHI'
    });
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


