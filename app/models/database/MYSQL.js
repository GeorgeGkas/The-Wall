'use strict';
var mysql = require('mysql');

var delete_author = require('./authors/delete_author');
var insert_author = require('./authors/insert_author');
var select_author = require('./authors/select_author');
var update_author = require('./authors/update_author');

var insert_subscription = require('./subscriptions/insert_subscription');
var update_subscription = require('./subscriptions/update_subscription');
var select_subscription = require('./subscriptions/select_subscription');

var insert_post = require('./posts/insert_post');
var delete_post = require('./posts/delete_post');
var select_post = require('./posts/select_post');
var update_post = require('./posts/update_post');

class MYSQL {
    constructor(connection_details) {
        this.conn = mysql.createConnection({
            host: connection_details.host,
            user: connection_details.user,
            password: connection_details.password,
            database: connection_details.database
        });
    }

    connect() {
        this.conn.connect(function(err) {
            if (!err) {
                console.log("Database is connected.");
            } else {
                console.log("Error connecting database.");
            }
        });
    }

    end() {
        this.conn.end();
    }

}

Object.assign(MYSQL.prototype, 
    delete_author,
    insert_author,
    select_author,
    update_author,

    insert_subscription,
    update_subscription,
    select_subscription,

    insert_post,
    delete_post,
    select_post,
    update_post
);

module.exports = MYSQL;
