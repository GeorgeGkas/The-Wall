/*
 * MYSQL Module.
 * Here we required all the methods we'll need to run our blog.
 * We use a mysql pool connection instance to handle the requests.
 */

'use strict';
var mysql = require('mysql');

var insert_author = require('./authors/insert_author');
var select_author = require('./authors/select_author');
var update_author = require('./authors/update_author');
var delete_author = require('./authors/delete_author');

var insert_subscription = require('./subscriptions/insert_subscription');
var select_subscription = require('./subscriptions/select_subscription');
var update_subscription = require('./subscriptions/update_subscription');

var insert_post = require('./posts/insert_post');
var select_post = require('./posts/select_post');
var update_post = require('./posts/update_post');
var delete_post = require('./posts/delete_post');

var insert_comment = require('./comments/insert_comment');
var select_comment = require('./comments/select_comment');
var update_comment = require('./comments/update_comment');
var delete_comment = require('./comments/delete_comment');

var post_like = require('./likes/post_like');
var comment_like = require('./likes/comment_like');

class MYSQL {
    constructor(connection_details) {
        this.pool = mysql.createPool({
            connectionLimit: 20,
            host: connection_details.host,
            user: connection_details.user,
            password: connection_details.password,
            database: connection_details.database
        });
    }

}

Object.assign(MYSQL.prototype,
    insert_author,
    select_author,
    update_author,
    delete_author,

    insert_subscription,
    select_subscription,
    update_subscription,

    insert_post,
    select_post,
    update_post,
    delete_post,

    insert_comment,
    select_comment,
    update_comment,
    delete_comment,

    post_like,
    comment_like
);

module.exports = MYSQL;
