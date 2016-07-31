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

mysql.insert_author({
    name: 'George G. Gkasdrogkas',
    avatar: 'none',
    description: 'Web Developer & Designer',
    email: 'georgegkas@gmail.com'
}, function() {
    mysql.select_author('email|georgegkas@gmail.com', function(res) {
        mysql.insert_post({
            author: res[0].author_ID,
            date: utils.get_curr_date(),
            content: 'image here',
            type: 'img'
        }, function() {
            mysql.delete_author('all', function() {
                mysql.delete_post('8');
                mysql.end();
            });
        });
    });
});



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


