'use strict';
var mysql = require('mysql');
var authors_methods = require('./MYSQL.authors_methods');

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

Object.assign(MYSQL.prototype, authors_methods);

module.exports = MYSQL;
