'use strict';
var mysql = require('mysql');

var delete_author = require('./authors/delete_author');
var insert_author = require('./authors/insert_author');
var select_author = require('./authors/select_author');
var update_author = require('./authors/update_author');

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
                console.log("Database is connected ... nn");
            } else {
                console.log("Error connecting database ... nn");
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
    update_author
);

module.exports = MYSQL;
