var compression = require('compression');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MYSQL_db = require('./models/database/MYSQL');
var helper = require('./models/utils/functions');
var util = require('util');

var last_received_id = 0;

// not so safe indeed!
/*process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
});*/

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static('public'));


var mysql = new MYSQL_db({
    host: 'localhost',
    user: 'root',
    password: 'thisisapassword',
    database: 'NodeJSBlog'
});

//Can't set headers after they are sent fix
app.use(function(req, res, next) {
    var _send = res.send;
    var sent = false;
    res.send = function(data) {
        if (sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});

app.get('/', function(req, res) {
    mysql.select_post(
        'SELECT * FROM posts WHERE  post_feature_dynamic=(SELECT MAX(post_feature_dynamic) FROM posts) AND post_status=\'published\' ORDER BY post_date DESC',
        function(featured_post) {
            mysql.select_post({
                status: 'published',
                limit: 1
            }, function(posts_res) {
                var posts = [];
                if (posts_res.length > 0 || featured_post.length > 0) {
                    posts = helper.prepare_index_post_data(posts_res, featured_post[0]);
                    last_received_id = posts[posts.length - 1].post_ID;
                }

                mysql.select_author('admin|georgegkas@gmail.com', function(author_res) {
                    res.render('index', {
                        _POST_LIST: posts,
                        _ADMIN_AVATAR: author_res[0].author_avatar
                    });
                });
            });
        }
    );

});

app.get('/post/:postTitle', function(req, res) {
    mysql.select_post({
        title: req.params.postTitle.split('-').join(' ')
    }, function(post_res) {
        if (helper.isEmpty(post_res)) {
            res.status(404).end('Content not Found');
        } else {
            mysql.select_author('email|' + post_res[0].author_email, function(author_res) {
                var dateFormat = String(post_res[0]['post_date']).substr(4, 11).split(' ');
                mysql.select_comment({
                    post_id: post_res[0].post_ID,
                    state: 'approved'
                }, function(comment_res) {
                    res.render('single-post', {
                        _POST: {
                            post_type: post_res[0].post_type,
                            post_content: post_res[0].post_content,
                            post_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
                            post_like_count: post_res[0].post_like_count,
                            post_comment_count: post_res[0].post_comment_count,
                            post_has_article: post_res[0].post_has_article,
                            post_title: post_res[0].post_title,
                            article_content: post_res[0].article_content,
                            post_ID: post_res[0].post_ID,
                            alt: post_res[0].alt,
                            post_datetime_tag: post_res[0].post_date
                        },
                        _AUTHOR: author_res[0],
                        _COMMENT_LIST: helper.prepare_comments_data(comment_res)
                    });
                });
            });
        }
    });
});

app.post('/get_more_posts', function(req, res) {
    mysql.select_post('SELECT * FROM posts WHERE post_ID < ' + last_received_id + ' AND post_status=\'published\' ORDER BY post_date DESC LIMIT 1',
        function(query_res) {
            var posts = [];
            if (query_res.length > 0) {
                posts = helper.prepare_index_post_data(query_res, undefined);
                last_received_id = posts[posts.length - 1].post_ID;
            }
            res.render('generate_more_posts', {
                _POST_LIST: posts
            }, function(err, rendered) {
                if (err) res.status(400).send({ error: 'Could not load posts.' });
                else res.status(200).send({ posts: rendered });
            });

        });

});

app.post('/post/like', function(req, res) {
    mysql.post_like(req.body.id, function() {
        res.status(200).send({ success: '' });
    });
});

app.post('/post/comment/like', function(req, res) {
    mysql.comment_like(req.body.id, function() {
        res.status(200).send({ success: '' });
    });

});

app.post('/post/subscribe', function(req, res) {
    mysql.insert_subscription({
        email: req.body.email,
        date: helper.get_curr_date()
    }, function(result) {
        if (result.err) {
            res.status(400).send({ error: result.msg });
        } else {
            res.status(200).send({ success: '' });
        }
    });

});


app.post('/post/comment', function(req, res) {
    mysql.insert_comment({
        author_email: req.body.email,
        date: helper.get_curr_date(),
        post_id: req.body.post_id,
        author_name: req.body.name,
        content: req.body.content,

    }, function(result) {
        if (result.err) {
            res.status(400).send({ error: result.msg });
        } else {
            res.status(200).send({ success: '' });
        }
    });

});


app.get('/404', function(req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function(req, res, next) {
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function(req, res, next) {
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});



app.use(function(req, res, next) {
    res.status(404);

    /*// respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }*/

    /*// respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }*/

    // default to plain-text. send()
    res.type('txt').send('Content not Found');
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
