var express = require('express');
var app = express();
var MYSQL_db = require('./models/database/MYSQL');
var utils = require('./models/utils/functions');

/*var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database : 'NodeJSBlog'
});

mysql.connect();

mysql.insert_author({
    name: 'George G. Gkasdrogkas',
    avatar: 'http://67.media.tumblr.com/fad1e6baa5c3bac246e258df4f9103f3/tumblr_mvj0dccSnC1s3lf4oo1_500.jpg',
    description: 'Web Developer & Designer',
    email: 'georgegkas@gmail.com'
}, function() {
    mysql.select_author('email|georgegkas@gmail.com', function(res) {
        mysql.insert_post({
            author: res[0].author_ID,
            date: utils.get_curr_date(),
            content: 'http://66.media.tumblr.com/0fc8eb068e3b3505e93d531934df9ee4/tumblr_o3xgaegrev1tm0l12o1_500.jpg',
            type: 'img'
        }, function() {
           mysql.end();
        });
    });
});
*/


app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        _POST_LIST: [
        {
                post_type: 'video',
                post_content: '4O9OJJUrDOE',
                post_date: '2016-07-31 14:16:15',
                post_like_count: 954,
                post_comment_count: 524,
                post_has_article: 1
            },

            {
                post_type: 'quote',
                post_title: 'Front-End-Challenge-Accepted--CSS-3D-Cube',
                post_content: 'Do you like challenges? Are you willing to take on a task that you’ve never come across before, and do it under a deadline? What if, in carrying out the task, you encounter a problem that appears unsolvable? I want to share my experience of using CSS 3D effects for the first time in a real project and to inspire you to take on challenges. ',
                post_date: '2016-07-31 14:16:15',
                post_like_count: 376,
                post_comment_count: 200,
                post_has_article: 1
            },
             {
                post_type: 'img',
                post_content: 'http://66.media.tumblr.com/0fc8eb068e3b3505e93d531934df9ee4/tumblr_o3xgaegrev1tm0l12o1_500.jpg',
                post_date: '2016-07-31 14:16:15',
                post_like_count: 0,
                post_comment_count: 0,
                post_has_article: 1
            }
        ]
    });
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


