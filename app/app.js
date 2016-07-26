var express = require('express');
var app = express();
var mysql = require('mysql');


var MYSQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database : 'NodeJSBlog'
});

MYSQL.connect();

/*MYSQL.query('SELECT * FROM ', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

*/
MYSQL.end();

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


