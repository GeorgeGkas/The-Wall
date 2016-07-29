var express = require('express');
var app = express();
var MYSQL_db = require('./models/MYSQL');

var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database : 'NodeJSBlog'
});

mysql.connect();

mysql.insert_author({
    name: 'George G. Gkasdrogkas',
    avatar: 'https://67.media.tumblr.com/fad1e6baa5c3bac246e258df4f9103f3/tumblr_mvj0dccSnC1s3lf4oo1_500.jpg',
    description: 'Junior Web Developer'
});

mysql.insert_author({
    name: 'Georgedrogkas',
    avatar: 'humblr_mvj0dccSnC1s3lf4oo1_500.jpg',
    description: 'Juniper'
});

mysql.select_author('all', function(data) {
    console.log(data[0].author_ID);
});

mysql.delete_author('all');

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


