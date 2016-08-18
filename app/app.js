/********************** APP DEPENDENCES AND CONFIGURES ************************/
// Include required modules
var compression = require('compression');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MYSQL_db = require('./models/database/MYSQL');
var helper = require('./models/utils/functions');
var util = require('util');

// Include global configure file
var GLOBAL_VAR = require('./config/global');

// Include environmental specific configure file
switch (process.env.NODE_ENV) {
    case 'development':
        var ENV_VAR = require('./config/dev');
        app.locals.url_prefix = ENV_VAR.URL_PREFIX_PATH;
        break;
    case 'production':
        var ENV_VAR = require('./config/production');
        app.locals.url_prefix = ENV_VAR.URL_PREFIX_PATH;
        break;
    default:
        console.error("Unrecognized NODE_ENV: " + process.env.NODE_ENV);
        process.exit(1);
}

// Configure express static files and template language to use
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static('public'));

// Configure the middlewares
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set global app variables
var LAST_RECEIVED_POST_ID = 0;

// Database connection
var mysql = new MYSQL_db({
    host: ENV_VAR.MYSQL.host,
    user: ENV_VAR.MYSQL.user,
    password: ENV_VAR.MYSQL.password,
    database: ENV_VAR.MYSQL.database
});

// 'Can't set headers after they are sent', fix
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

/********************** APP DEFINED MIDDLEWARES *******************************/

// -- Index Middleware --
// 1. Get Feature post
// 2. Get other posts by date
// 3. Update LAST_RECEIVED_POST_ID
// 4. Request blog admin profile
// 5. Render the index page
app.get(ENV_VAR.URL_PREFIX_PATH + '/', function(req, res) {
    mysql.select_post('featured', function(err, featured_post) {
        if (err) throw err;
        mysql.select_post({
            status: 'published',
            limit: 10
        }, function(err, posts_res) {
            if (err) throw err;
            var posts = [];
            if (posts_res.length > 0 || featured_post.length > 0) {
                posts = helper.prepare_index_post_data(posts_res, featured_post[0]);
                LAST_RECEIVED_POST_ID = posts[posts.length - 1].post_ID;
            }
            mysql.select_author('admin|' + GLOBAL_VAR.ADMIN, function(err, author_res) {
                if (err) throw err;
                res.render('index', {
                    _POST_LIST: posts,
                    _ADMIN_AVATAR: author_res[0].author_avatar
                });
            });
        });
    });
});

// -- Requested post Middleware --
// 1. Handle 404 error if post not exist
// 2. Get post author
// 3. Get post comment list
// 4. Add one view to post
// 5. Render the post
app.get(ENV_VAR.URL_PREFIX_PATH + '/post/:postTitle', function(req, res) {
    var post_title = req.params.postTitle.split('-').join(' ')
    mysql.select_post({
        title: post_title
    }, function(err, post_res) {
        if (err) throw err;

        if (helper.isEmpty(post_res)) {
            res.status(404).render('errors/404');
        } else {
            var author_email = post_res[0].author_email
            mysql.select_author('email|' + author_email, function(err, author_res) {
                if (err) throw err;
                var dateFormat = String(post_res[0]['post_date']).substr(4, 11).split(' ');
                var post_id = post_res[0].post_ID;
                mysql.select_comment({
                    post_id: post_id,
                    state: 'approved'
                }, function(err, comment_res) {
                    if (err) throw err;
                    mysql.update_post('add-one-view|' + post_res[0].post_ID);
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
                            post_datetime_tag: post_res[0].post_date,
                            number_of_views: post_res[0].number_of_views
                        },
                        _AUTHOR: author_res[0],
                        _COMMENT_LIST: helper.prepare_comments_data(comment_res)
                    });
                });
            });
        }
    });
});

// -- Request more posts Middleware --
// 1. Check the lastest post id and get bellow ten posts
// 2. Update LAST_RECEIVED_POST_ID
// 3. Return the rendered result or a failure
app.post('/get_more_posts', function(req, res) {
    mysql.select_post(
        'SELECT * FROM posts WHERE post_ID < ' + LAST_RECEIVED_POST_ID + ' AND post_status=\'published\' ORDER BY post_date DESC LIMIT 10',
        function(err, query_res) {
            if (err) throw err;
            var posts = [];
            if (query_res.length > 0) {
                posts = helper.prepare_index_post_data(query_res, undefined);
                LAST_RECEIVED_POST_ID = posts[posts.length - 1].post_ID;
            }
            res.render('generate_more_posts', {
                _POST_LIST: posts
            }, function(err, rendered) {
                if (err) res.status(400).send({ error: 'Could not load posts.' });
                else res.status(200).send({ posts: rendered });
            });

        });
});

// -- Like a post Middleware --
app.post('/post/like', function(req, res) {
    mysql.post_like(req.body.id, function(err, result) {
        if (err) {
            res.status(400).send({ error: err.message });
        } else {
            res.status(200).send({ success: '' });
        }
    });
});

// -- Like a comment Middleware --
app.post('/post/comment/like', function(req, res) {
    mysql.comment_like(req.body.id, function(err, result) {
        if (err) {
            res.status(400).send({ error: err.message });
        } else {
            res.status(200).send({ success: '' });
        }
    });
});

// -- Subscribe to newsletter Midleware --
// Return success or a failure
app.post('/post/subscribe', function(req, res) {
    mysql.insert_subscription({
        email: req.body.email,
        date: helper.get_curr_date()
    }, function(err, result) {
        if (err) {
            res.status(400).send({ error: err.message });
        } else {
            res.status(200).send({ success: '' });
        }
    });

});

// -- Post a comment Middleware --
// Return success or a failure
app.post('/post/comment', function(req, res) {
    mysql.insert_comment({
        author_email: req.body.email,
        date: helper.get_curr_date(),
        post_id: req.body.post_id,
        author_name: req.body.name,
        content: req.body.content,
    }, function(err, result) {
        if (err) {
            res.status(400).send({ error: err.message });
        } else {
            res.status(200).send({ success: '' });
        }
    });

});

/*********************  HANDLE COMMON HTTP ERRORS *****************************/
app.get('/404', function(req, res, next) {
    next();
});

app.get('/403', function(req, res, next) {
    var err = new Error('You have no permission to enter that area.');
    err.status = 403;
    next(err);
});

app.get('/500', function(req, res, next) {
    next(new Error('keyboard cat!'));
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('errors/404');
});

/***********************  START THE APP  **************************************/
app.listen(GLOBAL_VAR.PORT, function() {
    console.log('The Wall personal blog by George G. Gkasdrogkas.');
    console.log('Listening on port ' + GLOBAL_VAR.PORT + '!');
});
